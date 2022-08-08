import mongoose from "mongoose";

//Tạo table DB
const categorySchema = new mongoose.Schema(
    {
        title: {type: String, require: true, unique: true},
        image: {type: String, require: true},
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;