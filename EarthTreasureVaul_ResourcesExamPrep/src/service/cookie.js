const jwt = require(`jsonwebtoken`)
const secret = `hope i pass`

function createToken(user) {
    const payload = {
        id: user._id,
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
        const token = req.cookies.token
        if (token) {
            try {
                req.user = verifyToken(token)
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