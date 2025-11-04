import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  Pagination,
  Drawer,
  IconButton,
  Badge,
  Fab,
  InputAdornment,
  Alert,
  alpha,
  useTheme,
  Snackbar,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  ShoppingCart,
  Search,
  Clear,
  Close,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowForward,
} from '@mui/icons-material';
import { useCartStore } from '../stores/cartStore';

const Products = ({ 
  products = [], 
  searchTerm = '', 
  category = '',
  title = 'Sản Phẩm',
  emptyMessage = 'Không tìm thấy sản phẩm nào',
  onNavigate,
  onProductClick 
}) => {
  const { addToCart, cartItems } = useCartStore();
  const theme = useTheme();

  // State for filtering
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const categories = [
    { value: 'all', label: 'Tất cả sản phẩm' },
    { value: 'ao-thun', label: 'Áo Thun' },
    { value: 'ao-so-mi', label: 'Áo Sơ Mi' },
    { value: 'ao-polo', label: 'Áo Polo' },
    { value: 'ao-khoac', label: 'Áo Khoác' },
    { value: 'quan-jean', label: 'Quần Jeans' },
    { value: 'quan-short', label: 'Quần Short' },
    { value: 'chan-vay', label: 'Chân Váy' },
    { value: 'vay-dam', label: 'Đầm' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Tất cả giá' },
    { value: 'under-200', label: 'Dưới 200.000₫' },
    { value: '200-500', label: '200.000₫ - 500.000₫' },
    { value: '500-1000', label: '500.000₫ - 1.000.000₫' },
    { value: 'over-1000', label: 'Trên 1.000.000₫' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Theo tên A-Z' },
    { value: 'name-desc', label: 'Theo tên Z-A' },
    { value: 'price-low', label: 'Giá thấp đến cao' },
    { value: 'price-high', label: 'Giá cao đến thấp' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
    { value: 'newest', label: 'Mới nhất' }
  ];

  // Từ khóa tìm kiếm gợi ý
  const searchSuggestions = [
    'áo thun', 'quần jeans', 'áo sơ mi', 'chân váy', 'áo khoác',
    'đầm', 'áo polo', 'quần short', 'basic', 'cotton'
  ];

  // Load wishlist từ localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('userWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Kết hợp sản phẩm từ props và localStorage
  useEffect(() => {
    console.log('Products component received:', { 
      productsCount: products.length, 
      searchTerm, 
      category 
    });
    
    setInternalSearchTerm(searchTerm);
    setSelectedCategory(category || 'all');
    
    // Load products từ localStorage (admin thêm vào)
    try {
      const savedProducts = localStorage.getItem('adminProducts');
      const adminProducts = savedProducts ? JSON.parse(savedProducts) : [];
      
      // Kết hợp sản phẩm từ props và localStorage
      const combinedProducts = [...products, ...adminProducts];
      console.log('Combined products:', combinedProducts.length);
      setAllProducts(combinedProducts);
      setFilteredProducts(combinedProducts);
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      setAllProducts(products);
      setFilteredProducts(products);
    }
    
    // Load search history từ localStorage
    try {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, [products, searchTerm, category]);

  // Lọc sản phẩm
  useEffect(() => {
    console.log('Filtering products...');
    let result = [...allProducts];

    // Tìm kiếm theo từ khóa
    if (internalSearchTerm.trim()) {
      const searchTerms = internalSearchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
      result = result.filter(product => {
        const searchText = (
          product.name + ' ' + 
          product.description + ' ' + 
          (product.tags ? product.tags.join(' ') : '')
        ).toLowerCase();

        return searchTerms.every(term => searchText.includes(term));
      });
    }

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Lọc theo khoảng giá
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-200':
          result = result.filter(product => product.price < 200000);
          break;
        case '200-500':
          result = result.filter(product => product.price >= 200000 && product.price <= 500000);
          break;
        case '500-1000':
          result = result.filter(product => product.price >= 500000 && product.price <= 1000000);
          break;
        case 'over-1000':
          result = result.filter(product => product.price > 1000000);
          break;
        default:
          break;
      }
    }

    // Sắp xếp
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }

    console.log('Filtered products count:', result.length);
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [allProducts, internalSearchTerm, selectedCategory, priceRange, sortBy]);

  // Lưu lịch sử tìm kiếm
  const saveToSearchHistory = (term) => {
    if (!term.trim()) return;
    
    const newHistory = [
      term.trim(), 
      ...searchHistory.filter(item => item !== term.trim())
    ].slice(0, 5);
    
    setSearchHistory(newHistory);
    try {
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (term) => {
    const searchTerm = term.trim();
    setInternalSearchTerm(searchTerm);
    setShowSearchSuggestions(false);
    
    if (searchTerm) {
      saveToSearchHistory(searchTerm);
    }
  };

  // Xử lý tìm kiếm từ input
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setInternalSearchTerm(value);
    setShowSearchSuggestions(true);
  };

  // Xử lý tìm kiếm khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(internalSearchTerm);
    }
  };

  // Xóa lịch sử tìm kiếm
  const clearSearchHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  // Xóa một mục khỏi lịch sử
  const removeSearchHistoryItem = (itemToRemove, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(item => item !== itemToRemove);
    setSearchHistory(newHistory);
    try {
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error removing search history item:', error);
    }
  };

  // Gợi ý tìm kiếm
  const getSearchSuggestions = () => {
    if (!internalSearchTerm) {
      return [...searchHistory, ...searchSuggestions].slice(0, 8);
    }
    
    const allSuggestions = [...new Set([...searchSuggestions, ...searchHistory])];
    return allSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(internalSearchTerm.toLowerCase())
      )
      .slice(0, 6);
  };

  // Xử lý yêu thích sản phẩm
  const handleToggleWishlist = (product, event) => {
    event?.stopPropagation();
    
    if (!product) return;

    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      setWishlist(updatedWishlist);
      localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
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
      
      const updatedWishlist = [...wishlist, wishlistItem];
      setWishlist(updatedWishlist);
      localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
      setSnackbar({ 
        open: true, 
        message: `Đã thêm "${product.name}" vào danh sách yêu thích!`,
        type: 'success'
      });
    }
  };

  // Kiểm tra sản phẩm có trong wishlist không
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Điều hướng đến trang wishlist
  const handleNavigateToWishlist = () => {
    console.log('Navigating to wishlist page');
    if (onNavigate) {
      onNavigate('wishlist');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Phân trang
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 'M', product.colors?.[0] || 'Trắng', 1);
    console.log('Added to cart:', product.name);
  };

  const handleClearFilters = () => {
    setInternalSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('name');
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const ProductCard = ({ product }) => (
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
            {product.price.toLocaleString('vi-VN')}₫
          </Typography>
          {product.originalPrice > product.price && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through', fontSize: '0.8rem' }}
            >
              {product.originalPrice.toLocaleString('vi-VN')}₫
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
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      {/* Header với nút Wishlist */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {title === 'Sản Phẩm' ? 'Khám phá bộ sưu tập thời trang mới nhất của chúng tôi' : ''}
          </Typography>
        </Box>
        
        {/* Nút Wishlist */}
        {title === 'Sản Phẩm' && (
          <Button
            variant="outlined"
            startIcon={<Favorite />}
            onClick={handleNavigateToWishlist}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Yêu Thích ({wishlist.length})
          </Button>
        )}
      </Box>

      {/* Search Bar với gợi ý - chỉ hiển thị khi không phải trang đặc biệt */}
      {title === 'Sản Phẩm' && (
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Card sx={{ p: 2, boxShadow: 2 }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm sản phẩm theo tên, mô tả hoặc từ khóa..."
              value={internalSearchTerm}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSearchSuggestions(true)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: internalSearchTerm && (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={() => {
                        setInternalSearchTerm('');
                        setShowSearchSuggestions(false);
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Card>

          {/* Search Suggestions Dropdown */}
          {showSearchSuggestions && (searchHistory.length > 0 || searchSuggestions.length > 0) && (
            <Card sx={{ 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              right: 0, 
              zIndex: 1000,
              mt: 1,
              maxHeight: 300,
              overflow: 'auto'
            }}>
              <CardContent sx={{ p: 2 }}>
                {/* Lịch sử tìm kiếm */}
                {searchHistory.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Lịch sử tìm kiếm
                      </Typography>
                      <Button size="small" onClick={clearSearchHistory}>
                        Xóa tất cả
                      </Button>
                    </Box>
                    {searchHistory.map((item, index) => (
                      <Box
                        key={index}
                        onClick={() => handleSearch(item)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1,
                          cursor: 'pointer',
                          borderRadius: 1,
                          '&:hover': { backgroundColor: 'action.hover' }
                        }}
                      >
                        <Typography variant="body2">
                          {item}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={(e) => removeSearchHistoryItem(item, e)}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Gợi ý tìm kiếm */}
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Gợi ý tìm kiếm
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {getSearchSuggestions().map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      variant="outlined"
                      size="small"
                      clickable
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      {/* Filter Bar - chỉ hiển thị khi không phải trang đặc biệt */}
      {title === 'Sản Phẩm' && (
        <Card sx={{ mb: 3, p: 2, boxShadow: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Danh mục</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Danh mục"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Khoảng giá</InputLabel>
                <Select
                  value={priceRange}
                  label="Khoảng giá"
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {priceRanges.map(range => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Sắp xếp</InputLabel>
                <Select
                  value={sortBy}
                  label="Sắp xếp"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => setFilterDrawerOpen(true)}
                  sx={{ display: { md: 'none' } }}
                >
                  Lọc
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  fullWidth
                >
                  Xóa bộ lọc
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Kết quả tìm kiếm */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredProducts.length === 0 && allProducts.length > 0 ? 'Không tìm thấy sản phẩm phù hợp' : `Tìm thấy ${filteredProducts.length} sản phẩm`}
          {internalSearchTerm && ` cho "${internalSearchTerm}"`}
        </Typography>
        
        {(internalSearchTerm || selectedCategory !== 'all' || priceRange !== 'all') && title === 'Sản Phẩm' && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {internalSearchTerm && (
              <Chip
                label={`Tìm: "${internalSearchTerm}"`}
                onDelete={() => setInternalSearchTerm('')}
                size="small"
              />
            )}
            {selectedCategory !== 'all' && (
              <Chip
                label={`Danh mục: ${categories.find(c => c.value === selectedCategory)?.label}`}
                onDelete={() => setSelectedCategory('all')}
                size="small"
              />
            )}
            {priceRange !== 'all' && (
              <Chip
                label={`Giá: ${priceRanges.find(r => r.value === priceRange)?.label}`}
                onDelete={() => setPriceRange('all')}
                size="small"
              />
            )}
          </Box>
        )}
      </Box>

      {/* Thông báo không tìm thấy */}
      {filteredProducts.length === 0 && allProducts.length > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            {internalSearchTerm ? (
              <>
                Không tìm thấy sản phẩm phù hợp với từ khóa "<strong>{internalSearchTerm}</strong>".
                Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
              </>
            ) : (
              'Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại. Hãy thử điều chỉnh bộ lọc.'
            )}
          </Typography>
        </Alert>
      )}

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentProducts.map(product => (
              <Grid 
                item 
                key={product.id} 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : allProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {emptyMessage}
          </Typography>
          {title === 'Sản Phẩm Yêu Thích' && (
            <Button variant="contained" onClick={() => onNavigate('products')}>
              Khám phá sản phẩm
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Đang tải sản phẩm...
          </Typography>
        </Box>
      )}

      {/* Mobile Filter Drawer */}
      {title === 'Sản Phẩm' && (
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
        >
          <Box sx={{ width: 300, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bộ lọc
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={selectedCategory}
                label="Danh mục"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Khoảng giá</InputLabel>
              <Select
                value={priceRange}
                label="Khoảng giá"
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {priceRanges.map(range => (
                  <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Sắp xếp</InputLabel>
              <Select
                value={sortBy}
                label="Sắp xếp"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" fullWidth onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
          </Box>
        </Drawer>
      )}

      {/* Floating Cart Button */}
      <Fab
        color="primary"
        aria-label="cart"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => onNavigate('cart')}
      >
        <Badge badgeContent={getCartItemsCount()} color="error">
          <ShoppingCart />
        </Badge>
      </Fab>

      {/* Floating Wishlist Button */}
      <Fab
        color="secondary"
        aria-label="wishlist"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={handleNavigateToWishlist}
      >
        <Badge badgeContent={wishlist.length} color="error">
          <Favorite />
        </Badge>
      </Fab>

      {/* Click outside để đóng suggestions */}
      {showSearchSuggestions && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowSearchSuggestions(false)}
        />
      )}

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
    </Container>
  );
};

export default Products;