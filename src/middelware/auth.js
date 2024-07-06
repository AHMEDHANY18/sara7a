import jwt from "jsonwebtoken";
import userModel from "../../db/models/user.model.js";

export const auth = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers['token'];
            if (!token) {
                return res.status(400).json({ msg: "Token not found" });
            }

            if (!token.startsWith("ahmed_")) {
                return res.status(400).json({ msg: "Token not valid" });
            }

            const newToken = token.split("ahmed_")[1];
            const decoded = jwt.verify(newToken, "ahmed");
            if (!decoded?.id) {
                return res.status(400).json({ msg: "Invalid payload" });
            }

            const user = await userModel.findById(decoded.id);
            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(400).json({ msg: "Catch error", error });
        }
    };
};
