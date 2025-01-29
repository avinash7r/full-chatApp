import jwt from 'jsonwebtoken';

export const createToken = (userID, res) => {
    try {
        const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn:'1d'});
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return token;
    } catch (error) {
        console.error(`Token Generation Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to generate token' });
        return null;
    }
};