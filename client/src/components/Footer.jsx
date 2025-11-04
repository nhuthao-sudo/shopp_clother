import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Phone,
  Email,
  LocationOn,
  LocalShipping,
  Security,
  SupportAgent,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              🛍️ FASHION STORE
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Chuyên cung cấp các sản phẩm thời trang chất lượng cao với giá cả hợp lý. 
              Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
            </Typography>
            
            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  backgroundColor: 'error.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'error.dark' }
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  backgroundColor: 'info.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'info.dark' }
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  backgroundColor: 'error.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'error.dark' }
                }}
              >
                <YouTube fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Liên Kết Nhanh
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Trang Chủ
              </Link>
              <Link href="/products" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Sản Phẩm
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Khuyến Mãi
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Bộ Sưu Tập
              </Link>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Hỗ Trợ Khách Hàng
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Hướng Dẫn Mua Hàng
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Chính Sách Đổi Trả
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Chính Sách Vận Chuyển
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Câu Hỏi Thường Gặp
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Chính Sách Bảo Mật
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Thông Tin Liên Hệ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" />
                <Typography variant="body2" color="text.secondary">
                  123 Đường ABC, Quận 1, TP.HCM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" />
                <Typography variant="body2" color="text.secondary">
                  1900 1234
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" />
                <Typography variant="body2" color="text.secondary">
                  support@fashionstore.com
                </Typography>
              </Box>
            </Box>

            {/* Business Hours */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Thời Gian Làm Việc
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thứ 2 - Chủ Nhật: 8:00 - 22:00
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Miễn Phí Vận Chuyển
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cho đơn hàng từ 500K
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Security sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Thanh Toán An Toàn
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    100% bảo mật
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SupportAgent sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Hỗ Trợ 24/7
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hotline: 1900 1234
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Giao Hàng Nhanh
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Trong 2-4 giờ
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Copyright Section */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              py: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              © {new Date().getFullYear()} Fashion Store. Tất cả các quyền được bảo lưu.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>
                Điều Khoản Sử Dụng
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>
                Chính Sách Bảo Mật
              </Link>
              <Link href="#" color="inherit" sx={{ textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>
                Chính Sách Cookie
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Payment Methods */}
      <Box sx={{ backgroundColor: 'grey.100', py: 2 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: 1 }}
          >
            Chấp nhận thanh toán:
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            {['VISA', 'MASTERCARD', 'JCB', 'MOMO', 'ZALOPAY', 'VNPAY'].map((method) => (
              <Box
                key={method}
                sx={{
                  px: 2,
                  py: 0.5,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: 'text.secondary'
                }}
              >
                {method}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;