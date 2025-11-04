import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  Chip,
  Divider,
  alpha
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Contact form data:', data);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 30, color: '#667eea' }} />,
      title: 'Điện Thoại',
      content: '+84 123 456 789',
      description: 'Thứ 2 - Thứ 6: 8:00 - 17:00'
    },
    {
      icon: <Email sx={{ fontSize: 30, color: '#667eea' }} />,
      title: 'Email',
      content: 'support@fashionstore.com',
      description: 'Chúng tôi phản hồi trong 24h'
    },
    {
      icon: <LocationOn sx={{ fontSize: 30, color: '#667eea' }} />,
      title: 'Địa Chỉ',
      content: '123 Nguyễn Văn Linh, Quận 7',
      description: 'TP. Hồ Chí Minh, Việt Nam'
    },
    {
      icon: <AccessTime sx={{ fontSize: 30, color: '#667eea' }} />,
      title: 'Giờ Làm Việc',
      content: 'Thứ 2 - Chủ Nhật',
      description: '8:00 - 22:00'
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, name: 'Facebook', color: '#1877F2', url: '#' },
    { icon: <Instagram />, name: 'Instagram', color: '#E4405F', url: '#' },
    { icon: <Twitter />, name: 'Twitter', color: '#1DA1F2', url: '#' },
    { icon: <LinkedIn />, name: 'LinkedIn', color: '#0A66C2', url: '#' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6, minHeight: '80vh' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip 
          label="Liên Hệ" 
          color="primary" 
          sx={{ 
            mb: 2,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            px: 2,
            py: 1
          }} 
        />
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Liên Hệ Với Chúng Tôi
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
        >
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. 
          Hãy liên hệ nếu bạn có bất kỳ câu hỏi nào.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
              Thông Tin Liên Hệ
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Liên hệ với chúng tôi qua các phương thức dưới đây. 
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
            </Typography>
          </Box>

          {contactInfo.map((item, index) => (
            <Card 
              key={index}
              sx={{ 
                p: 3, 
                mb: 2, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                  borderColor: '#667eea'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 2, 
                  background: alpha('#667eea', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium" color="primary" gutterBottom>
                    {item.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}

          {/* Social Media Links */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Theo Dõi Chúng Tôi
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  startIcon={social.icon}
                  sx={{
                    borderRadius: 3,
                    borderColor: alpha(social.color, 0.3),
                    color: social.color,
                    fontWeight: 'medium',
                    '&:hover': {
                      borderColor: social.color,
                      background: alpha(social.color, 0.04),
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.open(social.url, '_blank')}
                >
                  {social.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={8} 
            sx={{ 
              p: 4, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
              Gửi Tin Nhắn Cho Chúng Tôi
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.
            </Typography>

            {isSubmitted && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  background: alpha('#4caf50', 0.1),
                  border: '1px solid',
                  borderColor: 'success.light'
                }}
              >
                Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. 
                Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và Tên"
                    {...register('name', {
                      required: 'Vui lòng nhập họ và tên',
                      minLength: {
                        value: 2,
                        message: 'Họ tên phải có ít nhất 2 ký tự'
                      }
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email', {
                      required: 'Vui lòng nhập email',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email không hợp lệ'
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số Điện Thoại"
                    {...register('phone', {
                      required: 'Vui lòng nhập số điện thoại',
                      pattern: {
                        value: /^[0-9+\-\s()]{10,}$/,
                        message: 'Số điện thoại không hợp lệ'
                      }
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Chủ Đề"
                    {...register('subject', {
                      required: 'Vui lòng nhập chủ đề',
                      minLength: {
                        value: 5,
                        message: 'Chủ đề phải có ít nhất 5 ký tự'
                      }
                    })}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Nội Dung Tin Nhắn"
                    {...register('message', {
                      required: 'Vui lòng nhập nội dung tin nhắn',
                      minLength: {
                        value: 10,
                        message: 'Nội dung tin nhắn phải có ít nhất 10 ký tự'
                      }
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    sx={{
                      py: 1.5,
                      px: 4,
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
                    Gửi Tin Nhắn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Box sx={{ mt: 6 }}>
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Vị Trí Cửa Hàng
          </Typography>


          <Box sx={{ mt: 4 }}>
  <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
    📍 Vị Trí Cửa Hàng
  </Typography>
  
  <Card 
    sx={{ 
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      border: '1px solid',
      borderColor: 'divider'
    }}
  >
    {/* Google Maps Embed */}
    <Box
      sx={{
        height: 400,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485731472647!2d106.69244877569678!3d10.859802889292297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c17978287d%3A0xec48f5a17b7d5741!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ3V54buFbiBU4bqldCBUaMO0bmcgLSBDxrDhu6NjIGPhu6UgcXXhu5FjIDEy!5e0!3m2!1svi!2s!4v1699280000000!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'saturate(1.1) contrast(1.1)'
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Fashion Store Location - Đại học Nguyễn Tất Thành"
      />
      
      {/* Overlay Info Card */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          p: 2,
          maxWidth: 280,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              background: '#4CAF50',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}
          />
          <Typography variant="subtitle2" fontWeight="bold" color="success.main">
            Đang mở cửa
          </Typography>
        </Box>
        
        <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
          🏪 Fashion Store NTTU
        </Typography>
        
        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
          📍 298-300A Nguyễn Tất Thành, Phường 13, Quận 4
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Khuôn viên Trường ĐH Nguyễn Tất Thành - Cơ sở Quận 4
        </Typography>

        {/* Quick Info */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            icon={<span>🕒</span>}
            label="8:00 - 22:00"
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<span>📞</span>}
            label="028 3941 1211"
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<span>🚗</span>}
            label="Đỗ xe miễn phí"
            size="small"
            variant="outlined"
          />
        </Box>

        <Button
          variant="contained"
          size="small"
          fullWidth
          startIcon={<span>🧭</span>}
          sx={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: 2,
            fontWeight: 'bold',
            textTransform: 'none'
          }}
          onClick={() => window.open('https://maps.google.com/?q=10.8598029,106.6946237', '_blank')}
        >
          Chỉ đường với Google Maps
        </Button>
      </Box>

      {/* Floating University Badge */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          background: 'rgba(102, 126, 234, 0.9)',
          color: 'white',
          borderRadius: 3,
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            background: '#FFD93D',
            borderRadius: '50%',
            animation: 'pulse 1.5s infinite'
          }}
        />
        <Typography variant="caption" fontWeight="bold">
          📚 Khu Đại Học
        </Typography>
      </Box>
    </Box>

    {/* Location Details */}
    <Box sx={{ p: 3, background: 'white' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            🏬 Thông Tin Cửa Hàng
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>📍</span>
              <Typography variant="body2">
                <strong>Địa chỉ:</strong> 298-300A Nguyễn Tất Thành, P.13, Q.4, TP.HCM
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>🏫</span>
              <Typography variant="body2">
                <strong>Vị trí:</strong> Trong khuôn viên ĐH Nguyễn Tất Thành
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>🕒</span>
              <Typography variant="body2">
                <strong>Giờ mở cửa:</strong> Thứ 2 - Chủ Nhật: 8:00 - 22:00
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>📞</span>
              <Typography variant="body2">
                <strong>Hotline:</strong> 028 3941 1211
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            🚗 Hướng Dẫn Đường Đi
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">
              • <strong>Từ trung tâm Q1:</strong> Qua cầu Khánh Hội → Nguyễn Tất Thành
            </Typography>
            <Typography variant="body2">
              • <strong>Phương tiện:</strong> Xe bus số 03, 10, 56, 93
            </Typography>
            <Typography variant="body2">
              • <strong>Đỗ xe:</strong> Miễn phí trong khuôn viên trường
            </Typography>
            <Typography variant="body2">
              • <strong>Metro:</strong> Ga Ba Son (tuyến 1) - đi bộ 15 phút
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<span>🧭</span>}
          sx={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: 2,
            px: 3,
            fontWeight: 'bold'
          }}
          onClick={() => window.open('https://maps.google.com/?q=10.8598029,106.6946237', '_blank')}
        >
          Mở Google Maps
        </Button>
        <Button
          variant="outlined"
          startIcon={<span>📞</span>}
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 'bold'
          }}
          onClick={() => window.open('tel:02839411211')}
        >
          Gọi ngay
        </Button>
        <Button
          variant="outlined"
          startIcon={<span>🚗</span>}
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 'bold'
          }}
          onClick={() => window.open('https://www.google.com/maps/dir//10.8598029,106.6946237', '_blank')}
        >
          Chỉ đường
        </Button>
      </Box>
    </Box>
  </Card>

  {/* Global Styles for Animations */}
  <style jsx global>{`
    @keyframes pulse {
      0%, 100% { 
        opacity: 1; 
        transform: scale(1);
      }
      50% { 
        opacity: 0.7; 
        transform: scale(1.1);
      }
    }
  `}</style>
</Box>




          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            *Tích hợp Google Maps để hiển thị vị trí chính xác của cửa hàng*
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default Contact;