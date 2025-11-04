import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  TextField,
  Grid,
  Avatar,
  Divider,
  Alert
} from '@mui/material';
import { Edit, Save, Cancel, Home } from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';

const Profile = ({ onNavigate }) => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
      });
    }
    setIsEditing(!isEditing);
    setMessage({ type: '', text: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra khi cập nhật thông tin!' });
    }
  };

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tài Khoản
        </Typography>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Vui lòng đăng nhập để xem thông tin tài khoản
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => onNavigate('login')}
          >
            Đăng nhập
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Tài Khoản Cá Nhân
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                  Thông Tin Cá Nhân
                </Typography>
                <Button
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  onClick={handleEditToggle}
                  color={isEditing ? "error" : "primary"}
                >
                  {isEditing ? 'Hủy' : 'Chỉnh Sửa'}
                </Button>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={handleEditToggle}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Lưu Thay Đổi
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  backgroundColor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {user.name || 'Chưa cập nhật'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thành viên từ: {new Date().toLocaleDateString('vi-VN')}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" gutterBottom>
                  📞 {user.phone || 'Chưa cập nhật'}
                </Typography>
                <Typography variant="body2">
                  📍 {user.address || 'Chưa cập nhật'}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<Home />}
                onClick={() => onNavigate('home')}
                sx={{ mt: 3 }}
              >
                Về Trang Chủ
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;