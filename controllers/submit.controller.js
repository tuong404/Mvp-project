const Submit = require('../models/submit.model');

class SubmitController {

    // Create submit [POST] /submit-project
    createSubmit(req, res, next) {
        const formData = req.body;
        Submit.create(formData)
            .then((submit) => {
                res.json(submit);
            })
            .catch(next)
    }


}

module.exports = new SubmitController;