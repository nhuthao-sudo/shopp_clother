import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuthStore();
  const location = useLocation();

  // Hiển thị loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-gray-600">Đang kiểm tra quyền truy cập...</div>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập - redirect đến login
  if (!user) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ 
          from: location,
          message: 'Vui lòng đăng nhập để truy cập trang quản trị' 
        }} 
      />
    );
  }

  // Kiểm tra role - có thể mở rộng cho nhiều role khác nhau
  const isModerator = user.role === 'moderator'; // Ví dụ mở rộng
  
  // Không có quyền admin - redirect về home với thông báo
  if (user.role !== 'admin' && user.role !== 'moderator') {
    return (
      <Navigate 
        to="/" 
        replace 
        state={{ 
          error: 'Bạn không có quyền truy cập trang quản trị' 
        }} 
      />
    );
  }

  // Render children nếu có quyền
  return children;
};

export default AdminRoute;