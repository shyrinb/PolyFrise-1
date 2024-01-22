const { v4: uuidv4 } = require('uuid');
const Submission = require('../models/Submission');

exports.getSubmissions = async (req, res) => {
    try {
      const submissions = await Submission.findAll();
      res.json(submissions);
    } catch (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };

  exports.createSubmission = async (req, res, next) => {
  
    const selectedCategories = req.body.category;
    try {
      // Create submission
      newData={
        submission_type: req.body.submission_type,
        submitted_by: req.body.submitted_by,
        submission_data: req.body.submission_data,
        status: 'pending',
        timestamp: req.body.timestamp
      }
        
      const newDataInstance = Submission.build(newData);
  
      // Insérez les données dans la base de données
      await newDataInstance.save();
  
      res.json({ success: true, message: 'Données insérées avec succès' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  };
  
  exports.validateSubmission = (req, res, next) => {  
    
    const { ids } = req.body;
  
    // Update submission
    Submission.update({
        status: 'approved'
    }, {
        where: { id: ids }
    }).then((rowsUpdated) => {
        if (rowsUpdated > 0) {
            console.log(`Submission [${ids}] updated`);
            res.status(200).end();
        } else {
            res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
        }
    }).catch((error) => {
        console.error(`Update submission failed`, error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
  };
  
  exports.ignoreSubmission = (req, res, next) => {
  
    const { ids } = req.body;
  
    // Update submission
    Submission.update({
        status: 'rejected'
    }, {
        where: { id: ids }
    }).then((rowsUpdated) => {
        if (rowsUpdated > 0) {
            console.log(`Submission [${ids}] updated`);
            res.status(200).end();
        } else {
            res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
        }
    }).catch((error) => {
        console.error(`Update submission failed`, error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
  };
  
  exports.deleteSubmission = (req, res, next) => {
    const { ids } = req.body;
  
    console.log("cote backend",ids);
    // Delete submission
    Submission.destroy({
        where: { id: ids }
    }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            console.log(`Submission [${ids}] deleted`);
            res.status(200).end();
        } else {
          res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
        }
    }).catch((error) => {
        console.error(`Delete submission failed`, error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
  };
  