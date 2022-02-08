const User = require('../models/user.model');
const Project = require('../models/project.model');
const Submit = require('../models/submit.model');
const jwt = require('jsonwebtoken');

class AdminController {

    // Authen
    authentication(req, res, next) {
        // decode
        const decodeJWT = (token) => {
            try {
                return jwt.decode(token);
            } catch (err) {
                console.log(err.message);
                return null;
            }
        };

        const headers = req.headers;
        const token = headers['authorization'];
        const data = decodeJWT(token);

        if (!data) {
            res.send('loi!!!')
        };

        req.user = data;
        next();
    }

    // Manager users
    // List user [GET] /users
    showUser(req, res, next) {
        const role = req.user.role;
        User.find({})
            .then((users) => {
                if (role !== 'Admin') {
                    res.send('Chỉ có quyền admin mới có thể truy cập!');
                } else {
                    res.json(users);
                }
            })
            .catch(next)
    }

    // Show info profile [GET] /users/:id
    showUserInfo(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                if (user) {
                    res.json(user);
                }
            })
            .catch((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            })
    }

    // Create user [POST] /users/create
    createUser(req, res, next) {
        const formData = req.body;
        User.create(formData)
            .then((user) => {
                res.json(user);
            })
            .catch(next)
    }


    // Update user [PUT] /users/:id
    updateUser(req, res, next) {
        const formData = req.body;
        User.updateOne({ _id: req.params.id }, formData)
            .then(() => res.send('ok'))
            .catch(next)
    }

    // Delete  user [DELETE] /users/:id
    deleteUser(req, res, next) {
        const role = req.user.role;
        User.deleteOne({ _id: req.params.id })
            .then((user) => {
                if (role !== 'Admin') {
                    res.send('loi!!!');
                } else {
                    res.send('ok');
                }
            })
            .catch(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            })

    }

    // Manager project
    // List project [GET] /projects
    showProject(req, res, next) {
        const role = req.user.role;
        Project.find({})
            .then((projects) => {
                if (role !== 'Admin') {
                    res.send('Chỉ có quyền admin mới có thể truy cập!');
                } else {
                    res.json(projects);
                }
            })
            .catch(next)
    }

    // Create project [POST] /project/create
    createProject(req, res, next) {
        const formData = req.body;
        Project.create(formData)
            .then((project) => {
                res.json(project);
            })
            .catch(next)
    }


    // Update project [PUT] /project/:id
    updateProject(req, res, next) {
        const formData = req.body;
        Project.updateOne({ _id: req.params.id }, formData)
            .then(() => res.send('ok'))
            .catch(next)
    }

    // Delete  project [DELETE] /project/:id
    deleteProject(req, res, next) {
        const role = req.user.role;
        Project.deleteOne({ _id: req.params.id })
            .then(() => {
                if (role !== 'Admin') {
                    res.send('loi!!!');
                } else {
                    res.send('ok');
                }
            })
            .catch(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            })

    }

    // Manager submit
    // List submit [GET] /submissions
    showSubmit(req, res, next) {
        const role = req.user.role;
        Submit.find({})
            .then((submits) => {
                if (role !== 'Admin') {
                    res.send('Chỉ có quyền admin mới có thể truy cập!');
                } else {
                    res.json(submits);
                }
            })
            .catch(next)
    }

    // Show info submit [GET] /submissions/:id
    showSubmitInfo(req, res, next) {
        Submit.findOne({ _id: req.params.id })
            .then((submit) => {
                if (submit) {
                    res.json(submit);
                }
            })
            .catch((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            })
    }

    // Create user [POST] /submissions/create
    createSubmit(req, res, next) {
        const formData = req.body;
        Submit.create(formData)
            .then((user) => {
                res.json(user);
            })
            .catch(next)
    }


    // Update submit [PUT] /submissions/:id
    updateSubmit(req, res, next) {
        const formData = req.body;
        Submit.updateOne({ _id: req.params.id }, formData)
            .then(() => res.send('ok'))
            .catch(next)
    }

    // Delete  submit [DELETE] /submissions/:id
    deleteSubmit(req, res, next) {
        const role = req.user.role;
        Submit.deleteOne({ _id: req.params.id })
            .then(() => {
                if (role !== 'Admin') {
                    res.send('loi!!!');
                } else {
                    res.send('ok');
                }
            })
            .catch(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            })

    }
}

module.exports = new AdminController;