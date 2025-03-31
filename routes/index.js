const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import your product model

router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.render('index', { title: "Home", message: "Welcome", sliding_text: "Best Deals!", products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.render('index', { title: "Home", message: "Welcome", sliding_text: "Best Deals!", });
    }
});


module.exports = router;
