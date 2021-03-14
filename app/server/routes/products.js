const express = require('express');
const router = express.Router();
const connection = require('../mysql');

router.get('', (req, res) => {
  connection.query(
    'SELECT * FROM products',
    (error, results) => {
      res.json(results);
      // console.log(results);
    }
  );
    // res.json({'ok': true});
});

router.get('/:productId', (req, res) => {
  connection.query(
    'SELECT * FROM products WHERE id = ?',
    [req.params.productId],
    (error, results) => {
      res.json(results);
      console.log(results);
    }
  );
    // res.json({'ok': true});
});

module.exports = router;