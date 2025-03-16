import express from 'express';
// import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from "cors"
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
