import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    // 1. Get all statistics in parallel for better performance
    const [
      totalStock,
      totalOrders,
      salesData,
      stockBySubject,
      stockByClass,
      monthlySales,
      recentOrders
    ] = await Promise.all([
      prisma.book.aggregate({
        _sum: { stock: true },
      }),
      prisma.order.count(),
      prisma.orderItem.findMany({
        where: {
          order: {
            delivery: {
              NOT: { status: 'PENDING' },
            },
          },
        },
        select: { price: true, quantity: true },
      }),
      prisma.book.groupBy({
        by: ['subjectId'],
        _sum: { stock: true },
        orderBy: { _sum: { stock: 'desc' } },
        take: 5,
      }),
      
      // 1.5 Stock by Class
      prisma.book.groupBy({
        by: ['classId'],
        _sum: { stock: true },
        orderBy: { _sum: { stock: 'desc' } },
        take: 5,
      }),
      
      // 1.6 Monthly sales data (last 6 months)
      getMonthlySalesData(),
      
      // 1.7 Recent orders (last 5)
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              book: {
                include: {
                  subject: true,
                  class: true,
                },
              },
            },
          },
          delivery: true,
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ]);

    // 2. Enhance stock by subject with subject names
    const stockBySubjectWithNames = await Promise.all(
      stockBySubject.map(async (item) => {
        const subject = await prisma.subject.findUnique({
          where: { id: item.subjectId },
          select: { name: true },
        });
        return {
          subjectId: item.subjectId,
          subjectName: subject?.name || 'Unknown',
          stock: item._sum.stock || 0,
        };
      })
    );

    // 3. Enhance stock by class with class names
    const stockByClassWithNames = await Promise.all(
      stockByClass.map(async (item) => {
        const classInfo = await prisma.class.findUnique({
          where: { id: item.classId },
          select: { name: true },
        });
        return {
          classId: item.classId,
          className: classInfo?.name || 'Unknown',
          stock: item._sum.stock || 0,
        };
      })
    );

    // 4. Calculate total sales
    const totalSales = salesData.reduce((acc, item) => {
      return acc + ((item.price ?? 0) * item.quantity);
    }, 0);

    // 5. Format response
    return res.json({
      summary: {
        totalStock: totalStock._sum.stock ?? 0,
        totalOrders,
        totalSales,
        avgOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
      },
      stockAnalysis: {
        bySubject: stockBySubjectWithNames,
        byClass: stockByClassWithNames,
      },
      salesTrends: monthlySales,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        total: order.total,
        status: order.delivery?.status || 'PENDING',
        date: order.createdAt,
        customer: order.user.name,
        items: order.items.map(item => ({
          title: item.book.title,
          quantity: item.quantity,
          price: item.price,
          subject: item.book.subject.name,
          class: item.book.class.name,
        })),
      })),
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return res.status(500).json({ 
      message: 'Failed to load dashboard statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Helper function to get monthly sales data
async function getMonthlySalesData() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const sales = await prisma.order.findMany({
    where: {
      createdAt: { gte: sixMonthsAgo },
      delivery: { NOT: { status: 'PENDING' } },
    },
    select: {
      createdAt: true,
      total: true,
    },
  });

  // Group by month
  const monthlyData = sales.reduce((acc, order) => {
    const monthYear = order.createdAt.toISOString().slice(0, 7); // YYYY-MM format
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += order.total;
    return acc;
  }, {});

  // Format for chart (last 6 months)
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthYear = date.toISOString().slice(0, 7);
    months.push({
      name: date.toLocaleString('default', { month: 'short' }),
      sales: monthlyData[monthYear] || 0,
    });
  }

  return months;
}