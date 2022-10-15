const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.getSignUp = function (req, res, next) {
    res.render('signup', { title: 'Sign Up' });
};

exports.postSignUp = [
    body('username')
        .exists()
        .notEmpty()
        .custom((value, meta) => {
            return User.findOne({ username: value }).then((user) => {
                if (user) {
                    return Promise.reject('Username is already taken');
                }
            });
        }),
    body('password').exists().notEmpty(),
    body('confirm-password')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    'Confirmation password and password must be the same'
                );
            }
            return true;
        }),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            User.create(
                {
                    username: req.body.username,
                    password: hash,
                    isAdmin: false,
                    isMember: false,
                },
                (error, user) => {
                    if (error) {
                        return next(error);
                    }
                    res.redirect('/log-in');
                }
            );
        });
    },
];

exports.getLogIn = function (req, res, next) {
    res.render('login', { title: 'Log In' });
};

exports.postLogIn = [
    body('username').exists().notEmpty(),
    body('password').exists().notEmpty(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        next();
    },
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in',
    }),
];

exports.getLogOut = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};
