const express = require('express');
const { products } = require('./data');
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// In-memory cart (for simplicity, in production use sessions or database)
let cart = [];

// Mock login state
let isLoggedIn = false;

// Routes
// Home page: displays product listing
app.get('/', (req, res) => {
  res.render('index', { products, isLoggedIn });
});

// Login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login POST request
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'password') {
    isLoggedIn = true;
    res.redirect('/');
  } else {
    res.send('Invalid credentials');
  }
});

// Logout
app.get('/logout', (req, res) => {
  isLoggedIn = false;
  res.redirect('/');
});

// Product details page
app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.render('product', { product });
  } else {
    res.status(404).send('Product not found');
  }
});

// Add product to cart
app.post('/add-to-cart/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    cart.push(product);
    res.redirect('/cart');
  } else {
    res.status(404).send('Product not found');
  }
});

// View shopping cart
app.get('/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render('cart', { cart, total });
});

// Remove item from cart
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