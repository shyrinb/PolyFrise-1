const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.AUTH_KEY}`);
        const login = decodedToken.login;
        req.auth = { login }
        next()
    } catch {
        console.request(req, ``)

        console.error('invalide authentification token')
        res.status(401).json({
            error: "ErrAuth",
            message: `Bad Autentification`
        });
    }
};