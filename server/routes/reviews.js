// server/routes/reviews.js
const express = require('express');
const router = express.Router();

// Mock database - trong thực tế sẽ kết nối với MongoDB/MySQL
let reviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: 'Nguyễn Văn A',
    userAvatar: '',
    rating: 5,
    comment: 'Sản phẩm rất tốt, chất lượng đúng như mô tả!',
    images: [],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 5,
    isVerified: true,
    size: 'M',
    color: 'Đen'
  }
];

// GET reviews for a product
router.get('/products/:productId/reviews', (req, res) => {
  const { productId } = req.params;
  const productReviews = reviews.filter(review => review.productId === parseInt(productId));
  
  res.json({
    success: true,
    data: productReviews
  });
});

// POST new review
router.post('/products/:productId/reviews', (req, res) => {
  const { productId } = req.params;
  const { userId, userName, rating, comment, images, size, color } = req.body;

  const newReview = {
    id: Date.now(),
    productId: parseInt(productId),
    userId,
    userName,
    rating,
    comment,
    images: images || [],
    createdAt: new Date().toISOString(),
    likes: 0,
    isVerified: true,
    size,
    color
  };

  reviews.push(newReview);

  res.json({
    success: true,
    message: 'Đánh giá đã được thêm thành công',
    data: newReview
  });
});

// PUT like a review
router.put('/reviews/:reviewId/like', (req, res) => {
  const { reviewId } = req.params;
  
  const reviewIndex = reviews.findIndex(review => review.id === parseInt(reviewId));
  if (reviewIndex !== -1) {
    reviews[reviewIndex].likes += 1;
    
    res.json({
      success: true,
      message: 'Đã thích đánh giá',
      data: reviews[reviewIndex]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy đánh giá'
    });
  }
});

module.exports = router;