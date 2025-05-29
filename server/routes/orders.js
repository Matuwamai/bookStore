import express from "express";
import { createOrder, getOrders, getUserOrders, deleteOrder , getOrderById, updateOrderDeliveryDetails} from "../controllers/orders.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:userId", getUserOrders);
router.get("/order/:id", getOrderById);
router.delete("/:id", deleteOrder);
router.patch("/update/:id", updateOrderDeliveryDetails);

export default router;

