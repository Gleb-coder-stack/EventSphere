const checkEvent = require("../../functions/common/fields/checkRecord");
const { Event, EventsMedia } = require("../../models");
const ApiError = require("../../errors/ApiError");
const loadFile = require("../../functions/loadFile");

module.exports = async function (idEvent, files) {
    console.log(files)
    if (!files || (Array.isArray(files) && files.length === 0)) {
        throw ApiError.badRequest("Файлы не переданы");
    }

    try {
        const checkResult = await checkEvent(idEvent, Event);
        if (!checkResult) {
            throw ApiError.badRequest("Событие не найдено");
        }

        const fileArray = Array.isArray(files)
            ? files
            : typeof files === 'object' && files !== null
                ? Object.values(files)
                : [files];

        let addResult = [];
        for (const file of fileArray) {
            const resultUpload = await loadFile(file, idEvent);
            addResult.push(resultUpload);
        }

        if (addResult.length > 0) {
            await EventsMedia.bulkCreate(addResult);
        }

        return ({ message: 'Файлы успешно загружены' });
    } catch (err) {
        throw ApiError.internal(err.message);
    }
}
