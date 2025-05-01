import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/books.js"
import { upload } from "../middlewares/uploads.js";
const router = express.Router();

router.post("/", upload.single("image"), createBook);
router.get("/", getBooks);
router.get("/:name/details", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
