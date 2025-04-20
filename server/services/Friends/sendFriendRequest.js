const ApiError = require("../../errors/ApiError");
const checkUser = require("../../functions/common/fields/checkRecord");
const {FriendShip, Participant} = require("../../models");


module.exports = async function(user, idReceiver) {
    const {id: idRequester} = user
    try{
        const checkRequester = await checkUser(idRequester, Participant);
        if(!checkRequester){
            throw ApiError.badRequest('Отправитель не найден');
        }
        const checkReceiver = await checkUser(idReceiver, Participant);
        if(!checkReceiver){
            throw ApiError.badRequest('Получатель не найден');
        }
        if(idRequester === idReceiver){
            throw ApiError.badRequest('Нелья себя добавить в друзья');
        }
        const oldRequest = await FriendShip.findOne({where: {idRequester: idRequester, status: 'pending'}})
        if(oldRequest){
            throw ApiError.badRequest('Вы уже отправили заявку в друзья');
        }
        await FriendShip.create({idReceiver, idRequester});
        return ({message: 'Заявка в друзья отправлена'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}