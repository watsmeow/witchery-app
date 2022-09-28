import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({path: '../config.env'})

const authMiddleware = async (req, res, next) => {
    const secret = process.env.JWT_KEY
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        if (token) {
            const decoded = jwt.verify(token, secret);
            console.log("AUTHMIDDLEWARE DECODED", decoded)
            req.body._id = decoded?.id;
        }
        console.log("UTHMIDDLEWARE TOKEN", token)
        next();
    } catch (error) {
        console.log(error)
    }
};

export default authMiddleware;