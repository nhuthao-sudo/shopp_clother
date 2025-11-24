// utils/UserManagement.js
class UserManagement {
  constructor() {
    this.users = this.loadUsersFromStorage();
    this.currentUser = null;
  }

  // Load users từ localStorage
  loadUsersFromStorage() {
    if (typeof window === 'undefined') return [];
    
    try {
      const storedUsers = localStorage.getItem('app_users');
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error('Error loading users from storage:', error);
      return [];
    }
  }

  // Save users vào localStorage
  saveUsersToStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('app_users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Error saving users to storage:', error);
    }
  }

  // Generate unique user ID
  generateUserId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Thêm user mới
  addNewUser(userData) {
    // Kiểm tra email đã tồn tại chưa
    if (this.getUserByEmail(userData.email)) {
      return false;
    }

    const newUser = {
      id: this.generateUserId(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // Trong thực tế nên hash password
      role: userData.role || 'user',
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      isVerified: false, // Mặc định chưa verify email
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      loginAttempts: 0,
      profile: {
        avatar: null,
        phone: '',
        address: ''
      }
    };

    this.users.push(newUser);
    this.saveUsersToStorage();
    return true;
  }

  // Lấy user bằng email
  getUserByEmail(email) {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // Lấy user bằng ID
  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  // Xác thực user login
  authenticateUser(email, password) {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'Email không tồn tại' };
    }

    if (!user.isActive) {
      return { success: false, error: 'Tài khoản đã bị khóa' };
    }

    if (user.password !== password) {
      // Tăng số lần login thất bại
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      
      // Khóa tài khoản nếu login thất bại quá 5 lần
      if (user.loginAttempts >= 5) {
        user.isActive = false;
        this.saveUsersToStorage();
        return { success: false, error: 'Tài khoản đã bị khóa do đăng nhập thất bại quá nhiều lần' };
      }
      
      this.saveUsersToStorage();
      return { success: false, error: 'Mật khẩu không đúng' };
    }

    // Reset login attempts và cập nhật last login
    user.loginAttempts = 0;
    user.lastLogin = new Date().toISOString();
    this.saveUsersToStorage();

    this.currentUser = user;
    return { 
      success: true, 
      user: { ...user, password: undefined } // Không trả về password
    };
  }

  // Xóa user
  removeUser(email) {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.email.toLowerCase() !== email.toLowerCase());
    
    if (this.users.length !== initialLength) {
      this.saveUsersToStorage();
      return true;
    }
    return false;
  }

  // Cập nhật user
  updateUser(email, updates) {
    const user = this.getUserByEmail(email);
    if (!user) return false;

    Object.keys(updates).forEach(key => {
      if (key !== 'id' && key !== 'email' && key !== 'createdAt') {
        user[key] = updates[key];
      }
    });

    user.updatedAt = new Date().toISOString();
    this.saveUsersToStorage();
    return true;
  }

  // Verify email
  verifyUserEmail(email) {
    const user = this.getUserByEmail(email);
    if (!user) return false;

    user.isVerified = true;
    user.updatedAt = new Date().toISOString();
    this.saveUsersToStorage();
    return true;
  }

  // Lấy tất cả users (cho admin)
  getAllUsers() {
    return this.users.map(user => ({ ...user, password: undefined }));
  }

  // Đếm số lượng users
  getUserCount() {
    return this.users.length;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser ? { ...this.currentUser, password: undefined } : null;
  }

  // Logout
  logout() {
    this.currentUser = null;
  }

  // Reset tất cả users (cho mục đích testing)
  resetUsers() {
    this.users = [];
    this.currentUser = null;
    localStorage.removeItem('app_users');
  }
}

// Tạo instance và export
export const userManagement = new UserManagement();