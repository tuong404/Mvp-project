const Comment = require('../models/comment.model');

class CommmentController {

    // Create submit [POST] /submit-project
    createComment(req, res, next) {
        const formData = req.body;
        Comment.create(formData)
            .then((comment) => {
                res.json(comment);
            })
            .catch(next)
    }


}

module.exports = new CommmentController;