import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowBack, Visibility } from '@mui/icons-material';
import { orderService } from '../services/orderService';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderHistory();
  }, []);

  const loadOrderHistory = async () => {
    setLoading(true);
    try {
      // Lấy email user từ localStorage (giả sử đã login)
      const userEmail = localStorage.getItem('userEmail') || 'guest';
      const userOrders = await orderService.getUserOrders(userEmail);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading order history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'processing': return 'Đang xử lý';
      case 'shipped': return 'Đang giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return 'Chờ xác nhận';
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Đang tải lịch sử đơn hàng...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Quay lại
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          📋 Lịch sử đơn hàng
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Chưa có đơn hàng nào
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Hãy mua sắm và tạo đơn hàng đầu tiên của bạn!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
            >
              Mua sắm ngay
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {orders.map((order) => (
            <Card key={order.orderId} sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Đơn hàng #{order.orderId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tổng tiền: {order.totalAmount?.toLocaleString('vi-VN')}₫
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusText(order.status)}
                    color={getStatusColor(order.status)}
                    variant="filled"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Thông tin khách hàng:
                    </Typography>
                    <Typography variant="body2">
                      {order.customerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.customerEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.customerPhone}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Địa chỉ giao hàng:
                    </Typography>
                    <Typography variant="body2">
                      {order.shippingAddress}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Sản phẩm ({order.items?.length || 0}):
                  </Typography>
                  {order.items?.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body2">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.price?.toLocaleString('vi-VN')}₫
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/order-detail/${order.orderId}`)}
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrderHistory;