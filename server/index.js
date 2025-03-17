import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import userRoutes from "./routes/user.js";
import bookRoutes from "./routes/book.js";
import classRoutes from "./routes/class.js";
import subjectRoutes from "./routes/subjects.js";
import discountRoutes from "./routes/discount.js"
import orderRoutes from "./routes/orders.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/orders", orderRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
