const API_URL = 'http://localhost:3000/api';

export const userService = {
  getAllUsers: async () => {
    // Mock data - thay bằng API thực tế
    return [
      {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'a@example.com',
        role: 'user',
        active: true,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Trần Thị B',
        email: 'b@example.com',
        role: 'admin',
        active: true,
        createdAt: '2024-01-10'
      }
    ];
  },

  updateUserStatus: async (userId, status) => {
    // Mock API call - nhận data qua parameter
    console.log(`Update user ${userId} status to ${status}`);
    return { success: true };
  },

  deleteUser: async (userId) => {
    // Mock API call - nhận data qua parameter
    console.log(`Delete user ${userId}`);
    return { success: true };
  },

  // Thêm các hàm mới nếu cần
  createUser: async (userData) => {
    // Mock API call
    console.log('Create user with data:', userData);
    return { success: true, user: { ...userData, id: Date.now() } };
  },

  updateUser: async (userId, userData) => {
    // Mock API call
    console.log(`Update user ${userId} with data:`, userData);
    return { success: true, user: { ...userData, id: userId } };
  },

  getUserById: async (userId) => {
    // Mock API call
    console.log(`Get user ${userId}`);
    return {
      id: userId,
      name: 'Nguyễn Văn A',
      email: 'a@example.com',
      role: 'user',
      active: true,
      createdAt: '2024-01-15'
    };
  }
};