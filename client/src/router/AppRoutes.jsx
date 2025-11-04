import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes } from './routes/publicRoutes';
import { protectedRoutes } from './routes/protectedRoutes';
import AdminRoutes from './routes/adminRoutes';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import { useAuthStore } from '../stores/authStore';

const AppRoutes = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = localStorage.getItem('adminProducts');
      let parsed = [];

      if (productsData) {
        parsed = JSON.parse(productsData);
      }

      if (!Array.isArray(parsed)) parsed = [];
      setProducts(parsed);
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    const res = products.find((product) => product.id === parseInt(id));
    return res || null;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Routes>
      {/* Trang chủ */}
      <Route
        path="/"
        element={
          loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <div>Đang tải...</div>
            </div>
          ) : (
            <Home
              products={products.filter((p) => p?.featured)}
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          )
        }
      />

      {/* Trang sản phẩm */}
      <Route
        path="/products"
        element={
          <Products
            products={products}
            onProductClick={(product) => navigate(`/product/${product.id}`)}
          />
        }
      />

      {/* Chi tiết sản phẩm */}
      <Route
        path="/product/:id"
        element={
          <ProductDetail
            getProductById={getProductById}
            onBack={() => navigate(-1)}
          />
        }
      />

      {/* Public routes */}
      {Array.isArray(publicRoutes) &&
        publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      {/* Protected routes */}
      {Array.isArray(protectedRoutes) &&
        protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminRoutes />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;