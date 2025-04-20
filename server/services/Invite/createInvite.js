const ApiError = require("../../errors/ApiError");
const checkRecord = require("../../functions/common/fields/checkRecord");
const {Event, sequelize, Participant, InviteToEvent, FriendShip} = require("../../models");
const { Sequelize, Op} = require("sequelize");
const err = require("../../errors/ApiError");


module.exports = async function(user, idParticipant, idEvent){
    const {id} = user //Кто хочет отправить
    try{
        const checkEvent = await checkRecord(idEvent, Event)
        if(!checkEvent){
            throw ApiError.badRequest('Событие не найдено')
        }

        const checkParticipant = await checkRecord(idParticipant, Participant)
        if(!checkParticipant){
            throw ApiError.badRequest('Участник не найден')
        }
        const checkIsFriends = await FriendShip.findOne({where: {
                status: 'friends',
                [Op.or]: [
                    { idRequester: id, idReceiver: idParticipant },
                    { idRequester: idParticipant, idReceiver: id }
                ]
            }})
        if(!checkIsFriends){
            throw ApiError.badRequest('Вы можете оптправлять приглашения только друзьям')
        }
        await InviteToEvent.create({idRequester: id, idReceiver: idParticipant, idEvent})
        return ({message: "Приглашение отправлено"})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}