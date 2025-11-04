import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  alpha,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  SupportAgent,
  Redeem,
  ArrowForward,
} from '@mui/icons-material';
import { useCartStore } from '../stores/cartStore';

export default function Home({ onNavigate, onProductClick }) {
  const theme = useTheme();
  const { addToCart } = useCartStore();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist từ localStorage khi component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('userWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Lưu wishlist vào localStorage mỗi khi wishlist thay đổi
  useEffect(() => {
    localStorage.setItem('userWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch featured products từ localStorage
  useEffect(() => {
    const fetchFeaturedProducts = () => {
      try {
        setLoading(true);
        const savedProducts = localStorage.getItem('adminProducts');
        
        if (savedProducts) {
          const allProducts = JSON.parse(savedProducts);
          console.log('Tất cả sản phẩm từ localStorage:', allProducts);
          
          // Hiển thị tất cả sản phẩm, không chỉ featured
          const featuredProducts = allProducts;
          
          console.log('Sản phẩm sẽ hiển thị:', featuredProducts);
          setFeaturedProducts(featuredProducts);
        } else {
          console.log('Không có sản phẩm trong localStorage');
          setFeaturedProducts([]);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu sản phẩm từ localStorage');
        console.error('Lỗi khi fetch sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Miễn phí vận chuyển',
      description: 'Cho đơn hàng từ 500.000đ'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Bảo mật thanh toán',
      description: '100% an toàn và bảo mật'
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40 }} />,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ CSKH chuyên nghiệp'
    },
    {
      icon: <Redeem sx={{ fontSize: 40 }} />,
      title: 'Quà tặng hấp dẫn',
      description: 'Nhiều ưu đãi cho khách hàng'
    }
  ];

  const categories = [
    {
      name: 'Áo Thun',
      image: '/images/category-tshirt.jpg',
      count: '45+ sản phẩm',
      slug: 'ao-thun'
    },
    {
      name: 'Quần Jean',
      image: '/images/category-jeans.jpg',
      count: '32+ sản phẩm',
      slug: 'quan-jean'
    },
    {
      name: 'Áo Khoác',
      image: '/images/category-jacket.jpg',
      count: '28+ sản phẩm',
      slug: 'ao-khoac'
    },
    {
      name: 'Váy Đầm',
      image: '/images/category-dress.jpg',
      count: '51+ sản phẩm',
      slug: 'vay-dam'
    }
  ];

  const handleAddToCart = (product, event) => {
    event?.stopPropagation();
    
    if (!product) return;
    
    addToCart(product, 'M', product.colors?.[0] || 'Đen', 1);
    setSnackbar({ 
      open: true, 
      message: `Đã thêm "${product.name}" vào giỏ hàng!`,
      type: 'success'
    });
  };

  const handleToggleWishlist = (product, event) => {
    event?.stopPropagation();
    
    if (!product) return;

    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      setWishlist(updatedWishlist);
      setSnackbar({ 
        open: true, 
        message: `Đã xóa "${product.name}" khỏi danh sách yêu thích!`,
        type: 'info'
      });
    } else {
      // Add to wishlist
      const wishlistItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        description: product.description,
        category: product.category,
        rating: product.rating,
        reviewCount: product.reviewCount,
        inStock: true,
        addedDate: new Date().toISOString().split('T')[0]
      };
      
      setWishlist(prev => [...prev, wishlistItem]);
      setSnackbar({ 
        open: true, 
        message: `Đã thêm "${product.name}" vào danh sách yêu thích!`,
        type: 'success'
      });
    }
  };

  const handleNavigateToWishlist = () => {
    console.log('Navigating to wishlist page');
    if (onNavigate) {
      onNavigate('wishlist');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Đang tải sản phẩm...</Typography>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Có lỗi xảy ra: {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Thử lại
        </Button>
      </Box>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: `
            linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.95)} 0%, 
              ${alpha(theme.palette.primary.dark, 0.9)} 50%,
              ${alpha('#764ba2', 0.85)} 100%
            ),
            url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite 2s',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              {/* Promo Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.2))',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  mb: 3,
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    backgroundColor: '#FFD700',
                    borderRadius: '50%',
                    mr: 1.5,
                    animation: 'pulse 2s infinite',
                  }}
                />
                <Typography variant="body2" fontWeight="700">
                  🚀 Bộ sưu tập mới 2024
                </Typography>
              </Box>

              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '3rem', md: '4rem' },
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                }}
              >
                Phong Cách
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    display: 'block',
                  }}
                >
                  Của Riêng Bạn
                </Box>
              </Typography>

              <Typography
                variant="h5"
                component="p"
                gutterBottom
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  fontWeight: 300,
                  lineHeight: 1.4,
                }}
              >
                Khám phá bộ sưu tập thời trang <strong>độc quyền</strong> với 
                thiết kế <strong>sáng tạo</strong> và chất lượng <strong>cao cấp</strong>
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    console.log('Navigating to products page');
                    if (onNavigate) {
                      onNavigate('products');
                    }
                  }}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%)',
                    boxShadow: '0 8px 32px rgba(255,107,107,0.4)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(255,107,107,0.6)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  🛍️ Mua Sắm Ngay
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNavigateToWishlist}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: '50px',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(102,126,234,0.6)',
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  ❤️ Yêu Thích ({wishlist.length})
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Fashion Collection"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                
                {/* Floating Badges */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    background: 'linear-gradient(135deg, #FF6B6B, #FFA726)',
                    color: 'white',
                    borderRadius: 3,
                    p: 2,
                    animation: 'float 3s ease-in-out infinite',
                    boxShadow: '0 8px 32px rgba(255,107,107,0.4)',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    🔥 HOT DEAL
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    background: 'rgba(255,255,255,0.9)',
                    color: theme.palette.primary.main,
                    borderRadius: 3,
                    p: 2,
                    animation: 'float 3s ease-in-out infinite 1.5s',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    ⭐ 4.9/5
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Global Styles for Animations */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
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

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                textAlign="center"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Sản Phẩm Mới Nhất
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Khám phá những sản phẩm thời trang mới được thêm vào
          </Typography>
        </Box>

        {featuredProducts.length > 0 ? (
          <>
            <Grid container spacing={3} justifyContent="center">
              {featuredProducts.map((product) => (
                <Grid 
                  item 
                  key={product.id} 
                  xs={12} 
                  sm={6} 
                  md={3} 
                  lg={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      maxWidth: 280,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                    onClick={() => onProductClick && onProductClick(product)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          objectFit: 'cover',
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        }}
                        onError={(e) => {
                          // Fallback nếu ảnh không tải được
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const fallback = document.createElement('div');
                          fallback.style.cssText = `
                            width: 100%;
                            height: 200px;
                            background: ${alpha(theme.palette.primary.main, 0.1)};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: ${theme.palette.primary.main};
                            font-size: 0.9rem;
                          `;
                          fallback.textContent = 'Hình ảnh sản phẩm';
                          parent.appendChild(fallback);
                        }}
                      />
                      {product.originalPrice > product.price && (
                        <Chip
                          label={`-${Math.round((1 - product.price / product.originalPrice) * 100)}%`}
                          color="error"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          display: 'flex',
                          gap: 0.5,
                        }}
                      >
                        <Box
                          onClick={(e) => handleToggleWishlist(product, e)}
                          sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 1)',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          {isInWishlist(product.id) ? (
                            <Favorite 
                              sx={{ 
                                fontSize: 18, 
                                color: 'error.main',
                              }} 
                            />
                          ) : (
                            <FavoriteBorder 
                              sx={{ 
                                fontSize: 18, 
                                color: 'grey.400',
                              }} 
                            />
                          )}
                        </Box>
                        <Box
                          sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 1)',
                              transform: 'scale(1.1)',
                              color: 'primary.main'
                            },
                          }}
                        >
                          <Share 
                            sx={{ 
                              fontSize: 18, 
                              color: 'grey.400',
                            }} 
                          />
                        </Box>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          height: '2.6em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          height: '3em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          fontSize: '0.8rem',
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={product.rating || 0} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: '0.8rem' }}>
                          ({product.reviewCount || 0})
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: 700, fontSize: '1rem' }}
                        >
                          {product.price?.toLocaleString('vi-VN')}₫
                        </Typography>
                        {product.originalPrice > product.price && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through', fontSize: '0.8rem' }}
                          >
                            {product.originalPrice?.toLocaleString('vi-VN')}₫
                          </Typography>
                        )}
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCart />}
                        onClick={(e) => handleAddToCart(product, e)}
                        sx={{
                          borderRadius: '20px',
                          textTransform: 'none',
                          fontWeight: 600,
                          py: 0.8,
                          fontSize: '0.9rem',
                        }}
                      >
                        Thêm Vào Giỏ
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => {
                  console.log('Navigating to all products page');
                  if (onNavigate) {
                    onNavigate('products');
                  }
                }}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Xem Tất Cả Sản Phẩm
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Chưa có sản phẩm nào
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Hãy thêm sản phẩm mới từ trang quản trị
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => onNavigate && onNavigate('admin')}
              sx={{ mt: 2 }}
            >
              Đến trang quản trị
            </Button>
          </Box>
        )}
      </Container>

      {/* Categories Section */}
      <Box sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05), py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Danh Mục Nổi Bật
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Khám phá theo sở thích của bạn
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={3} 
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 280,
                    height: 200,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                      '& .category-image': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                  onClick={() => {
                    console.log('Navigating to products with category:', category.slug);
                    if (onNavigate) {
                      onNavigate('products', { category: category.slug });
                    }
                  }}
                >
                  <CardMedia
                    component="div"
                    className="category-image"
                    sx={{
                      height: '100%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette.primary.main,
                      fontSize: '1.1rem',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    {category.name}
                  </CardMedia>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white',
                      p: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
                      {category.count}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.type}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}