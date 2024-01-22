
exports.getTimeline= (req, res) => {
    try {
      console.log("getTimeline backend");
      const data = JSON.parse(req.query.data);
  
      const dates = data.date.split(','); // Séparez les dates si elles sont sous forme de liste
      const formattedDates = dates.map(date => new Date(date).toISOString());
  
  
      console.log('Formatted Dates:', formattedDates); // Vérifiez les dates formatées
  
      // Créez un nouvel objet data avec les dates au format années
      const newData = {
        categories: data.categories,
        nom: data.nom,
        dates: formattedDates,
        startDate: data.startDate,
        endDate: data.endDate,
        color: data.color,
        shape: data.shape
      };
      // Ensuite, retournez une réponse avec les données traitées
      res.json({ message: 'Timeline', newData });
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      res.status(500).json({ error: 'Erreur serveur', message: 'Erreur lors du traitement des données' });
    }
  };
