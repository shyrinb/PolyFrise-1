const Category = require('../models/Category');

exports.getCategory = async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };
  