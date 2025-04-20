const express = require('express')
const router = express.Router()
const participantRouter = require('./ParticipantRoute')
const organizerRouter = require('./OrganizerRoute')
const tagRouter = require('./TagRoute')
const inviteRouter = require('./InviteRoute')
const recallRouter = require('./RecallRoute')
const moderatorRouter = require('./ModeratorRoute')
const friendRouter = require('./FriendRoute')
const eventRouter = require('./EventRoute')
const requestRouter = require('./RequestRoute')

router.use('/participant', participantRouter)
router.use('/organizer', organizerRouter)
router.use('/event', eventRouter)
router.use('/friends', friendRouter)
router.use('/moderator', moderatorRouter)
router.use('/invite-to-event', inviteRouter)
router.use('/recall', recallRouter)
router.use('/tag', tagRouter)
router.use('/request-accredited', requestRouter)

module.exports = router

