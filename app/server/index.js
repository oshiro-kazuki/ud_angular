const express = require('express');
const productRoutes = require('./routes/products');
const path = require('path');

const app = express();

app.use('/api/v1/products', productRoutes);

// if(process.env.NODE_ENV === 'production') {
//   const appPath = path.join( __dirname, '..', 'dist', 'app');
//   app.use(express.static(appPath));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(appPath, 'index.html'));
//   });
// }

const appPath = path.join( __dirname, '..', 'dist', 'app');
app.use(express.static(appPath));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(appPath, 'index.html'));
});

// app.get('/products', (req, res) => {
//   res.json({'success': true});
// });


const PORT = process.env.PORT || '3001';
app.listen(PORT, () => {
  console.log('running');
});
