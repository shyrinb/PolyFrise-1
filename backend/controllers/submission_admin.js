const { v4: uuidv4 } = require('uuid');
const Submission = require('../models/Submission');
const Category = require('../models/Category');
const Event = require('../models/Event');

// Get all submissions
exports.getAll = async (req, res, next) => {
    console.request(req, `GetAll submission`);

    try {
        const submissions = await Submission.findAll({
            order: [['created_at', 'DESC']],
            include: [{
                model: Category,
                as: 'categories',
                through: { attributes: [] },
                attributes: ['id']
            }, {
                model: Event,
                as: 'event'
            }]
        });

        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    }
};

// Admin review of submissions
exports.adminReview = async (req, res, next) => {
    console.request(req, `Admin Review submission`);

    const requiredFields = ['ids', 'status'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
        }
    }

    const { ids, status } = req.body;
    const fail = [];

    for (const submissionId of ids) {
        try {
            const submission = await Submission.findByPk(submissionId, {
                include: [{
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] },
                    attributes: ['id']
                }, {
                    model: Event,
                    as: 'event'
                }]
            });

            if (!submission) {
                console.error(`submission ${submissionId} doesn't exist`);
                fail.push(submissionId);
                continue; // Skip to the next iteration
            }

            if (status === 'approved') {
                await processApproval(submission);
            } else if (status === 'rejected') {
                await processRejection(submission);
            } else {
                console.error(`Invalid status for admin review: ${status}`);
                fail.push(submissionId);
            }
        } catch (error) {
            console.error(`Failed to process submission ${submissionId}`, error);
            fail.push(submissionId);
        }
    }

    if (fail.length !== 0) {
        res.status(500).json({ error: "ServerError", message: `Erreur BDD on submission ${fail}` });
    } else {
        res.status(200).json();
    }
};

// Helper function to process approved submissions
async function processApproval(submission) {
    // Implement the necessary logic for approved submissions, e.g., updating the database
    await submission.destroy(); // Remove the submission after processing
}

// Helper function to process rejected submissions
async function processRejection(submission) {
    // Implement the necessary logic for rejected submissions, e.g., updating the database
    await submission.destroy(); // Remove the submission after processing
}
