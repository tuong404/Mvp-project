const Product = require('../models/product.model');
const User = require('../models/user.model');
const Categories = require('../models/categories.model');
class SiteController {
    // GET 
    index(req, res, next) {
        const perPage = 12;
        const page = req.params.p || 1;
        Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                Categories.find().exec(function(err, categories) {
                    if (err) return next(err)
                    res.render('home', {
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        categories: categories,
                      
                    })
                })
            })
            
        })
    }    
    logged(req, res, next) {
       
        User.findOne({username: req.user.username})
        .then((user) => {
            const perPage = 12;
            const page = req.params.p || 1;
            Product
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, products) {
                Product.count().exec(function(err, count) {
                    Categories.find().exec(function(err, categories) {
                        if (err) return next(err)
                        res.render('home', {
                            products: products,
                            current: page,
                            pages: Math.ceil(count / perPage),
                            categories: categories,
                            user: user
                        })
                    })
                })
                
            })
        })
        .catch(next)
    }    

}

module.exports = new SiteController;