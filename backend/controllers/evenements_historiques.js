const Evenements_historiques = require('../models/Evenements_historiques');


exports.getEvenementsHistoriques = async (req, res) => {
    try {
      const evenementhisto = await Evenements_historiques.findAll();
      res.json(evenementhisto);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };