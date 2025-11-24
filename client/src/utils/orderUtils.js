// Utility functions for order management
export const generateOrderId = () => {
  return `ORD${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
};

export const saveOrderToStorage = (orderData) => {
  try {
    const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    
    const newOrder = {
      orderId: generateOrderId(),
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'pending', // Mặc định là chờ xác nhận
      updatedAt: new Date().toISOString()
    };

    // Lưu vào danh sách orders chung
    orders.unshift(newOrder);
    localStorage.setItem('allOrders', JSON.stringify(orders));

    // Lưu vào orders của user
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    userOrders.unshift(newOrder);
    localStorage.setItem('userOrders', JSON.stringify(userOrders));

    return newOrder;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrdersByStatus = (status) => {
  try {
    const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    return orders.filter(order => order.status === status);
  } catch (error) {
    console.error('Error getting orders by status:', error);
    return [];
  }
};

export const getNewOrdersCount = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    return orders.filter(order => 
      order.status === 'pending' || order.status === 'processing'
    ).length;
  } catch (error) {
    console.error('Error getting new orders count:', error);
    return 0;
  }
};