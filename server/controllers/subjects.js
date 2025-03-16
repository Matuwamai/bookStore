import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if subject already exists
    const existingSubject = await prisma.subject.findUnique({
      where: { name },
    });

    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(newSubject);
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Error creating subject" });
  }
};

// ✅ Get all subjects
export const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

// ✅ Get a single subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subject = await prisma.subject.findUnique({
      where: { id: Number(id) },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Error fetching subject" });
  }
};

// ✅ Update a subject
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedSubject = await prisma.subject.update({
      where: { id: Number(id) },
      data: { name, description },
    });

    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ message: "Error updating subject" });
  }
};

// ✅ Delete a subject
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.subject.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Error deleting subject" });
  }
};
