const config = require('../config');
const db = require('../helper/mysqlConnect');

function getCategories() {
    const query = `
        SELECT * FROM ${config.mysqlCategory}`;
    const data = [];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getCategories = getCategories; // on exporte la fonction