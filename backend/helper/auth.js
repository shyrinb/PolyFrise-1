const { sendError, sendMessage } = require("./message");
const queries = require('../gateway/exQueries');

// L'idée de ce fichier est de réaliser toute l'authentification. Pour
// l'instant, le temps de tester vos fonctions getCours, getTopics, etc,
// le fichier va rester relativement vide, à l'exception de getSession
// qui renverra un objet JavaScript contenant uniquement un champ codé en
// dur avec l'ID de l'utilisateur qui a fait la requête. Cet ID vous
// servira notamment pour vos requêtes mySQL.
function getSession(req) {
    return { userId: 1 };
}
module.exports.getSession = getSession;


function setSessionCookie(req, res, session) {}
module.exports.setSessionCookie = setSessionCookie;


function getUserId(session) {
    if (typeof session.userId === 'undefined') return -1;
    return session.userId;
}
module.exports.getUserId = getUserId;