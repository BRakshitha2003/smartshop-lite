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

// In-memory cart (for simplicity, in production use sessions or database)
let cart = [];

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

// Add to cart
app.post('/add-to-cart/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    cart.push(product);
    res.redirect('/cart');
  } else {
    res.status(404).send('Product not found');
  }
});

// View cart
app.get('/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render('cart', { cart, total });
});

// Remove from cart
app.post('/remove-from-cart/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
  }
  res.redirect('/cart');
});

// Search products
app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  res.render('index', { products: filteredProducts });
});

app.listen(port, () => {
  console.log(`SmartShop Lite running at http://localhost:${port}`);
});