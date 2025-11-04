import React from 'react';
import UserManagement from '../../components/admin/UserManagement.jsx';
import { useAuthStore } from '../../stores/authStore';

const AdminUsers = () => {
  const { getAllUsers, updateUserRole, toggleUserActive } = useAuthStore();

  return (
    <div className="admin-users-page">
      <UserManagement 
        getAllUsers={getAllUsers}
        updateUserRole={updateUserRole}
        toggleUserActive={toggleUserActive}
      />
    </div>
  );
};

export default AdminUsers;