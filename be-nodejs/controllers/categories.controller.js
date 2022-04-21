const Categories = require('../models/categories.model');
const Product = require('../models/product.model');

const filter = async (req, res, next) => {
        const category = req.params.slug;
        Categories.find()
        .then((categories) => {
            Categories.findOne({category})
            .then(() => {
                Product.find({ name: { $regex: category, $options: 'i$' } })
                .then((products) => {
                    if (products) {
                        res.render('pages/sites/category', {
                            products: products,
                            categories: categories,
                        });
                    } else {
                        res.json(null);
                    }
                })
                .catch(next)
            } )
            .catch(next)
        })
        .catch()
    }

      
        // let filter = {};
        // filter = req.query.categories;
        // const slug = req.params.slug;
        // const singleCategory = await Categories.findOne({slug: slug})
        // const category =  await Product.find({category: singleCategory}, (err, product) => {
        //     if (err) {
        //         console.log('Error: ', err);
        //     } else {
        //         res.send(product)
        //     }
        // }).populate('category');
        // Categories
        // .find({slug})
        // .populate('product')
        //     //     Product.find({}).populate('categories')
        //     //     .then(() => res.json(categories))
        //     //     .catch(next)
        //     // })
        //     // .catch()
        //     .then((categories) => res.send(categories))
        //     .catch(next)
        
        // find({})
        //     .then(categories => res.json(categories))
        //     .catch(next)

    // }
        
module.exports = {
    filter
};