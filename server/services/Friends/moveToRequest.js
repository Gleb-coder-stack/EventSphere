const ApiError = require("../../errors/ApiError");
const checkIsMeRequest = require("./checkIsMyRequest");
module.exports = async function(idRequestToFriend, user, isApprove) {
    //true - приянть в друзья, false - отклонить или удалить из друзей
    const {id: idReceiver} = user
    try{
        const result = await checkIsMeRequest(idRequestToFriend, idReceiver);
        if(!result.isMy){
            throw ApiError.badRequest('Заявка в друзья не пренадлежит вам')
        }
        console.log(result.request)
        isApprove ? await result.request.update({status: 'friends'}) : await result.request.update({status: 'rejected'})
        return ({message: `Статус заявки сменен`})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}