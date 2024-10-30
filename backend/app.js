import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"


dotenv.config();

const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true
}));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI, {
    dbName: `Algorithm`,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log(e);
});



// Routes
app.use('/', routes);
app.use('/', userRoutes);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening at port : ${process.env.PORT}`);
});
