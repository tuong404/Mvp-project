const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser")
const csurf = require("csurf")
const csrfProtection = csurf({ cookie: { httpOnly: true } })
const { body, validationResult } = require('express-validator');

// register
const registerForm = (req, res) => {
    const susscess = req.flash('susscess');
    const error = req.flash('error');
    const invalueUsername = req.flash('invalueUsername');
    const invaluePassword = req.flash('invaluePassword');
    const checkLengthPass = req.flash('checkLengthPass');
    res.render('pages/sites/register', {
        susscess: susscess,
        error: error,
        invalueUsername: invalueUsername,
        invaluePassword: invaluePassword,
        checkLengthPass: checkLengthPass,
    });

}
const store = async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    if (!user.username || typeof user.username !== 'string') {
        req.flash('invalueUsername', 'Invalid username')
        res.redirect('/api/v1/register');
	}

	if (!user.password || typeof user.password !== 'string') {
        req.flash('invaluePassword', 'Invalid password')
        res.redirect('/api/v1/register');
	}

	if (user.password.length < 6) {
        req.flash('checkLengthPass', 'Password too small. Should be atleast 6 characters')
        res.redirect('/api/v1/register');
	}
      // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
  
       try {
            await user.save().then((doc) => {
                req.flash('susscess', 'Register susscessfully,')
                res.redirect('/api/v1/register');
            })       
       } catch(err) {
        if (err.code === 11000) {
			// duplicate key
            req.flash('error', 'User already in use')
            res.redirect('/api/v1/register');
		}
		throw err
        }
}
    

const showLogin = (req, res) => {
    const invalid = req.flash('valid');
    const exist = req.flash('exist');
    res.render('pages/sites/login', {
        messages: invalid,
        messages1: exist,
    });
}

// Login
const login = async (req, res, next) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username});
        if (user) {
         // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(body.password, user.password);
            const token = jwt.sign({ username: user.username, role: user.role, id:user.id},
                process.env.SECRET_KEY, {expiresIn: "2h"});
            if (validPassword) {
                res.cookie("cookieToken", token, { httpOnly: true });
                const role = user.role;
                // res.json(req.cookies.cookieToken)
                if(role == "Admin") {
                    return  res.redirect("/api/v1/admin-page");
                }
                else{
                    return  res.redirect("/api/v1/home-page");        
                }
            } else {
                req.flash('valid', 'Invalid Password');
                res.redirect('/api/v1/login');
            }
        } else {
                req.flash('exist', 'User does not exist');
                res.redirect('/api/v1/login');
            }
}

const logout = (req, res, next) => {
    res.clearCookie("cookieToken");
    res.redirect("/api/v1/login");
    res.end();
}

module.exports = {
    registerForm,
    store,
    login,
    showLogin,
    logout,
}