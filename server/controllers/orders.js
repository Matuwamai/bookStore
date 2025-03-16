import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Create an Order
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    let totalAmount = 0;

    // Fetch all books and calculate the total price
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const book = await prisma.book.findUnique({
          where: { id: item.bookId },
          select: { price: true },
        });

        if (!book) {
          throw new Error(`Book with ID ${item.bookId} not found`);
        }

        // Check for any applicable discount
        const discount = await prisma.discount.findFirst({
          where: {
            bookId: item.bookId,
            OR: [{ userId }, { userId: null }], // User-specific or general book discount
            validUntil: { gte: new Date() },
          },
          orderBy: { amount: "desc" }, // Apply the highest discount
        });

        let discountedPrice = book.price;
        if (discount) {
          discountedPrice -= discount.amount;
        }
        if (discountedPrice < 0) discountedPrice = 0;

        totalAmount += discountedPrice * item.quantity;

        return {
          bookId: item.bookId,
          quantity: item.quantity,
        };
      })
    );

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        total: totalAmount,
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// ✅ Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: { include: { book: true } },
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// ✅ Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        items: { include: { book: true } },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      // First, delete related order items
      await prisma.orderItem.deleteMany({
        where: { orderId: Number(id) },
      });
  
      // Then, delete the order
      await prisma.order.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Error deleting order", error: error.message });
    }
  };
  