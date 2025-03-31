var express = require('express');
const Product = require('../models/product');
var router = express.Router();


router.get('/edit-product/:id', async(req, res, next)=> {
    try {
      const product = await Product.findById(req.params.id);  
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.render('edit-product',{ title: "Update product" , product });  
    } catch (err) {
      console.error("Error loading product:", err);
      res.status(500).send("Error in loading");
    }
  });
  

  router.post('/update-product/:id', async (req, res) => {
    try {
        console.log("Received update request:", req.body); // Debug input data

        const oldProduct = await Product.findById(req.params.id);
        console.log("Before Update:", oldProduct);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                
            },
            { new: true }  
        );

        console.log("After Update:", updatedProduct); // Check if update happened

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        res.redirect('/products-control');
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Error in updating");
    }
});



router.get('/delete-product/:id', async(req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.redirect('/products-control')
    }catch (err){
        console.error("Error deleting product:", err)
        res.status(500).send("Can't delete")
    }
})

module.exports = router;
