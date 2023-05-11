const config = {
    // paramètres de connexion à la base de données
    mysqlHost: 'containers-us-west-125.railway.app',
    mysqlDatabase: 'railway',
    charset: 'utf8',
    mysqlLogin: 'root',
    mysqlPassword: 'und7D4yMse7XJHEPcEw8',
    port: 5549,

    // les noms des tables
    mysqlCategory: 'category'
};

// on exporte la config. En l'exportant comme ci-dessous, on pourra utiliser la
module.exports = config;