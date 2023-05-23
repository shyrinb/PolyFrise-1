const chalk = require('chalk');

// configure log
var log = console.log;

console.log = function() {
    var first_parameter = chalk.hex('#3d47ff')(arguments[0]);
    var other_parameters = chalk.hex('#3d47ff')(Array.prototype.slice.call(arguments, 1));

    function formatConsoleDate(date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        return chalk.hex('#f5ac40').bold('[' +
            ((hour < 10) ? '0' + hour : hour) +
            ':' +
            ((minutes < 10) ? '0' + minutes : minutes) +
            ':' +
            ((seconds < 10) ? '0' + seconds : seconds) +
            '] ');
    }

    log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
};

// configure log for error
var error = console.error;

console.error = function() {
    var first_parameter = chalk.hex('#ff4a5f')(arguments[0]);
    var fail = chalk.hex('#ff4a5f').bold('Fail ')
    var other_parameters = chalk.hex('#ff4a5f')(Array.prototype.slice.call(arguments, 1));

    function formatConsoleDate(date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        return chalk.hex('#f5ac40').bold('[' +
            ((hour < 10) ? '0' + hour : hour) +
            ':' +
            ((minutes < 10) ? '0' + minutes : minutes) +
            ':' +
            ((seconds < 10) ? '0' + seconds : seconds) +
            '] ');
    }

    error.apply(console, [formatConsoleDate(new Date()) + fail + first_parameter].concat(other_parameters));
};

// configure log for info
var request = console.log;

/**
 * génère des log pour tracer les requetes reçu par le backend
 * @param {*} req - L'objet requête contenant les informations sur la requête HTTP.
 * @param {*} desc - La description de la requête.
 */
console.request = function(req, desc) {
    var first_parameter = chalk.hex('#a1e1ff')(`\t   ${req.method} ${req.originalUrl}`)
    var desc = chalk.hex('#a1e1ff')(`${desc}\n`)
    var user = chalk.hex('#a1e1ff').bold(`(${req.auth ? req.auth.userId : 'unknown'}) `)
    var other_parameters = Array.prototype.slice.call(arguments, 2)
    other_parameters_string = ""
    for (const i of other_parameters) {
        other_parameters_string += '\n\t\t' + i
    }

    other_parameters_string = chalk.hex('#a1e1ff')(other_parameters_string)
    request.apply(console, [user + desc + first_parameter].concat(other_parameters_string));
};