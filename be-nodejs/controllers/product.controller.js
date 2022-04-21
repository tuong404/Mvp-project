const Product = require('../models/product.model');
const Categories = require('../models/categories.model');
const request = require('request');
    // Products

    const show = (req, res, next) => {
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

    const  paginate = (req, res, next) => {
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
                        categories: categories
                    })
                })
            })
            
        })
    }

    // Create Project
    const createProduct = (req, res, next) => {
        const formData = req.body;
        Product.create(formData)
            .then((product) => {
                res.json(product);
            })
            .catch(next)
    }

    // Search
    const search = (req, res, next) => {
        const contentSearch = req.body.name;
        Product.find({ name: { $regex: contentSearch, $options: 'i$' } })
            .then((products) => {
                if (products) {
                    res.render('pages/sites/search-page', {
                        products: products,
                    });
                } else {
                    res.json(null);
                }
            })
            .catch(next)
    }

    // Project detail
    const detail = (req, res, next) => {
        
        const slug = req.params.slug;
        const susscess = req.flash('susscess');
        Product.findOne({slug})
            .then(product => res.render('pages/products/product-detail', {
                product:product,
                productVersion: product.version,
                productAlbum: product.album,
                productStatus: product.isStatus,
                productAmount: product.amount,
                productColor: product.color,
                productSystem: product.system,
                susscess: susscess,
            }))
            .catch(next)
    }

    // // Chart
    // chart(req, res, next) {
    //     Product.findOne({ _id: req.params.id })
    //         .then((project) => {
    //             const nameProject = project.name.toLowerCase();
    //             const newurl = `https://api.coingecko.com/api/v3/coins/${nameProject}/market_chart?vs_currency=usd&days=1`;
    //             request(newurl).pipe(res);
    //         })
    //         .catch(next)
    // }




module.exports =  {
    show,
    paginate,
    createProduct,
    search,
    detail,
}