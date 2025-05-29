import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createClass = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingClass = await prisma.class.findUnique({
      where: { name },
    });

    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Error creating class" });
  }
};
export const getClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany();

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Error fetching classes" });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await prisma.class.findUnique({
      where: { id: Number(id) },
      include: {
        books: {
          include: {
            subject: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ message: "Error fetching class" });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedClass = await prisma.class.update({
      where: { id: Number(id) },
      data: { name, description },
    });

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Error updating class" });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.class.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Error deleting class" });
  }
};
 