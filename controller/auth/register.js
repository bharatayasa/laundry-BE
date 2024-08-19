const bcrypt = require('bcrypt');
const connection = require('../../config/db');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    register: async (req, res) => {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ 
                message: 'Username, password, and role are required.' 
            });
        }

        try {
            const checkUserQuery = 'SELECT * FROM User WHERE username = ?';
            const [existingUser] = await new Promise((resolve, reject) => {
                connection.query(checkUserQuery, [username], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            if (existingUser) {
                return res.status(409).json({ 
                    message: 'Username already exists' 
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertUserQuery = 'INSERT INTO User (username, password, role) VALUES (?, ?, ?)';
            await new Promise((resolve, reject) => {
                connection.query(insertUserQuery, [username, hashedPassword, role], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
    }
}