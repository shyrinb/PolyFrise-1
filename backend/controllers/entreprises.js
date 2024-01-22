const Entreprises = require('../models/Entreprises');


exports.getEntreprises = async (req, res) => {
    try {
      const entreprises = await Entreprises.findAll();
      res.json(entreprises);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };