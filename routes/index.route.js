const siteRouter = require('./site.route');
const categoriesRouter = require('./categories.route');
const projectRouter = require('./project.route');
const loginRouter = require('./login.route');
const adminRouter = require('./admin.route');
const submitRouter = require('./submit.route');

function route(app) {
    app.use('/api/v1/projects', projectRouter)
    app.use('/api/v1/categories', categoriesRouter)
    app.use('/api/v1/login', loginRouter)
    app.use('/api/v1/admin-page', adminRouter)
    app.use('/api/v1/submit-project', submitRouter)
    app.use('/', siteRouter)
}

module.exports = route;