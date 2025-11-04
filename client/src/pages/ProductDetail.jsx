import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Button, Chip, Rating, Divider,
  Select, MenuItem, FormControl, InputLabel, Card, CardContent,
  Tabs, Tab, Avatar, TextField, Stack, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, ImageList, ImageListItem,
  Snackbar, Alert,
} from '@mui/material';
import {
  ShoppingCart, Favorite, FavoriteBorder, Share, ThumbUp, CheckCircle,
  AddPhotoAlternate, Close,
} from '@mui/icons-material';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useParams, useNavigate } from 'react-router-dom';

// Mock review data
const mockReviews = [
  {
    id: 1,
    userId: 1,
    userName: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Sản phẩm rất tốt, chất lượng cao!',
    images: ['https://picsum.photos/200/300'],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 5,
    isVerified: true,
    size: 'M',
    color: 'Đen',
  },
  {
    id: 2,
    userId: 2,
    userName: 'Trần Thị B',
    rating: 4,
    comment: 'Sản phẩm đẹp, giao hàng nhanh',
    images: [],
    createdAt: '2024-01-10T14:20:00Z',
    likes: 3,
    isVerified: true,
    size: 'L',
    color: 'Trắng',
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewImages, setReviewImages] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  // ✅ Lấy sản phẩm từ localStorage dựa theo id trên URL
  useEffect(() => {
    const stored = localStorage.getItem('adminProducts');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const found = parsed.find((p) => p.id === parseInt(id));
        setProduct(found || null);
      } catch (err) {
        console.error('Lỗi parse localStorage:', err);
      }
    }
  }, [id]);

  // Load wishlist từ localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('userWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Xử lý yêu thích sản phẩm
  const handleToggleWishlist = () => {
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
  const isInWishlist = () => {
    return product && wishlist.some(item => item.id === product.id);
  };

  // Điều hướng đến trang wishlist
  const handleNavigateToWishlist = () => {
    navigate('/wishlist');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize || product.sizes?.[0], selectedColor || product.colors?.[0], quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleReviewSubmit = () => {
    if (!reviewRating || !reviewComment.trim()) {
      alert('Vui lòng nhập đủ thông tin đánh giá!');
      return;
    }
    alert('Cảm ơn bạn đã đánh giá sản phẩm!');
    setReviewDialogOpen(false);
    setReviewRating(0);
    setReviewComment('');
    setReviewImages([]);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + reviewImages.length > 5) {
      alert('Chỉ được upload tối đa 5 ảnh!');
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setReviewImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setReviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const reviewStats = {
    average: 4.5,
    total: mockReviews.length,
    distribution: { 5: 1, 4: 1, 3: 0, 2: 0, 1: 0 },
  };

  const sortedReviews = [...mockReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'highest': return b.rating - a.rating;
      case 'lowest': return a.rating - b.rating;
      default: return 0;
    }
  });

  // Mock product images
  const productImages = [
    product?.image,
    'https://picsum.photos/400/500?random=1',
    'https://picsum.photos/400/500?random=2',
    'https://picsum.photos/400/500?random=3'
  ].filter(Boolean);

  const ReviewItem = ({ review }) => (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar>{review.userName.charAt(0)}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography fontWeight="bold" gutterBottom>
                {review.userName}
                {review.isVerified && (
                  <CheckCircle sx={{ fontSize: 16, color: 'success.main', ml: 0.5 }} />
                )}
              </Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {new Date(review.createdAt).toLocaleDateString('vi-VN')}
            </Typography>
          </Stack>
          
          <Box sx={{ mt: 1, mb: 1 }}>
            <Chip label={`Size: ${review.size}`} size="small" variant="outlined" sx={{ mr: 1 }} />
            <Chip label={`Màu: ${review.color}`} size="small" variant="outlined" />
          </Box>
          
          <Typography variant="body1" paragraph>{review.comment}</Typography>
          
          {review.images.length > 0 && (
            <ImageList cols={3} gap={8} sx={{ mt: 1 }}>
              {review.images.map((img, i) => (
                <ImageListItem key={i}>
                  <img 
                    src={img} 
                    alt="review" 
                    style={{ 
                      borderRadius: 8, 
                      height: 80, 
                      width: '100%', 
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }} 
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <IconButton size="small">
              <ThumbUp fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {review.likes} lượt thích
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );

  // Nếu chưa có product → hiển thị loading
  if (!product) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Đang tải sản phẩm...
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Hình ảnh sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                height: 500,
                bgcolor: 'grey.50',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: 16
                }}
              />
            </Box>
          </Box>
          
          {/* Thumbnail images */}
          <ImageList cols={4} gap={8} sx={{ m: 0 }}>
            {productImages.map((img, index) => (
              <ImageListItem 
                key={index}
                sx={{ 
                  cursor: 'pointer',
                  border: selectedImage === index ? 2 : 1,
                  borderColor: selectedImage === index ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} ${index + 1}`}
                  style={{
                    height: 80,
                    objectFit: 'cover'
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        {/* Thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 500 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              {product.discount > 0 && (
                <Chip 
                  label={`-${product.discount}%`} 
                  color="error" 
                  size="small"
                />
              )}
              <IconButton 
                onClick={handleToggleWishlist}
                color={isInWishlist() ? "error" : "default"}
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    transform: 'scale(1.1)',
                  }
                }}
              >
                {isInWishlist() ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating || 4.5} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({reviewStats.total} đánh giá)
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              {product.discount > 0 ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {(product.price * (1 - product.discount / 100)).toLocaleString()}₫
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    {product.price?.toLocaleString()}₫
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {product.price?.toLocaleString()}₫
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Kích thước */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Kích thước</InputLabel>
              <Select
                value={selectedSize}
                label="Kích thước"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Màu sắc */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Màu sắc</InputLabel>
              <Select
                value={selectedColor}
                label="Màu sắc"
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {(product.colors || ["Đen", "Trắng", "Xanh", "Hồng"]).map((color) => (
                  <MenuItem key={color} value={color}>{color}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Số lượng */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Số lượng</InputLabel>
              <Select 
                value={quantity} 
                label="Số lượng" 
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Nút hành động */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button 
                variant="contained" 
                startIcon={<ShoppingCart />} 
                sx={{ flex: 1, py: 1.5 }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </Button>
              <Button 
                variant="outlined" 
                sx={{ flex: 1, py: 1.5 }}
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
            </Stack>

            {/* Các nút khác */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button 
                startIcon={isInWishlist() ? <Favorite /> : <FavoriteBorder />} 
                color="inherit"
                onClick={handleToggleWishlist}
              >
                {isInWishlist() ? 'Đã yêu thích' : 'Yêu thích'}
              </Button>
              <Button startIcon={<Share />} color="inherit">
                Chia sẻ
              </Button>
              <Button 
                color="inherit"
                onClick={handleNavigateToWishlist}
              >
                Xem Wishlist ({wishlist.length})
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs thông tin chi tiết */}
      <Box sx={{ mt: 6 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, v) => setTabValue(v)} 
          centered
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tab label="Mô tả sản phẩm" />
          <Tab label={`Đánh giá (${reviewStats.total})`} />
          <Tab label="Thông tin vận chuyển" />
        </Tabs>

        <Box sx={{ py: 4, minHeight: 200 }}>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Chi tiết sản phẩm
              </Typography>
              <Typography paragraph>
                {product.description || 'Sản phẩm chất lượng cao, thiết kế hiện đại và phù hợp với nhiều dịp sử dụng.'}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Đặc điểm nổi bật
              </Typography>
              <ul>
                <li><Typography>Chất liệu cao cấp, bền đẹp</Typography></li>
                <li><Typography>Thiết kế thời trang, hiện đại</Typography></li>
                <li><Typography>Phù hợp nhiều hoàn cảnh sử dụng</Typography></li>
                <li><Typography>Dễ dàng phối đồ</Typography></li>
              </ul>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6">
                  Đánh giá sản phẩm ({reviewStats.total})
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => setReviewDialogOpen(true)}
                >
                  Viết đánh giá
                </Button>
              </Stack>

              {sortedReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Thông tin vận chuyển
              </Typography>
              <Typography paragraph>
                • Miễn phí vận chuyển cho đơn hàng từ 500.000₫
              </Typography>
              <Typography paragraph>
                • Giao hàng toàn quốc trong 2-5 ngày làm việc
              </Typography>
              <Typography paragraph>
                • Đổi trả trong 30 ngày nếu sản phẩm lỗi
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Dialog viết đánh giá */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Viết đánh giá sản phẩm
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Đánh giá của bạn *</Typography>
            <Rating 
              value={reviewRating} 
              onChange={(e, v) => setReviewRating(v)} 
              size="large" 
            />
          </Box>
          
          <TextField
            label="Nhận xét của bạn *"
            multiline
            rows={4}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            fullWidth
            sx={{ mt: 3 }}
            placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
          />
          
          <Box sx={{ mt: 2 }}>
            <input
              accept="image/*"
              id="upload-review-images"
              multiple
              type="file"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-review-images">
              <Button 
                component="span" 
                startIcon={<AddPhotoAlternate />} 
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Thêm ảnh ({reviewImages.length}/5)
              </Button>
            </label>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Thêm ảnh thực tế của sản phẩm (tối đa 5 ảnh)
            </Typography>
          </Box>

          {reviewImages.length > 0 && (
            <ImageList cols={5} gap={8} sx={{ mt: 2 }}>
              {reviewImages.map((img, i) => (
                <ImageListItem key={i} sx={{ position: 'relative' }}>
                  <img 
                    src={img} 
                    alt="preview" 
                    style={{ 
                      height: 80, 
                      width: '100%', 
                      objectFit: 'cover', 
                      borderRadius: 8 
                    }} 
                  />
                  <IconButton
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 4, 
                      right: 4, 
                      bgcolor: 'rgba(0,0,0,0.5)', 
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.7)',
                      }
                    }}
                    onClick={() => removeImage(i)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setReviewDialogOpen(false)}
            sx={{ minWidth: 100 }}
          >
            Hủy
          </Button>
          <Button 
            variant="contained" 
            onClick={handleReviewSubmit}
            sx={{ minWidth: 100 }}
            disabled={!reviewRating || !reviewComment.trim()}
          >
            Gửi đánh giá
          </Button>
        </DialogActions>
      </Dialog>

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

export default ProductDetail;