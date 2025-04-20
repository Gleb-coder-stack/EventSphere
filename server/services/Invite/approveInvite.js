const ApiError = require("../../errors/ApiError");
const checkInviteAdnHerReceiver = require("./checkInviteAndHerReceiver");
const createRecall = require("../RecallToEvent/createRecall");

module.exports = async function(user, idInvite){
    try{
        const result = await checkInviteAdnHerReceiver(user, idInvite)
        await result.update({status: "approved"})
        await createRecall(result.idEvent, user)
        return ({message: 'Приглашение принято'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}