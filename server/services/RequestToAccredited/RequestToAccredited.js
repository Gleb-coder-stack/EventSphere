const {RequestToAccredited, Organizer} = require("../../models");
const ApiError = require("../../errors/ApiError");
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')

async function createRequest(req) {
    const {id: idOrganizer} = req.user
    const links = req.body?.links
    const file = req.files?.file
    if(!links && !file){
        throw ApiError.badRequest("Укажите ссылку или файл, подтверждающий аккредитацию");
    }
    try{
        const organizerToRequest = await Organizer.findByPk(idOrganizer)
        if(!organizerToRequest){
            throw ApiError.badRequest("Организатор не найден");
        }
        if(organizerToRequest.isAccredited){
            throw ApiError.badRequest("Вы уже аккредитованы");
        }
        const oldRequest = await RequestToAccredited.findOne({where: {idOrganizer, status: 'pending'}})
        if(oldRequest){
            throw ApiError.badRequest("Вы уже отправили заявку, которую не рассмотрели");
        }
        let result = {idOrganizer: idOrganizer, links: links};
        if (file) {
            const newFileName = uuid.v4() + path.extname(file.name);
            const relativePath = `/static/filesForAccredited/${newFileName}`;
            const filePath = path.resolve(__dirname, '../..', relativePath);

            result.filename = relativePath;
            await file.mv(filePath);
        }
        await RequestToAccredited.create(result)
        return ({message: 'Заявка на аккредитацию отправлена'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}

async function applyRequest(req) {
    const {id} = req.params
    try{
        const requestToAccredited = await RequestToAccredited.findByPk(id)
        if(!requestToAccredited){
            throw ApiError.badRequest("Заявка не найдена");
        }
        if(requestToAccredited.status !== 'pending'){
            throw ApiError.badRequest('Заявка уже была рассмотрена')
        }
        const ownerRequest = await Organizer.findByPk(requestToAccredited.idOrganizer)
        await requestToAccredited.update({status: "approved"})
        await ownerRequest.update({isAccredited: true})
        return ({message: 'Заявка одобрена'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}

async function rejectRequest(req) {
    const {id} = req.params
    try{
        const requestToAccredited = await RequestToAccredited.findByPk(id)
        if(!requestToAccredited){
            throw ApiError.badRequest("Заявка не найдена");
        }
        if(requestToAccredited.status !== 'pending'){
            throw ApiError.badRequest('Заявка уже была рассмотрена')
        }
        const ownerRequest = await Organizer.findByPk(requestToAccredited.idOrganizer)
        await requestToAccredited.update({status: "rejected"})
        await ownerRequest.update({isAccredited: false})
        return ({message: 'Заявка отклонена'})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}

async function getAllPendingRequests() {
    try{
        return await RequestToAccredited.findAll({where: {status: 'pending'}, include: [
                {
                    model: Organizer,
                    as: 'accreditations',
                    attributes: ['id', 'name'],
                }
            ]})
    }catch(err){
        throw ApiError.internal(err.message);
    }
}

module.exports = {
    createRequest,
    applyRequest,
    rejectRequest,
    getAllPendingRequests
}