const express = require('express');
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Sample products data
const products = [
  { id: 1, name: 'Laptop', price: 999, description: 'A powerful laptop for work and play.' },
  { id: 2, name: 'Phone', price: 699, description: 'Latest smartphone with advanced features.' },
  { id: 3, name: 'Headphones', price: 199, description: 'High-quality wireless headphones.' }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { products });
});

app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.render('product', { product });
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`SmartShop Lite running at http://localhost:${port}`);
});