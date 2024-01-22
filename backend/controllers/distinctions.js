const Distinctions = require('../models/Distinctions');



exports.getDistinctions = async (req, res) => {
    try {
      const distinctions = await Distinctions.findAll();
      res.json(distinctions);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };