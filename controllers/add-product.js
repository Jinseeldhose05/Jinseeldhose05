var express = require('express');
const multer = require('multer')
const path = require('path');
const Product = require('../models/product');
var router = express.Router();



const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-product');
});

router.post('/', upload.single('image'), async(req, res)=>{
    try{
        const {name, price, description} = req.body;
        const image = req.file ? req.file.filename:null;
        const newProduct = new Product({name, price, description, image})
        await newProduct.save()
        res.redirect('/products-control');

    }catch (error){
        res.status(500).send('Error')
    }
})



module.exports = router;