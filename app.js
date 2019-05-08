import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import sequelize from 'sequelize';
import path from 'path';
import db from './models/index';
import Mnemonic from 'bitcore-mnemonic';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import jimp from 'jimp';

const app = express();
const secretKey = 'hogehogehogehogehogehoge';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Bcrypt
const saltRounds = 10;

const storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: (req, file, cb) => {
    cb(null, './client/public/image');
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: (req, file, cb) => {
    const { id } = req.params;
    const fileName = getProfileImageName(id);
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

const getProfileImageName = (userId) => {
  const sha = crypto.createHash('sha512');
  sha.update(String(userId));
  return sha.digest('hex') + '.png';
};

const getProfileImagePath = (userId) => {
  return '/image/' + getProfileImageName(userId);
};


// Questions
app.get('/api/questions', (req, res) => {
  // console.log('req.query', req.query);
  const params = req.query;
  console.log('params', params);
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
    ],
    order: [
      ['created_at', 'DESC']
    ]
  })
    .then((instanses) => {
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
        model: db.answers,
        required: false,
        include: [db.users, db.comments]
      },
      {
        model: db.question_translations,
        required: false
      },
    ]
  })
    .then((instanse) => {
      res.status(200).send(instanse);
    });
});

app.post('/api/questions', (req, res) => {
  console.log('req.body', req.body);
  const {
    user_id,
    content,
    translate_language_id,
    country_id
  } = req.body;
  db.questions.create({
    content,
    user_id,
    translate_language_id,
    country_id
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
  // console.log('req.query', req.query);
  const { question_id } = req.query;
  db.question_translations.findAll({
    where: { question_id },
    include: [{
      model: db.users,
      required: false
    }]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
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


/**
 * answer_translations
 */
app.get('/api/answer_translations', (req, res) => {
  const { answer_id } = req.query;
  db.answer_translations.findAll({
    where: { answer_id },
    include: [{
      model: db.users,
      required: false
    }]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
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
    }]
  })
    .then((instanses) => {
      res.status(200).send(instanses);
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
        include: [db.users]
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
        required: false
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
      user.image_path = getProfileImagePath(user.id);
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
  const imagePath = getProfileImagePath(id);
  const filePath = __dirname + '/client/public' + imagePath;
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



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

export default app;