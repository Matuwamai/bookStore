import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createOrder = async (req, res) => {
  try {
    const { userId, items, deliveryLocation, deliveryContact, deliveryNotes } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item" });
    }

    if (!deliveryLocation || !deliveryContact) {
      return res.status(400).json({ message: "Delivery location and contact are required" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Process each item and calculate total
    for (const item of items) {
      const book = await prisma.book.findUnique({
        where: { id: item.bookId },
        select: { price: true }
      });

      if (!book) {
        return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });
      }

      // Check for discounts
      const discount = await prisma.discount.findFirst({
        where: {
          bookId: item.bookId,
          OR: [{ userId }, { userId: null }],
          validUntil: { gte: new Date() }
        },
        orderBy: { amount: "desc" }
      });

      let price = book.price;
      if (discount) {
        price -= discount.amount;
        if (price < 0) price = 0;
      }

      totalAmount += price * item.quantity;
      orderItems.push({
        bookId: item.bookId,
        quantity: item.quantity,
        price: price
      });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        user: {
          connect: { id: userId }
        },
        total: totalAmount,
        deliveryLocation,
        deliveryContact,
        deliveryNotes,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ 
      message: "Error creating order",
      error: error.message 
    });
  }
};


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
  