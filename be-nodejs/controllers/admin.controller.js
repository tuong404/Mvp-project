const User = require('../models/user.model');
const Product = require('../models/product.model');
const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const multer  = require('multer');

const showDashboard = (req, res, next) => {  
           
    User.findOne({username: req.user.username})
        .then((user) => {
            Product.find({}) 
                .then((products) => {
                   User.find({})
                    .then((users) => {
                        return res.render('pages/dashboard/index', {
                            user: user,
                            products: products,
                            users: users
                        })      
                    })
                    .catch(next)
                })
                .catch             
        })
        .catch(next)
}

// Manager users
// List user[GET] / users
const listUser = (req, res, next) => {
    const username = req.user.username;
    User.findOne({username})
    .then(user => {
            const perPage = 4;
            const page = req.params.p || 1;
            User
            .find({
                $or: [
                    {role: 'user'},
                    {role: null},
                ]})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, users) {
                User.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('pages/tables/users-table', {
                        current: page,
                        pages: Math.ceil(count / perPage),
                        user: user,
                        users: users,
                    })
            })
        })
    })
        .catch(next)
}

const paginateUser = (req, res, next) => {
    const username = req.user.username;
    User.findOne({username})
    .then(user => {
            const perPage = 4;
            const page = req.params.p || 1;
            User
            .find({
                $or: [
                    {role: 'user'},
                    {role: null},
                ]})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, users) {
                User.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('pages/tables/users-table', {
                        current: page,
                        pages: Math.ceil(count / perPage),
                        user: user,
                        users: users,
                    })
            })
        })
    })
        .catch(next)
}

const createFormUser = (req, res, next) => {
    User.findOne({username: req.user.username}) 
    .then((user) => res.render('pages/users/create',{
        user: user
    }))
    .catch()
    
}

const createUser = (req, res, next) => {
    const formData = req.body;
    const user = new User(formData);
    user.save()
        .then(() => {
            return res.redirect('/api/v1/admin-page/users')
        })
        .catch(next)
}

const showUpdateUser = (req, res, next) => {

    User.findById({ _id: req.params.id })
        .then((user) => {
            res.render('pages/users/update', {
                user: user
            });
        })
        .catch(next)

}
const updateUser = (req, res, next) => {

    
    const formData = req.body;
        User.updateOne({ _id: req.params.id }, formData)
            .then(() => {
                res.redirect('/api/v1/admin-page/users')})
            .catch(next)
    
}

const deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('back')
        })
        .catch(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })

}



// Product
const showProduct = (req, res, next) => {

    const username = req.user.username;
    User.findOne({username})
    .then(user => {
            const perPage = 4;
            const page = req.params.p || 1;
            Product
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, products) {
                Product.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.render('pages/tables/products-table', {
                            products: products,
                            current: page,
                            pages: Math.ceil(count / perPage),
                            user: user, 
                        })
                })
                
            })
    })
    .catch(next)
}

// Create product [POST] /product/create

const createFormProduct = (req, res, next) => {
    const validName = req.flash('validName');
    const validColor = req.flash('validColor');
    const validVersion = req.flash('validVersion');
    const validPrice = req.flash('validPrice');
    const validDiscount = req.flash('validDiscount');
    const validAmount = req.flash('validAmount');
    const validSystem = req.flash('validSystem');
    const validContent = req.flash('validContent');
    User.findOne({username: req.user.username}) 
    .then((user) => {
        Product.findOne({})
        .then((product) => {
            res.render('pages/products/create',{
                user: user,
                product: product,
                // validName: validName,
                validColor : validColor,
                // validVersion: validVersion,
                // validPrice: validPrice,
                // validDiscount: validDiscount,
                // validAmount: validAmount,
                // validSystem: validSystem,
                // validContent: validContent,
        })
        })
        .catch(next)   
    })
    .catch(next)
    
}

const createProduct = async (req, res, next) => {
    const formData = req.body;
    const product = new Product(formData);
     // Finds the validation errors in this request and wraps them in an object with handy functions
     var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
        // req.flash('validName', 'Name is must have value');
        req.flash('validColor', 'Color is must have value');
        // req.flash('validVersion', 'Version is must have value');
        // req.flash('validPrice', 'Price is must have value');
        // req.flash('validDiscount', 'Discount is must have value');
        // req.flash('validAmount', 'Amount is must have value');
        // req.flash('validSystem', 'System is must have value');
        // req.flash('validContent', 'Content is must have value');
        res.redirect('/api/v1/admin-page/product/create');
    } else {
        await product.save() 
        .then(() => {
            return res.redirect('/api/v1/admin-page/products')
        })
        .catch(next)
    }
   
}
// Update product [PUT] /product/:id
const showUpdateProduct = (req, res, next) => {

    User.findOne({ username: req.user.username })
        .then((user) => {
            Product.findById({ _id: req.params.id})
            .then((product) => {
                res.render('pages/products/update', {
                    user: user,
                    product: product,
                    productColor: product.color,
                });
            })
           
        })
        .catch(next)

}
const updateProduct = (req, res, next) => {

    const formData = req.body;
    Product.updateOne({ _id: req.params.id }, formData)
            .then(() => {
                res.redirect('/api/v1/admin-page/products')})
            .catch(next)
    
}
// Delete  product [DELETE] /product/:id
const deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('back')
        })
        .catch(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })

}

const paginateProduct = (req, res, next) => {
    const username = req.user.username;
    User.findOne({username})
    .then(user => {
            const perPage = 4;
            const page = req.params.p || 1;
            Product
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, products) {
                Product.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.render('pages/tables/products-table', {
                            products: products,
                            current: page,
                            pages: Math.ceil(count / perPage),
                            user: user, 
                        })
                })
                
            })
    })
    .catch(next)
}

module.exports = {
    showDashboard,
    listUser,
    createFormUser,
    createUser,
    showUpdateUser,
    updateUser,
    deleteUser,
    paginateUser,
    showProduct,
    createFormProduct,
    createProduct,
    showUpdateProduct,
    updateProduct,
    deleteProduct,
    paginateProduct,
}
