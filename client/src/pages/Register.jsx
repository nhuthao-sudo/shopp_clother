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
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock,
  Person,
  HowToReg,
  Google,
  Facebook,
  GitHub
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { register: registerUser, loading, emailVerificationSent, setEmailVerificationSent } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');
  const watchedName = watch('name');

  const onSubmit = async (data) => {
    setFormError('');
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (!result.success) {
        setFormError(result.error || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Register error:', error);
      setFormError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialRegister = (provider) => {
    setFormError(`Tính năng đăng ký với ${provider} đang được phát triển`);
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleRegisterAnother = () => {
    setEmailVerificationSent(false);
    reset();
    setFormError('');
  };

  if (emailVerificationSent) {
    return (
      <Container 
        component="main" 
        maxWidth={false}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Fade in={true} timeout={1000}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
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
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
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
                    mb: 3,
                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
                  }}
                >
                  <HowToReg sx={{ fontSize: 40, color: 'white' }} />
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
                    background: alpha('#4caf50', 0.1),
                    border: '1px solid',
                    borderColor: 'success.light'
                  }}
                >
                  <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Email xác thực đã được gửi đến:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                    {watchedEmail}
                  </Typography>
                </Alert>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Vui lòng kiểm tra hộp thư của bạn và nhấp vào liên kết xác thực để kích hoạt tài khoản.
                  <br />
                  <strong>Lưu ý:</strong> Kiểm tra cả thư mục spam nếu bạn không thấy email.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                  <Button
                    fullWidth
                    onClick={handleNavigateToLogin}
                    size="large"
                    variant="contained"
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
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    );
  }

  return (
    <Container 
      component="main" 
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
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
          animation: 'float 8s ease-in-out infinite',
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
          animation: 'float 10s ease-in-out infinite 2s',
        }}
      />

      <Fade in={true} timeout={1000}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper
              elevation={24}
              sx={{
                padding: { xs: 3, md: 5 },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                minHeight: 600,
                position: 'relative',
              }}
            >
              {/* Decorative Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                }}
              />
              
              {/* Left Side - Branding */}
              <Box
                sx={{
                  flex: 1,
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 3,
                  marginRight: 4,
                  color: 'white',
                  textAlign: 'center',
                  minHeight: 500,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  }}
                />
                
                <HowToReg 
                  sx={{ 
                    fontSize: 80, 
                    mb: 3,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }} 
                />
                
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    mb: 2
                  }}
                >
                  BẮT ĐẦU
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    mb: 4,
                    fontWeight: 300
                  }}
                >
                  Tạo tài khoản để khám phá thế giới tuyệt vời
                </Typography>
                
                <Box
                  sx={{
                    width: '80%',
                    height: 4,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                    mb: 3
                  }}
                />
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.8,
                    fontStyle: 'italic',
                    fontSize: '0.9rem'
                  }}
                >
                  "Tham gia cộng đồng của chúng tôi ngay hôm nay"
                </Typography>
              </Box>

              {/* Right Side - Register Form */}
              <Box sx={{ flex: 1, width: '100%', position: 'relative' }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      mx: 'auto',
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
                    }}
                  >
                    Đăng Ký
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Tạo tài khoản mới để bắt đầu hành trình
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
                      '& .MuiAlert-message': {
                        width: '100%',
                        textAlign: 'center'
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {formError}
                    </Typography>
                  </Alert>
                )}

                {/* Register Form */}
                <Box 
                  component="form" 
                  onSubmit={handleSubmit(onSubmit)} 
                  sx={{ width: '100%' }}
                >
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
                          <Person sx={{ fontSize: 22 }} color={errors.name ? "error" : "primary"} />
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
                          borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.95rem',
                        '&.Mui-focused': {
                          color: '#667eea',
                          fontWeight: 'bold',
                        },
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
                          <Email sx={{ fontSize: 22 }} color={errors.email ? "error" : "primary"} />
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
                          borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.95rem',
                        '&.Mui-focused': {
                          color: '#667eea',
                          fontWeight: 'bold',
                        },
                      }
                    }}
                    placeholder="nhập.email@example.com"
                  />
                  
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
                          <Lock sx={{ fontSize: 22 }} color={errors.password ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="medium"
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{
                              color: errors.password ? 'error.main' : 'primary.main',
                              '&:hover': {
                                background: alpha('#667eea', 0.1),
                              }
                            }}
                          >
                            {showPassword ? 
                              <VisibilityOff sx={{ fontSize: 20 }} /> : 
                              <Visibility sx={{ fontSize: 20 }} />
                            }
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
                          borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.95rem',
                        '&.Mui-focused': {
                          color: '#667eea',
                          fontWeight: 'bold',
                        },
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
                        value === watchedPassword || 'Mật khẩu xác nhận không khớp'
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ fontSize: 22 }} color={errors.confirmPassword ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="medium"
                            aria-label="toggle confirm password visibility"
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                            sx={{
                              color: errors.confirmPassword ? 'error.main' : 'primary.main',
                              '&:hover': {
                                background: alpha('#667eea', 0.1),
                              }
                            }}
                          >
                            {showConfirmPassword ? 
                              <VisibilityOff sx={{ fontSize: 20 }} /> : 
                              <Visibility sx={{ fontSize: 20 }} />
                            }
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
                          borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.95rem',
                        '&.Mui-focused': {
                          color: '#667eea',
                          fontWeight: 'bold',
                        },
                      }
                    }}
                    placeholder="Nhập lại mật khẩu"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      mb: 3,
                      background: `linear-gradient(135deg, ${watchedName && watchedEmail && watchedPassword ? '#667eea' : '#ccc'}, ${watchedName && watchedEmail && watchedPassword ? '#764ba2' : '#999'})`,
                      boxShadow: watchedName && watchedEmail && watchedPassword ? 
                        '0 6px 20px rgba(102, 126, 234, 0.4)' : 
                        '0 2px 8px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        background: watchedName && watchedEmail && watchedPassword ? 
                          'linear-gradient(135deg, #5a6fd8, #6a4190)' : 
                          'linear-gradient(135deg, #ccc, #999)',
                        transform: watchedName && watchedEmail && watchedPassword ? 
                          'translateY(-2px)' : 'none',
                        boxShadow: watchedName && watchedEmail && watchedPassword ? 
                          '0 8px 25px rgba(102, 126, 234, 0.6)' : 
                          '0 2px 8px rgba(0, 0, 0, 0.1)',
                      },
                      '&:disabled': {
                        background: 'grey.400',
                        transform: 'none',
                        boxShadow: 'none',
                      },
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover::before': {
                        left: '100%',
                      }
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Đăng Ký'
                    )}
                  </Button>

                  {/* Social Register */}
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      textAlign="center" 
                      sx={{ mb: 2 }}
                    >
                      Hoặc đăng ký với
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      {[
                        { icon: Google, color: '#DB4437', label: 'Google' },
                        { icon: Facebook, color: '#4267B2', label: 'Facebook' },
                        { icon: GitHub, color: '#333', label: 'GitHub' }
                      ].map((social, index) => (
                        <IconButton
                          key={social.label}
                          onClick={() => handleSocialRegister(social.label)}
                          sx={{
                            width: 50,
                            height: 50,
                            background: `linear-gradient(135deg, ${social.color}, ${social.color}dd)`,
                            color: 'white',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: `0 8px 20px ${alpha(social.color, 0.4)}`,
                              background: `linear-gradient(135deg, ${social.color}, ${social.color})`
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {<social.icon />}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>

                  {/* Login Link */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      Đã có tài khoản?
                    </Typography>
                    <Link 
                      to="/login"
                      style={{
                        display: 'inline-block',
                        padding: '12px 32px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: 25,
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      Đăng nhập ngay
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Fade>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Container>
  );
};

export default Register;