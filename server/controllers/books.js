import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, price, stock, wholesale, classId, subjectId } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        stock,
        wholesale, // true if wholesale, false if retail
        classId, // Ensure classId exists in the database
        subjectId, // Ensure subjectId exists in the database
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book" });
  }
};

// ✅ Get all books
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

// ✅ Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
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

// ✅ Update a book
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

// ✅ Delete a book
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
