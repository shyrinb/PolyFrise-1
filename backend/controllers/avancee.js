const Avancees = require('../models/Avancees');

exports.getAvancees = async (req, res) => {
    try {
      const avancees = await Avancees.findAll();
      res.json(avancees);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };