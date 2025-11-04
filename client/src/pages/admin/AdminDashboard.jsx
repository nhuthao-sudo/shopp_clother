import React from 'react';
import { useAuthStore } from '../../stores/authStore';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tổng quan</h2>
        <div className="text-sm text-gray-600">
          Xin chào, <span className="font-semibold text-blue-600">{user?.name || 'Admin'}</span>
        </div>
      </div>

      {/* Thông báo quyền admin */}
      {!isAdmin && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="text-sm">
            ⚠️ Bạn đang xem trang quản trị với quyền hạn hạn chế.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-blue-500">
          <h3 className="text-gray-600 font-medium">Tổng sản phẩm</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">150</p>
          <p className="text-sm text-gray-500 mt-1">+5 mới trong tháng</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-green-500">
          <h3 className="text-gray-600 font-medium">Tổng người dùng</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">1,234</p>
          <p className="text-sm text-gray-500 mt-1">+12 đăng ký mới</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-yellow-500">
          <h3 className="text-gray-600 font-medium">Đơn hàng mới</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">45</p>
          <p className="text-sm text-gray-500 mt-1">Chờ xử lý</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-l-4 border-purple-500">
          <h3 className="text-gray-600 font-medium">Doanh thu</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">$12,500</p>
          <p className="text-sm text-gray-500 mt-1">+15% so với tháng trước</p>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Đơn hàng mới</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Sản phẩm được xem</span>
              <span className="font-semibold">1,245</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Người dùng mới</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Đánh giá mới</span>
              <span className="font-semibold">23</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trạng thái hệ thống</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Trạng thái website</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Database</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Lượt truy cập hôm nay</span>
              <span className="font-semibold">2,456</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Thời gian hoạt động</span>
              <span className="font-semibold">99.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;