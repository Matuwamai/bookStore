import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/books.js"

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:name/details", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
