const express = require('express');
// const mysql = require('mysql2');
// const config = require('./config/dev');
// const product = require('./models/product');
const productRoutes = require('./routes/products');

const app = express();


app.use('/api/v1/products', productRoutes);

// app.get('/products', (req, res) => {
//   res.json({'success': true});
// });


const PORT = process.env.PORT || '3001';
app.listen(PORT, () => {
  console.log('running');
});
