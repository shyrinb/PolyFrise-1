// on crée le serveur web sur le port 3000
const express = require ('express');
const app = express ();
const port = process.env.PORT || 3000;

const bodyParser = require ('body-parser');
app.use(bodyParser.json());

const cors = require ('cors');
app.use(cors({origin: 'http://127.0.0.1:4200', credentials: true}));

// fichiers à charger pour les routes
const getCours1 = require ('./model/getCours1');
const getCours2 = require ('./model/getCours2');

// routes
app.post ('/getCours1', (req, res) => { getCours1(req,res); });
app.post ('/getcours2', (req, res) => { getCours2(req,res); });

// démarage du serveur
app.listen(port, () => {
    console.log (`listening on port ${port}`)
});
