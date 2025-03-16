import express from "express";
import { createOrder, getOrders, getUserOrders, deleteOrder } from "../controllers/orders.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:userId", getUserOrders);
router.delete("/:id", deleteOrder);

export default router;
