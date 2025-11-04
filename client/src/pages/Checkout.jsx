import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Grid, Card, CardContent,
  Stepper, Step, StepLabel, TextField, FormControl, InputLabel,
  Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel,
  Divider, Chip, Alert, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress
} from '@mui/material';
import {
  LocalShipping, Payment, AssignmentTurnedIn, ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';

const Checkout = () => {
  const { cartItems, getCartTotal, getCartItemsCount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});

  const steps = ['Thông tin giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng'];
  const subtotal = getCartTotal();
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const cities = [
    { id: 'hcm', name: 'TP. Hồ Chí Minh' },
    { id: 'hn', name: 'Hà Nội' },
    { id: 'dn', name: 'Đà Nẵng' }
  ];
  const districts = [
    { id: 'q1', name: 'Quận 1', city: 'hcm' },
    { id: 'q3', name: 'Quận 3', city: 'hcm' },
    { id: 'q7', name: 'Quận 7', city: 'hcm' },
    { id: 'hk', name: 'Quận Hoàn Kiếm', city: 'hn' },
    { id: 'cd', name: 'Quận Cẩm Lệ', city: 'dn' }
  ];
  const wards = [
    { id: 'p1', name: 'Phường Bến Nghé', district: 'q1' },
    { id: 'p2', name: 'Phường Bến Thành', district: 'q1' },
    { id: 'p3', name: 'Phường Võ Thị Sáu', district: 'q3' },
    { id: 'p4', name: 'Phường Phạm Ngũ Lão', district: 'hk' }
  ];

  // ✅ Validate toàn form
  const validateForm = () => {
    const newErrors = {};

    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    else if (shippingInfo.fullName.trim().length < 2) newErrors.fullName = 'Họ tên quá ngắn';

    const phoneRegex = /^(0|\+84)(\d{9})$/;
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!phoneRegex.test(shippingInfo.phone.trim())) newErrors.phone = 'Số điện thoại không hợp lệ (bắt đầu bằng 0 hoặc +84, gồm 10 số)';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shippingInfo.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!emailRegex.test(shippingInfo.email.trim())) newErrors.email = 'Email không hợp lệ';

    if (!shippingInfo.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ cụ thể';
    if (!shippingInfo.city) newErrors.city = 'Vui lòng chọn thành phố';
    if (!shippingInfo.district) newErrors.district = 'Vui lòng chọn quận/huyện';
    if (!shippingInfo.ward) newErrors.ward = 'Vui lòng chọn phường/xã';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (orderPlaced) {
      navigate('/products');
      return;
    }
    setActiveStep((prev) => prev - 1);
  };

  const handleShippingInfoChange = (field) => (e) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    const newOrderNumber = `DH${Date.now()}`;
    setOrderNumber(newOrderNumber);
    
    // Giả lập quá trình xử lý đơn hàng
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setIsPlacingOrder(false);
    }, 2000);
  };

  // ✅ Render từng bước
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              📝 Thông tin giao hàng
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={shippingInfo.fullName}
                  onChange={handleShippingInfoChange('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={handleShippingInfoChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.city} sx={{ mb: 2 }}>
                  <InputLabel>Thành phố</InputLabel>
                  <Select
                    value={shippingInfo.city}
                    label="Thành phố"
                    onChange={handleShippingInfoChange('city')}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && <Typography variant="caption" color="error">{errors.city}</Typography>}
                </FormControl>

                <FormControl fullWidth error={!!errors.district} disabled={!shippingInfo.city} sx={{ mb: 2 }}>
                  <InputLabel>Quận/huyện</InputLabel>
                  <Select
                    value={shippingInfo.district}
                    label="Quận/huyện"
                    onChange={handleShippingInfoChange('district')}
                  >
                    {districts
                      .filter((d) => d.city === shippingInfo.city)
                      .map((district) => (
                        <MenuItem key={district.id} value={district.id}>
                          {district.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.district && <Typography variant="caption" color="error">{errors.district}</Typography>}
                </FormControl>

                <FormControl fullWidth error={!!errors.ward} disabled={!shippingInfo.district}>
                  <InputLabel>Phường/xã</InputLabel>
                  <Select
                    value={shippingInfo.ward}
                    label="Phường/xã"
                    onChange={handleShippingInfoChange('ward')}
                  >
                    {wards
                      .filter((w) => w.district === shippingInfo.district)
                      .map((ward) => (
                        <MenuItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.ward && <Typography variant="caption" color="error">{errors.ward}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ cụ thể"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange('address')}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                  multiline
                  rows={3}
                  placeholder="Số nhà, tên đường, tòa nhà..."
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Ghi chú (tùy chọn)"
                  value={shippingInfo.note}
                  onChange={handleShippingInfoChange('note')}
                  multiline
                  rows={3}
                  placeholder="Ví dụ: giao buổi sáng, gọi trước khi đến..."
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              💳 Phương thức thanh toán
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <FormLabel sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>
                Chọn phương thức thanh toán
              </FormLabel>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                {['cod', 'momo', 'banking'].map((method) => (
                  <Card
                    key={method}
                    sx={{
                      mb: 2,
                      border: paymentMethod === method ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'left' }}>
                      <FormControlLabel
                        value={method}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="h6">
                              {method === 'cod'
                                ? '💵 Thanh toán khi nhận hàng (COD)'
                                : method === 'momo'
                                ? '📱 Ví điện tử MoMo'
                                : '🏦 Chuyển khoản ngân hàng'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {method === 'cod'
                                ? 'Thanh toán bằng tiền mặt khi nhận hàng'
                                : method === 'momo'
                                ? 'Quét QR code để thanh toán nhanh chóng'
                                : 'Chuyển khoản qua tài khoản ngân hàng'}
                            </Typography>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 800, width: '100%' }}>
            {/* Thông báo trạng thái */}
            {orderPlaced ? (
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom color="success.main">
                  🎉 Đặt hàng thành công!
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Mã đơn hàng: <strong>{orderNumber}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi!
                </Typography>
              </Box>
            ) : isPlacingOrder ? (
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Đang xử lý đơn hàng...
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Vui lòng chờ trong giây lát
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <AssignmentTurnedIn sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  📦 Xác nhận đơn hàng
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Vui lòng kiểm tra kỹ thông tin trước khi đặt hàng
                </Typography>
              </Box>
            )}

            <Grid container spacing={4} justifyContent="center">
              {/* Thông tin đơn hàng */}
              <Grid item xs={12} md={10} lg={8}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <LocalShipping /> Thông tin giao hàng
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ textAlign: 'left', '& > *': { mb: 2 } }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Họ và tên</Typography>
                        <Typography variant="body1"><strong>{shippingInfo.fullName}</strong></Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Số điện thoại</Typography>
                        <Typography variant="body1"><strong>{shippingInfo.phone}</strong></Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                        <Typography variant="body1"><strong>{shippingInfo.email}</strong></Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Địa chỉ</Typography>
                        <Typography variant="body1">
                          <strong>
                            {shippingInfo.address}, {
                              wards.find(w => w.id === shippingInfo.ward)?.name
                            }, {
                              districts.find(d => d.id === shippingInfo.district)?.name
                            }, {
                              cities.find(c => c.id === shippingInfo.city)?.name
                            }
                          </strong>
                        </Typography>
                      </Box>
                      {shippingInfo.note && (
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">Ghi chú</Typography>
                          <Typography variant="body1"><strong>{shippingInfo.note}</strong></Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <Payment /> Phương thức thanh toán
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Chip 
                        label={
                          paymentMethod === 'cod' ? '💵 Thanh toán khi nhận hàng (COD)' :
                          paymentMethod === 'momo' ? '📱 Ví điện tử MoMo' :
                          '🏦 Chuyển khoản ngân hàng'
                        }
                        color="primary"
                        variant="filled"
                        sx={{ fontSize: '1rem', py: 2, px: 2 }}
                      />
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <AssignmentTurnedIn /> Chi tiết đơn hàng
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: 'grey.100' }}>
                            <TableCell><strong>Sản phẩm</strong></TableCell>
                            <TableCell align="center"><strong>Số lượng</strong></TableCell>
                            <TableCell align="right"><strong>Thành tiền</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartItems.map((item) => (
                            <TableRow key={item.product.id}>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <img 
                                    src={item.product.image} 
                                    alt={item.product.name}
                                    style={{ 
                                      width: 40, 
                                      height: 40, 
                                      objectFit: 'cover',
                                      borderRadius: 4
                                    }}
                                  />
                                  <Typography variant="body2">
                                    {item.product.name}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="center">{item.quantity}</TableCell>
                              <TableCell align="right">
                                {(item.product.price * item.quantity).toLocaleString()}₫
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* Tổng thanh toán */}
                    <Box sx={{ mt: 3, p: 3, backgroundColor: 'primary.main', borderRadius: 2, color: 'white' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Tạm tính:</Typography>
                        <Typography>{subtotal.toLocaleString()}₫</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Phí vận chuyển:</Typography>
                        <Typography>
                          {shippingFee === 0 ? 'MIỄN PHÍ' : `${shippingFee.toLocaleString()}₫`}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6"><strong>Tổng cộng:</strong></Typography>
                        <Typography variant="h6">
                          <strong>{total.toLocaleString()}₫</strong>
                        </Typography>
                      </Box>
                    </Box>

                    {/* Thông tin khuyến mãi */}
                    {subtotal > 500000 && (
                      <Alert severity="success" sx={{ mt: 2, textAlign: 'center' }}>
                        🎁 Bạn được miễn phí vận chuyển cho đơn hàng trên 500,000₫
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Nút hành động */}
                {orderPlaced ? (
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={() => navigate('/products')}
                      startIcon={<CheckCircle />}
                      sx={{ px: 4, minWidth: 200 }}
                    >
                      Tiếp tục mua sắm
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      onClick={() => navigate('/order-history')}
                      sx={{ px: 4, minWidth: 200 }}
                    >
                      Xem lịch sử đơn hàng
                    </Button>
                  </Box>
                ) : !isPlacingOrder && (
                  <Alert severity="warning" sx={{ mt: 2, textAlign: 'center' }}>
                    ⚠️ Vui lòng kiểm tra kỹ thông tin trước khi xác nhận đặt hàng
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
        );

      default:
        return null;
    }
  };

  // Nếu trống giỏ hàng và chưa đặt hàng
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Giỏ hàng của bạn đang trống</Typography>
        <Button variant="contained" onClick={() => navigate('/products')} startIcon={<ArrowBack />}>
          Quay lại mua sắm
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        {orderPlaced ? 'Đặt hàng thành công' : 'Thanh toán'}
      </Typography>

      {!orderPlaced && (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <Grid container spacing={4}>
          {/* Phần nội dung chính - bên trái */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent sx={{ py: 4, minHeight: 400 }}>
                {getStepContent(activeStep)}
              </CardContent>
            </Card>
          </Grid>

          {/* Phần tóm tắt đơn hàng - bên phải */}
          {!orderPlaced && (
            <Grid item xs={12} lg={4}>
              <Card sx={{ position: 'sticky', top: 100 }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center" gutterBottom>
                    Tóm tắt đơn hàng
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" textAlign="center" color="text.secondary">
                    {getCartItemsCount()} sản phẩm
                  </Typography>

                  <Box sx={{ mt: 2, maxHeight: 200, overflow: 'auto', mb: 2 }}>
                    {cartItems.map((item) => (
                      <Box 
                        key={item.product.id} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1, 
                          mb: 2,
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: 'grey.50'
                        }}
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          style={{ 
                            width: 40, 
                            height: 40, 
                            objectFit: 'cover',
                            borderRadius: 4
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium" noWrap>
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Số lượng: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          {(item.product.price * item.quantity).toLocaleString()}₫
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ '& > *': { display: 'flex', justifyContent: 'space-between', mb: 1 } }}>
                    <Box>
                      <Typography variant="body2">Tạm tính:</Typography>
                      <Typography variant="body2">{subtotal.toLocaleString()}₫</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2">Phí vận chuyển:</Typography>
                      <Typography 
                        variant="body2" 
                        color={shippingFee === 0 ? 'success.main' : 'inherit'}
                      >
                        {shippingFee === 0 ? 'MIỄN PHÍ' : `${shippingFee.toLocaleString()}₫`}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6"><strong>Tổng cộng:</strong></Typography>
                    <Typography variant="h6" color="primary">
                      <strong>{total.toLocaleString()}₫</strong>
                    </Typography>
                  </Box>

                  {/* Nút điều hướng */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      fullWidth
                      disabled={isPlacingOrder}
                      startIcon={isPlacingOrder ? <CircularProgress size={16} /> : null}
                      size="large"
                    >
                      {isPlacingOrder ? 'Đang xử lý...' : 
                       activeStep === steps.length - 1 ? 'Đặt hàng' : 'Tiếp tục'}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleBack}
                      disabled={activeStep === 0 || isPlacingOrder}
                      fullWidth
                    >
                      Quay lại
                    </Button>
                  </Box>

                  {/* Thông báo miễn phí vận chuyển */}
                  {subtotal > 500000 && (
                    <Alert severity="success" sx={{ mt: 2, fontSize: '0.8rem' }}>
                      🎁 Bạn được miễn phí vận chuyển
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default Checkout;