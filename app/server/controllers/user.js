const jwt = require('jsonwebtoken');
const config = require('../config');
const connection = require('../mysql');

function notAuthorized(res) {
  return res.status(401).send({error: 'Not Authorized', message: 'ログインして下さい'});
}

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  // const aaa = jwt.decode(token);

  if(!token) {
    return notAuthorized(res);
  }

  jwt.verify(token, config.SECRET, (err, decodedtoken) => {
    console.log(token)
    console.log(decodedtoken)
    if(err) {
      console.log(err)
      return res.status(401).send({error: 'Not Authorized', message: 'incerid token'});
    }

    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [decodedtoken.userId],
      (error, results) => {
        console.log('token connection')
        if(error) {
          return res.status(401).send({error: 'Not Authorized', message: '認証エラー'});
        }
      
        if(results) {
          const result = results[0];
          
          if(result === undefined) {
            return res.status(401).send({error: 'Not Authorized', message: 'ユーザーがいません'});
          }

          next();
        }
    });
  });
}