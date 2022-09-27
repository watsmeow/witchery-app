import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({path: '../config.env'})

const authMiddleware = async (req, res, next) => {
    console.log("WERE IN THE MIDDLEWARE")
    const secret = process.env.JWT_KEY
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        if (token) {
            const decoded = jwt.verify(token, secret);
            console.log(decoded)
            req.body._id = decoded?.id;
        }
        next();
    } catch (error) {
        console.log(error)
    }
};

export default authMiddleware;