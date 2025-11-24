// ProductManagement.jsx
import React, { useState, useEffect, useRef } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const mockProducts = [
        { 
          id: 1, 
          name: 'Áo thun nam', 
          price: 250000, 
          stock: 50, 
          category: 'Áo',
          image: 'https://thejulius.com.vn/wp-content/uploads/2021/07/quan-ao-mua-dong5.jpg',
          description: 'Áo thun nam chất cotton cao cấp',
          featured: true,
          rating: 4.5
        },
        { 
          id: 2, 
          name: 'Quần jean nữ', 
          price: 450000, 
          stock: 30, 
          category: 'Quần',
          image: 'https://thejulius.com.vn/wp-content/uploads/2021/07/quan-ao-mua-dong5.jpg',
          description: 'Quần jean nữ form slim fit',
          featured: false,
          rating: 4.8
        },
      ];
      setProducts(mockProducts);
      localStorage.setItem('adminProducts', JSON.stringify(mockProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('adminProducts', JSON.stringify(products));
    }
  }, [products]);

  const handleEdit = (product) => setEditingProduct(product);
  const handleDelete = (id) => setProducts(products.filter(p => p.id !== id));

  const handleSave = (data) => {
    if (editingProduct.id) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...data } : p
      ));
    } else {
      const newProduct = { 
        ...data, 
        id: Date.now(),
        rating: 4.0,
        featured: data.featured || false
      };
      setProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() => setEditingProduct({})}
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Hình ảnh</th>
              <th className="px-6 py-3 text-left">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left">Giá</th>
              <th className="px-6 py-3 text-left">Tồn kho</th>
              <th className="px-6 py-3 text-left">Danh mục</th>
              <th className="px-6 py-3 text-left">Nổi bật</th>
              <th className="px-6 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">{product.price.toLocaleString()} VND</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.featured ? 'Có' : 'Không'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button 
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    onClick={() => handleEdit(product)}
                  >
                    Sửa
                  </button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form thêm / sửa sản phẩm */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 transition-all">
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {editingProduct.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
            </h3>

            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    price: product.price || '',
    stock: product.stock || '',
    category: product.category || '',
    image: product.image || '',
    description: product.description || '',
    featured: product.featured || false
  });

  const [imagePreview, setImagePreview] = useState(product.image || '');
  const fileInputRef = useRef(null);

  // Xử lý khi chọn file ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return;
      }

      // Kiểm tra kích thước file (tối đa 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 5MB!');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xóa ảnh đã chọn
  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Kích hoạt input file khi click vào vùng upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate ảnh
    if (!formData.image) {
      alert('Vui lòng chọn hình ảnh cho sản phẩm!');
      return;
    }

    onSave({
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột trái - Thông tin sản phẩm */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm *
            </label>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá *
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tồn kho *
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                required
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục *
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Chọn danh mục</option>
              <option value="Áo">Áo</option>
              <option value="Quần">Quần</option>
              <option value="Phụ kiện">Phụ kiện</option>
              <option value="Giày">Giày</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả sản phẩm *
            </label>
            <textarea
              placeholder="Nhập mô tả chi tiết về sản phẩm..."
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              className="mr-2 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
            />
            <label htmlFor="featured" className="text-gray-700 text-sm">
              Sản phẩm nổi bật (hiển thị trên trang chủ)
            </label>
          </div>
        </div>

        {/* Cột phải - Upload ảnh và preview */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hình ảnh sản phẩm *
            </label>
            
            {/* Vùng upload ảnh */}
            <div 
              onClick={handleUploadClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-1">Nhấn để tải lên hình ảnh</p>
                  <p className="text-gray-400 text-sm">PNG, JPG, JPEG (Tối đa 5MB)</p>
                </div>
              )}
            </div>

{/* URL ảnh thay thế */}
<div className="mt-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Hoặc nhập URL hình ảnh
  </label>
  <input
    type="url"
    placeholder="https://example.com/image.jpg"
    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    value={formData.image}
    onChange={(e) => {
      const newImageUrl = e.target.value;
      setFormData({...formData, image: newImageUrl});
      setImagePreview(newImageUrl);
    }}
    onPaste={(e) => {
      // Xử lý khi người dùng dán URL
      const pastedText = e.clipboardData.getData('text');
      setTimeout(() => {
        setImagePreview(pastedText);
      }, 100);
    }}
    onBlur={(e) => {
      // Xử lý khi rời khỏi ô input
      if (e.target.value) {
        setImagePreview(e.target.value);
      }
    }}
  />
</div>



          </div>

          {/* Preview ảnh nhỏ */}
          {imagePreview && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="w-20 h-20 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {product.id ? 'Cập nhật' : 'Thêm sản phẩm'}
        </button>
      </div>
    </form>
  );
};

export default ProductManagement;