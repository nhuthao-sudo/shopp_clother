import React from 'react';
import ProductManagement from '../../components/admin/ProductManagement.jsx';
import { useAuthStore } from '../../stores/authStore';

const AdminProducts = () => {
  const { user, isAdmin } = useAuthStore();

  return (
    <div className="admin-products-page">
      <ProductManagement />
    </div>
  );
};

export default AdminProducts;