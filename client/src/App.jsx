import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './router';

// Theme configuration (giữ nguyên)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Component để xác định có hiển thị Header/Footer không
function LayoutWrapper() {
  const location = useLocation();
  
  // Các route không hiển thị Header và Footer
  const noLayoutRoutes = ['/login', '/register'];
  const shouldShowLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowLayout && <Header />}
      <main style={{ 
        minHeight: shouldShowLayout ? 'calc(100vh - 140px)' : '100vh',
        padding: shouldShowLayout ? '0' : '0'
      }}>
        <AppRouter />
      </main>
      {shouldShowLayout && <Footer />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

// Component App chính với providers
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LayoutWrapper />
      </Router>
    </ThemeProvider>
  );
}