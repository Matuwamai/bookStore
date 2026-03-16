import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controllers/books.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads" });

router.post("/", upload.array("images", 5), createBook);
router.get("/", getBooks);
router.get("/:name/details", getBookById);
router.put("/:id", updateBook);
router.get("/search", searchBooks);
router.delete("/:id", deleteBook);

export default router;
