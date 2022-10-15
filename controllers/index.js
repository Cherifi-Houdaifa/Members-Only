const Message = require('../models/message');

module.exports = function (req, res, next) {
    Message.find({})
        .populate('user').sort({date: -1})
        .exec((err, result) => {
            if (err) {
                return next(err);
            }
            res.render('index', { title: 'Home', messages: result });
        });
};
