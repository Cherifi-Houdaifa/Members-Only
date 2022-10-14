exports.getCreateMessage = function (req, res, next) {
    res.send('GET Create Message');
};

exports.postCreateMessage = function (req, res, next) {
    res.send('POST Create Message');
};

exports.getBecomeMember = function (req, res, next) {
    res.send('GET Become Member');
};

exports.postBecomeMember = function (req, res, next) {
    res.send('POST Become Member');
};

exports.getBecomeAdmin = function (req, res, next) {
    res.send('GET Become Admin');
};

exports.postBecomeAdmin = function (req, res, next) {
    res.send('POST Become Admin');
};