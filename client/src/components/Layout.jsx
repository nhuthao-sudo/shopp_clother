import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeader && <Header />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
};

export default Layout;