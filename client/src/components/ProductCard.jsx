import React from 'react';
import { useCartStore } from '../stores/cartStore';

export default function ProductCard({ product }){
  const { addToCart } = useCartStore();

  return (
    <div className="card">
      <img 
        src={product.image} 
        alt={product.name} 
        style={{
          width: '100%', 
          height: 160, 
          objectFit: 'cover', 
          borderRadius: 6
        }} 
      />
      <h4 style={{ margin: '8px 0' }}>{product.name}</h4>
      <div style={{ fontWeight: '600' }}>
        {product.price.toLocaleString ? 
          product.price.toLocaleString() + ' đ' : 
          product.price + ' đ'
        }
      </div>
      <p style={{ fontSize: 13, color: '#555' }}>{product.description}</p>
      
      {/* Thêm nút Add to Cart */}
      <button 
        onClick={() => addToCart(product)}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}