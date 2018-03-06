const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(" ")[1];
        console.log(req.body.token);
        const decoded = jwt.verify(req.body.token, 'inspireu');

        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
