import mongoose from "mongoose";

//Tạo table DB
const sliderSchema = new mongoose.Schema(
    {
        image: {type: String, require: true},
    },
    {
        timestamps: true,
    }
);

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;