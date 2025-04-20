const ApiError = require("../../errors/ApiError");
const {Event } = require("../../models");



module.exports = async function (req){
    const {id} = req.params;
    if(!req.isOwner){
        throw ApiError.forbidden('Нельзя менять статус чужого события')
    }
    try{
        const findEvent = await Event.findByPk(id);
        if(!findEvent){
            throw ApiError.badRequest('Событие не найдено')
        }
        await findEvent.update({status: 'finished'});
        return ({message: 'Событе завершено'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}