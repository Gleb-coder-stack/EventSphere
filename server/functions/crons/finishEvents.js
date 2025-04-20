const cron = require('node-cron');
const { Event } = require('../../models');
const { Op } = require('sequelize');

cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const expired = await Event.findAll({
        where: {
            dateEnd: { [Op.lt]: now },
            status: 'active',
        }
    });

    for (const event of expired) {
        event.status = 'finished';
        await event.save();
    }

    if (expired.length > 0) {
        console.log(`Завершено событий: ${expired.length}`);
    }
});