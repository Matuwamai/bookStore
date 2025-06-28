import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

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

export const getSubjects = async (req, res) => {
  const {search, page ,limit} = req.query;
  const currentPage = parseInt(page)|| 1 ;
  const pageSize = parseInt(limit)|| 10;
  const skip =( currentPage - 1)*pageSize;
  try {
    const subjects = await prisma.subject.findMany({
      where:{
        OR:[
          {name: {contains:search}}
        ]
      }, 
      skip,
      take : pageSize
    });

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Error fetching subjects" });
  }
};


export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await prisma.subject.findUnique({
      where: { id: Number(id) },
      include: {
        books: {
          include: {
            class: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const formattedSubject = {
      ...subject,
      books: subject.books.map(book => ({
        id: book.id,
        title: book.title,
        imageUrl: book.imageUrl,
        class: {
          name: book.class?.name,
        },
      })),
    };

    res.status(200).json(formattedSubject);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Error fetching subject" });
  }
};


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
