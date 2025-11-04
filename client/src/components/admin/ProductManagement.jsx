// ProductManagement.jsx
import React, { useState, useEffect } from 'react';

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
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
      <input
        type="text"
        placeholder="Tên sản phẩm"
        className="w-full p-3 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />

      <input
        type="number"
        placeholder="Giá"
        className="w-full p-3 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        required
      />

      <input
        type="number"
        placeholder="Số lượng tồn kho"
        className="w-full p-3 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500"
        value={formData.stock}
        onChange={(e) => setFormData({...formData, stock: e.target.value})}
        required
      />

      <input
        type="text"
        placeholder="URL hình ảnh"
        className="w-full p-3 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500"
        value={formData.image}
        onChange={(e) => setFormData({...formData, image: e.target.value})}
        required
      />

      <textarea
        placeholder="Mô tả sản phẩm"
        className="w-full p-3 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        rows="3"
        required
      />

      <select
        className="w-full p-3 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-blue-500"
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

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="featured"
          className="mr-2"
          checked={formData.featured}
          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
        />
        <label htmlFor="featured" className="text-gray-700">
          Sản phẩm nổi bật (hiển thị trên trang chủ)
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Lưu
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductManagement;
