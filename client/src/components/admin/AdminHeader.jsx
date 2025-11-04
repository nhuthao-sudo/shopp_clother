// AdminHeader.jsx
import React from 'react';
// import { useAuth } from '../../context/AuthContext';

import { useAuthStore } from '../../stores/authStore';


const AdminHeader = () => {
  // const { user, logout } = useAuth();

  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 text-white shadow-md ">
     <div className="container">
       <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Xin chào, {user?.name || 'Admin'}</span>
          <button 
            onClick={logout} 
            className="bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
     </div>
    </header>
  );
};

export default AdminHeader;