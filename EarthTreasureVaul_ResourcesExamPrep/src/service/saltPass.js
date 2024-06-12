const bcrypt = require(`bcrypt`)

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)

}
async function comparePassword(exist, password) {
    console.log(exist)
    return await bcrypt.compare(password, exist.password)
}
module.exports = {
    hashPassword, comparePassword
}