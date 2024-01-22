const Domaines = require('../models/Domaines');

exports.getDomaines = async (req, res) => {
    try {
      const domaines = await Domaines.findAll();
      res.json(domaines);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };