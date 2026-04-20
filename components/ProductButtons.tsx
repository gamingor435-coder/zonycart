"use client";
import { useCart } from '@/context/CartContext';

export default function ProductButtons({ product }: { product: any }) {
  const { addToCart, addToWishlist } = useCart();

  return (
    <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <button 
        onClick={() => addToCart(product)}
        style={{ 
          width: '100%', padding: '12px', backgroundColor: '#FFD814', 
          border: '1px solid #FCD200', borderRadius: '20px', 
          fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' 
        }}>
        Add to Cart
      </button>
      
      <button 
        onClick={() => addToWishlist(product)}
        style={{ 
          width: '100%', padding: '12px', backgroundColor: '#fff', 
          border: '1px solid #ddd', borderRadius: '20px', 
          cursor: 'pointer', fontSize: '15px', fontWeight: '500'
        }}>
        ❤️ Add to Wishlist
      </button>
    </div>
  );
}