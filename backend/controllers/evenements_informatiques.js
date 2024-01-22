const Evenements_informatiques = require('../models/Evenements_informatiques');


exports.getEvenementsInformatiques =async (req, res) => {
    try {
      const evenementsinfo = await Evenements_informatiques.findAll();
      res.json(evenementsinfo);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };