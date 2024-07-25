const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar algunos productos de ejemplo
router.post('/add-examples', async (req, res) => {
  const categories = [
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Clothing' },
  ];

  const savedCategories = await Category.insertMany(categories);

  const products = [
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with all the new features',
      price: 699,
      stock: 50,
      category: savedCategories[0]._id
    },
    {
      name: 'Laptop',
      description: 'High performance laptop for work and gaming',
      price: 999,
      stock: 30,
      category: savedCategories[0]._id
    },
    {
      name: 'Novel',
      description: 'Bestselling fiction novel',
      price: 19,
      stock: 100,
      category: savedCategories[1]._id
    },
    {
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      price: 9,
      stock: 200,
      category: savedCategories[2]._id
    },
  ];

  await Product.insertMany(products);

  res.send('Example products and categories added');
});

module.exports = router;
