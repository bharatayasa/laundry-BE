function checkRole(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (allowedRoles.includes(userRole)) {
            return next();
        } else {
            return res.status(403).json({ 
                status: 'error', 
                message: 'Access Denied' 
            });
        }
    };
}

module.exports = checkRole;
