import mongoose from "mongoose";

//Tạo table DB
const productSchema = new mongoose.Schema(
    {
        title: { type: String, require: true, unique: true},
        slug: { type: String, require: true, unique: true},
        desc: { type: String, require: true},
        category: { type: String, require: true},
        image: { type: String, require: true},
        image1: { type: String, require: true},
        image2: { type: String, require: true},
        image3: { type: String, require: true},
        countInStock: { type: Number, require: true},
        price: { type: Number, require: true},
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;