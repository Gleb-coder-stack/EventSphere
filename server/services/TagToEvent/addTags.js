const ApiError = require("../../errors/ApiError");
const {Event, TagForEvent} = require("../../models");
const checkEvent = require("../../functions/common/fields/checkRecord");
const checkTags = require("../Tag/validateTags");

module.exports = async function(idEvent, tagIds){
    if (!Array.isArray(tagIds)) {
        throw ApiError.badRequest("Теги должны быть массивом");
    }
    if (tagIds.length === 0) throw ApiError.badRequest("Не указаны теги");
    try{
        const resultCheckEvent = await checkEvent(idEvent, Event);
        if(!resultCheckEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        const resultCheckTags = await checkTags(tagIds)
        const recordsToCreate = tagIds.map(tagId => ({
            idEvent,
            idTag: tagId
        }));
        await TagForEvent.bulkCreate(recordsToCreate)
        return ({message: 'Теги успешно добавлены'})
    }catch (err){
        throw ApiError.internal(err.message)
    }
}