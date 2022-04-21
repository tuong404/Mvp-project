const Product = require('../models/product.model');

    const addToCart = (req, res, next) => {

        const slug  = req.params.slug;
        
        Product.findOne({slug: slug})
            .then((product) => {
                if (typeof req.session.cart == "undefined") {
                    req.session.cart = [];
                    req.session.cart.push({
                        title: slug,
                        qty: 1,
                        name: product.name,
                        img: product.img,
                        color: product.color,
                        price: product.price,
                        id: product._id,
                    })
                } else {
                    var cart = req.session.cart;
                    var newItem = true;
    
                    for (var i = 0; i < cart.length; i++) {
                        if (cart[i].title == slug) {
                            cart[i].qty++;
                            newItem = false;
                            break;
                        }
                    }
                    if (newItem) {
                        cart.push({
                            title:  req.params.slug,
                            qty: 1,
                            name: product.name,
                            img: product.img,
                            color: product.color,
                            price: product.price,
                            id: product._id,
                        })
                    }
                }

                console.log(req.session.cart);
                req.flash('susscess','Thêm vào giỏ hàng thành công!')
                res.redirect('back');
            })
            .catch(next)
    }

    // GET 
    const index = (req, res) => {
        if (req.session.cart && req.session.cart.length == 0) {
            delete req.session.cart;
            res.redirect('/api/v1/carts');
        } else {
            res.render('pages/sites/cart', {
                cart: req.session.cart,
            })
        }
        
    
    }

    // Update
    const update = (req, res) => {
        var slug = req.params.slug;
        var cart = req.session.cart;
        var action = req.query.action;
    
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].title == slug) {
                switch (action) {
                    case "add":
                        cart[i].qty++;
                        break;
                    case "remove":
                        cart[i].qty--;
                        if (cart[i].qty < 1)
                            cart.splice(i, 1);
                        break;
                    case "clear":
                        cart.splice(i, 1);
                        if (cart.length == 0)
                            delete req.session.cart;
                        break;
                    default:
                        console.log('update problem');
                        break;
                }
                break;
            }
        }
    
        req.flash('success', 'Cart updated!');
        res.redirect('/api/v1/carts');
    }

    // Clear
    const clear = (req, res) => {
        delete req.session.cart;
    
        req.flash('success', 'Cart cleared!');
        res.redirect('/api/v1/carts');
    }

    // BuyNow
    const buyNow = (req, res) => {
        
            delete req.session.cart;      
            res.sendStatus(200);
    }

module.exports = { 
    index,
    addToCart,
    clear,
    buyNow,
    update
};