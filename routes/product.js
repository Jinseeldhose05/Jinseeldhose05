const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import your Product model

// Route for product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render('product', {message: 'HELLO WORLD' , product }); // Render the product page
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
