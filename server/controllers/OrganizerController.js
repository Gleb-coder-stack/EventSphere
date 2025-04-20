const getProfile = require('../services/Organizer/getById')
const updateOrganizer = require("../services/Organizer/updateOrganizer");
const deleteUser = require('../functions/common/user/deleteUser')
const registrationOrganizer = require('../services/Organizer/registration')
const validity = require('../functions/validations/validityData')
const { Organizer } = require('../models')
const ApiError = require('../errors/ApiError')
const login = require('../functions/common/user/login')
const checkJwtFunc = require('../functions/common/user/checkJwt')
const {badRequest} = require("../errors/ApiError");
const changePasswordController = require("./universal/changePasswordController");

const nameModel = Organizer

class OrganizerController {
    static async registration(req, res, next){
        const {name, email, password} = req.body
        if(!name || !email ||!password){
            return next(badRequest('Незаполнены поля'))
        }
        const { error } = validity({email, password});
        if(error){
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }
        try{
            const resultRegistration = await registrationOrganizer(name, email, password)
            return res.json(resultRegistration)
        }catch(err){
            next(err)
        }
    }

    static async login (req, res, next){
        const {email, password} = req.body
        if(!email || !password){
            return ApiError.badRequest('Введите данные')
        }
        try{
            const resultLogin = await login(email, password, nameModel, 'email')
            return res.json(resultLogin)
        }catch(err){
            next(err)
        }
    }

    static async getMe(req, res, next){
        const {id} = req.user
        const {nameEvent} = req.query
        try{
            const data = await getProfile(id, nameEvent)
            return res.json(data)
        }catch(err){
            return next(err)
        }
    }

    static async getById(req, res, next){
        const {id} = req.params
        const {nameEvent} = req.query
        try{
            const data = await getProfile(id, nameEvent)
            return res.json(data)
        }catch(err){
            return next(err)
        }
    }

    static async updateMe(req, res, next){
        try{
            const result = await updateOrganizer(req)
            return res.json(result)
        }catch(err){
            next(err)
        }
    }

    static async deleteMe (req, res, next){
            const {id, role} = req.user;
            try{
                const result = await deleteUser(id, role)
                return res.json(result)
            }catch(err){
                return next(err)
            }
    }

    static async checkJwt(req, res, next){
            const {id, versionJwt} = req.body;
            try{
                const result = await checkJwtFunc(id, versionJwt, nameModel);
                return res.json(result);
            }catch(err){
                next(err);
            }
    }

    static async changeMyPassword(req, res, next){
        await changePasswordController(req, res, next);
    }
}

module.exports = OrganizerController