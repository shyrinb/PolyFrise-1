const express = require('express');
const sequelize = require('./database');
const app = express();
const chalk = require('chalk');

// Importez les routes API
const router = require('./routes/apiRoutes');

const cors = require('cors');
require('./utils/log');
// Utilisez CORS middleware
app.use(cors());

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database successful');
        sequelize.sync({ force: false }).then(() => {
            console.log('Sync with the database successful');
           
            // Check for each model and log its creation
            for (const model of Object.keys(sequelize.models)) {
               console.log(`${model} table created.`);
            }
           }).catch(err => {
            console.error('Unable to sync with the database:', err);
           });
    })
    .catch((e) => {
        // Erreur de connexion
        console.error('Unable to connect to the database:', e);
        console.error(chalk.bold(`Connexion à la base `, chalk.bold(`${process.env.mysqlDatabase}:${process.env.bdd_port}`), ` échouée !`));
    });


app.use(express.json());

// Middleware qui s'applique à toutes les routes commençant par "/api"
app.use('/api', (req, res, next) => {
    // Votre logique middleware ici
    console.log('Middleware for /api routes');
    // Passez la main au middleware suivant dans la pile
    next();
});

// Utilisez les routes API
app.use('/api', router);

module.exports = app;