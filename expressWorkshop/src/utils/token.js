const jwt = require(`jsonwebtoken`)

const secret = `secret`

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, secret, { expiresIn: `2d` })
    return token
}
function verifyToken(token) {
    const payload = jwt.verify(token, secret)
    return payload
}
function session() {
    return function (req, res, next) {

        const token = req.cookies.token;
        if (token) {
            try {
                const payload = verifyToken(token)
                req.user = payload
            } catch (err) {
                res.clearCookie(`token`)
            }
        }
        next()
    }
}
module.exports = {
    createToken, session
}