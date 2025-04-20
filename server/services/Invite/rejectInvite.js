const ApiError = require("../../errors/ApiError");
const checkInviteAdnHerReceiver = require("./checkInviteAndHerReceiver");
const {InviteToEvent} = require("../../models");

module.exports = async function(user, idInvite){
    try{
        const result = await checkInviteAdnHerReceiver(user, idInvite)
        await result.update({status: "rejected"})
        return ({message: 'Приглашение отклонено'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}