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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                price: true,
              }
            }
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const formattedOrders = orders.map(order => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
      total: Number(order.total),
    }));

    res.status(200).json(formattedOrders);
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
        items: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                price: true,
                class: true,
                subject: true
              }
            }
          },
        },
        delivery:{
          select : {
            id: true,
            driverContact :true,
            driverName :true,
            carRegistration :true,
            scheduledDate: true,
            carrierName: true
          }
        }

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
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching order with ID: ${id} (type: ${typeof id})`);

    const orderId = parseInt(id);
    if (isNaN(orderId)) {
      console.log('Invalid order ID format');
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    console.log(`Querying database for order ID: ${orderId}`);
    
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            book: {
              select: {
                id: true,
                title: true,
                price: true,
                class: true,
                subject: true
              }
            }
          },
        },
        delivery:{
          select : {
            id: true,
            driverContact :true,
            driverName :true,
            carRegistration :true,
            scheduledDate: true,
            carrierName: true
          }
        }
      },
    });
    if (!order) {
      console.log('Order not found in database');
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.items && order.items.length === 0) {
      console.log('Order found but has no items');
    } else {
      console.log(`Order found with ${order.items?.length} items`);
    }

    const formattedOrder = {
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
      total: Number(order.total),
    };

    res.status(200).json(formattedOrder);
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      meta: error.meta
    });
    res.status(500).json({ 
      message: "Error fetching order",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


export const updateOrderDeliveryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carrierName,
      driverName,
      driverContact,
      carRegistration,
      scheduledDate,
      status,
      
    } = req.body;
    if (!carrierName || !driverName || !driverContact || !carRegistration || !scheduledDate) {
      return res.status(400).json({
        message: "All delivery details are required: carrierName, driverName,  scheduledDate"
      });
    }
    const existingOrder = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { delivery: true }
    });

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create or update delivery record
    let delivery;
    if (existingOrder.delivery) {
      delivery = await prisma.delivery.update({
        where: { id: existingOrder.delivery.id },
        data: {
          carrierName,
          driverName,
          driverContact,
          carRegistration,
          scheduledDate: new Date(scheduledDate),
          status: status || existingOrder.delivery.status,
          updatedAt: new Date()
        }
      });
    } else {
      delivery = await prisma.delivery.create({
        data: {
          carrierName,
          driverName,
          driverContact,
          carRegistration,
          scheduledDate: new Date(scheduledDate),
          status: status || 'PENDING',
          order: { connect: { id: Number(id) } }
        }
      });

      // Link delivery to order
      await prisma.order.update({
        where: { id: Number(id) },
        data: { deliveryId: delivery.id }
      });
    }

    // Get full order details for response
    const updatedOrder = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            book: true
          }
        },
        delivery: true
      }
    });
    const responseOrder = {
      ...updatedOrder,
      createdAt: updatedOrder.createdAt.toISOString(),
      updatedAt: updatedOrder.updatedAt.toISOString(),
      delivery: updatedOrder.delivery ? {
        ...updatedOrder.delivery,
        scheduledDate: updatedOrder.delivery.scheduledDate.toISOString(),
        actualDate: updatedOrder.delivery.actualDate?.toISOString(),
        createdAt: updatedOrder.delivery.createdAt.toISOString(),
        updatedAt: updatedOrder.delivery.updatedAt.toISOString()
      } : null
    };

    res.status(200).json({
      message: "Order delivery details updated successfully",
     
    });

  } catch (error) {
    console.error("Error updating delivery details:", error);
    res.status(500).json({
      message: "Failed to update delivery details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};