const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    img: String,
    imgMain: String,
    album: Array,
    color: Array,
    version: Array,
    description: String,
    price: {
        type:Number, 
        required: true,
    },
    discount: Number,
    amount: Number,
    rating: Number,
    isStatus: Boolean,
    shortName: String,
    isFavorite: Boolean,
    content: String,
    system: Object,
    slug: { type: String, slug: 'name', unique: true },
    videoUrl: String,
    category: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Categories' 
    }]
}, {
    timestamps: true
});

// Product.plugin(mongoosePaginate);
// const productModel = mongoose.model('ProductModel', Product);

module.exports = mongoose.model('Product', Product);