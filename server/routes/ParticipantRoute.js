const Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewares/authRoleMiddleware')
const ParticipantController = require('../controllers/ParticipantController')


router.get('/me', authMiddleware(['participant']), ParticipantController.getMe)
router.get('/:id', ParticipantController.getById)

router.post('/registration', ParticipantController.register)
router.post('/login', ParticipantController.login)
router.post('/checkJwt', ParticipantController.checkJwt)

router.put('/update', authMiddleware(['participant']), ParticipantController.updateMe)
router.put('/change-password', authMiddleware(['participant']), ParticipantController.changeMyPassword)
router.put('/change-confidential', authMiddleware(['participant']), ParticipantController.changeConfidential)


router.delete('/delete', authMiddleware(['participant']), ParticipantController.deleteMe)

module.exports = router