import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import OrderManagement from '../../components/admin/OrderManagement.jsx';

const AdminOrders = () => {
  const { user, isAdmin } = useAuthStore();

  // Kiểm tra quyền admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-orders-page">
      <OrderManagement />
    </div>
  );
};

export default AdminOrders;