export const superAdminCheck = () => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Forbidden: insufficient rights" });
        }
        next();
    };
};
