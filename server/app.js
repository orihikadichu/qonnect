import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import path from 'path';
import db from '../models/index';
import Mnemonic from 'bitcore-mnemonic';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import multer from 'multer';
import jimp from 'jimp';
import fs from 'fs';
import dayjs from 'dayjs';
import { sprintf } from 'sprintf-js';
import { config } from 'dotenv';
import i18n from 'i18n';
import {
  getHashName,
  getPasswordHash,
  getJwt,
  getProfileImageName,
  getProfileImageFilePath,
  getProfileImageDir,
  PROFILE_IMAGE_DIR,
  SECRET_KEY,
} from './users/util';
import { getTokenData } from './auth_tokens';
import { sendMailFromAdmin } from './mails';
import { notifyForQuestionUser, notifyForAnswerUser } from './notifications';

const app = express();
// 環境変数の読み込み
config();

const HOST = process.env.HOST;
const PUBLIC_URL = process.env.PUBLIC_URL;

// Serve static files from the React app
app.use(express.static(PUBLIC_URL));

// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

i18n.configure({
  locales: ['ja', 'en'],  //使用する言語指定
  defaultLocale: 'en',  //デフォルトの言語を決める
  directory: __dirname + '/locales',  //言語の内容を置く場所
  queryParameter: 'lang',  //langクエリで切り替え
  logDebugFn: function (msg) { //デバッグモード
    console.log('debug', msg);
  },
  logWarnFn: function (msg) {  //Warningモード
    console.log('warn', msg);
  },
  logErrorFn: function (msg) { //Errorモード
    console.log('error', msg);
  }
});
app.use(i18n.init);

// Bcrypt
const saltRounds = 10;

const storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dirPath = PUBLIC_URL + getProfileImageDir(id);
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
    voted_user_id,
    question_id,
    answer_id,
    comment_id,
    action_type_id,
  } = req.body;
  db.votes.create({
    user_id,
    voted_user_id,
    question_id,
    answer_id,
    comment_id,
  })
    .then((createdData) => {
      res.status(200).send(createdData);
      if (!createdData) {
        return res.status(500).send("error");
      }
      const voteUserparams = {
        translated : 0,
        action_type_id : 6,
        point : 1
      };
      const votedUserparams = {
        translated : 0,
        action_type_id : 7,
        point : 1
      };
      createPoint(voteUserparams, createdData);
      createVotedPoint(votedUserparams, createdData);
      res.status(200).send(createdData);
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
  ;
});

app.post('/api/vote_translations', (req, res) => {
  const {
    user_id,
    voted_user_id,
    question_translation_id,
    answer_translation_id,
    comment_translation_id,
    action_type_id,
    status
  } = req.body;
  db.vote_translations.create({
    user_id,
    voted_user_id,
    question_translation_id,
    answer_translation_id,
    comment_translation_id,
    status
  })
    .then((createdData) => {
      if (!createdData) {
        return res.status(500).send("error");
      }
      const voteUserparams = {
        translated : 1,
        action_type_id : 6,
        point : 1
      };
      const votedUserparams = {
        translated : 1,
        action_type_id : 7,
        point : 1
      };
      createPoint(voteUserparams, createdData);    
      createVotedPoint(votedUserparams, createdData);
      res.status(200).send(createdData);
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
  ;
});

app.delete('/api/votes/:id', (req, res) => {
  const { 
    vote_id, 
    deleteColumnKey,
    user_id,
    voted_user_id,
    action_type_id,
    voteIdForPoint,
  } = req.query;
  let whereContent = { user_id };
  const voteKey = deleteColumnKey + "_id";
  whereContent[voteKey] = vote_id;
  const filter = {
    where: whereContent,
  };
  db.votes.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('いいねの削除に失敗しました。');
      }
      const voteUserParams = {
        user_id: user_id,
        translated: 0,
        action_type_id: 6,
        target_id: voteIdForPoint,
      }
      const votedUserParams = {
        user_id: voted_user_id,
        translated: 0,
        action_type_id: 7,
        target_id: voteIdForPoint,
      }
      deletePoint(voteUserParams);
      deletePoint(votedUserParams);
      return res.status(200).send('いいねの削除に成功しました。');
    });
});

app.delete('/api/vote_translations/:id', (req, res) => {
  const { vote_id, deleteColumnKey, user_id, voted_user_id, action_type_id, voteIdForPoint } = req.query;
  let whereContent = { user_id };
  const voteKey = deleteColumnKey + "_translation_id";
  whereContent[voteKey] = vote_id;
  const filter = {
    where: whereContent,
  };
  db.vote_translations.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('いいねの削除に失敗しました。');
      }
      const voteUserParams = {
        user_id: user_id,
        translated: 1,
        action_type_id: 6,
        target_id: voteIdForPoint,
      };
      const votedUserParams = {
        user_id: voted_user_id,
        translated: 1,
        action_type_id: 7,
        target_id: voteIdForPoint,
      };
      deletePoint(voteUserParams);
      deletePoint(votedUserParams);
      return res.status(200).send('いいねを削除しました。');
    });
});


// ポイントをつけるときの関数
function createPoint(params, createdData) {
  params.user_id = createdData.user_id;
  params.target_id = createdData.id;
  return db.points.create(params);
};

function createVotedPoint(params, createdData) {
  params.user_id = createdData.voted_user_id;
  params.target_id = createdData.id;
  return db.points.create(params);
};

//ポイントを削除するときの関数
function deletePoint(params) {
  const { 
    user_id, 
    translated, 
    action_type_id,
    target_id,
  } = params;
  const filter = {
    where: { user_id, translated, action_type_id, target_id }
  };
  return db.points.destroy(filter);
};

/*
  翻訳一覧取得
*/
app.get('/api/content_translations', (req, res) => {
  const params = req.query;
  const promise1 = db.question_translations.findAll({ where: params }); 
  const promise2 = db.answer_translations.findAll({ where: params });
  const promise3 = db.comment_translations.findAll({ where: params }); 
  Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
    res.status(200).send(values);
  });
});

/*
  未翻訳
*/
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
        model: db.answers,
        required: false,
        include: [
          db.comments,
        ]
      },
      {
        model: db.question_translations,
        required: false,
        include: [
          db.users,
        ]
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
        required: false,
        include: [
          db.users,
        ]
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
      if (!createdData) {
        return res.status(500).send("error");
      }
      const params = {
        translated : 0,
        action_type_id : 1,
        point : 1
      };
      createPoint(params, createdData);
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
  const { id, action_type_id } = req.params;
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
      const params = {
        user_id: user_id,
        translated: 0,
        action_type_id: 1,
        target_id: id
      }
      deletePoint(params);
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
      if (!createdData) {
        return res.status(500).send("error");
      }
      const params = {
        translated : 1,
        action_type_id : 1,
        point : 3,
      };
      createPoint(params, createdData);
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
      const params = {
        user_id: user_id,
        translated: 1,
        action_type_id: 1,
        target_id: id
      }
      deletePoint(params);
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
      if (!createdData) {
        return res.status(500).send("error");
      }
      const params = {
        translated : 1,
        action_type_id : 2,
        point : 3,
      };
      createPoint(params, createdData);
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
      const params = {
        user_id: user_id,
        translated: 1,
        action_type_id: 2,
        target_id: id
      }
      deletePoint(params);
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
      if (!createdData) {
        return res.status(500).send("error");
      }
      const params = {
        translated : 1,
        action_type_id : 3,
        point : 3,
      };
      createPoint(params, createdData);
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
      const params = {
        user_id: user_id,
        translated: 1,
        action_type_id: 3,
        target_id: id
      }
      deletePoint(params);
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
        required: false,
      },
      {
        model: db.comments,
        required: false,
        include: [
          db.users,
          db.comment_translations,
          db.votes
        ]
      },
      {
        model: db.answer_translations,
        required: false,
        include: [
          db.users,
        ]
      },
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
  const {
    content,
    question_id,
    user_id,
    translate_language_id
  } = req.body;
  db.answers.create({
    content,
    question_id,
    user_id,
    translate_language_id,
  })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('Error');
      }
      const answer = instance.get();
      const { question_id } = answer;
      notifyForQuestionUser(question_id);

      if (!answer) {
        return res.status(500).send("error");
      }
      const params = {
        translated : 0,
        action_type_id : 2,
        point : 2,
      };
      createPoint(params, answer);
      res.status(200).send(answer);
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
      const params = {
        user_id: user_id,
        translated: 0,
        action_type_id: 2,
        target_id: id,
      }
      deletePoint(params);
      return res.status(200).send('回答を削除しました');
    })
  ;
});



/**
 * Users
 */

//いいねしてくれた人のリストを取得
// function getVotedUserList(votedUserId,instance) {
//   const filter = {
//     where: { voted_user_id: votedUserId}
//   };
//   return db.vote_translations.findAll(filter);
// };

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.users.findOne({
    where: { id },
    include: [
      {
        model: db.countries,
        required: false
      },
      {
        model: db.points,
        required: false
      },
      {
        model: db.vote_translations,
        required: false,
        include: [
          db.users
        ]
      },
    ]
  })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('存在しないユーザーです');
      }
      const user = instance.get();
      delete user.wallet_address;
      user.image_path = getProfileImageFilePath(user.id);
      user.message = "test";
      const params = {
        where: { voted_user_id: user.id },
        include: [{
          model: db.users,
          required: false,
        }]
      };
      return db.vote_translations.findAll(params)
      .then((intances) => {
        user.votedUserList = intances.map((v) => { return  v.user  });
        console.log("----------------------");
        console.log(intances);
        console.log("----------------------");
        return res.status(200).send(user);
      });        
    });
});

app.get('/api/users/password_reset/:token', (req, res) => {
  const { token } = req.params;
  db.auth_tokens.findOne({
    where: { token },
    include: [
      {
        model: db.users,
        required: false
      }
    ]
  })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('存在しないユーザーです');
      }
      const authToken = instance.get();
      const { user } = authToken;
      return res.status(200).send(user);
    });
});

// ユーザー新規作成(Activation)
/*
app.post('/api/users', (req, res) => {
  const { name, mail, country_id, locale } = req.body;
  if (locale) {
    i18n.setLocale(locale);
  }
  const password = getPasswordHash(req.body.password);
  db.users.create({ name, mail, country_id, password })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('ユーザーの作成に失敗しました。');
      }
      const user = instance.get();
      const authTokenData = getTokenData(user.id);
      return db.auth_tokens.create(authTokenData)
        .then((instance) => {
          if (!instance) {
            return res.status(500).send('ユーザーの作成に失敗しました。');
          }
          const authToken = instance.get();
          const activationUrl = `${HOST}/users/activate/${authToken.token}`;
          const subject = i18n.__('mails.activation.subject');
          const textTemp = i18n.__('mails.activation.body');
          const text = sprintf(textTemp, activationUrl);
          const mailParams = {
            to: user.mail,
            subject,
            text
          };
          sendMailFromAdmin(mailParams);
          return res.status(200).send(user);
        });
    })
    .catch((e) => {
      let eMsg = '';
      for (const ve of e.errors) {
        switch (ve.type) {
        case 'unique violation':
          eMsg = 'ユーザーの作成に失敗しました。';
        }
      }
      return res.status(500).send({ eMsg });
    })
  ;
});
*/

// ユーザー新規作成
app.post('/api/users', (req, res) => {
  const { name, mail, country_id } = req.body;
  const password = getPasswordHash(req.body.password);
  db.users.create({ name, mail, country_id, password })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('ユーザーの作成に失敗しました。');
      }
      const user = instance.get();
      return res.status(200).send(user);
    })
    .catch((e) => {
      let eMsg = '';
      for (const ve of e.errors) {
        switch (ve.type) {
        case 'unique violation':
          eMsg = 'ユーザーの作成に失敗しました。';
        }
      }
      return res.status(500).send({ eMsg });
    })
  ;
});

function updateImage(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  jimp.read(filePath, function(err, image) {
    if (err) throw err;
    image
      .cover(500, 500)
      .write(filePath);
  });
}

// プロフィール保存処理
app.put('/api/users/:id', upload.single('image'), (req, res) => {

  const { id } = req.params;
  const params = req.body;
  const imagePath = getProfileImageFilePath(id);
  const filePath = PUBLIC_URL + imagePath;

  updateImage(filePath);

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

// パスワード変更処理
app.put('/api/users/update_password/:token', (req, res) => {
  const { token } = req.params;
  const params = req.body;
  const { id, password } = params;
  db.auth_tokens.findOne({ user_id: id, token })
    .then((instance) => {
      console.log('afterAuthTokenFindOne');
      if (!instance) {
        return res.status(500).send('対象のトークンが存在しません。');
      }
      const authToken = instance.get();
      const { user } = authToken;
      const filter = {
        where: { id }
      };
      const passwordHash = getPasswordHash(password);
      const updateData = { password: passwordHash };
      return db.users.update(updateData, filter);
    })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('パスワードの更新に失敗しました。');
      }
      return db.users.findOne({ where: { id }});
    })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('対象のユーザーが存在しません。');
      }
      const user = instance.get();
      user.jwt = getJwt({
        id: user.id,
        mail: user.mail
      });
      delete user.wallet_address;
      delete user.password;
      return user;
    })
    .then((user) => {
      const filter = {
        where: { user_id: id, token }
      };
      db.auth_tokens.destroy(filter)
        .then((result) => {
          if (!result) {
            return res.status(500).send('トークンの削除に失敗しました。');
          }
          return res.status(200).send(user);
        });
    });
  ;
});

// アクティベーション処理
app.post('/api/users/activate/:token', (req, res) => {
  const { token } = req.params;
  db.auth_tokens.findOne({
    where: { token },
    include: [
      {
        model: db.users,
        required: false
      }
    ]
  })
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('不正なアクセスです');
      }
      const authToken = instance.get();
      if (dayjs().isAfter(dayjs(authToken.expired_datetime))) {
        return res.status(500).send('期限切れのトークンです。');
      }
      const { user } = authToken;
      user.jwt = getJwt({
        id: user.id,
        mail: user.mail
      });
      const filter = {
        where: { user_id: user.id, token }
      };
      db.auth_tokens.destroy(filter);
      return res.status(200).send(user);
    });
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
      user.jwt = getJwt({
        id: user.id,
        mail: user.mail
      });
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
  secretOrKey: SECRET_KEY,
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

app.post('/api/users/password_reset', (req, res) => {
  const { mail, locale } = req.body;
  if (locale) {
    i18n.setLocale(locale);
  }
  db.users.findOne({ where: { mail }})
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('登録されていないメールアドレスです。');
      }
      const user = instance.get();
      const authTokenData = getTokenData(user.id);
      const { token } = authTokenData;
      const resetUrl = `${HOST}/users/password_reset/${token}`;
      const subject = i18n.__('mails.password_reset.subject');
      const textTemp = i18n.__('mails.password_reset.body');
      const text = sprintf(textTemp, resetUrl);
      const mailParams = {
        to: user.mail,
        subject,
        text
      };

      return db.auth_tokens.create(authTokenData)
        .then((instance) => {
          if (!instance) {
            return res.status(500).send('登録されていないメールアドレスです。');
          }
          sendMailFromAdmin(mailParams);
          return res.status(200).send('sent!');
        });
    });
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

//answer_idに紐づいたコメントと、その翻訳文を取得
app.get('/api/comments_with_user', (req, res) => {
  const  answerIdList = Object.values(req.query);
  db.comments.findAll({
    where: {},
    include: [
      {
        model: db.comment_translations,
        required: false,
        include: [
          db.users,
        ]
      },
    ],
    order: [
      ['created_at', 'ASC'],
    ],
  })
    .then((instanses) => {
      const result = {};
      answerIdList.forEach((answerId) => {
        result[answerId] = instanses.filter(
          v => v.answer_id === parseInt(answerId)
        );
      });
      res.status(200).send(result);
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
    .then((instance) => {
      if (!instance) {
        return res.status(500).send('Error');
      }
      const comment = instance.get();
      const { answer_id } = comment;
      notifyForAnswerUser(answer_id);
      if (!instance) {
        return res.status(500).send("error");
      }
      const params = {
        translated: 0,
        action_type_id : 3,
        point : 1,
      };
      createPoint(params, comment);
      return res.status(200).send(comment);
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
  const { id, action_type_id } = req.params;
  const { user_id } = req.query;
  const filter = {
    where: { id, user_id }
  };
  db.comments.destroy(filter)
    .then((result) => {
      if (result === 0) {
        return res.status(500).send('コメントの削除に失敗しました');
      }
      const params = {
        user_id: user_id,
        translated: 0,
        action_type_id: action_type_id,
        target_id: id
      }
      deletePoint(params);
      return res.status(200).send('コメントを削除しました');
    })
  ;
});

app.get('*', (req, res) => {
  res.sendFile(PUBLIC_URL + '/index.html');
});

export default app;
