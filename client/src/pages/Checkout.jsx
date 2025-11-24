import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Grid, Card, CardContent,
  Stepper, Step, StepLabel, TextField, FormControl, InputLabel,
  Select, MenuItem, RadioGroup, FormControlLabel, Radio,
  Divider, Chip, Alert, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress
} from '@mui/material';
import {
  LocalShipping, Payment, AssignmentTurnedIn, ArrowBack,
  CheckCircle, Person, Phone, Email, LocationOn, Notes,
  ShoppingCart, CreditCard, VerifiedUser
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
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});

  const steps = ['Thông tin giao hàng', 'Thanh toán', 'Xác nhận', 'Hoàn thành'];
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

  const validateForm = () => {
    const newErrors = {};
    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    const phoneRegex = /^(0|\+84)(\d{9})$/;
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!phoneRegex.test(shippingInfo.phone.trim())) newErrors.phone = 'Số điện thoại không hợp lệ';
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
    if (activeStep === steps.length - 2) {
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
    
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setIsPlacingOrder(false);
      setActiveStep(3);
    }, 2000);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Person sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                Thông tin giao hàng
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Vui lòng cung cấp thông tin nhận hàng của bạn
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={shippingInfo.fullName}
                  onChange={handleShippingInfoChange('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                  placeholder="Nhập họ và tên người nhận hàng"
                />
                
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                  placeholder="Nhập số điện thoại nhận hàng"
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
                  variant="outlined"
                  size="small"
                  placeholder="Nhập email nhận thông báo đơn hàng"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.city} size="small" sx={{ mb: 2 }}>
                  <InputLabel>Thành phố</InputLabel>
                  <Select
                    value={shippingInfo.city}
                    label="Thành phố"
                    onChange={handleShippingInfoChange('city')}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Chọn thành phố</em>
                    </MenuItem>
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && <Typography variant="caption" color="error">{errors.city}</Typography>}
                </FormControl>

                <FormControl fullWidth error={!!errors.district} disabled={!shippingInfo.city} size="small" sx={{ mb: 2 }}>
                  <InputLabel>Quận/huyện</InputLabel>
                  <Select
                    value={shippingInfo.district}
                    label="Quận/huyện"
                    onChange={handleShippingInfoChange('district')}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Chọn quận/huyện</em>
                    </MenuItem>
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

                <FormControl fullWidth error={!!errors.ward} disabled={!shippingInfo.district} size="small">
                  <InputLabel>Phường/xã</InputLabel>
                  <Select
                    value={shippingInfo.ward}
                    label="Phường/xã"
                    onChange={handleShippingInfoChange('ward')}
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Chọn phường/xã</em>
                    </MenuItem>
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
                  rows={2}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                  placeholder="Ví dụ: Số nhà, tên đường, tòa nhà, số phòng..."
                />
                
                <TextField
                  fullWidth
                  label="Ghi chú (tùy chọn)"
                  value={shippingInfo.note}
                  onChange={handleShippingInfoChange('note')}
                  multiline
                  rows={2}
                  variant="outlined"
                  size="small"
                  placeholder="Ghi chú về địa chỉ giao hàng, thời gian nhận hàng, hướng dẫn giao hàng..."
                />
              </Grid>
            </Grid>

            <Alert severity="info" sx={{ mt: 3, borderRadius: 1, fontSize: '0.875rem' }}>
              <Typography variant="body2">
                <strong>Lưu ý:</strong> Vui lòng nhập chính xác thông tin nhận hàng để đảm bảo đơn hàng được giao đúng địa chỉ và liên hệ khi cần thiết.
              </Typography>
            </Alert>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <CreditCard sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                Phương thức thanh toán
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Chọn cách thức thanh toán phù hợp với bạn
              </Typography>
            </Box>
            
            <FormControl component="fieldset" fullWidth>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <Card
                  sx={{
                    mb: 2,
                    border: paymentMethod === 'cod' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#1976d2',
                    }
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value="cod"
                      control={<Radio color="primary" size="small" />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="body1" fontWeight="600">
                            💵 Thanh toán khi nhận hàng
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Thanh toán bằng tiền mặt khi nhận hàng
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    mb: 2,
                    border: paymentMethod === 'momo' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#1976d2',
                    }
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value="momo"
                      control={<Radio color="primary" size="small" />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="body1" fontWeight="600">
                            📱 Ví điện tử MoMo
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quét QR code để thanh toán nhanh chóng
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    border: paymentMethod === 'banking' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#1976d2',
                    }
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <FormControlLabel
                      value="banking"
                      control={<Radio color="primary" size="small" />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="body1" fontWeight="600">
                            🏦 Chuyển khoản ngân hàng
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Chuyển khoản qua tài khoản ngân hàng
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
              </RadioGroup>
            </FormControl>

            <Alert severity="info" sx={{ mt: 3, borderRadius: 1, fontSize: '0.875rem' }}>
              <VerifiedUser sx={{ mr: 1, fontSize: '18px' }} />
              Thông tin thanh toán của bạn được bảo mật an toàn
            </Alert>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
            {isPlacingOrder ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <CircularProgress size={50} sx={{ mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Đang xử lý đơn hàng...
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Vui lòng chờ trong giây lát
                </Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <AssignmentTurnedIn sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Xác nhận đơn hàng
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Kiểm tra kỹ thông tin trước khi đặt hàng
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocalShipping sx={{ fontSize: '20px' }} /> Thông tin giao hàng
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Box sx={{ '& > *': { mb: 2 } }}>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">Họ và tên</Typography>
                            <Typography variant="body1" fontWeight="600">{shippingInfo.fullName}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">Số điện thoại</Typography>
                            <Typography variant="body1" fontWeight="600">{shippingInfo.phone}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                            <Typography variant="body1" fontWeight="600">{shippingInfo.email}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">Địa chỉ</Typography>
                            <Typography variant="body1" fontWeight="600">
                              {shippingInfo.address}, {
                                wards.find(w => w.id === shippingInfo.ward)?.name
                              }, {
                                districts.find(d => d.id === shippingInfo.district)?.name
                              }, {
                                cities.find(c => c.id === shippingInfo.city)?.name
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Payment sx={{ fontSize: '20px' }} /> Thanh toán
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Chip 
                          label={
                            paymentMethod === 'cod' ? '💵 Thanh toán khi nhận hàng' :
                            paymentMethod === 'momo' ? '📱 Ví điện tử MoMo' :
                            '🏦 Chuyển khoản ngân hàng'
                          }
                          color="primary"
                          variant="filled"
                          sx={{ fontSize: '0.875rem', py: 1.5, px: 2, fontWeight: '600' }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Card>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ShoppingCart sx={{ fontSize: '20px' }} /> Chi tiết đơn hàng
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                <TableCell><strong>Sản phẩm</strong></TableCell>
                                <TableCell align="center"><strong>Số lượng</strong></TableCell>
                                <TableCell align="right"><strong>Thành tiền</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {cartItems.map((item) => (
                                <TableRow key={item.product.id}>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <img 
                                        src={item.product.image} 
                                        alt={item.product.name}
                                        style={{ 
                                          width: 50, 
                                          height: 50, 
                                          objectFit: 'cover',
                                          borderRadius: 1
                                        }}
                                      />
                                      <Box>
                                        <Typography variant="body1" fontWeight="600">
                                          {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          {item.size} • {item.color}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography fontWeight="600">{item.quantity}</Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography fontWeight="600">
                                      {(item.product.price * item.quantity).toLocaleString()}₫
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Box sx={{ mt: 3, p: 3, bgcolor: 'primary.main', borderRadius: 2, color: 'white' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                            <Typography>Tạm tính:</Typography>
                            <Typography>{subtotal.toLocaleString()}₫</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                            <Typography>Phí vận chuyển:</Typography>
                            <Typography>
                              {shippingFee === 0 ? 'MIỄN PHÍ' : `${shippingFee.toLocaleString()}₫`}
                            </Typography>
                          </Box>
                          <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" fontWeight="bold">Tổng cộng:</Typography>
                            <Typography variant="h6" fontWeight="bold">{total.toLocaleString()}₫</Typography>
                          </Box>
                        </Box>

                        {subtotal > 500000 && (
                          <Alert severity="success" sx={{ mt: 2, fontSize: '0.875rem' }}>
                            🎁 Bạn được miễn phí vận chuyển cho đơn hàng trên 500,000₫
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </Grid> */}
                </Grid>
              </>
            )}
          </Box>
        );

      case 3:
        return (
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              px: 2,
              py: 4
            }}
          >
            <Card 
              sx={{ 
                maxWidth: 500,
                width: '100%',
                p: 4,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
              }}
            >
              <CardContent>
                <CheckCircle 
                  sx={{ 
                    fontSize: 64, 
                    color: 'success.main', 
                    mb: 2 
                  }} 
                />
                
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  fontWeight="bold"
                  color="success.main"
                  sx={{ mb: 2 }}
                >
                  Đặt hàng thành công!
                </Typography>

                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ mb: 2 }}
                >
                  Mã đơn hàng: {' '}
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      padding: '6px 12px',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      letterSpacing: 1,
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {orderNumber}
                  </Box>
                </Typography>

                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 4 }}
                >
                  Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi!
                  <br />
                  Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center'
                }}>
                  <Button 
                    variant="contained" 
                    size="medium"
                    onClick={() => navigate('/products')}
                    sx={{ 
                      minWidth: 180,
                      py: 1,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    🛒 Tiếp tục mua sắm
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="medium"
                    onClick={() => navigate('/order-history')}
                    sx={{ 
                      minWidth: 180,
                      py: 1,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    📋 Xem đơn hàng
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Giỏ hàng của bạn đang trống
        </Typography>
        <Button 
          variant="contained" 
          size="medium"
          onClick={() => navigate('/products')} 
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Quay lại mua sắm
        </Button>
      </Container>
    );
  }

  if (activeStep === 3 || orderPlaced) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        {getStepContent(3)}
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
        Thanh Toán
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ '& .MuiStepLabel-label': { fontWeight: 600, fontSize: '0.9rem' } }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent sx={{ py: 3, px: 2 }}>
                {getStepContent(activeStep)}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ position: 'sticky', top: 90, boxShadow: 2, borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold" color="primary">
                  Tóm tắt đơn hàng
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 2 }}>
                  {getCartItemsCount()} sản phẩm
                </Typography>

                <Box sx={{ maxHeight: 150, overflow: 'auto', mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box 
                      key={item.product.id} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1, 
                        mb: 1.5,
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
                          borderRadius: 1
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="600" noWrap fontSize="0.8rem">
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                          Số lượng: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold" fontSize="0.8rem">
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
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold" fontSize="1.1rem">Tổng cộng:</Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold" fontSize="1.1rem">
                    {total.toLocaleString()}₫
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    disabled={isPlacingOrder}
                    startIcon={isPlacingOrder ? <CircularProgress size={16} /> : null}
                    size="medium"
                    sx={{ 
                      py: 1, 
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {isPlacingOrder ? 'Đang xử lý...' : 
                     activeStep === steps.length - 2 ? 'Xác nhận đặt hàng' : 'Tiếp tục'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleBack}
                    disabled={activeStep === 0 || isPlacingOrder}
                    fullWidth
                    size="medium"
                    sx={{ py: 1, fontWeight: '600', fontSize: '0.9rem' }}
                  >
                    Quay lại
                  </Button>
                </Box>

                {subtotal > 500000 && (
                  <Alert severity="success" sx={{ mt: 2, borderRadius: 1, fontSize: '0.75rem', py: 0.5 }}>
                    🎁 Bạn được miễn phí vận chuyển
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Checkout;