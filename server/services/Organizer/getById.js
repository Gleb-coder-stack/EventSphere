const ApiError = require("../../errors/ApiError");
const { Organizer } = require("../../models");
const findEvents = require('../Event/getByIdOrganizer')
const clearBadFields = require("../../functions/clearBadFields");

module.exports = async function(id, nameEvent) {
    try{
        const findOrganizer = await Organizer.findByPk(id)
        if(!findOrganizer){
            return ApiError.badRequest('Профиль не найден')
        }
        const clearData = clearBadFields(findOrganizer)
        const events = await findEvents(id, nameEvent)
        clearData.events = events
        return ({profile: clearData})
    }catch(err){
        throw ApiError.internal(err.message)
    }
}