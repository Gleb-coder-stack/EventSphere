const {InviteToEvent} = require("../../models");
const ApiError = require("../../errors/ApiError");
module.exports = async function(user, idInvite){
    const {id} = user;
    try{

        const invite = await InviteToEvent.findByPk(idInvite);
        if(!invite){
            throw ApiError.badRequest('Приглашение не найдено')
        }
        if(invite.idReceiver !== id){
            throw ApiError.forbidden('Нельзя менять чужие приглашения')
        }
        return invite;
    }catch(err){
        throw ApiError.internal(err.message)
    }
}