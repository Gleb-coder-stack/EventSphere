const ApiError = require("../../errors/ApiError");
const {FriendShip} = require("../../models");
module.exports = async function(idRequest, idReceiver){
    try{
        const request = await FriendShip.findByPk(idRequest)
        if(!request){
            throw ApiError.badRequest('Заявка не найдена')
        }
        const check = request.idReceiver === idReceiver
        return ({isMy: check, request: request});
    }catch(err){
        throw ApiError.internal(err.message)
    }
}