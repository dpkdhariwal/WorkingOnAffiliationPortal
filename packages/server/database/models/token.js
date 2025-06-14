import { conn } from '../db.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { pKeyPath } from '../../common/common.js';
const privateKey = fs.readFileSync(pKeyPath, 'utf8');



// Middleware function for JWT token authentication
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        jwt.verify(authHeader, privateKey, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = decodedToken;
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        // Authorization header is missing
        return res.status(401).json({ error: 'Authorization header missing' });
    }
};


