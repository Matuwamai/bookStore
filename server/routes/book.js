import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
} from "../controllers/books.js"

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:name/details", getBookById);
router.put("/:id", updateBook);
router.get('/search', searchBooks);
router.delete("/:id", deleteBook);

export default router;
