const { v4: uuidv4 } = require('uuid');
const Submission = require('../models/Submission');

exports.create = (req, res, next) => {
    console.request(req, `Create submission`);

    const { submission_type, submitted_by, submission_data } = req.body;

    // Validate request body
    if (!submission_type || !submitted_by || !submission_data) {
        return res.status(400).json({ error: 'ValidationError', message: 'Missing required fields' });
    }

    const id = uuidv4();

    // Create submission
    Submission.create({
        id: id,
        submission_type: submission_type,
        submitted_by: submitted_by,
        submission_data: submission_data,
        status: 'pending'
    }).then((submission) => {
        console.log(`Submission [${id}] created`);
        res.status(200).json(submission);
    }).catch((error) => {
        console.error('Create submission failed', error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
};

exports.update = (req, res, next) => {
    console.request(req, `Update submission`);

    const { submission_id, submission_data } = req.body;

    // Validate request body
    if (!submission_id || !submission_data) {
        return res.status(400).json({ error: 'ValidationError', message: 'Missing required fields' });
    }

    // Update submission
    Submission.update({
        submission_data: submission_data,
        status: 'pending'
    }, {
        where: { id: submission_id }
    }).then((rowsUpdated) => {
        if (rowsUpdated > 0) {
            console.log(`Submission [${submission_id}] updated`);
            res.status(200).end();
        } else {
            res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
        }
    }).catch((error) => {
        console.error(`Update submission failed`, error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
};

exports.delete = (req, res, next) => {
    console.request(req, `Delete submission`);

    const { submission_id } = req.body;

    // Validate request body
    if (!submission_id) {
        return res.status(400).json({ error: 'ValidationError', message: 'Missing required field: submission_id' });
    }

    // Delete submission
    Submission.destroy({
        where: { id: submission_id }
    }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            console.log(`Submission [${submission_id}] deleted`);
            res.status(200).end();
        } else {
          res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
        }
    }).catch((error) => {
        console.error(`Delete submission failed`, error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
};
