import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

// Mock API functions - ĐÃ SỬA HOÀN TOÀN
const mockAPI = {
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('Email đã được sử dụng');
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      emailVerified: false,
      active: true,
      verificationToken: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
  },

  login: async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  console.log('📋 Danh sách users trong localStorage:', users); // Debug log
  
  const user = users.find(u => u.email === email && u.password === password);
  console.log('🔍 User tìm thấy:', user); // Debug log
  
  if (!user) {
    throw new Error('Email hoặc mật khẩu không đúng');
  }
  
  if (!user.active) {
    throw new Error('Tài khoản của bạn đã bị khóa');
  }
  
  // ⚠️ Tạm bỏ qua kiểm tra xác thực email (chỉ dùng khi test)
  if (!user.emailVerified) {
    console.warn('⚠️ Email chưa xác thực, nhưng cho phép đăng nhập (chế độ test).');
    user.emailVerified = true;
  }

  // Trả về user data an toàn (không có password)
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
    emailVerified: user.emailVerified
  };
  
  return { 
    success: true, 
    user: safeUser, 
    token: 'mock-jwt-token' 
  };
},


  verifyEmail: async (token) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.verificationToken === token);
    
    if (userIndex === -1) {
      throw new Error('Token xác thực không hợp lệ');
    }
    
    users[userIndex].emailVerified = true;
    users[userIndex].verificationToken = null;
    localStorage.setItem('users', JSON.stringify(users));
    
    return { 
      success: true, 
      user: {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        role: users[userIndex].role,
        active: users[userIndex].active,
        emailVerified: users[userIndex].emailVerified
      }
    };
  },

  resendVerification: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Email không tồn tại');
    }
    
    if (user.emailVerified) {
      throw new Error('Email đã được xác thực');
    }
    
    return { success: true };
  },

  getAllUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt
    }));
  },

  updateUserRole: async (userId, newRole) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Người dùng không tồn tại');
    }
    
    users[userIndex].role = newRole;
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true };
  },

  toggleUserActive: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Người dùng không tồn tại');
    }
    
    users[userIndex].active = !users[userIndex].active;
    localStorage.setItem('users', JSON.stringify(users));
    
    return { 
      success: true, 
      active: users[userIndex].active 
    };
  }
};

// KHỞI TẠO TÀI KHOẢN MẪU - ĐÃ SỬA: CHỈ TẠO KHI HOÀN TOÀN CHƯA CÓ USERS
const initializeSampleUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Nếu đã có users (dù là user nào), không tạo sample users nữa
  if (existingUsers.length > 0) {
    console.log('📝 Đã có users trong hệ thống, không tạo tài khoản mẫu');
    return;
  }
  
  // Chỉ tạo sample users khi HOÀN TOÀN chưa có users nào
  console.log('🆕 Chưa có users nào, đang khởi tạo tài khoản mẫu...');
  
  const sampleUsers = [
    {
      id: 1,
      name: 'Quản trị viên',
      email: 'admin@gmail.com',
      password: '123456',
      role: 'admin',
      emailVerified: true,
      active: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Người dùng thường',
      email: 'user@gmail.com',
      password: '123456',
      role: 'user',
      emailVerified: true,
      active: true,
      createdAt: new Date().toISOString()
    }
  ];

  localStorage.setItem('users', JSON.stringify(sampleUsers));
  console.log('✅ Đã khởi tạo tài khoản mẫu!');
  console.log('👤 Admin: admin@gmail.com / 123456');
  console.log('👤 User: user@gmail.com / 123456');
};

// KHỞI TẠO TÀI KHOẢN MẪU - CHỈ CHẠY KHI HOÀN TOÀN CHƯA CÓ USERS
initializeSampleUsers();

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      loading: false,
      emailVerificationSent: false,

      // Computed values
      get isAuthenticated() {
        return !!get().user;
      },
      get isAdmin() {
        return get().user?.role === 'admin';
      },

      // Actions - ĐÃ SỬA: Xử lý lỗi tốt hơn
      setLoading: (loading) => set({ loading }),

      register: async (userData) => {
        set({ loading: true });
        try {
          const result = await mockAPI.register(userData);
          set({ emailVerificationSent: true, loading: false });
          toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
          return { success: true };
        } catch (error) {
          set({ loading: false });
          toast.error(error.message);
          return { success: false, error: error.message };
        }
      },

      login: async (email, password) => {
  set({ loading: true });
  try {
    console.log('🔐 Đang đăng nhập với:', email);
    const result = await mockAPI.login(email, password);
    console.log('✅ Kết quả đăng nhập:', result);

    // Lưu user vào store
    set({ 
      user: result.user, 
      loading: false 
    });

    // Hiển thị thông báo
    const welcomeMessage = result.user.role === 'admin' 
      ? `Chào mừng Quản trị viên ${result.user.name}!` 
      : `Chào mừng ${result.user.name}!`;

    toast.success(welcomeMessage);

    // ✅ TRẢ VỀ USER ĐỂ LOGIN.JSX CÓ THỂ DÙNG result.user.role
    return { success: true, user: result.user };
  } catch (error) {
    console.error('❌ Lỗi đăng nhập:', error);
    set({ loading: false });
    toast.error(error.message);
    return { success: false, error: error.message };
  }
},


      verifyEmail: async (token) => {
        set({ loading: true });
        try {
          const result = await mockAPI.verifyEmail(token);
          set({ loading: false });
          toast.success('Xác thực email thành công! Bạn có thể đăng nhập ngay.');
          return { success: true, user: result.user };
        } catch (error) {
          set({ loading: false });
          toast.error(error.message);
          return { success: false, error: error.message };
        }
      },

      resendVerification: async (email) => {
        set({ loading: true });
        try {
          const result = await mockAPI.resendVerification(email);
          set({ loading: false });
          toast.success('Đã gửi lại email xác thực! Vui lòng kiểm tra hộp thư.');
          return { success: true };
        } catch (error) {
          set({ loading: false });
          toast.error(error.message);
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({ 
          user: null, 
          emailVerificationSent: false 
        });
        toast.info('Đã đăng xuất!');
      },

      updateProfile: (userData) => {
        const { user } = get();
        const updatedUser = { ...user, ...userData };
        
        set({ user: updatedUser });
        
        // Update in users list
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...userData };
          localStorage.setItem('users', JSON.stringify(users));
        }
      },

      // Admin actions
      getAllUsers: async () => {
        set({ loading: true });
        try {
          const result = await mockAPI.getAllUsers();
          set({ loading: false });
          return { success: true, users: result };
        } catch (error) {
          set({ loading: false });
          toast.error(error.message);
          return { success: false, error: error.message };
        }
      },

      updateUserRole: async (userId, newRole) => {
        set({ loading: true });
        try {
          const result = await mockAPI.updateUserRole(userId, newRole);
          set({ loading: false });
          toast.success('Cập nhật vai trò thành công!');
          return { success: true };
        } catch (error) {
          set({ loading: false });
          toast.error(error.message);
          return { success: false, error: error.message };
        }
      },

      toggleUserActive: async (userId) => {
        set({ loading: true });
        try {
          const result = await mockAPI.toggleUserActive(userId);
          set({ loading: false });
          const action = result.active ? 'kích hoạt' : 'vô hiệu hóa';
          toast.success(`Đã ${action} người dùng thành công!`);
          return { success: true, active: result.active };
        } catch (error) {
          set({ loading: false });
          toast.error(error.message);
          return { success: false, error: error.message };
        }
      },

      setEmailVerificationSent: (sent) => set({ emailVerificationSent: sent }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        emailVerificationSent: state.emailVerificationSent
      }),
    }
  )
);