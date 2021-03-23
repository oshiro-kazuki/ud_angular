const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if(!email) {
    return res.status(422).send({error: 'User error', message: 'メールアドレスを入力して下さい'});
  }

  if(!password) {
    return res.status(422).send({error: 'User error', message: 'パスワードを入力して下さい'});
  }

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if(error) {
        return res.status(422).send({error: 'User error', message: 'ログインできません'});
      }
      
      if(results) {
        const result = results[0];
        console.log(result);
        
        if(result === undefined) {
          return res.status(422).send({error: 'User error', message: 'ユーザーがいません'});
        }
        
        const customPassword = bcrypt.compareSync(password, result.password);
        if(!customPassword) {
          return res.status(422).send({error: 'User error', message: 'パスワードが違います'});
        }

        const token = jwt.sign({
          userId: result.email,
          username: result.username,
        }, config.SECRET, { expiresIn: '1h' });;

        res.json(token);

      }
    }
  );

});

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  // console.log(username, email, password);

  if(!username) {
    return res.status(422).send({error: 'User error', message: 'ユーザー名を入力してください'});
  }

  if(!email) {
    return res.status(422).send({error: 'User error', message: 'メールアドレスを入力してください'});
  }

  if(!password) {
    return res.status(422).send({error: 'User error', message: 'パスワードを入力してください'});
  }

  if(password !== confirmPassword) {
    return res.status(422).send({error: 'User error', message: 'パスワードを確認してください'});
  }

  connection.query(
    'SELECT email, password FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if(error) {
        return res.status(422).send({error: 'User error', message: '新規登録できませんでした'});
      }
      
      if(results) {
        const result = results[0];

        if(result !== undefined) {
          return res.status(422).send({error: 'User error', message: 'このアドレスは使用できません'});
        }

        bcrypt.hash(password, saltRounds).then((customPassword) => {
          // console.log(customPassword);
          connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, customPassword],
            (error, results) => {
              if(error) {
                return res.status(422).send({error: 'User error', message: '登録できませんでした'});
              }
    
              res.json({'register': true});
            }
          );
        });

      }
    }
  );


  // return res.json({username, email, password});
});




module.exports = router;