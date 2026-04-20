"use client";
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '30px' }}>Aapki Wishlist Khali Hai! ❤️</h1>
        <p style={{ color: '#666', margin: '20px 0' }}>Apne pasandida products yahan save karein.</p>
        <Link href="/" style={{ 
          backgroundColor: '#FFD814', 
          padding: '10px 25px', 
          borderRadius: '20px', 
          textDecoration: 'none', 
          color: '#000',
          fontWeight: 'bold',
          border: '1px solid #FCD200'
        }}>
          Products Dekhein
        </Link>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>Your Wishlist ❤️</h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px',
        marginTop: '30px' 
      }}>
        {wishlistItems.map((item) => (
          <div key={item._id} style={{ 
            backgroundColor: '#fff', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Deselect Button (Remove from Wishlist) */}
            <button 
              onClick={() => removeFromWishlist(item._id)}
              style={{ 
                position: 'absolute', top: '10px', right: '10px', 
                background: '#eee', border: 'none', borderRadius: '50%', 
                width: '30px', height: '30px', cursor: 'pointer' 
              }}
              title="Remove"
            >
              ✕
            </button>

            <Link href={`/products/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '100%', height: '180px', marginBottom: '10px' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: '16px', height: '40px', overflow: 'hidden', margin: '10px 0' }}>{item.name}</h3>
              <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#B12704' }}>${item.price}</p>
            </Link>

            <button 
              onClick={() => addToCart(item)}
              style={{ 
                marginTop: '15px', 
                backgroundColor: '#FFD814', 
                border: '1px solid #FCD200', 
                padding: '8px', 
                borderRadius: '20px', 
                fontWeight: 'bold', 
                cursor: 'pointer' 
              }}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}