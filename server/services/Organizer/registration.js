const ApiError = require("../../errors/ApiError");
const { Organizer } = require("../../models");
const generateJwt = require("../../functions/generateJwt");
const hashPassword = require('../../functions/hashPassword')
const checkUnique = require("../../functions/common/user/checkUniqueField");


const modelName = Organizer

module.exports = async function(name, email, password) {
    try{
        const findByEmail = await checkUnique('email', email, modelName); //Функция проверки уникальности почты
        if(findByEmail){
            throw ApiError.badRequest('Организатор с таким email уже существует')
        }
        const findByName = await checkUnique('name', name, modelName);
        if(findByName){
            throw ApiError.badRequest('Имя не уникально')
        }
        const resultHash = await hashPassword(password) //функция хегирования пароля
        const organizer = await Organizer.create({name, email, password: resultHash.hashPassword, versionJwt: resultHash.versionJwt})
        const token = generateJwt(organizer.id, organizer.role, resultHash.versionJwt) //Функция создания токена
        return ({token: token});
    }catch(err){
        throw ApiError.internal(err.message)
    }
}