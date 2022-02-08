const Categories = require('../models/categories.model');

class CategoriesController {

    show(req, res, next) {
        Categories.find({})
            .then(categories => res.json(categories))
            .catch(next)
    }

}

module.exports = new CategoriesController;