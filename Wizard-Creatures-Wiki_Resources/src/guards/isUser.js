function isUser() {
    return function (req, res, next) {
        if (req.user) {
            res.redirect(`/`)
        } else {
            next()
        }
    }
}
module.exports = { isUser }