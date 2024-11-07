import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Define allowed origins (adjust these as needed)
const allowedOrigins = [
    process.env.CLIENT_URL, // Local development URL
    // Add other origins as needed
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);  // Allow request from the origin
        } else {
            console.error(`CORS blocked request from origin: ${origin}`);  // Log blocked requests
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',  // Allow these HTTP methods
    credentials: true  // Enable cookies and credentials
}));

// Handle preflight (OPTIONS) requests explicitly
app.options('*', cors());

app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'Algorithm',  // Ensure the correct DB name is used
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/', routes);
app.use('/', userRoutes);

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port: ${process.env.PORT || 5000}`);
});
