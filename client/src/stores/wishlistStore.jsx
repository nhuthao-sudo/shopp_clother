// stores/wishlistStore.jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      // State
      wishlistItems: [],
      
      // Actions
      addToWishlist: (product) => {
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
        
        set((state) => {
          // Kiểm tra xem sản phẩm đã có trong wishlist chưa
          const existingItem = state.wishlistItems.find(item => item.id === product.id);
          if (existingItem) {
            return state; // Không thêm nếu đã tồn tại
          }
          
          const updatedWishlist = [...state.wishlistItems, wishlistItem];
          return { wishlistItems: updatedWishlist };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(item => item.id !== productId)
        }));
      },

      clearWishlist: () => {
        set({ wishlistItems: [] });
      },

      isInWishlist: (productId) => {
        return get().wishlistItems.some(item => item.id === productId);
      },

      getWishlistCount: () => {
        return get().wishlistItems.length;
      },

      // Toggle wishlist - thêm nếu chưa có, xóa nếu đã có
      toggleWishlist: (product) => {
        const { isInWishlist, addToWishlist, removeFromWishlist } = get();
        
        if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
          return false; // Đã xóa
        } else {
          addToWishlist(product);
          return true; // Đã thêm
        }
      }
    }),
    {
      name: 'wishlist-storage', // Tên key trong localStorage
      // Có thể thêm các tùy chọn khác nếu cần
    }
  )
);