import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from '../routes/routes.js';
import cookieParser from "cookie-parser"
import userRoutes from "../routes/userRoutes.js"
import serverless from 'serverless-http'


dotenv.config();

const app = express();


// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const allowedOrigins = [
    `${process.env.CLIENT_URL}`
    // Add other origins as needed
];

app.use(cors({
    origin: (origin, callback) => {
        // Check if the incoming origin is in the allowedOrigins array or if there is no origin (for non-browser requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
app.use('/.netlify/functions/app', routes);
app.use('/.netlify/functions/app', userRoutes);
module.exports.handler = serverless(app);

// app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server is listening at port : ${process.env.PORT}`);
// });
