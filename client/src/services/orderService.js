export const orderService = {
  getAllOrders: async () => {
    // Mock data
    return [
      {
        id: 1001,
        customerName: 'Nguyễn Văn A',
        totalAmount: 1500000,
        status: 'pending',
        createdAt: '2024-01-20'
      },
      {
        id: 1002,
        customerName: 'Trần Thị B',
        totalAmount: 2300000,
        status: 'confirmed',
        createdAt: '2024-01-19'
      }
    ];
  },

  updateOrderStatus: async (orderId, status) => {
    // Mock API call
    console.log(`Update order ${orderId} status to ${status}`);
    return { success: true };
  }
};