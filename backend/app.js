import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.app.set('socketio', io);
  next();
});

const PORT = 3001
server.listen(PORT, () => {
  console.log(`socket server is running on port ${PORT}`);
});

io.on('connection',(socket)=>{
  console.log('A client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

export default io;

// Middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Define allowed origins (adjust these as needed)
const allowedOrigins = [process.env.CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request from the origin
      } else {
        console.error(`CORS blocked request from origin: ${origin}`); // Log blocked requests
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow these HTTP methods
    credentials: true, // Enable cookies and credentials
  })
);

// Handle preflight (OPTIONS) requests explicitly
app.options("*", cors());

app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Algorithm", // Ensure the correct DB name is used
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/", routes);
app.use("/", userRoutes);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port: ${process.env.PORT || 5000}`);
});
