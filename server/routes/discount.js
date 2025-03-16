import express from "express";
import { createDiscount, getDiscounts, getUserDiscounts, getBookDiscounts, deleteDiscount } from "../controllers/discounts.js";

const router = express.Router();

router.post("/", createDiscount);
router.get("/", getDiscounts);
router.get("/user/:userId", getUserDiscounts);
router.get("/book/:bookId", getBookDiscounts);
router.delete("/:id", deleteDiscount);

export default router;
