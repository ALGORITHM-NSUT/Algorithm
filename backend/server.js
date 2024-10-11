import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI, {
    dbName: `Algorithm`
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log(e);
});

// Routes
app.use('/', formRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening at port : ${process.env.PORT}`);
});
