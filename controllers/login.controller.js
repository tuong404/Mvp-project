const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const secretKey = '123123';
class LoginController {
    // Login
    login(req, res, next) {

        User.findOne({
                username: req.body.username,
                password: req.body.password
            })
            .then((user) => {
                if (user) {
                    const accessToken = jwt.sign({ username: user.username, role: user.role },
                        secretKey,
                    )
                    res.json({
                        accessToken
                    });
                } else {
                    res.send('Username or password incorrect');
                }
            })
            .catch((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            })
    }

}

module.exports = new LoginController;