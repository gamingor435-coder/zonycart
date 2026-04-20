"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useCart();

  // Check karein ke kya ye product pehle se wishlist mein hai?
  const isWishlisted = wishlistItems.some(item => item._id === product._id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      padding: '15px', 
      border: '1px solid #eee', 
      position: 'relative',
      borderRadius: '4px',
      transition: '0.3s'
    }}>
      {/* Heart Button: Rang badlega agar selected hai */}
      <button 
        onClick={toggleWishlist}
        style={{ 
          position: 'absolute', top: '10px', right: '10px', 
          background: isWishlisted ? '#ff4747' : '#fff', 
          border: '1px solid #ddd', 
          borderRadius: '50%', width: '35px', height: '35px', 
          cursor: 'pointer', zIndex: 10, 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
          color: isWishlisted ? '#fff' : '#000'
        }}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ width: '100%', height: '180px', marginBottom: '10px' }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <h2 style={{ fontSize: '15px', color: '#007185', fontWeight: '500', height: '40px', overflow: 'hidden' }}>
          {product.name}
        </h2>
        <p style={{ margin: '10px 0', fontSize: '20px', fontWeight: 'bold' }}>
          {/* Yahan $ hata kar Rs. kar diya gaya hai */}
          <span style={{ fontSize: '14px', marginRight: '4px' }}>Rs.</span>{product.price}
        </p>
      </Link>
    </div>
  );
}