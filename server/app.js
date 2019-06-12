import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import sequelize from 'sequelize';
import path from 'path';
import db from '../models/index';
import Mnemonic from 'bitcore-mnemonic';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import jimp from 'jimp';
import fs from 'fs';
import nodemailer from 'nodemailer';
import {
  getProfileImageName,
  getProfileImageFilePath,
  getProfileImageDir,
  PROFILE_IMAGE_DIR,
} from './users/util';

const app = express();
const secretKey = 'Eg2fTPSp6attfKcC6bsNbWkwsn6R4v';

// メール送信関連
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'qonnect.2019@gmail.com',
    pass: 'Qonnect0607'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Bcrypt
const saltRounds = 10;

const storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dirPath = './client/build' + getProfileImageDir(id);
    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath);
    }
    cb(null, dirPath);
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: (req, file, cb) => {
    const { id } = req.params;
    const fileName = getProfileImageName(id);
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

/*
評価機能
*/
app.post('/api/votes', (req, res) => {
  const {
    user_id,
    question_id,
    answer_id,
    comment_id,
    status
  } = req.body;
  db.votes.create({
    user_id,
    question_id,
    answer_id,
    comment_id,
    status
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.post('/api/vote_translations', (req, res) => {
  const {
    user_id,
    question_translation_id,
    answer_translation_id,
    comment_translation_id,
    status
  } = req.body;
  db.vote_translations.create({
    user_id,
    question_translation_id,
    answer_translation_id,
    comment_translation_id,
    status
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

//評価を削除する
app.delete('/api/votes/:id', (req, res) => {

  const { vote_id, key, user_id } = req.query;

  let whereContent;
  //コンテンツによってidの切り替え
  switch(key){
    case "question":
        const question_id = vote_id;
        whereContent = { user_id, question_id } ;
        break;
    case "answer":
        const answer_id = vote_id;
        whereContent = { user_id, answer_id } ;
        break;
    case "comment":
        const comment_id = vote_id;
        whereContent = { user_id, comment_id } ;
        break;
  }

  const filter = {
    where: whereContent,
  };
  db.votes.destroy(filter)
    .then((result) => {
      console.log('result', result);
      if (result === 0) {
        return res.status(500).send('いいねの削除に失敗しました。');
      }
      return res.status(200).send('いいねの削除に失敗しました。');
    })
  ;
});

//翻訳の評価を削除する
app.delete('/api/vote_translations/:id', (req, res) => {

  const { vote_id, key, user_id } = req.query;
  let whereContent;
  //コンテンツによってidの切り替え
  switch(key){
    case "question":
        const question_translation_id = vote_id;
        whereContent = { user_id, question_translation_id } ;
        break;
    case "answer":
        const answer_translation_id = vote_id;
        whereContent = { user_id, answer_translation_id } ;
        break;
    case "comment":
        const comment_translation_id = vote_id;
        whereContent = { user_id, comment_translation_id } ;
        break;
  }
  const filter = {
    where: whereContent,
  };
  db.vote_translations.destroy(filter)
    .then((result) => {
      console.log('result', result);
      if (result === 0) {
        return res.status(500).send('いいねの削除に失敗しました。');
      }
      return res.status(200).send('いいねの削除に失敗しました。');
    })
  ;
});

// Questions
app.get('/api/questions', (req, res) => {
  //params={country.id:1}
  const params = req.query;
  db.questions.findAll({
    where: params,
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.question_translations,
        required: false
      },
      {
        model: db.votes,
        required: false
      },
      {
        model: db.categories,
        required: false
      },
    ],
    order: [
      ['created_at', 'DESC']
    ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

// 未翻訳の質問を取得する
app.get('/api/not_translated_questions', (req, res) => {
  // const params = req.query;
  db.questions.findAll({
    //ここでquestion_translationsテーブルのidカラムがnullのものだけを抽出している
    where: {'$question_translations.id$' : null},
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.question_translations,
        required: false
      },
    ],
    order: [
      ['created_at', 'DESC']
    ]
  })
  //findAllで取得したデータを撮り終えてからthenを走らせる。
  .then((instanses) => {
    //ここでクライアント側にデータを渡している。
    res.status(200).send(instanses);
  });
});

// 未翻訳の回答を取得する
app.get('/api/not_translated_answers', (req, res) => {
  const params = req.query;
  db.answers.findAll({
    //ここでquestion_translationsテーブルのidカラムがnullのものだけを抽出している
    where: {'$answer_translations.id$' : null},
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.answer_translations,
        required: false
      },
    ],
    order: [
      ['created_at', 'DESC']
    ]
  })
  //findAllで取得したデータを撮り終えてからthenを走らせる。
  .then((instanses) => {
    //ここでクライアント側にデータを渡している。
    res.status(200).send(instanses);
  });
});

// 未翻訳のコメントを取得する
app.get('/api/not_translated_comments', (req, res) => {
  const params = req.query;
  db.comments.findAll({
    //ここでquestion_translationsテーブルのidカラムがnullのものだけを抽出している
    where: {'$comment_translations.id$' : null},
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.comment_translations,
        required: false
      },
      {
        model: db.answers,
        required: false
      },
    ],
    order: [
      ['created_at', 'DESC']
    ]
  })
  //findAllで取得したデータを撮り終えてからthenを走らせる。
  .then((instanses) => {
    //ここでクライアント側にデータを渡している。
    res.status(200).send(instanses);
  });
});

app.get('/api/questions/:id', (req, res) => {
  const qId = req.params.id;
  db.questions.findOne({
    where: {id: qId},
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.question_translations,
        required: false
      },
      {
        model: db.votes,
        required: false
      },
      {
        model: db.categories,
        required: false
      },
      {
        model: db.countries,
        required: false
      },
    ],
    order: [
      [db.question_translations, 'created_at', 'DESC'],
    ]
  })
    .then((instanse) => {
      res.status(200).send(instanse);
    });
});

app.post('/api/questions', (req, res) => {
  const {
    user_id,
    content,
    translate_language_id,
    country_id,
    category_id,
  } = req.body;
  db.questions.create({
    content,
    user_id,
    translate_language_id,
    country_id,
    category_id,
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.put('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const filter = {
    where: { id }
  };
  db.questions.update(params, filter)
    .then((updatedData) => {
      db.questions.findOne({ where: { id }})
        .then((instance) => {
          const question = instance.get();
          res.status(200).send(question);
        });
    })
  ;
});

app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.questions.destroy(filter)
    .then((result) => {
      console.log('result', result);
      if (result === 0) {
        return res.status(500).send('質問の削除に失敗しました');
      }
      return res.status(200).send('質問を削除しました');
    })
  ;
});

/**
 * question_translations
 */
app.get('/api/question_translations', (req, res) => {
  const { question_id } = req.query;
  db.question_translations.findAll({
    where: { question_id },
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.vote_translations,
        required: false
      },
  ],
  order: [
    ['created_at', 'DESC']
  ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/question_translations/:id', (req, res) => {
  const { id } = req.params;
  db.question_translations.findOne({
    where: {
      id
    },
    include: [
      {
        model: db.users,
        required: false
      },
    ],
  })
    .then((instanse) => {
      res.status(200).send(instanse);
    });
});

app.post('/api/question_translations', (req, res) => {
  const {
    content,
    user_id,
    question_id,
    translate_language_id
  } = req.body;
  db.question_translations.create({
    content,
    user_id,
    question_id,
    translate_language_id
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.put('/api/question_translations/:id', (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const filter = {
    where: { id }
  };
  db.question_translations.update(params, filter)
    .then((updatedData) => {
      db.question_translations.findOne({
        where: { id },
        include: [db.users]
      })
        .then((instance) => {
          const question = instance.get();
          res.status(200).send(question);
        });
    })
  ;
});

app.delete('/api/question_translations/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.question_translations.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('翻訳の削除に失敗しました');
      }
      return res.status(200).send('翻訳を削除しました');
    })
  ;
});

/**
 * answer_translations
 */
app.get('/api/answer_translations', (req, res) => {
  const { answer_id } = req.query;
  db.answer_translations.findAll({
    where: { answer_id },
    include: [
    {
      model: db.users,
      required: false
    },
    {
      model: db.vote_translations,
      required: false
    },
  ],
  order: [
    ['created_at', 'DESC']
  ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/answer_translations/:id', (req, res) => {
  const { id } = req.params;
  db.answer_translations.findOne({
    where: {
      id
    },
    include: [
      {
        model: db.users,
        required: false
      },
    ],
  })
    .then((instanse) => {
      res.status(200).send(instanse);
    });
});

app.post('/api/answer_translations', (req, res) => {
  const params = req.body;
  db.answer_translations.create({
    content: params.content,
    user_id: params.user_id,
    answer_id: params.answer_id,
    translate_language_id: params.translate_language_id,
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.put('/api/answer_translations/:id', (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const filter = {
    where: { id }
  };
  db.answer_translations.update(params, filter)
    .then((updatedData) => {
      db.answer_translations.findOne({
        where: { id },
        include: [db.users]
      })
        .then((instance) => {
          const question = instance.get();
          res.status(200).send(question);
        });
    })
  ;
});

app.delete('/api/answer_translations/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.answer_translations.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('翻訳の削除に失敗しました');
      }
      return res.status(200).send('翻訳を削除しました');
    })
  ;
});


/**
 * CommentTranslations
 */
app.get('/api/comment_translations', (req, res) => {
  const { comment_id } = req.query;
  db.comment_translations.findAll({
    where: { comment_id },
    include: [{
      model: db.users,
      required: false
    },
    {
      model: db.vote_translations,
      required: false
    },
  ],
  order: [
    ['created_at', 'DESC']
  ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/comment_translations/:id', (req, res) => {
  const { id } = req.params;
  db.comment_translations.findOne({
    where: {
      id
    },
    include: [
      {
        model: db.users,
        required: false
      },
    ],
  })
    .then((instanse) => {
      res.status(200).send(instanse);
    });
});

app.post('/api/comment_translations', (req, res) => {
  const {
    content,
    user_id,
    comment_id,
    translate_language_id
  } = req.body.params;
  db.comment_translations.create({
    content,
    user_id,
    comment_id,
    translate_language_id
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.put('/api/comment_translations/:id', (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const filter = {
    where: { id }
  };
  db.comment_translations.update(params, filter)
    .then((updatedData) => {
      db.comment_translations.findOne({
        where: { id },
        include: [db.users]
      })
        .then((instance) => {
          const question = instance.get();
          res.status(200).send(question);
        });
    })
  ;
});

app.delete('/api/comment_translations/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.comment_translations.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('翻訳の削除に失敗しました');
      }
      return res.status(200).send('翻訳を削除しました');
    })
  ;
});

/**
 * Answers
 */
app.get('/api/answers', (req, res) => {
  const params = req.query;
  db.answers.findAll({
    where: params,
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.comments,
        required: false,
        include: [
          db.users,
          db.comment_translations,
          //コメントのいいねデータを取得
          db.votes
        ]
      },
      {
        model: db.answer_translations,
        required: false,
      },
      //回答のいいねデータを取得
      {
        model: db.votes,
        required: false,
      },
    ],
    order: [
      ['created_at', 'ASC'],
      [db.comments, 'created_at', 'ASC'],
      [db.answer_translations, 'created_at', 'DESC'],
    ],
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/answers_with_question', (req, res) => {
  const params = req.query;
  db.answers.findAll({
    where: params,
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.questions,
        required: false,
        include: [
          db.question_translations
        ]
      },
      {
        model: db.answer_translations,
        required: false,
      },
    ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/answers/:id', (req, res) => {
  const aId = req.params.id;
  db.answers.findOne({
    where: {id: aId},
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.comments,
        required: false,
      },
    ]
  })
    .then((instanse) => {
      res.status(200).send(instanse);
    });
});

app.post('/api/answers', (req, res) => {
  const params = req.body;
  console.log('params', params);
  db.answers.create({
    content: params.content,
    question_id: params.question_id,
    user_id: params.user_id,
    translate_language_id: params.translate_language_id,
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.put('/api/answers/:id', (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const filter = {
    where: { id }
  };
  db.answers.update(params, filter)
    .then((updatedData) => {
      db.answers.findOne({ where: { id }})
        .then((instance) => {
          const answer = instance.get();
          res.status(200).send(answer);
        });
    })
  ;
});

app.delete('/api/answers/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.answers.destroy(filter)
    .then((result) => {
      console.log('result', result);
      if (result === 0) {
        return res.status(500).send('回答の削除に失敗しました');
      }
      return res.status(200).send('回答を削除しました');
    })
  ;
});



/**
 * Users
 */
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.users.findOne({
    where: { id },
    include: [
      {
        model: db.countries,
        required: false
      },
    ]
  })
    .then((instance) => {
      if (!instance) {
        return res.status(500);
      }
      const user = instance.get();
      delete user.wallet_address;
      user.image_path = getProfileImageFilePath(user.id);
      res.status(200).send(user);
    });
});


app.post('/api/users', (req, res) => {
  const { name, mail } = req.body;
  const password = bcrypt.hashSync(req.body.password, saltRounds);
  db.users.create({ name, mail, password })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

// プロフィール保存処理
app.put('/api/users/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const imagePath = getProfileImageFilePath(id);
  const filePath = __dirname + '/../client/public' + imagePath;
  console.log('filePath', filePath);
  jimp.read(filePath, function(err, image) {
    if (err) throw err;
    image
      .cover(500, 500)
      .write(filePath);
  });
  const filter = {
    where: { id }
  };
  db.users.update(params, filter)
    .then((updatedData) => {
      db.users.findOne({ where: { id }})
        .then((instance) => {
          const user = instance.get();
          delete user.wallet_address;
          res.status(200).send(user);
        });
    })
  ;
});

// ログイン共通処理
const callbackUserLogin = (findOpt, done, password = null) => {
  return db.users.findOne(findOpt)
    .then((instance) => {
      if (!instance) {
        return done(null, false, {message: "パスワードが間違っています。"});
      }
      const user = instance.get();
      if (password && !bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: "パスワードが間違っています。"});
      }
      const jsonWebToken = jwt.sign({
        id: user.id,
        name: user.name
      }, secretKey);
      user.jwt = jsonWebToken;
      delete user.wallet_address;
      delete user.password;
      return done(null, user);
    });
};

// ログイン処理
passport.use(new LocalStrategy(function(mail, password, done){
  try {
    const findOpt = {where: { mail }};
    return callbackUserLogin(findOpt, done, password);
  } catch(e) {
    const message = e.message;
    console.log('message', message);
    return done(null, false, {message});
  }
}));

// ログイン処理 with JWT
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
}, function(payload, done) {
  if (!payload) {
    return done(null, false);
  }
  const id = payload.id;
  const findOpt = {where: { id }};
  return callbackUserLogin(findOpt, done);
}));

app.post('/api/users/login', passport.authenticate('local', { session: false }), function(req, res) {
  res.status(200).send(req.user);
});

app.post('/api/users/login_jwt', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.status(200).send(req.user);
});

/**
 * Comments
 */
app.get('/api/comments', (req, res) => {
  const { answer_id } = req.query;
  db.comments.findAll({
    where: {
      answer_id,
    },
    include: [
      {
        model: db.users,
        required: false
      },
    ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  db.comments.findOne({
    where: {
      id,
    },
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.answers,
        required: false
      },
    ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.get('/api/comments_with_answer', (req, res) => {
  const params = req.query;
  db.comments.findAll({
    where: params,
    include: [
      {
        model: db.users,
        required: false
      },
      {
        model: db.answers,
        required: false,
        include: [
          db.answer_translations
        ]
      },
      {
        model: db.comment_translations,
        required: false,
      },
    ]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
    });
});

app.post('/api/comments', (req, res) => {
  const {
    user_id,
    answer_id,
    content,
    translate_language_id
  } = req.body;
  db.comments.create({
    user_id,
    answer_id,
    content,
    translate_language_id
  })
    .then((createdData) => {
      res.status(200).send(createdData);
    })
  ;
});

app.put('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const filter = {
    where: { id }
  };
  db.comments.update(params, filter)
    .then((updatedData) => {
      db.comments.findOne({
        where: { id },
        include: [
          {
            model: db.users,
            required: false
          },
          {
            model: db.answers,
            required: false
          },

        ]
      })
        .then((instance) => {
          const comment = instance.get();
          res.status(200).send(comment);
        });
    })
  ;
});

app.delete('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.comments.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('コメントの削除に失敗しました');
      }
      return res.status(200).send('コメントを削除しました');
    })
  ;
});

app.post('/api/mail', (req, res) => {
  const { from, to, subject, text } = req.body;

  const message = { from, to, subject, text };

  transporter.sendMail(message, (err, response) => {
    if (err) {
      console.log(err || response);
      return res.status(500).send('メールの送信に失敗しました');
    }
    return res.status(200).send('sent!');
  });

});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

export default app;
