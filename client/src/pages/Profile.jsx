import React, { useState, useRef } from 'react';
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
  Alert,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  Fade,
  Zoom,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import { 
  Edit, 
  Save, 
  Cancel, 
  Home, 
  CameraAlt,
  Notifications,
  Palette,
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  VerifiedUser,
  CloudUpload,
  Delete,
  Security,
  Language,
  Work,
  School,
  Link,
  Cake,
  Transgender,
  Badge as BadgeIcon
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = ({ onNavigate }) => {
  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Basic Info
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    
    // Personal Details
    bio: user?.bio || 'Chào mừng bạn đến với trang cá nhân của tôi! 🌟',
    birthday: user?.birthday || '',
    gender: user?.gender || '',
    occupation: user?.occupation || '',
    education: user?.education || '',
    website: user?.website || '',
    
    // Settings
    language: user?.language || 'vi',
    theme: user?.theme || 'light',
    notifications: user?.notifications !== undefined ? user.notifications : true,
    twoFactor: user?.twoFactor || false
  });
  
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data khi cancel
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        bio: user?.bio || 'Chào mừng bạn đến với trang cá nhân của tôi! 🌟',
        birthday: user?.birthday || '',
        gender: user?.gender || '',
        occupation: user?.occupation || '',
        education: user?.education || '',
        website: user?.website || '',
        language: user?.language || 'vi',
        theme: user?.theme || 'light',
        notifications: user?.notifications !== undefined ? user.notifications : true,
        twoFactor: user?.twoFactor || false
      });
      setAvatarPreview(user?.avatar || '');
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

  const handleSwitchChange = (name) => (event) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
        avatar: avatarPreview
      };
      await updateProfile(updatedData);
      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công! 🎉' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra khi cập nhật thông tin! ❌' });
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      setUploadDialogOpen(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Vui lòng chọn file ảnh!' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setMessage({ type: 'error', text: 'Kích thước ảnh không được vượt quá 5MB!' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setUploadDialogOpen(false);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    setUploadDialogOpen(false);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const calculateAge = (birthday) => {
    if (!birthday) return null;
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    return age;
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Zoom in={true}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 3, backgroundColor: 'primary.main', fontSize: '3rem' }}>
              👤
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Tài Khoản Cá Nhân
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
              Vui lòng đăng nhập để xem thông tin tài khoản
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => onNavigate('login')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                '&:hover': { background: 'linear-gradient(135deg, #5a6fd8, #6a4190)' }
              }}
            >
              Đăng nhập ngay
            </Button>
          </Box>
        </Zoom>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Hồ Sơ Cá Nhân
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Quản lý thông tin và cài đặt tài khoản của bạn
          </Typography>
        </Box>
      </Fade>

      {message.text && (
        <Zoom in={true}>
          <Alert severity={message.type} sx={{ mb: 4, borderRadius: 2 }}>
            {message.text}
          </Alert>
        </Zoom>
      )}

      <Grid container spacing={4}>
        {/* Left Side - Profile Overview */}
        <Grid item xs={12} md={4}>
          <Fade in={true} timeout={1000}>
            <Card sx={{ borderRadius: 3, position: 'relative', overflow: 'visible' }}>
              <Box sx={{ 
                height: 120, 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                position: 'relative'
              }}>
                <Box sx={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      isEditing ? (
                        <IconButton
                          sx={{ 
                            backgroundColor: 'primary.main', 
                            color: 'white',
                            width: 40,
                            height: 40,
                            '&:hover': { backgroundColor: 'primary.dark' }
                          }}
                          onClick={handleAvatarClick}
                        >
                          <CameraAlt />
                        </IconButton>
                      ) : null
                    }
                  >
                    <Avatar
                      src={avatarPreview}
                      sx={{
                        width: 120,
                        height: 120,
                        border: '4px solid white',
                        fontSize: '2.5rem',
                        backgroundColor: avatarPreview ? 'transparent' : 'primary.main',
                        cursor: isEditing ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        '&:hover': isEditing ? { transform: 'scale(1.05)' } : {}
                      }}
                      onClick={handleAvatarClick}
                    >
                      {getInitials(formData.name)}
                    </Avatar>
                  </Badge>
                </Box>
              </Box>
              
              <CardContent sx={{ pt: 8, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {formData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {formData.occupation || 'Chưa cập nhật nghề nghiệp'}
                </Typography>
                
                <Chip 
                  icon={<VerifiedUser />} 
                  label="Tài khoản xác thực" 
                  color="success" 
                  size="small" 
                  sx={{ mb: 2 }} 
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip label="Thành viên" size="small" variant="outlined" />
                  <Chip label="Active" size="small" color="success" variant="outlined" />
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={formData.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={formData.phone || 'Chưa cập nhật'} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={formData.address || 'Chưa cập nhật'} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CalendarToday color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={`Tham gia: ${new Date().toLocaleDateString('vi-VN')}`} />
                  </ListItem>
                </List>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Home />}
                  onClick={() => onNavigate('home')}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Về Trang Chủ
                </Button>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Right Side - Content Tabs */}
        <Grid item xs={12} md={8}>
          <Fade in={true} timeout={1200}>
            <Card sx={{ borderRadius: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  variant="scrollable" 
                  scrollButtons="auto"
                  sx={{
                    px: 2,
                    '& .MuiTab-root': {
                      minHeight: 60,
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }
                  }}
                >
                  <Tab icon={<Person />} label="Thông tin cá nhân" />
                  <Tab icon={<BadgeIcon />} label="Chi tiết cá nhân" />
                  <Tab icon={<Security />} label="Bảo mật" />
                  <Tab icon={<Palette />} label="Cài đặt" />
                </Tabs>
              </Box>

              {/* Basic Information Tab */}
              <TabPanel value={activeTab} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Thông Tin Cá Nhân
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quản lý thông tin cơ bản của bạn
                    </Typography>
                  </Box>
                  <Button
                    variant={isEditing ? "outlined" : "contained"}
                    startIcon={isEditing ? <Cancel /> : <Edit />}
                    onClick={handleEditToggle}
                    color={isEditing ? "error" : "primary"}
                    size="medium"
                    sx={{ minWidth: 120 }}
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
                      variant="outlined"
                      sx={{ mb: 2 }}
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
                      variant="outlined"
                      sx={{ mb: 2 }}
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
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      multiline
                      rows={2}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Giới thiệu bản thân"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="Hãy chia sẻ đôi điều về bản thân bạn..."
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button 
                      variant="outlined" 
                      onClick={handleEditToggle}
                      sx={{ minWidth: 100 }}
                    >
                      Hủy
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />} 
                      onClick={handleSave}
                      sx={{ minWidth: 140 }}
                    >
                      Lưu Thay Đổi
                    </Button>
                  </Box>
                )}
              </TabPanel>

              {/* Personal Details Tab */}
              <TabPanel value={activeTab} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Thông Tin Chi Tiết
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cập nhật thông tin cá nhân của bạn
                    </Typography>
                  </Box>
                  <Button
                    variant={isEditing ? "outlined" : "contained"}
                    startIcon={isEditing ? <Cancel /> : <Edit />}
                    onClick={handleEditToggle}
                    color={isEditing ? "error" : "primary"}
                    size="medium"
                    sx={{ minWidth: 120 }}
                  >
                    {isEditing ? 'Hủy' : 'Chỉnh Sửa'}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ngày sinh"
                      name="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    {formData.birthday && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        {calculateAge(formData.birthday)} tuổi
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giới tính"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    >
                      <option value=""></option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nghề nghiệp"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Học vấn"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website cá nhân"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      variant="outlined"
                      placeholder="https://..."
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button 
                      variant="outlined" 
                      onClick={handleEditToggle}
                      sx={{ minWidth: 100 }}
                    >
                      Hủy
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />} 
                      onClick={handleSave}
                      sx={{ minWidth: 140 }}
                    >
                      Lưu Thay Đổi
                    </Button>
                  </Box>
                )}
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={activeTab} index={2}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Bảo Mật Tài Khoản
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        <BadgeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Xác thực 2 yếu tố" 
                        secondary="Bảo vệ tài khoản của bạn bằng xác thực 2 bước" 
                      />
                      <Switch
                        checked={formData.twoFactor}
                        onChange={handleSwitchChange('twoFactor')}
                        disabled={!isEditing}
                      />
                    </ListItem>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        <Notifications color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Thông báo bảo mật" 
                        secondary="Nhận thông báo khi có hoạt động đáng ngờ" 
                      />
                      <Switch
                        checked={formData.notifications}
                        onChange={handleSwitchChange('notifications')}
                        disabled={!isEditing}
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box sx={{ p: 3, backgroundColor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    💡 <strong>Mẹo bảo mật:</strong> Luôn sử dụng mật khẩu mạnh, không chia sẻ thông tin đăng nhập và bật xác thực 2 yếu tố để bảo vệ tài khoản tốt hơn.
                  </Typography>
                </Box>

                {isEditing && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button 
                      variant="outlined" 
                      onClick={handleEditToggle}
                      sx={{ minWidth: 100 }}
                    >
                      Hủy
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />} 
                      onClick={handleSave}
                      sx={{ minWidth: 140 }}
                    >
                      Lưu Thay Đổi
                    </Button>
                  </Box>
                )}
              </TabPanel>

              {/* Settings Tab */}
              <TabPanel value={activeTab} index={3}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Cài Đặt Ứng Dụng
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        <Language color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Ngôn ngữ" 
                        secondary="Tiếng Việt" 
                      />
                      <Chip label="VI" size="small" color="primary" />
                    </ListItem>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        <Palette color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Chế độ hiển thị" 
                        secondary="Giao diện sáng/tối" 
                      />
                      <Switch
                        checked={formData.theme === 'dark'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          theme: e.target.checked ? 'dark' : 'light'
                        }))}
                        disabled={!isEditing}
                      />
                    </ListItem>
                  </List>
                </Box>

                {isEditing && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Button 
                      variant="outlined" 
                      onClick={handleEditToggle}
                      sx={{ minWidth: 100 }}
                    >
                      Hủy
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />} 
                      onClick={handleSave}
                      sx={{ minWidth: 140 }}
                    >
                      Lưu Thay Đổi
                    </Button>
                  </Box>
                )}
              </TabPanel>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      {/* Avatar Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', pb: 2 }}>
          Thay đổi ảnh đại diện
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Avatar
              src={avatarPreview}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                fontSize: '3rem',
                backgroundColor: avatarPreview ? 'transparent' : 'primary.main'
              }}
            >
              {getInitials(formData.name)}
            </Avatar>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Chọn ảnh từ thiết bị của bạn (JPG, PNG, tối đa 5MB)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 3, pt: 0 }}>
          <Button 
            variant="outlined" 
            startIcon={<Delete />} 
            onClick={handleRemoveAvatar} 
            color="error"
            sx={{ minWidth: 120 }}
          >
            Xóa Ảnh
          </Button>
          <Button 
            variant="contained" 
            component="label" 
            startIcon={<CloudUpload />}
            sx={{ minWidth: 140 }}
          >
            Tải Ảnh Lên
            <input type="file" hidden accept="image/*" onChange={handleFileUpload} ref={fileInputRef} />
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;