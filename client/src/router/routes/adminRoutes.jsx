// File: src/router/routes/adminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminProducts from '../../pages/admin/AdminProducts';
import AdminUsers from '../../pages/admin/AdminUsers';
import AdminOrders from '../../pages/admin/AdminOrders';
import ProductManagement from '../../components/admin/ProductManagement'; // Đã sửa import

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products-management" element={<ProductManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;