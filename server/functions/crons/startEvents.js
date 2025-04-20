const cron = require('node-cron');
const { Event } = require('../../models');
const { Op } = require('sequelize');

cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const expired = await Event.findAll({
        where: {
            dateStart: { [Op.lt]: now },
            status: 'planned',
        }
    });

    for (const event of expired) {
        event.status = 'active';
        await event.save();
    }

    if (expired.length > 0) {
        console.log(`Стартовало: ${expired.length} события(ий)`);
    }
});