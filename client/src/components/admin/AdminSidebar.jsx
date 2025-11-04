// AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const AdminSidebar = () => {
  const { user, isAdmin } = useAuthStore();

  return (
    <aside className="w-64 bg-gray-700 text-white">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => 
                `block p-3 rounded transition-colors ${
                  isActive ? 'bg-blue-500' : 'hover:bg-gray-600'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/products"
              className={({ isActive }) => 
                `block p-3 rounded transition-colors ${
                  isActive ? 'bg-blue-500' : 'hover:bg-gray-600'
                }`
              }
            >
              Quản lý sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users"
              className={({ isActive }) => 
                `block p-3 rounded transition-colors ${
                  isActive ? 'bg-blue-500' : 'hover:bg-gray-600'
                }`
              }
            >
              Quản lý tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/orders"
              className={({ isActive }) => 
                `block p-3 rounded transition-colors ${
                  isActive ? 'bg-blue-500' : 'hover:bg-gray-600'
                }`
              }
            >
              Quản lý đơn hàng
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;