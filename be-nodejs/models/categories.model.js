const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Categories = new Schema({
    name: String,
    img: String,
    descriptions: String,
    slug: { 
        type: String, slug: 'name', unique: true 
    },
    product: [{ 
        type: mongoose.Types.ObjectId, ref: 'Product' 
    }]

},{timestamps:true});

module.exports = mongoose.model('Categories', Categories);