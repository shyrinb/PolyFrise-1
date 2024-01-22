const Generation_informatique = require('../models/Generation_informatique');


exports.getGenerationsInformatique =  async (req, res) => {
    try {
      const geninfo = await Generation_informatique.findAll();
      res.json(geninfo);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };
  