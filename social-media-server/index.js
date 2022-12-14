import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './server/database/connection.cjs';
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';
import UploadRoute from './routes/UploadRoute.js';

const app = express();

//serve images to the public
app.use(express.static('public'))
app.use('/images', express.static('images'))

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 3000

//middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB()

// const connectDB = require('./server/database/connection.cjs')
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})

//routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);