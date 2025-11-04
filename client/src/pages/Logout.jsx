import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  ExitToApp,
  Home,
  Login,
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuthStore();
  const [progress, setProgress] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    
    const performLogout = async () => {
      try {
        // Tăng progress bar
        timer = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(timer);
              return 100;
            }
            return prev + 10;
          });
        }, 150);

        // Đợi 2 giây rồi logout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Gọi hàm logout từ store
        await logout();
        setIsLoggedOut(true);
        
        // Tự động chuyển hướng sau 3 giây nữa
        setTimeout(() => {
          navigate('/');
        }, 3000);
        
      } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        setError('Có lỗi xảy ra khi đăng xuất');
        clearInterval(timer);
      }
    };

    performLogout();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [logout, navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          borderRadius: 3,
          textAlign: 'center',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        {/* Thêm thông báo lỗi */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: isLoggedOut ? 'success.main' : error ? 'error.main' : 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            transition: 'all 0.5s ease',
          }}
        >
          <ExitToApp sx={{ fontSize: 40, color: 'white' }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: isLoggedOut ? 'success.main' : error ? 'error.main' : 'primary.main',
            mb: 2,
          }}
        >
          {error ? 'Lỗi Đăng Xuất' : isLoggedOut ? 'Đã Đăng Xuất' : 'Đang Đăng Xuất'}
        </Typography>

        {/* Message */}
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {error 
            ? 'Đã có lỗi xảy ra trong quá trình đăng xuất.' 
            : isLoggedOut 
              ? 'Bạn đã đăng xuất thành công!' 
              : 'Đang kết thúc phiên đăng nhập của bạn...'
          }
        </Typography>

        {/* Progress */}
        {!isLoggedOut && !error && (
          <>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: 'primary.main',
                mb: 3,
              }}
            />
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ mb: 4, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary">
              {progress}% hoàn thành...
            </Typography>
          </>
        )}

        {/* Success Section */}
        {isLoggedOut && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. 
              Bạn sẽ được chuyển hướng tự động trong giây lát...
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={() => handleNavigate('/')}
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                Về Trang Chủ
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Login />}
                onClick={() => handleNavigate('/login')}
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                Đăng Nhập Lại
              </Button>
            </Box>
          </Box>
        )}

        {/* Security Info */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mt: 4,
            backgroundColor: 'grey.50',
            borderColor: 'grey.300',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            🔒 <strong>Bảo mật:</strong> {isLoggedOut 
              ? 'Phiên đăng nhập của bạn đã được kết thúc an toàn.' 
              : error
                ? 'Không thể kết thúc phiên đăng nhập an toàn.'
                : 'Đang xóa thông tin đăng nhập khỏi trình duyệt...'
            }
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
};

export default Logout;