const ApiError = require("../../errors/ApiError");
const {Event } = require("../../models");
const err = require("../../errors/ApiError");


async function applyEvent(idEvent){
    try{
        const findEvent = await Event.findByPk(idEvent);

        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        if(findEvent.status !== 'moderation'){
            throw ApiError.badRequest('Событие уже прошло модерацию')
        }
        await findEvent.update({status: 'planned'})
        return ({message: 'Событие одобрено'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}

async function rejectEvent(idEvent){
    try{
        const findEvent = await Event.findByPk(idEvent);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        if(findEvent.status !== 'moderation'){
            throw ApiError.badRequest('Событие уже прошло модерацию')
        }
        await findEvent.update({status: 'rejected'})
        return ({message: 'Событие отклонено'})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}

module.exports = {
    applyEvent,
    rejectEvent,
}

