import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Chip,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  alpha,
  Zoom,
  Fade
} from '@mui/material';
import { 
  LocalFireDepartment, 
  TrendingUp, 
  FlashOn,
  Timer,
  Whatshot,
  ShoppingCart,
  Favorite,
  Share,
  Star,
  StarHalf
} from '@mui/icons-material';
import Products from './Products';

const Sales = () => {
  const [products] = useState([
    // {
    //   id: 1,
    //   name: 'Áo Thun Basic Cotton Premium',
    //   price: 199000,
    //   originalPrice: 299000,
    //   image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
    //   description: 'Áo thun cotton basic thoáng mát, chất liệu cao cấp, co giãn 4 chiều',
    //   category: 'ao-thun',
    //   rating: 4.5,
    //   discount: 33,
    //   sizes: ['S', 'M', 'L', 'XL'],
    //   colors: ['Trắng', 'Đen', 'Xám'],
    //   inStock: true,
    //   featured: true,
    //   tags: ['basic', 'cotton', 'unisex', 'ao-thun', 'bestseller'],
    //   isHot: true,
    //   soldCount: 1250,
    //   timeLeft: '2 days',
    //   isNew: true,
    //   limitedStock: 5
    // },
    // {
    //   id: 2,
    //   name: 'Quần Jean Slim Fit Cao Cấp',
    //   price: 450000,
    //   originalPrice: 550000,
    //   image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
    //   description: 'Quần jean slim fit chất liệu denim cao cấp, form ôm tôn dáng',
    //   category: 'quan-jean',
    //   rating: 4.8,
    //   discount: 18,
    //   sizes: ['28', '30', '32', '34'],
    //   colors: ['Xanh đậm', 'Xanh nhạt', 'Đen'],
    //   inStock: true,
    //   featured: true,
    //   tags: ['jeans', 'slim-fit', 'quan-jeans', 'trending'],
    //   isHot: false,
    //   soldCount: 890,
    //   timeLeft: '5 days',
    //   isNew: false,
    //   limitedStock: 12
    // },
    // {
    //   id: 3,
    //   name: 'Áo Polo Thể Thao Cao Cấp',
    //   price: 320000,
    //   originalPrice: 420000,
    //   image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
    //   description: 'Áo polo thể thao thoáng khí, thấm hút mồ hôi tốt, form chuẩn',
    //   category: 'ao-polo',
    //   rating: 4.3,
    //   discount: 24,
    //   sizes: ['S', 'M', 'L', 'XL'],
    //   colors: ['Trắng', 'Xanh navy', 'Đỏ'],
    //   inStock: true,
    //   featured: false,
    //   tags: ['polo', 'sport', 'activewear', 'premium'],
    //   isHot: true,
    //   soldCount: 2100,
    //   timeLeft: '1 day',
    //   isNew: true,
    //   limitedStock: 3
    // },
    // {
    //   id: 4,
    //   name: 'Chân Váy Xòe Cao Cấp Dáng Dài',
    //   price: 380000,
    //   originalPrice: 520000,
    //   image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    //   description: 'Chân váy xòe dáng dài, chất liệu vải mềm mại, thiết kế thanh lịch',
    //   category: 'chan-vay',
    //   rating: 4.6,
    //   discount: 27,
    //   sizes: ['S', 'M', 'L'],
    //   colors: ['Đen', 'Be', 'Hồng pastel'],
    //   inStock: true,
    //   featured: true,
    //   tags: ['skirt', 'feminine', 'elegant', 'office'],
    //   isHot: false,
    //   soldCount: 670,
    //   timeLeft: '3 days',
    //   isNew: false,
    //   limitedStock: 8
    // },
    // {
    //   id: 5,
    //   name: 'Áo Hoodie Unisex Phong Cách Streetwear',
    //   price: 520000,
    //   originalPrice: 690000,
    //   image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
    //   description: 'Áo hoodie unisex chất nỉ mềm, ấm áp, thiết kế trẻ trung hiện đại',
    //   category: 'ao-hoodie',
    //   rating: 4.7,
    //   discount: 25,
    //   sizes: ['M', 'L', 'XL'],
    //   colors: ['Xám', 'Đen', 'Xanh rêu'],
    //   inStock: true,
    //   featured: true,
    //   tags: ['hoodie', 'unisex', 'streetwear', 'winter'],
    //   isHot: true,
    //   soldCount: 1580,
    //   timeLeft: '4 days',
    //   isNew: true,
    //   limitedStock: 6
    // },
    // {
    //   id: 6,
    //   name: 'Quần Short Kaki Thoáng Mát',
    //   price: 280000,
    //   originalPrice: 350000,
    //   image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
    //   description: 'Quần short kaki thoáng mát, phù hợp nhiều hoạt động, chất liệu bền đẹp',
    //   category: 'quan-short',
    //   rating: 4.4,
    //   discount: 20,
    //   sizes: ['S', 'M', 'L', 'XL'],
    //   colors: ['Be', 'Xanh nhạt', 'Xám'],
    //   inStock: true,
    //   featured: false,
    //   tags: ['short', 'casual', 'summer', 'beach'],
    //   isHot: false,
    //   soldCount: 920,
    //   timeLeft: '6 days',
    //   isNew: false,
    //   limitedStock: 15
    // },
    // {
    //   id: 7,
    //   name: 'Đầm Body Suit Cao Cấp',
    //   price: 650000,
    //   originalPrice: 890000,
    //   image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    //   description: 'Đầm body suit ôm sát, chất liệu co giãn tốt, phong cách quyến rũ',
    //   category: 'dam',
    //   rating: 4.9,
    //   discount: 37,
    //   sizes: ['S', 'M', 'L'],
    //   colors: ['Đen', 'Đỏ', 'Xanh đen'],
    //   inStock: true,
    //   featured: true,
    //   tags: ['dress', 'sexy', 'evening', 'party'],
    //   isHot: true,
    //   soldCount: 430,
    //   timeLeft: '1 day',
    //   isNew: true,
    //   limitedStock: 2
    // },
    // {
    //   id: 8,
    //   name: 'Blazer Công Sở Thanh Lịch',
    //   price: 890000,
    //   originalPrice: 1200000,
    //   image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop',
    //   description: 'Áo blazer công sở chất liệu len pha, form dáng chuẩn, sang trọng',
    //   category: 'blazer',
    //   rating: 4.8,
    //   discount: 26,
    //   sizes: ['S', 'M', 'L', 'XL'],
    //   colors: ['Đen', 'Xám', 'Xanh than'],
    //   inStock: true,
    //   featured: true,
    //   tags: ['blazer', 'office', 'formal', 'business'],
    //   isHot: false,
    //   soldCount: 320,
    //   timeLeft: '7 days',
    //   isNew: false,
    //   limitedStock: 10
    // }
  ]);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filter products with discount and enhance with sale info
  const saleProducts = useMemo(() => {
    return products
      .filter(product => product.discount > 0)
      .map(product => ({
        ...product,
        saleBadge: product.discount > 30 ? 'flash-sale' : product.discount > 20 ? 'hot-sale' : 'sale',
        urgencyLevel: product.discount > 35 ? 'critical' : product.discount > 25 ? 'high' : product.discount > 15 ? 'medium' : 'low',
        savings: product.originalPrice - product.price
      }));
  }, [products]);

  // Calculate sale statistics
  const saleStats = useMemo(() => {
    const totalDiscount = saleProducts.reduce((sum, product) => sum + product.discount, 0);
    const averageDiscount = Math.round(totalDiscount / saleProducts.length);
    const hotDealsCount = saleProducts.filter(product => product.isHot).length;
    const endingSoonCount = saleProducts.filter(product => {
      const days = parseInt(product.timeLeft);
      return days <= 2;
    }).length;
    const totalSavings = saleProducts.reduce((sum, product) => sum + product.savings, 0);
    const newArrivals = saleProducts.filter(product => product.isNew).length;

    return {
      totalProducts: saleProducts.length,
      averageDiscount,
      hotDealsCount,
      endingSoonCount,
      totalSavings,
      newArrivals
    };
  }, [saleProducts]);

  // Featured banner products
  const featuredProducts = useMemo(() => {
    return saleProducts
      .filter(product => product.featured)
      .slice(0, 3);
  }, [saleProducts]);

  const HeaderContent = () => (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      {/* Animated Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFA235 50%, #FFD93D 100%)',
          opacity: 0.1,
          zIndex: -1
        }}
      />
      
      <Fade in={true} timeout={1000}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <LocalFireDepartment sx={{ fontSize: 48, color: '#FF6B35', mr: 2, animation: 'pulse 2s infinite' }} />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FF6B35, #FFA235, #FFD93D)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 4px 8px rgba(255, 107, 53, 0.3)',
              fontSize: isMobile ? '2.5rem' : '3.5rem'
            }}
          >
            SIÊU KHUYẾN MÃI
          </Typography>
          <FlashOn sx={{ fontSize: 48, color: '#FFD93D', ml: 2, animation: 'flash 1.5s infinite' }} />
        </Box>
      </Fade>
      
      <Fade in={true} timeout={1500}>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            mb: 4, 
            maxWidth: 600, 
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          🎯 Khám phá những ưu đãi đặc biệt với mức giảm giá lên đến 50%. 
          ⚡ Nhanh tay trước khi hết hàng!
        </Typography>
      </Fade>

      {/* Sale Statistics */}
      <Fade in={true} timeout={2000}>
        <Grid container spacing={2} sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, background: 'linear-gradient(135deg, #FF6B35, #FFA235)' }}>
              <Whatshot sx={{ color: 'white', mb: 1 }} />
              <Typography variant="h6" color="white" fontWeight="bold">
                {saleStats.hotDealsCount}
              </Typography>
              <Typography variant="body2" color="white">
                Deal Hot
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, background: 'linear-gradient(135deg, #4A90E2, #667eea)' }}>
              <TrendingUp sx={{ color: 'white', mb: 1 }} />
              <Typography variant="h6" color="white" fontWeight="bold">
                {saleStats.totalProducts}
              </Typography>
              <Typography variant="body2" color="white">
                Sản Phẩm
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, background: 'linear-gradient(135deg, #50E3C2, #4ECDC4)' }}>
              <LocalFireDepartment sx={{ color: 'white', mb: 1 }} />
              <Typography variant="h6" color="white" fontWeight="bold">
                {saleStats.averageDiscount}%
              </Typography>
              <Typography variant="body2" color="white">
                Giảm Giá
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, background: 'linear-gradient(135deg, #FFD93D, #FFA235)' }}>
              <Timer sx={{ color: 'white', mb: 1 }} />
              <Typography variant="h6" color="white" fontWeight="bold">
                {saleStats.endingSoonCount}
              </Typography>
              <Typography variant="body2" color="white">
                Sắp Kết Thúc
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Fade>

      {/* Sale Progress & Info */}
      <Fade in={true} timeout={2500}>
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              ⚡ Flash Sale Đang Diễn Ra
            </Typography>
            <Chip 
              label={`Tiết kiệm ${(saleStats.totalSavings / 1000000).toFixed(1)}M`} 
              color="success" 
              size="small"
            />
          </Box>
          
          {/* Progress Bar */}
          <Box 
            sx={{ 
              width: '100%', 
              height: 8, 
              backgroundColor: 'grey.200', 
              borderRadius: 4,
              overflow: 'hidden',
              mb: 1
            }}
          >
            <Box 
              sx={{ 
                width: '75%', 
                height: '100%', 
                background: 'linear-gradient(90deg, #FF6B35, #FFA235, #FFD93D)',
                borderRadius: 4,
                animation: 'progressPulse 2s ease-in-out infinite',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '20%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  animation: 'shimmer 2s infinite'
                }
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              🕒 Kết thúc sau: 2 ngày 15 giờ
            </Typography>
            <Typography variant="caption" color="error.main" fontWeight="bold">
              🔥 Đang bán chạy
            </Typography>
          </Box>
        </Box>
      </Fade>

      {/* Quick Actions */}
      <Fade in={true} timeout={3000}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Whatshot />}
            sx={{
              background: 'linear-gradient(135deg, #FF6B35, #FFA235)',
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(255, 107, 53, 0.6)'
              }
            }}
          >
            Deal Hot Nhất
          </Button>
          <Button
            variant="outlined"
            startIcon={<Timer />}
            sx={{
              borderColor: '#FF6B35',
              color: '#FF6B35',
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#FFA235',
                background: 'rgba(255, 107, 53, 0.1)'
              }
            }}
          >
            Sắp Kết Thúc
          </Button>
          <Button
            variant="outlined"
            startIcon={<TrendingUp />}
            sx={{
              borderColor: '#4A90E2',
              color: '#4A90E2',
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#667eea',
                background: 'rgba(74, 144, 226, 0.1)'
              }
            }}
          >
            Bán Chạy
          </Button>
        </Box>
      </Fade>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,168,53,0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite 1s'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,217,61,0.06) 0%, transparent 70%)',
          animation: 'float 7s ease-in-out infinite 2s'
        }}
      />

      <Products 
        title={<HeaderContent />}
        products={saleProducts}
        onProductClick={(product) => navigate(`/product/${product.id}`)}
        showFilters={true}
        filterConfig={{
          sortOptions: [
            { value: 'discount-desc', label: '🔥 Giảm giá cao nhất' },
            { value: 'price-asc', label: '💵 Giá thấp đến cao' },
            { value: 'price-desc', label: '💰 Giá cao đến thấp' },
            { value: 'rating-desc', label: '⭐ Đánh giá cao nhất' },
            { value: 'hot', label: '🚀 Deal Hot' },
            { value: 'new', label: '🆕 Mới nhất' },
            { value: 'bestseller', label: '📈 Bán chạy' }
          ],
          categoryOptions: [
            '🎯 Tất cả sản phẩm',
            '👕 Áo thun',
            '👔 Áo polo', 
            '🧥 Áo hoodie',
            '👖 Quần jean',
            '🩳 Quần short',
            '👗 Chân váy',
            '💃 Đầm',
            '👔 Blazer'
          ],
          priceRanges: [
            { min: 0, max: 200000, label: '💸 Dưới 200K' },
            { min: 200000, max: 400000, label: '💰 200K - 400K' },
            { min: 400000, max: 600000, label: '💵 400K - 600K' },
            { min: 600000, max: 1000000, label: '💎 Trên 600K' }
          ]
        }}
        enhancedFeatures={{
          showDiscountBadge: true,
          showCountdown: true,
          showSoldCount: true,
          showUrgencyLevel: true,
          highlightHotDeals: true,
          showLimitedStock: true,
          showSavingsAmount: true,
          showProductBadges: true,
          enableQuickActions: true
        }}
        specialFeatures={{
          flashSaleRibbon: true,
          hotDealAnimation: true,
          countdownTimer: true,
          stockProgress: true,
          wishlistButton: true,
          shareButton: true
        }}
      />

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes flash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.5; }
        }
        
        @keyframes progressPulse {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.02); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .sale-product-card {
          transition: all 0.3s ease;
        }
        
        .sale-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(255, 107, 53, 0.2);
        }
        
        .hot-deal {
          position: relative;
          overflow: hidden;
        }
        
        .hot-deal::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
    </Box>
  );
};

export default Sales;