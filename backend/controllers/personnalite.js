const Personnalite = require('../models/Personnalite');


exports.getPersonnalites = async (req, res) => {
    try {
      const personnalites = await Personnalite.findAll();
      res.json(personnalites);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };
  