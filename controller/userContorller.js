const connection = require('../config/db');
const bcrypt = require('bcrypt');
const moment = require('moment'); 

module.exports = {
    getAllUsers: async (req, res) => {
        const sql = "SELECT * FROM User ORDER BY id_user DESC";

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error); 
                    }
                    resolve(result);
                })
            })

            const formatUser = user.map(use => ({
                id_user: use.id_user,
                username: use.username, 
                role: use.role, 
                created_at: moment(use.created_at).format('DD-MM-YYYY'),
                deleted_at: moment(use.deleted_at).format('DD-MM-YYYY'),
                updated_at: moment(use.updated_at).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                message: "success to get data by Admin", 
                data: formatUser
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'Database error', 
                error: err 
            });
        }
    }, 
    getUsersById: async (req, res) => {
        const sql = "SELECT * FROM User WHERE id_user = ?"
        const id = req.params.id;

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error); 
                    }
                    resolve(result);
                })
            })

            const formatUser = user.map(use => ({
                id_user: use.id_user,
                username: use.username, 
                role: use.role, 
                deleted_at: moment(use.deleted_at).format('DD-MM-YYYY'),
                updated_at: moment(use.updated_at).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                message: "success to get user By Id", 
                data: formatUser
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'Database error', 
                error: err 
            });
        }
    },
    addUser: async (req, res) => {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ 
                message: 'Username, password, and role are required.' 
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = "INSERT INTO User (username, password, role) VALUES (?, ?, ?)";
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, [username, hashedPassword, role], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: "User added successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Database error',
                error: error.message
            });
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const { username, password, role } = req.body;

        try {
            let hashedPassword = null;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const sql = ` UPDATE User SET username = ?, password = ?, role = ? WHERE id_user = ?`;

            const user = await new Promise((resolve, reject) => {
                connection.query(sql, [username, hashedPassword, role, id], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            if (user.affectedRows === 0) {
                return res.status(404).json({ 
                    message: 'User not found' 
                });
            }

            return res.status(200).json({
                message: "User updated successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Database error',
                error: error.message
            });
        }
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;
        const sql = "UPDATE User SET deleted_at = NOW() WHERE id_user = ?"

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(201).json({
                message: "sucess to delete user", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    },
    restoreUser: async (req, res) => {
        const id = req.params.id;
        const sql = "UPDATE User SET deleted_at = NULL WHERE id_user = ?"

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(201).json({
                message: "sucess to restore user", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }
}
