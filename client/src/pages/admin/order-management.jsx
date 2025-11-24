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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Visibility,
  Edit,
  LocalShipping,
  CheckCircle,
  Cancel,
  Refresh,
  Notifications,
} from '@mui/icons-material';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    loadOrders();
    // Kiểm tra đơn hàng mới mỗi 30 giây
    const interval = setInterval(checkNewOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    setLoading(true);
    try {
      const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      setOrders(allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      checkNewOrders(allOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkNewOrders = (ordersList = orders) => {
    const newOrders = ordersList.filter(order => 
      order.status === 'pending' || order.status === 'processing'
    );
    setNewOrdersCount(newOrders.length);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'warning';
      case 'cancelled': return 'error';
      case 'pending': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'processing': return 'Đang xử lý';
      case 'shipped': return 'Đang giao hàng';
      case 'cancelled': return 'Đã hủy';
      case 'pending': return 'Chờ xác nhận';
      default: return 'Chờ xử lý';
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map(order =>
      order.orderId === selectedOrder.orderId
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem('allOrders', JSON.stringify(updatedOrders));
    setStatusDialogOpen(false);
    setSelectedOrder(null);
    checkNewOrders(updatedOrders);
  };

  const sendNotification = (order, newStatus) => {
    // Có thể tích hợp với hệ thống notification, email, hoặc WebSocket
    console.log(`Thông báo: Đơn hàng #${order.orderId} đã được cập nhật trạng thái: ${getStatusText(newStatus)}`);
    
    // Lưu thông báo vào localStorage để hiển thị
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    notifications.unshift({
      id: Date.now(),
      type: 'order_update',
      message: `Đơn hàng #${order.orderId} - ${order.customerName} đã được cập nhật thành: ${getStatusText(newStatus)}`,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
  };

  const OrderDetailDialog = () => (
    <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        Chi tiết đơn hàng #{selectedOrder?.orderId}
      </DialogTitle>
      <DialogContent>
        {selectedOrder && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Thông tin khách hàng</Typography>
                <Typography><strong>Họ tên:</strong> {selectedOrder.customerName}</Typography>
                <Typography><strong>Email:</strong> {selectedOrder.customerEmail}</Typography>
                <Typography><strong>SĐT:</strong> {selectedOrder.customerPhone}</Typography>
                <Typography><strong>Địa chỉ:</strong> {selectedOrder.shippingAddress}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Thông tin đơn hàng</Typography>
                <Typography><strong>Mã đơn:</strong> #{selectedOrder.orderId}</Typography>
                <Typography><strong>Ngày đặt:</strong> {new Date(selectedOrder.orderDate).toLocaleString('vi-VN')}</Typography>
                <Typography><strong>Trạng thái:</strong> 
                  <Chip 
                    label={getStatusText(selectedOrder.status)} 
                    color={getStatusColor(selectedOrder.status)} 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: 'primary.main' }}>
                  <strong>Tổng tiền:</strong> {selectedOrder.totalAmount?.toLocaleString('vi-VN')}₫
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>Sản phẩm</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Size: {item.size}, Màu: {item.color}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price?.toLocaleString('vi-VN')}₫</TableCell>
                      <TableCell align="right">{(item.price * item.quantity)?.toLocaleString('vi-VN')}₫</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDetailDialogOpen(false)}>Đóng</Button>
        <Button 
          variant="contained" 
          onClick={() => {
            setDetailDialogOpen(false);
            handleUpdateStatus(selectedOrder);
          }}
        >
          Cập nhật trạng thái
        </Button>
      </DialogActions>
    </Dialog>
  );

  const StatusUpdateDialog = () => (
    <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
      <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Đơn hàng: <strong>#{selectedOrder?.orderId}</strong>
        </Typography>
        <Typography gutterBottom>
          Khách hàng: <strong>{selectedOrder?.customerName}</strong>
        </Typography>
        
        <TextField
          select
          fullWidth
          label="Trạng thái mới"
          value={selectedOrder?.status || ''}
          onChange={(e) => handleStatusChange(e.target.value)}
          sx={{ mt: 2 }}
        >
          <MenuItem value="pending">Chờ xác nhận</MenuItem>
          <MenuItem value="processing">Đang xử lý</MenuItem>
          <MenuItem value="shipped">Đang giao hàng</MenuItem>
          <MenuItem value="completed">Hoàn thành</MenuItem>
          <MenuItem value="cancelled">Đã hủy</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setStatusDialogOpen(false)}>Hủy</Button>
        <Button 
          variant="contained" 
          onClick={() => setStatusDialogOpen(false)}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          🛒 Quản lý đơn hàng
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Badge badgeContent={newOrdersCount} color="error">
            <Notifications color="action" />
          </Badge>
          <Button
            startIcon={<Refresh />}
            onClick={loadOrders}
            variant="outlined"
          >
            Làm mới
          </Button>
        </Box>
      </Box>

      {newOrdersCount > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Có <strong>{newOrdersCount}</strong> đơn hàng mới cần xử lý!
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId} hover>
                    <TableCell>#{order.orderId}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {order.customerName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.customerEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>
                      {order.totalAmount?.toLocaleString('vi-VN')}₫
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(order.status)}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleViewDetail(order)}
                        title="Xem chi tiết"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleUpdateStatus(order)}
                        title="Cập nhật trạng thái"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {orders.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Chưa có đơn hàng nào
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <OrderDetailDialog />
      <StatusUpdateDialog />
    </Container>
  );
};

export default OrderManagement;