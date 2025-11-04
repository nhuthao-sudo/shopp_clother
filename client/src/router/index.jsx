import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<AppRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;