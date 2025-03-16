import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import userRoutes from "./routes/user.js";
import bookRoutes from "./routes/book.js";
import classRoutes from "./routes/class.js";



dotenv.config();

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/classes", classRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
