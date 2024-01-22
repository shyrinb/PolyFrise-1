const Programmes = require('../models/Programmes');


exports.getProgrammes = async (req, res) => {
    try {
      const programmes = await Programmes.findAll();
      res.json(programmes);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };