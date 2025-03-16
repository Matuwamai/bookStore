import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/class.js";

const router = express.Router();

// Define the routes for classes
router.post("/", createClass);
router.get("/", getClasses);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
