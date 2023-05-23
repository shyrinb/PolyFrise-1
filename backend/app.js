const express = require('express');
const sequelize = require('./database');
const chalk = require('chalk');

const categoryRoutes = require('./routes/category');
const adminRoutes = require('./routes/admin');
const timelineRoutes = require('./routes/timeline');
const submissionRoutes = require('./routes/submission.js');


const cors = require('cors');

require('./utils/log')

const app = express();

app.use(cors());

sequelize.authenticate()
    .then(() => {
        console.log(`Connexion à la base `, chalk.bold(`${process.env.mysqlDatabase}:${process.env.port}`), ` réussie !`)
        sequelize.sync()
            .then(() => console.log(`Tables synchronisées avec succès !`))
            .catch((e) => {
                console.error(`Echec de la synchronisation des tables !`, e)
            });
    })
    .catch((e) => {
        console.error(e)
        console.error(chalk.bold(`Connexion à la base `, chalk.bold(`${process.env.mysqlDatabase}:${process.env.port}`), ` échouée !`))
    });

app.use(express.json());

app.use('/api/category', categoryRoutes);
app.use('/api/connexion', adminRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/submission', submissionRoutes);


module.exports = app;