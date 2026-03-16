import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      stock,
      description,
      wholesale,
      classId,
      subjectId,
    } = req.body;

    // Parse string values to appropriate types
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    const parsedClassId = parseInt(classId, 10);
    const parsedSubjectId = parseInt(subjectId, 10);
    const parsedWholesale = wholesale === "true" || wholesale === true;

    const classExists = await prisma.class.findUnique({
      where: { id: parsedClassId },
    });

    const subjectExists = await prisma.subject.findUnique({
      where: { id: parsedSubjectId },
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

    let imageUrl = "";
    if (req.files && req.files.length > 0) {
      imageUrl = `${req.protocol}://${req.get("host")}/${req.files[0].path.replace(/\\/g, "/")}`;
    }

    // Create the book with parsed values
    const book = await prisma.book.create({
      data: {
        title,
        author,
        price: parsedPrice,
        stock: parsedStock,
        wholesale: parsedWholesale,
        description,
        imageUrl,
        classId: parsedClassId,
        subjectId: parsedSubjectId,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book" });
  }
};
// const BASE_URL = "http://localhost:5000/bookstore/";

// Update attachImageUrl to handle both single imageUrl and images array
const attachImageUrl = (book) => {
  // If book has images array (from relation)
  if (book.images && Array.isArray(book.images)) {
    return {
      ...book,
      images: book.images.map((img) => ({
        ...img,
        url: `${img.url.startsWith("/") ? "" : "/"}${img.url}`,
      })),
    };
  }

  // If book has single imageUrl string
  if (book.imageUrl) {
    return {
      ...book,
      imageUrl: `${book.imageUrl}`,
    };
  }

  // Return book as is if no images
  return book;
};

export const getBooks = async (req, res) => {
  const { search, page, limit } = req.query;
  const currentPage = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    // Fix: await the count
    const totalBooks = await prisma.book.count();

    const books = await prisma.book.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { author: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      include: {
        class: true,
        subject: true,
        // Include images if you have the relation
        // images: true,
      },
      skip,
      take: pageSize,
    });

    const bookWithUrl = books.map(attachImageUrl);
    return res
      .status(200)
      .json({ totalBooks, pageSize, currentPage, books: bookWithUrl });
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
      include: {
        class: true,
        subject: true,
        // images: true, // Uncomment if you have images relation
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const bookWithUrl = attachImageUrl(book);
    res.status(200).json(bookWithUrl);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Error fetching book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, stock, wholesale, classId, subjectId } =
      req.body;

    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        price: parseFloat(price),
        stock: parseInt(stock),
        wholesale: wholesale === "true" || wholesale === true,
        classId: parseInt(classId),
        subjectId: parseInt(subjectId),
      },
      include: {
        class: true,
        subject: true,
        // images: true, // Uncomment if you have images relation
      },
    });

    const bookWithUrl = attachImageUrl(book);
    res.status(200).json(bookWithUrl);
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

export const searchBooks = async (req, res) => {
  const { query, classId, subjectId } = req.query;

  try {
    const where = {};

    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (classId) where.classId = Number(classId);
    if (subjectId) where.subjectId = Number(subjectId);

    const books = await prisma.book.findMany({
      where,
      include: {
        class: true,
        subject: true,
        // images: true, // Uncomment if you have images relation
      },
    });

    const booksWithUrl = books.map(attachImageUrl);
    res.json(booksWithUrl);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Error searching books" });
  }
};
