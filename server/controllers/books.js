import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBook = async (req, res) => {
  try {
    const { title, author, price, stock, imageUrl, description, wholesale, classId, subjectId } = req.body;

    // Validate classId and subjectId
    const classExists = await prisma.class.findUnique({
      where: { id: Number(classId) },
    });

    const subjectExists = await prisma.subject.findUnique({
      where: { id: Number(subjectId) },
    });

    if (!classExists || !subjectExists) {
      return res.status(400).json({ message: "Invalid classId or subjectId" });
    }

    const existingBook = await prisma.book.findFirst({
      where: { title },
    });

    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    // Create the book
    const book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        stock,
        wholesale,
        description,
        imageUrl,
        classId: Number(classId),
        subjectId: Number(subjectId)
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book" });
  }
};
export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        class: true,
        subject: true,
      },
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { name } = req.params;
    
    const book = await prisma.book.findUnique({
      where: { title: name },
      include: { class: true, subject: true },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Error fetching book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, stock, wholesale, classId, subjectId } = req.body;

    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author, price, stock, wholesale, classId, subjectId },
    });

    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.book.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book" });
  }
};
