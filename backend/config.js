const config = {
    // paramètres de connexion à la base de données
    mysqlHost:     'localhost',
    mysqlDatabase: 'Polyfrise',
    charset:       'utf8',
    mysqlLogin:    'root',
    mysqlPassword: 'root',

    // les noms des tables
    mysqlCourses:    'coursesDemo'
};

// on exporte la config. En l'exportant comme ci-dessous, on pourra utiliser la
module.exports = config;

