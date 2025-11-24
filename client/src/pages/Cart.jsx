import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Chip,
  TextField,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout,
  ArrowBack,
  LocalShipping,
  Discount,
} from '@mui/icons-material';
import { useCartStore } from '../stores/cartStore';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartItemsCount 
  } = useCartStore();

  const navigate = useNavigate();

  const handleQuantityChange = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
    } else {
      updateQuantity(productId, size, color, newQuantity);
    }
  };

  const handleRemoveItem = (productId, size, color) => {
    removeFromCart(productId, size, color);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Giỏ Hàng
        </Typography>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Giỏ hàng của bạn đang trống
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Hãy thêm một số sản phẩm để bắt đầu mua sắm!
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/products')}
            startIcon={<ArrowBack />}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Giỏ Hàng
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Bạn có {getCartItemsCount()} sản phẩm trong giỏ hàng
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableCell><strong>Sản phẩm</strong></TableCell>
                      <TableCell><strong>Giá</strong></TableCell>
                      <TableCell><strong>Số lượng</strong></TableCell>
                      <TableCell><strong>Tổng</strong></TableCell>
                      <TableCell><strong>Thao tác</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item, index) => (
                      <TableRow key={`${item.product.id}-${item.size}-${item.color}`}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CardMedia
                              component="img"
                              src={item.product.image}
                              alt={item.product.name}
                              sx={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 1,
                                flexShrink: 0,
                              }}
                            />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {item.product.name}
                              </Typography>
                              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                <Chip 
                                  label={`Size: ${item.size}`} 
                                  size="small" 
                                  variant="outlined" 
                                />
                                <Chip 
                                  label={`Màu: ${item.color}`} 
                                  size="small" 
                                  variant="outlined" 
                                />
                              </Stack>
                              {item.product.discount > 0 && (
                                <Chip 
                                  label={`-${item.product.discount}%`} 
                                  color="error" 
                                  size="small" 
                                />
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Box>
                            <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                              {item.product.price.toLocaleString()}₫
                            </Typography>
                            {item.product.originalPrice > item.product.price && (
                              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                {item.product.originalPrice.toLocaleString()}₫
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton 
                              size="small"
                              onClick={() => handleQuantityChange(
                                item.product.id, 
                                item.size, 
                                item.color, 
                                item.quantity - 1
                              )}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            
                            <TextField
                              value={item.quantity}
                              size="small"
                              sx={{ 
                                width: 60,
                                '& .MuiInputBase-input': { 
                                  textAlign: 'center',
                                  py: 0.5
                                }
                              }}
                              inputProps={{ 
                                min: 1,
                                style: { textAlign: 'center' }
                              }}
                              onChange={(e) => handleQuantityChange(
                                item.product.id, 
                                item.size, 
                                item.color, 
                                parseInt(e.target.value) || 1
                              )}
                            />
                            
                            <IconButton 
                              size="small"
                              onClick={() => handleQuantityChange(
                                item.product.id, 
                                item.size, 
                                item.color, 
                                item.quantity + 1
                              )}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {(item.product.price * item.quantity).toLocaleString()}₫
                          </Typography>
                        </TableCell>
                        
                        <TableCell>
                          <IconButton 
                            color="error"
                            onClick={() => handleRemoveItem(item.product.id, item.size, item.color)}
                            title="Xóa sản phẩm"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button 
                  startIcon={<ArrowBack />}
                  onClick={handleContinueShopping}
                >
                  Tiếp tục mua sắm
                </Button>
                
                <Button 
                  color="error" 
                  variant="outlined"
                  onClick={clearCart}
                >
                  Xóa tất cả
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Tóm tắt đơn hàng
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tạm tính ({getCartItemsCount()} sản phẩm)
                  </Typography>
                  <Typography variant="body2">
                    {subtotal.toLocaleString()}₫
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phí vận chuyển
                  </Typography>
                  <Typography variant="body2">
                    {shippingFee === 0 ? (
                      <Chip label="MIỄN PHÍ" color="success" size="small" />
                    ) : (
                      `${shippingFee.toLocaleString()}₫`
                    )}
                  </Typography>
                </Box>

                {shippingFee > 0 && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    * Miễn phí vận chuyển cho đơn hàng từ 500.000₫
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tổng cộng
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {total.toLocaleString()}₫
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
                sx={{
                  py: 1.5,
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Tiến hành thanh toán
              </Button>







{/* Promo Code */}
<Box sx={{ mt: 2 }}>
  <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
    <Discount sx={{ fontSize: 16, mr: 0.5 }} />
    Mã giảm giá
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <TextField
      placeholder="Nhập mã giảm giá"
      size="small"
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '40px', // Đồng bộ chiều cao với button
        }
      }}
    />
    <Button 
      variant="outlined" 
      size="small"
      sx={{ 
        minWidth: '80px',
        height: '40px', // Đồng bộ chiều cao với input
        whiteSpace: 'nowrap'
      }}
    >
      Áp dụng
    </Button>
  </Box>
</Box>





              

              {/* Shipping Info */}
              <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocalShipping sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Giao hàng nhanh
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  • Miễn phí vận chuyển cho đơn từ 500.000₫
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                  • Giao hàng trong 2-4 ngày làm việc
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;