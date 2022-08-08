import express from 'express'
import Product from '../models/productModel.js';


const productRouter = express.Router();

productRouter.get('/', async (req,res) => {
    const products = await Product.find();
    res.send(products);
});

//for product
productRouter.get('/slug/:slug', async (req,res) => {
    const product = await Product.findOne({slug:req.params.slug});
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Sản phẩm không tìm thấy'});
    }
});


export default productRouter;