const Project = require('../models/project.model');

class SiteController {
    // GET 
    index(req, res, next) {
        Project.find({})
            .then(projects => res.render('home', {
                projects: projects
            }))
            .catch(next)
    }

    showCategories(req, res, next) {

        Project.find({})
            .then(projects => res.json(projects))
            .catch(next)
    }


}

module.exports = new SiteController;