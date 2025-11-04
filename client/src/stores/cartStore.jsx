import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      cartItems: [],

      // Computed values
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
          return total + (item.product.price * item.quantity);
        }, 0);
      },

      getCartItemsCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      },

      // Actions
      addToCart: (product, size = 'M', color = 'Đen', quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(item =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
          );

          if (existingItem) {
            const updatedItems = state.cartItems.map(item =>
              item.product.id === product.id && item.size === size && item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            toast.success(`Đã cập nhật số lượng sản phẩm!`);
            return { cartItems: updatedItems };
          } else {
            const newItems = [...state.cartItems, {
              product,
              size,
              color,
              quantity,
              addedAt: new Date().toISOString()
            }];
            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
            return { cartItems: newItems };
          }
        });
      },

      removeFromCart: (productId, size, color) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item =>
            !(item.product.id === productId && item.size === size && item.color === color)
          )
        }));
        toast.info('Đã xóa sản phẩm khỏi giỏ hàng!');
      },

      updateQuantity: (productId, size, color, newQuantity) => {
        if (newQuantity < 1) {
          get().removeFromCart(productId, size, color);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.product.id === productId && item.size === size && item.color === color
              ? { ...item, quantity: newQuantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
        toast.info('Đã xóa toàn bộ giỏ hàng!');
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);