function isGuest() {
    return function (req, res,next) {
        if (!req.user) {
            res.redirect(`/login`)
        } else {
            next()
        }
    }
}
module.exports = { isGuest }