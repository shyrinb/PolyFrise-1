// renvoie un message au format JSON. On a besoin de passer en paramètre
function sendMessage (res, data) {
    res.json ({ status: 'ok', data: data });
}

function sendError (res, reason) {
    res.json ({ status: 'error', data: {reason: reason }});
}

module.exports = { sendMessage, sendError };
