import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  alpha,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Paper,
  ListItemIcon,
  Divider,
  ClickAwayListener,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Search,
  Person,
  Favorite,
  AdminPanelSettings,
  ExitToApp,
  History,
  TrendingUp,
  PersonAdd,
  Login,
} from '@mui/icons-material';

import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

// Mock data for search suggestions and popular products
const popularSearches = [
  'Áo thun nam',
  'Quần jean nữ',
  'Váy liền',
  'Giày thể thao',
  'Áo khoác denim'
];

const Header = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchRef = useRef(null);
  
  const { getCartItemsCount } = useCartStore();
  const { user, logout } = useAuthStore();
  
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = getCartItemsCount();

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage
  const saveToSearchHistory = (term) => {
    if (!term.trim()) return;
    
    const updatedHistory = [
      term.trim(),
      ...searchHistory.filter(item => item !== term.trim())
    ].slice(0, 5); // Keep only last 5 searches
    
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (event) => {
    if ((event.key === 'Enter' || event.type === 'click') && searchTerm.trim()) {
      saveToSearchHistory(searchTerm);
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSearchSuggestionsOpen(false);
    }
  };

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    setSearchSuggestionsOpen(!!value.trim());
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    saveToSearchHistory(suggestion);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
    setSearchSuggestionsOpen(false);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
    setUserMenuAnchor(null);
    setSearchSuggestionsOpen(false);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Trang Chủ', path: '/' },
    { text: 'Sản Phẩm', path: '/products' },
    { text: 'Khuyến Mãi', path: '/sales' },
    { text: 'Liên Hệ', path: '/collections' },
  ];

  // Search Suggestions Component
  const SearchSuggestions = () => (
    <Paper
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        mt: 0.5,
        zIndex: 9999,
        maxHeight: 400,
        overflow: 'auto',
        boxShadow: 3,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Recent Searches */}
      {searchHistory.length > 0 && (
        <>
          <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Tìm kiếm gần đây
            </Typography>
            <Button size="small" onClick={handleClearHistory}>
              Xóa
            </Button>
          </Box>
          <List dense>
            {searchHistory.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => handleSuggestionClick(item)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <History fontSize="small" color="action" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}

      {/* Popular Searches */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Tìm kiếm phổ biến
        </Typography>
      </Box>
      <List dense>
        {popularSearches.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleSuggestionClick(item)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <TrendingUp fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 280 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          my: 2, 
          color: 'primary.main', 
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onClick={() => handleNavigation('/')}
      >
        🛍️ FASHION STORE
      </Typography>
      
      {/* Search in drawer */}
      <Box sx={{ px: 2, mb: 2, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <Search sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            onKeyPress={handleSearch}
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: 0,
              },
            }}
          />
        </Box>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            disablePadding
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            <ListItemText 
              primary={item.text} 
              sx={{ 
                textAlign: 'center',
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                }
              }} 
            />
          </ListItem>
        ))}
        
        {/* User section in drawer */}
        <Box sx={{ mt: 2 }}>
          {user ? (
            <>
              <ListItem 
                onClick={() => handleNavigation('/profile')}
                disablePadding
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemText 
                  primary="Tài Khoản" 
                  sx={{ textAlign: 'center' }} 
                />
              </ListItem>
              {user.role === 'admin' && (
                <ListItem 
                  onClick={() => handleNavigation('/admin')}
                  disablePadding
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  <ListItemText 
                    primary="Quản Lý" 
                    sx={{ textAlign: 'center' }} 
                  />
                </ListItem>
              )}
              <ListItem 
                onClick={handleLogout}
                disablePadding
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                  }
                }}
              >
                <ListItemText 
                  primary="Đăng Xuất" 
                  sx={{ 
                    textAlign: 'center',
                    '& .MuiListItemText-primary': {
                      color: 'error.main',
                    }
                  }} 
                />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem 
                onClick={() => handleNavigation('/login')}
                disablePadding
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemText 
                  primary="Đăng Nhập" 
                  sx={{ textAlign: 'center' }} 
                />
              </ListItem>
              <ListItem 
                onClick={() => handleNavigation('/register')}
                disablePadding
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemText 
                  primary="Đăng Ký" 
                  sx={{ textAlign: 'center' }} 
                />
              </ListItem>
            </>
          )}
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'white', 
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 60, md: 70 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            onClick={() => handleNavigation('/')}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            🛍️ FASHION STORE
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flexGrow: 1, 
            ml: 4, 
            gap: 3 
          }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Search Bar - Desktop */}
          <ClickAwayListener onClickAway={() => setSearchSuggestionsOpen(false)}>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                border: '1px solid',
                borderColor: searchSuggestionsOpen ? 'primary.main' : 'divider',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                mx: 2,
                flexGrow: 0.5,
                maxWidth: 400,
                position: 'relative',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
              ref={searchRef}
            >
              <Search 
                sx={{ 
                  color: 'text.secondary', 
                  mr: 1,
                  cursor: 'pointer'
                }}
                onClick={handleSearch}
              />
              
              <InputBase
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => handleSearchTermChange(e.target.value)}
                onKeyPress={handleSearch}
                onFocus={() => setSearchSuggestionsOpen(!!searchTerm.trim())}
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    padding: 0,
                  },
                }}
              />
              
              {/* Search Suggestions */}
              {searchSuggestionsOpen && (
                <SearchSuggestions />
              )}
            </Box>
          </ClickAwayListener>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 } 
          }}>
            {/* Wishlist */}
            <IconButton 
              color="inherit"
              onClick={() => handleNavigation('/wishlist')}
              title="Sản phẩm yêu thích"
            >
              <Favorite />
            </IconButton>

            {/* Cart */}
            <IconButton 
              color="inherit"
              onClick={() => handleNavigation('/cart')}
              title="Giỏ hàng"
            >
              <Badge 
                badgeContent={cartItemsCount} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    height: 16,
                    minWidth: 16,
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* User Account */}
            {user ? (
              <>
                <IconButton 
                  color="inherit"
                  onClick={handleUserMenuOpen}
                  title="Tài khoản"
                >
                  <Person />
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      minWidth: 160,
                    }
                  }}
                >
                  <MenuItem onClick={() => handleNavigation('/profile')}>
                    <Person sx={{ mr: 1, fontSize: 20 }} />
                    Tài khoản
                  </MenuItem>
                  {user.role === 'admin' && (
                    <MenuItem onClick={() => handleNavigation('/admin')}>
                      <AdminPanelSettings sx={{ mr: 1, fontSize: 20 }} />
                      Quản lý
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1, fontSize: 20 }} />
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                <IconButton 
                  onClick={() => handleNavigation('/login')}
                  color="inherit"
                  sx={{ 
                    display: { xs: 'none', sm: 'flex' },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                  title="Đăng Nhập"
                >
                  <Login />
                </IconButton>
                
                <IconButton 
                  onClick={() => handleNavigation('/register')}
                  color="primary"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    borderRadius: 2,
                    p: 1,
                  }}
                  title="Đăng Ký"
                >
                  <PersonAdd />
                </IconButton>
              </Box>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: 'none' }, 
                ml: 1 
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Search Bar - Mobile */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.action.hover, 0.5),
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 2,
            py: 1,
            mx: 2,
            mb: 1,
            position: 'relative',
          }}
        >
          <Search sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            onKeyPress={handleSearch}
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: 0,
              },
            }}
          />
          
          {/* Search Suggestions for Mobile */}
          {searchSuggestionsOpen && (
            <ClickAwayListener onClickAway={() => setSearchSuggestionsOpen(false)}>
              <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999 }}>
                <SearchSuggestions />
              </Box>
            </ClickAwayListener>
          )}
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;