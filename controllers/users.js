const Message = require('../models/message');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.getCreateMessage = function (req, res, next) {
    res.render('createMessage', { title: 'Create A Message' });
};

exports.postCreateMessage = [
    body('text').exists().notEmpty().isLength({ max: 300 }),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        Message.create(
            {
                user: req.user._id,
                date: Date.now(),
                text: req.body.text,
            },
            (err, message) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            }
        );
    },
];

exports.getBecomeMember = function (req, res, next) {
    res.render('member', { title: 'Become A Member' });
};

exports.postBecomeMember = [
    body('password')
        .exists()
        .notEmpty()
        .equals('your mom is fat')
        .withMessage('Invalid Password. Hint: your mom is ___'),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        if (!req.user) {
            return next(new Error('You need to log in first'));
        }
        User.findByIdAndUpdate(
            req.user._id,
            { isMember: true },
            (err, user) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            }
        );
    },
];

exports.getBecomeAdmin = function (req, res, next) {
    res.render('admin', { title: 'Become Admin' });
};

exports.postBecomeAdmin = [
    body('password').exists().notEmpty(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error(errors.array()[0].msg));
        }
        if (!req.user) {
            return next(new Error('You need to log in first'));
        }
        if (req.body.password !== '1!=1') {
            return next(new Error('Wrong Password'));
        }
        User.findByIdAndUpdate(req.user._id, { isAdmin: true }, (err, user) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },
];

exports.getDeleteMessage = function (req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        return next(new Error("You don't have the permission to do this"));
    }
    Message.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};
