import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Chip,
  Alert,
  Stack,
  CircularProgress
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist từ localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        setLoading(true);
        const savedWishlist = localStorage.getItem('userWishlist');
        
        if (savedWishlist) {
          const wishlistData = JSON.parse(savedWishlist);
          console.log('Wishlist data loaded:', wishlistData);
          setWishlistItems(wishlistData);
        } else {
          console.log('No wishlist found in localStorage');
          setWishlistItems([]);
        }
      } catch (err) {
        console.error('Error loading wishlist:', err);
        toast.error('Không thể tải danh sách yêu thích');
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Lưu wishlist vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    if (wishlistItems.length > 0) {
      localStorage.setItem('userWishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    
    // Nếu không còn sản phẩm nào, xóa luôn key khỏi localStorage
    if (updatedWishlist.length === 0) {
      localStorage.removeItem('userWishlist');
    }
    
    toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
  };

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      toast.error('Sản phẩm hiện không có sẵn');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: 'M',
      color: product.colors?.[0] || 'Đen'
    });

    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleBuyNow = (product) => {
    if (!product.inStock) {
      toast.error('Sản phẩm hiện không có sẵn');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: 'M',
      color: product.colors?.[0] || 'Đen'
    });

    navigate('/cart');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateDiscount = (originalPrice, price) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Render loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Đang tải danh sách yêu thích...
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <FavoriteIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom color="text.secondary">
          Vui lòng đăng nhập
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Đăng nhập để xem danh sách sản phẩm yêu thích của bạn
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/products')}
          >
            Tiếp tục mua sắm
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Quay lại
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FavoriteIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h4" component="h1">
            Sản Phẩm Yêu Thích
          </Typography>
          <Chip 
            label={`${wishlistItems.length} sản phẩm`} 
            color="primary" 
            variant="outlined"
            sx={{ ml: 2 }}
          />
        </Box>

        <Typography variant="body1" color="text.secondary">
          Danh sách các sản phẩm bạn đã yêu thích
        </Typography>
      </Box>

      {/* Wishlist Content */}
      {wishlistItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Danh sách yêu thích trống
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Bạn chưa có sản phẩm nào trong danh sách yêu thích
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/products')}
          >
            Khám phá sản phẩm
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => {
            const discount = calculateDiscount(item.originalPrice, item.price);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                      sx={{ 
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <Chip
                        label={`-${discount}%`}
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8
                        }}
                      />
                    )}

                    {/* Remove Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          backgroundColor: 'error.light',
                          color: 'error.contrastText'
                        }
                      }}
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                    {/* Out of Stock Overlay */}
                    {!item.inStock && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="h6" color="white" fontWeight="bold">
                          HẾT HÀNG
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {/* Product Name */}
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' }
                      }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </Typography>

                    {/* Product Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2 }}
                    >
                      {item.description}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {formatPrice(item.price)}
                      </Typography>
                      {item.originalPrice > item.price && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {formatPrice(item.originalPrice)}
                        </Typography>
                      )}
                    </Box>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {item.rating || 4.0}
                      </Typography>
                    </Box>

                    {/* Stock Status */}
                    {!item.inStock && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        Sản phẩm tạm thời hết hàng
                      </Alert>
                    )}

                    {/* Action Buttons */}
                    <Stack direction="column" spacing={1}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<CartIcon />}
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                      >
                        Thêm vào giỏ
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleBuyNow(item)}
                        disabled={!item.inStock}
                      >
                        Mua ngay
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Continue Shopping */}
      {wishlistItems.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/products')}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Wishlist;