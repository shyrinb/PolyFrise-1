const { sendError, sendMessage } = require("../helper/message.js");
const categoryQueries = require('../gateway/categoryQueries.js');

async function getCategories(req, res) {
    const categories = await categoryQueries.getCategories();
    sendMessage(res, categories);
}

module.exports = getCategories;