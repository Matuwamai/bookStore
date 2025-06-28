import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createDiscount = async (req, res) => {
  try {
    const { amount, type, userId, bookId, validUntil } = req.body;

    if (type === "USER" && !userId) {
      return res.status(400).json({ message: "User ID is required for user discounts" });
    }

    if (type === "BOOK" && !bookId) {
      return res.status(400).json({ message: "Book ID is required for book discounts" });
    }
    // Create the discount
    const discount = await prisma.discount.create({
      data: {
        amount,
        type,
        validUntil: new Date(validUntil),
        userId: type === "USER" ? userId : null,
        bookId: type === "BOOK" ? bookId : null,
      },
    });

    res.status(201).json(discount);
  } catch (error) {
    console.error("Error creating discount:", error);
    res.status(500).json({ message: "Error creating discount" });
  }
};

// Get all discounts
export const getDiscounts = async (req, res) => {
  try {
    const discounts = await prisma.discount.findMany({
      include: {
        user: true,
        book: true,
      },
    });
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({ message: "Error fetching discounts" });
  }
};

// Get discounts for a user
export const getUserDiscounts = async (req, res) => {
  try {
    const { userId } = req.params; 

    const discounts = await prisma.discount.findMany({
      where: {
        userId: Number(userId), 
        validUntil: { gte: new Date() }, 
      },
    });

    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error fetching user discounts:", error);
    res.status(500).json({ message: "Error fetching user discounts" });
  }
};
// Get discounts for a book
export const getBookDiscounts = async (req, res) => {
  try {
    const { bookId } = req.params;
    const discounts = await prisma.discount.findMany({
      where: {
        bookId: Number(bookId),
        validUntil: { gte: new Date() }, 
      },
    });
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error fetching book discounts:", error);
    res.status(500).json({ message: "Error fetching book discounts" });
  }
};

// Delete a discount
export const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.discount.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    console.error("Error deleting discount:", error);
    res.status(500).json({ message: "Error deleting discount" });
  }
};
