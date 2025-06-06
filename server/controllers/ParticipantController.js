const {badRequest, internal} = require("../errors/ApiError");
const validity = require('../functions/validations/validityData')
const {Participant} = require("../models");
const updateParticipant = require("../services/Participant/updateParticipant");
const deleteUser = require('../functions/common/user/deleteUser')
const RegistrationParticipant = require('../services/Participant/registration')
const login = require('../functions/common/user/login')
const checkJwtFunc = require('../functions/common/user/checkJwt')
const getParticipantById = require("../services/Participant/getById")
const getMeFunc = require("../services/Participant/getMe")
const changePasswordController = require("./universal/changePasswordController");
const changeConfidential = require("../services/Participant/changeConfedencial");

const nameModel = Participant;

class ParticipantController {
    static async register(req, res, next) {
        const { nickname, email, password } = req.body;
        if(!nickname || !email || !password) {
            return next(badRequest('Незаполнены поля'))
        }
        const { error } = validity({email, password});
        if(error){
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }
        try{
            const participant = await RegistrationParticipant(nickname, email, password);
            return res.json(participant);
        }catch(err){
            next(err);
        }
    }

    static async login(req, res, next){
        const {email, password} = req.body;
        if(!email || !password){
            return next(badRequest('Незаполнены поля'))
        }
        try{
            const participant = await login(email, password, nameModel, 'email');
            return res.json(participant);
        }catch(err){
            next(err);
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

    static async getById(req, res, next){
        const {id} = req.params;
        try{
            const result = await getParticipantById(id)
            return res.json(result);
        }catch (err){
            return next(err)
        }
    }

    static async getMe(req, res, next){
        const {id} = req.user
        try{
            const result = await getMeFunc(id)
            return res.json(result)
        }catch(err){
            next(err)
        }
    }

    static async updateMe (req, res, next){
        try{
            const result = await updateParticipant(req)
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

    static async changeMyPassword(req, res, next){
       return await changePasswordController(req, res, next);
    }

    static async changeConfidential(req, res, next){
        try{
            const result = await changeConfidential(req.user)
            return res.json(result)
        }catch (err){
            next(err);
        }
    }
}

module.exports = ParticipantController;

