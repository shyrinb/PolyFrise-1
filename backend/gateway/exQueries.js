// Ici, on se connecte à la base de données. Ainsi, on pourra utiliser
const config = require('../config');
const db = require('../helper/mysqlConnect');

// Chaque requête correspond à une fonction qui renverra ce que l'on appelle
// une Promise (promesse). Une promesse est un objet qui contient une
// fonction (dont on sait qu'elle sera exécutée dans le futur). La promesse
// est renvoyée avant que la fonction ne soit exécutée (fonctionnement donc
// asynchrone). Quand la fonction a été exécutée, la callback appelle la
// fonction resolve qui indique à la promesse qu'elle peut renvoyer la
// réponse en question. Dans le fichier getCours1.js, les lignes 64 et 65
// (celles avec les await) récupèrent ces Promises. L'opérateur await attend
// alors que la promesse soit résolue (resolve) et récupère alors la
// réponse. Ainsi, même si tout ce fonctionnement est asynchrone, la variable
// idsPetitsCours de la ligne 64 du fichier getCours1.js récupérera le
// résultat de la requête mysql quand celui-ci aura été renvoyé par le
// serveur MySQL.
function getIdsPetitsCours(maxId) {
    const query = `
        SELECT id FROM ${config.mysqlCourses}
        WHERE nbEtuds <= 45 AND id <= ?`;
    const data = [maxId];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getIdsPetitsCours = getIdsPetitsCours; // on exporte la fonction


function getNomsPetitsCours(idsPetitsCours) {
    let query = `
        SELECT nom FROM ${config.mysqlCourses} 
        WHERE id IN (${idsPetitsCours.map((objId) => '?').join(',')})`;
    const data = idsPetitsCours.map((objId) => objId.id);

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getNomsPetitsCours = getNomsPetitsCours;