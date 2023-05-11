// on crée le serveur web sur le port 3000
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:4200', credentials: true }));

// fichiers à charger pour les routes
const getCategories = require('./model/getCategories');

// routes
app.get('/category', (req, res) => { getCategories(req, res); });

// démarage du serveur
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});