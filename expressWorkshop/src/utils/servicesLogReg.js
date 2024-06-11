const bcrypt = require(`bcrypt`)
const { Accaunt } = require("../config/schemas.js")

async function register(email, password) {
    //check for existing
    const user = new Accaunt({
        email,
        password: await bcrypt.hash(password, 10)
    })
    user.save()
    return user
}
async function login(email, password) {
    const user = await Accaunt.findOne({ email })
    if(user){
        console.log(user.password)
        user.pas = await bcrypt.compare(password, user.password)
    }
    return user
}
module.exports = {
    register, login
}