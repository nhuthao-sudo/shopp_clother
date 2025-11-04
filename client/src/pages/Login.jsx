import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  Google,
  Facebook,
  GitHub
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const { login, loading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    const { user } = useAuthStore.getState();
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else {
      navigate(from, { replace: true });
    }
    return null;
  }

  const onSubmit = async (data) => {
    setFormError('');
    try {
      const result = await login(data.email, data.password);
      if (result.success && result.user) {
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setFormError(result.error || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setFormError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    setFormError(`Tính năng đăng nhập với ${provider} đang được phát triển`);
  };

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

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
          animation: 'float 6s ease-in-out infinite',
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
                
                <Person 
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
                  CHÀO MỪNG
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9,
                    mb: 4,
                    fontWeight: 300
                  }}
                >
                  Đăng nhập để khám phá thế giới tuyệt vời
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
                  "Trải nghiệm dịch vụ độc đáo của chúng tôi"
                </Typography>
              </Box>

              {/* Right Side - Login Form */}
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
                    <Person sx={{ fontSize: 32, color: 'white' }} />
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
                    Đăng Nhập
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục
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

                {/* Login Form */}
                <Box 
                  component="form" 
                  onSubmit={handleSubmit(onSubmit)} 
                  sx={{ width: '100%' }}
                >
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
                      mb: 1,
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
                    placeholder="Nhập mật khẩu của bạn"
                  />

                  {/* Forgot Password */}
                  <Box sx={{ textAlign: 'right', mb: 3 }}>
                    <Link 
                      to="/forgot-password"
                      style={{
                        color: '#667eea',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.textDecoration = 'underline';
                        e.target.style.color = '#764ba2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.textDecoration = 'none';
                        e.target.style.color = '#667eea';
                      }}
                    >
                      Quên mật khẩu?
                    </Link>
                  </Box>

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
                      background: `linear-gradient(135deg, ${watchedEmail && watchedPassword ? '#667eea' : '#ccc'}, ${watchedEmail && watchedPassword ? '#764ba2' : '#999'})`,
                      boxShadow: watchedEmail && watchedPassword ? 
                        '0 6px 20px rgba(102, 126, 234, 0.4)' : 
                        '0 2px 8px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        background: watchedEmail && watchedPassword ? 
                          'linear-gradient(135deg, #5a6fd8, #6a4190)' : 
                          'linear-gradient(135deg, #ccc, #999)',
                        transform: watchedEmail && watchedPassword ? 
                          'translateY(-2px)' : 'none',
                        boxShadow: watchedEmail && watchedPassword ? 
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
                      'Đăng Nhập'
                    )}
                  </Button>

                  {/* Social Login */}
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      textAlign="center" 
                      sx={{ mb: 2 }}
                    >
                      Hoặc đăng nhập với
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      {[
                        { icon: Google, color: '#DB4437', label: 'Google' },
                        { icon: Facebook, color: '#4267B2', label: 'Facebook' },
                        { icon: GitHub, color: '#333', label: 'GitHub' }
                      ].map((social, index) => (
                        <IconButton
                          key={social.label}
                          onClick={() => handleSocialLogin(social.label)}
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

                  {/* Register Link */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      Chưa có tài khoản?
                    </Typography>
                    <Link 
                      to="/register"
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
                      Tạo tài khoản mới
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

export default Login;