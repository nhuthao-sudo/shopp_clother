// Utility functions for order management
const generateOrderId = () => {
  return `ORD${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
};

export const orderService = {
  // Lấy tất cả orders
  getAllOrders: async () => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  },

  // Lấy orders theo user
  getUserOrders: async (userEmail) => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      return orders.filter(order => order.customerEmail === userEmail);
    } catch (error) {
      console.error('Error getting user orders:', error);
      return [];
    }
  },

  // Tạo order mới
  createOrder: async (orderData) => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      
      const newOrder = {
        orderId: generateOrderId(),
        ...orderData,
        orderDate: new Date().toISOString(),
        status: 'pending',
        updatedAt: new Date().toISOString()
      };

      orders.unshift(newOrder);
      localStorage.setItem('allOrders', JSON.stringify(orders));

      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái order
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      
      const orderIndex = orders.findIndex(order => order.orderId === orderId);
      if (orderIndex === -1) {
        throw new Error('Order not found');
      }

      const updatedOrder = {
        ...orders[orderIndex],
        status: newStatus,
        updatedAt: new Date().toISOString()
      };

      orders[orderIndex] = updatedOrder;
      localStorage.setItem('allOrders', JSON.stringify(orders));

      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Lấy order theo ID
  getOrderById: async (orderId) => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      return orders.find(order => order.orderId === orderId) || null;
    } catch (error) {
      console.error('Error getting order by ID:', error);
      return null;
    }
  },

  // Xóa order
  deleteOrder: async (orderId) => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      const filteredOrders = orders.filter(order => order.orderId !== orderId);
      localStorage.setItem('allOrders', JSON.stringify(filteredOrders));
      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // Thống kê orders
  getOrderStats: async () => {
    try {
      const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      
      const stats = {
        total: orders.length,
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        shipped: orders.filter(order => order.status === 'shipped').length,
        completed: orders.filter(order => order.status === 'completed').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length,
        totalRevenue: orders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + (order.totalAmount || 0), 0)
      };

      return stats;
    } catch (error) {
      console.error('Error getting order stats:', error);
      return {};
    }
  }
};