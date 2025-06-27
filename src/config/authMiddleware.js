import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ "Authentication": "Unauthorized" });
    }

    jwt.verify(token, env(JWT_SECRET_KEY) || "default_secret_key", 
        (err, user) => {
        if (error) {
            return res.status(403).json({ "Authentication": "Forbidden" });
        }
            req.user = user;
            next();
        });
    }