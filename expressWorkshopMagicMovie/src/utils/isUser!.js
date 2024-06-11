function isUser() {
    return function (req, res, next) {
        if (!req.user) {
            res.redirect(`/login`)
        } else {
            res.locals.user = req.user
            next()
        }
    }
}
function isGuest() {
    return function (req, res, next) {
        if (req.user) {
            res.redirect(`/`)
        } else {
            next()
        }
    }
}
function middle() {
    return function (req, res, next) {
        res.locals.user = req.user || null;
        next();
    };
}
module.exports = {
    isGuest, isUser, middle
}