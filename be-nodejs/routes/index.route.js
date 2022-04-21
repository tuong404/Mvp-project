const siteRouter = require('./site.route');
const categoriesRouter = require('./categories.route');
const productRouter = require('./product.route');
const loginRouter = require('./login.route');
const cartRouter = require('./cart.route');
const adminRouter = require('./admin.route');

function route(app) {
    app.use('/api/v1/products', productRouter)
    app.use('/api/v1/categories', categoriesRouter)
    app.use('/api/v1', loginRouter)
    app.use('/api/v1/carts', cartRouter)
    app.use('/api/v1/admin-page', adminRouter)
    // app.use('/api/v1/comments', commentRouter)
    app.use('/api/v1/home-page', siteRouter)
}

module.exports = route;