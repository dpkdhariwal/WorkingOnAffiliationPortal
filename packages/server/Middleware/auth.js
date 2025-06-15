import fs from 'fs';
import jwt from 'jsonwebtoken';
import { pKeyPath } from '../common/common.js';
const publicKey = fs.readFileSync(pKeyPath, 'utf8');
export const authenticate = function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    try {
        const decoded = jwt.verify(token, publicKey);
        req.user = decoded; // Store the decoded user data in the request object
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
