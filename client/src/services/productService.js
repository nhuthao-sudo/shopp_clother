// Mock data - trong thực tế sẽ fetch từ server
const mockProducts = [
  {
    id: 1,
    name: "Áo Thun Basic Cotton",
    description: "Áo thun chất liệu cotton mềm mại, thoáng mát, form regular phù hợp với mọi dáng người.",
    price: 199000,
    originalPrice: 299000,
    discount: 33,
    rating: 4.5,
    featured: true,
    category: "ao-thun",
    images: ["/images/products/tshirt-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Trắng", "Xám"],
    inStock: true
  },
  {
    id: 2,
    name: "Quần Jean Slim Fit",
    description: "Quần jean dáng slim fit chất liệu denim co giãn, thiết kế trẻ trung và thời trang.",
    price: 450000,
    originalPrice: 550000,
    discount: 18,
    rating: 4.8,
    featured: true,
    category: "quan-jean",
    images: ["/images/products/jeans-1.jpg"],
    sizes: ["28", "29", "30", "31", "32"],
    colors: ["Xanh đậm", "Xanh nhạt", "Đen"],
    inStock: true
  },
  {
    id: 3,
    name: "Áo Khoác Denim",
    description: "Áo khoác denim cổ điển, chất liệu bền đẹp, dễ dàng phối đồ với nhiều phong cách.",
    price: 620000,
    originalPrice: 750000,
    discount: 17,
    rating: 4.3,
    featured: true,
    category: "ao-khoac",
    images: ["/images/products/jacket-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Xanh", "Đen"],
    inStock: true
  },
  {
    id: 4,
    name: "Váy Đầm Hoa Nhí",
    description: "Váy đầm nữ tính với họa tiết hoa nhí, chất liệu voan mềm mại, thích hợp cho nhiều dịp.",
    price: 380000,
    originalPrice: 480000,
    discount: 21,
    rating: 4.7,
    featured: true,
    category: "vay-dam",
    images: ["/images/products/dress-1.jpg"],
    sizes: ["S", "M", "L"],
    colors: ["Hồng", "Trắng", "Xanh pastel"],
    inStock: true
  }
  ,
  {
    id: 4,
    name: "Váy Đầm Hoa Nhí",
    description: "Váy đầm nữ tính với họa tiết hoa nhí, chất liệu voan mềm mại, thích hợp cho nhiều dịp.",
    price: 380000,
    originalPrice: 480000,
    discount: 21,
    rating: 4.7,
    featured: true,
    category: "vay-dam",
    images: ["/images/products/dress-1.jpg"],
    sizes: ["S", "M", "L"],
    colors: ["Hồng", "Trắng", "Xanh pastel"],
    inStock: true
  }
];

// Mock API service
export const productService = {
  getFeaturedProducts: async () => {
    // Giả lập delay network
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const featuredProducts = mockProducts.filter(product => product.featured);
    
    return {
      success: true,
      data: featuredProducts,
      total: featuredProducts.length
    };
  },

  getAllProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: mockProducts,
      total: mockProducts.length
    };
  },

  getProductsByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filteredProducts = mockProducts.filter(
      product => product.category === category
    );
    
    return {
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    };
  },

  getProductById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const product = mockProducts.find(p => p.id === parseInt(id));
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return {
      success: true,
      data: product
    };
  }
};