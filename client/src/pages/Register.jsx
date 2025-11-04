import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Grid,
  Fade,
  Zoom,
  Card,
  Chip,
  Stepper,
  Step,
  StepLabel,
  alpha
} from '@mui/material';
import { 
  Person, 
  Email, 
  Lock,
  CheckCircle,
  Visibility,
  VisibilityOff,
  HowToReg,
  Security,
  Star,
  VerifiedUser,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const { register: registerUser, emailVerificationSent, setEmailVerificationSent } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');
  const name = watch('name');
  const email = watch('email');

  const steps = [
    'Thông tin cá nhân',
    'Tài khoản & Bảo mật',
    'Xác nhận đăng ký'
  ];

  const handleNext = async () => {
    let isValid = false;
    
    if (activeStep === 0) {
      isValid = await trigger(['name', 'email']);
    } else if (activeStep === 1) {
      isValid = await trigger(['password', 'confirmPassword']);
    }
    
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormError('');
    
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (!result.success) {
        setFormError(result.error || 'Đăng ký thất bại. Vui lòng thử lại.');
        setActiveStep(1);
      }
    } catch (error) {
      console.error('Register error:', error);
      setFormError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
      setActiveStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleRegisterAnother = () => {
    setEmailVerificationSent(false);
    reset();
    setFormError('');
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              size="medium"
              label="Họ và tên"
              {...register('name', {
                required: 'Họ tên là bắt buộc',
                minLength: {
                  value: 2,
                  message: 'Họ tên phải có ít nhất 2 ký tự'
                }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ fontSize: 22, color: '#667eea' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                  fontWeight: 'bold'
                }
              }}
              placeholder="Nhập họ và tên đầy đủ"
            />

            <TextField
              fullWidth
              size="medium"
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email là bắt buộc',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email không hợp lệ'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ fontSize: 22, color: '#667eea' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                  fontWeight: 'bold'
                }
              }}
              placeholder="example@email.com"
            />

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Chip 
                icon={<Star sx={{ fontSize: 16 }} />} 
                label="Bước 1/3" 
                variant="outlined" 
                color="primary"
                size="small"
              />
              <Chip 
                label="Thông tin cơ bản" 
                variant="filled" 
                color="primary"
                size="small"
                sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ width: '100%' }}>
            <TextField
              fullWidth
              size="medium"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ fontSize: 22, color: '#667eea' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ 
                        color: '#667eea',
                        '&:hover': {
                          background: alpha('#667eea', 0.1),
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                  fontWeight: 'bold'
                }
              }}
              placeholder="Ít nhất 6 ký tự với chữ hoa, thường và số"
            />

            <TextField
              fullWidth
              size="medium"
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Vui lòng xác nhận mật khẩu',
                validate: value => 
                  value === password || 'Mật khẩu xác nhận không khớp'
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ fontSize: 22, color: '#667eea' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                      sx={{ 
                        color: '#667eea',
                        '&:hover': {
                          background: alpha('#667eea', 0.1),
                        }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                  fontWeight: 'bold'
                }
              }}
              placeholder="Nhập lại mật khẩu"
            />

            {/* Password Strength Indicator */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Độ mạnh mật khẩu:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                {[1, 2, 3, 4].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: password?.length >= index * 2 ? 
                        (password?.length >= 8 ? '#4caf50' : 
                         password?.length >= 6 ? '#ff9800' : '#f44336') : 
                        'grey.300',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {!password ? 'Nhập mật khẩu' : 
                 password.length < 6 ? 'Quá ngắn' :
                 password.length >= 8 ? 'Mạnh' : 'Trung bình'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                icon={<Security sx={{ fontSize: 16 }} />} 
                label="Bước 2/3" 
                variant="outlined" 
                color="primary"
                size="small"
              />
              <Chip 
                label="Bảo mật tài khoản" 
                variant="filled" 
                color="primary"
                size="small"
                sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ width: '100%' }}>
            <Card
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                border: '2px solid',
                borderColor: 'primary.light',
                textAlign: 'center'
              }}
            >
              <VerifiedUser sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                Xác Nhận Thông Tin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vui lòng kiểm tra kỹ thông tin trước khi đăng ký
              </Typography>
            </Card>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Thông tin cá nhân
              </Typography>
              <Card variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <Typography variant="body1" fontWeight="medium">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {email}
                </Typography>
              </Card>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Bảo mật tài khoản
              </Typography>
              <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="body2" color="success.main" fontWeight="medium">
                  ✓ Mật khẩu đã được thiết lập bảo mật
                </Typography>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                icon={<CheckCircle sx={{ fontSize: 16 }} />} 
                label="Bước 3/3" 
                variant="outlined" 
                color="primary"
                size="small"
              />
              <Chip 
                label="Xác nhận cuối cùng" 
                variant="filled" 
                color="primary"
                size="small"
                sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              />
            </Box>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  if (emailVerificationSent) {
    return (
      <Container 
        component="main" 
        maxWidth="sm" 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Zoom in={true} timeout={500}>
          <Card
            sx={{
              padding: 4,
              textAlign: 'center',
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: 450,
              mx: 'auto'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
              }}
            >
              <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              🎉 Đăng Ký Thành Công!
            </Typography>
            
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                textAlign: 'center',
                py: 1,
                background: alpha('#4caf50', 0.1),
                border: '1px solid',
                borderColor: 'success.light'
              }}
            >
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Email xác thực đã được gửi đến:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                {email}
              </Typography>
            </Alert>

            <Typography 
              variant="body2" 
              color="text.secondary" 
              paragraph 
              sx={{ 
                mb: 3,
                textAlign: 'center',
                lineHeight: 1.6
              }}
            >
              Vui lòng kiểm tra hộp thư của bạn và nhấp vào liên kết xác thực để kích hoạt tài khoản.
              <br />
              <strong>Lưu ý:</strong> Kiểm tra cả thư mục spam nếu bạn không thấy email.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                onClick={handleNavigateToLogin}
                size="large"
                variant="contained"
                startIcon={<HowToReg />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Đến Trang Đăng Nhập
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleRegisterAnother}
                size="large"
                sx={{ 
                  borderRadius: 3, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Đăng Ký Tài Khoản Khác
              </Button>
            </Box>
          </Card>
        </Zoom>
      </Container>
    );
  }

  return (
    <Container 
      component="main" 
      maxWidth="lg" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)',
        }
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          animation: 'float 8s ease-in-out infinite 2s',
        }}
      />

      <Fade in={true} timeout={1000}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            {/* Left Side - Illustration */}
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: 'center', color: 'white' }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <HowToReg sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    textShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  Chào Mừng!
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    mb: 4,
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Bắt đầu hành trình của bạn với chúng tôi
                </Typography>
                
                <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                  <Stepper activeStep={activeStep} orientation="vertical" sx={{ 
                    '& .MuiStepLabel-root .Mui-completed': {
                      color: 'white',
                    },
                    '& .MuiStepLabel-root .Mui-active': {
                      color: 'white',
                      fontWeight: 'bold'
                    },
                    '& .MuiStepLabel-label': {
                      color: 'white !important',
                      fontSize: '1rem',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }
                  }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
            </Grid>

            {/* Right Side - Form Section */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={24}
                  sx={{
                    padding: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    width: '100%',
                    maxWidth: 500,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    }
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        zIndex: -1,
                        filter: 'blur(8px)',
                        opacity: 0.6
                      }
                    }}
                  >
                    <HowToReg sx={{ fontSize: 32, color: 'white' }} />
                  </Box>

                  <Typography 
                    component="h1" 
                    variant="h4" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textAlign: 'center',
                      mb: 1
                    }}
                  >
                    Đăng Ký Tài Khoản
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ mb: 4, textAlign: 'center' }}
                  >
                    Tạo tài khoản để trải nghiệm dịch vụ tốt nhất
                  </Typography>

                  {/* Progress Bar */}
                  <Box sx={{ width: '100%', mb: 3 }}>
                    <Box 
                      sx={{ 
                        height: 6, 
                        background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        borderRadius: 3,
                        width: `${((activeStep + 1) / steps.length) * 100}%`,
                        transition: 'width 0.5s ease',
                        mb: 1,
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                      }} 
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right', display: 'block' }}>
                      Bước {activeStep + 1} của {steps.length}
                    </Typography>
                  </Box>

                  {/* Form Error */}
                  {formError && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        width: '100%', 
                        mb: 3,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'error.light',
                        background: alpha('#ffebee', 0.8),
                        backdropFilter: 'blur(10px)',
                        textAlign: 'center',
                        py: 1
                      }}
                    >
                      <Typography variant="body2" fontWeight="medium">{formError}</Typography>
                    </Alert>
                  )}

                  {/* Register Form */}
                  <Box 
                    component="form" 
                    onSubmit={handleSubmit(onSubmit)} 
                    sx={{ width: '100%' }}
                  >
                    {getStepContent(activeStep)}

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2 }}>
                      <Button
                        onClick={handleBack}
                        disabled={activeStep === 0 || isLoading}
                        startIcon={<ArrowBack />}
                        sx={{
                          borderRadius: 3,
                          px: 3,
                          py: 1.5,
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          visibility: activeStep === 0 ? 'hidden' : 'visible',
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2,
                          }
                        }}
                        variant="outlined"
                      >
                        Quay Lại
                      </Button>

                      {activeStep === steps.length - 1 ? (
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isLoading}
                          endIcon={!isLoading && <ArrowForward />}
                          sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                            },
                            '&:disabled': {
                              background: 'grey.400',
                              transform: 'none',
                              boxShadow: 'none',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            'Hoàn Thành Đăng Ký'
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          variant="contained"
                          endIcon={<ArrowForward />}
                          sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Tiếp Theo
                        </Button>
                      )}
                    </Box>

                    {/* Login Link */}
                    <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" color="text.secondary">
                        Đã có tài khoản?{' '}
                        <Link 
                          to="/login"
                          style={{ 
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.textDecoration = 'none';
                          }}
                        >
                          Đăng nhập ngay
                        </Link>
                      </Typography>
                    </Box>
                  </Box>

                  {/* Security Footer */}
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      mt: 4,
                      backgroundColor: 'rgba(102, 126, 234, 0.08)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                      width: '100%',
                      borderRadius: 3,
                      textAlign: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Security sx={{ fontSize: 18, color: '#667eea' }} />
                      <Typography variant="caption" color="primary.main" fontWeight="bold">
                        🔒 Thông tin của bạn được mã hóa và bảo mật an toàn
                      </Typography>
                    </Box>
                  </Paper>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Container>
  );
};

export default Register;