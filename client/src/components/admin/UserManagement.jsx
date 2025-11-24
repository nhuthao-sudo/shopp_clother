// UserManagement.jsx
import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  // Hàm load users từ localStorage
  const loadUsers = () => {
    // Lấy users từ localStorage hoặc dùng mock data ban đầu
    const savedUsers = localStorage.getItem('registeredUsers');
    const mockUsers = [
      { 
        id: 1, 
        name: 'Nguyễn Văn A', 
        email: 'a@email.com', 
        role: 'user', 
        status: 'active',
        phone: '0123456789',
        address: 'Hà Nội',
        registeredAt: '2024-01-15'
      },
      { 
        id: 2, 
        name: 'Trần Thị B', 
        email: 'b@email.com', 
        role: 'admin', 
        status: 'active',
        phone: '0987654321',
        address: 'TP.HCM',
        registeredAt: '2024-01-10'
      },
    ];

    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
    } else {
      setUsers(mockUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'locked':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'active': 'Hoạt động',
      'locked': 'Đã khóa',
      'inactive': 'Không hoạt động'
    };
    return statusMap[status] || status;
  };

  const getRoleClass = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'user':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'moderator':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getRoleText = (role) => {
    const roleMap = {
      'admin': 'Quản trị viên',
      'user': 'Người dùng',
      'moderator': 'Kiểm duyệt'
    };
    return roleMap[role] || role;
  };

  // Hàm thêm user mới từ đăng ký (có thể gọi từ bên ngoài)
  const addNewUser = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      role: 'user',
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };

  // Hàm refresh để load lại danh sách users
  const refreshUsers = () => {
    loadUsers();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý tài khoản</h2>
        <div className="flex gap-2">
          <button 
            onClick={refreshUsers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            🔄 Làm mới
          </button>
          <div className="bg-green-500 text-white px-4 py-2 rounded">
            Tổng: {users.length} users
          </div>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.status === 'active').length}</div>
          <div className="text-gray-600">Đang hoạt động</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'locked').length}</div>
          <div className="text-gray-600">Đã khóa</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</div>
          <div className="text-gray-600">Quản trị viên</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">{users.filter(u => u.role === 'user').length}</div>
          <div className="text-gray-600">Người dùng</div>
        </div>
      </div>

      {/* Bảng danh sách users */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Thông tin</th>
              <th className="px-6 py-3 text-left">Liên hệ</th>
              <th className="px-6 py-3 text-left">Vai trò</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
              <th className="px-6 py-3 text-left">Ngày đăng ký</th>
              <th className="px-6 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Chưa có người dùng nào
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">ID: {user.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-gray-900">{user.email}</div>
                      {user.phone && (
                        <div className="text-sm text-gray-500">📞 {user.phone}</div>
                      )}
                      {user.address && (
                        <div className="text-sm text-gray-500">📍 {user.address}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleClass(user.role)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="user">Người dùng</option>
                      <option value="moderator">Kiểm duyệt</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(user.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                      <option value="locked">Khóa</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.registeredAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        title="Xóa người dùng"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Thông tin về cách hoạt động */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Cách hoạt động:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Tài khoản đăng ký mới sẽ tự động xuất hiện ở đây</li>
          <li>• Dữ liệu được lưu trong localStorage của trình duyệt</li>
          <li>• Có thể thay đổi vai trò và trạng thái người dùng</li>
          <li>• Nhấn "Làm mới" để cập nhật danh sách mới nhất</li>
        </ul>
      </div>
    </div>
  );
};

// Export thêm hàm để có thể thêm user từ bên ngoài
export const userManagement = {
  addNewUser: (userData) => {
    const savedUsers = localStorage.getItem('registeredUsers');
    const currentUsers = savedUsers ? JSON.parse(savedUsers) : [];
    
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      role: 'user',
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...currentUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  },

  getAllUsers: () => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  },

  getUserByEmail: (email) => {
    const savedUsers = localStorage.getItem('registeredUsers');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    return users.find(user => user.email === email);
  }
};

export default UserManagement;