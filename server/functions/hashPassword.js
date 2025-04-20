const bcrypt = require("bcrypt");
const uuid = require("uuid");


module.exports = async function (password){
    const intSali = Number(process.env.COUNT_SALT)
    const hashPassword = await bcrypt.hash(password, intSali)
    const versionJwt = uuid.v4()
    return {hashPassword, versionJwt}
}