const ApiError = require("../../errors/ApiError");
const { Participant } = require("../../models");
const hashPassword = require('../../functions/hashPassword')
const generateJwt = require("../../functions/generateJwt");
const checkUnique = require("../../functions/common/user/checkUniqueField");

const nameModel = Participant;
module.exports = async function (nickname, email, password){
    try{
        const findEmail = await checkUnique('email', email, nameModel);
        if(findEmail){
            throw ApiError.badRequest('Участник с таким email уже существует')
        }
        const findNickName = await checkUnique('nickname', nickname, nameModel);
        if(findNickName){
            throw ApiError.badRequest('Участник с таким ником уже есть')
        }
        const resultHash = await hashPassword(password)
        const participant = await Participant.create({nickname, email, password: resultHash.hashPassword, versionJwt: resultHash.versionJwt})
        const token = generateJwt(participant.id, participant.role, resultHash.versionJwt)
        return ({token: token});
    }catch(err){
        throw ApiError.internal(err.message); 
    }
}