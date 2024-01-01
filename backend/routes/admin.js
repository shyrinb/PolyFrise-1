const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Définissez la route principale pour la redirection
//router.get('/admin', (req, res) => {
    // Vérifiez si l'utilisateur est connecté (variable de session)
    //if (req.session.isLoggedIn) {
        // Utilisateur connecté, redirigez-le vers la page d'accueil
       // res.redirect('/connexion');
  //  } else {
        // Utilisateur non connecté, laissez-le sur la page principale
      //  res.redirect('/inscription');
   // }
//});

router.post('/connexion', userCtrl.login);
router.post('/inscription', userCtrl.signup);
router.post('/deconnexion', userCtrl.deconnexion);

module.exports = router;