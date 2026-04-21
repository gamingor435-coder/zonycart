"use client";
// @ts-nocheck
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
const { cartItems, removeFromCart } = useCart() as { cartItems: any[], removeFromCart: any };  const router = useRouter();

  // Total price calculation with safety check for quantity
  const totalPrice = cartItems.reduce((acc, item) => {
    const quantity = item.quantity || 1; // Agar quantity na ho to 1 maane
    return acc + (item.price * quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '32px' }}>Aapka Cart khali hai! 🛒</h1>
        <p style={{ color: '#666', margin: '20px 0' }}>Kuch shandar products add karein.</p>
        <Link href="/" style={{ 
          backgroundColor: '#FFD814', 
          padding: '10px 20px', 
          borderRadius: '20px', 
          textDecoration: 'none', 
          color: '#000',
          fontWeight: 'bold',
          border: '1px solid #FCD200'
        }}>
          Shopping Shuru Karein
        </Link>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>Shopping Cart</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
        
        {/* Left Side: Items List */}
        <div style={{ flex: '2', minWidth: '350px' }}>
          {cartItems.map((item) => (
            <div key={item._id} style={{ 
              display: 'flex', 
              gap: '20px', 
              borderBottom: '1px solid #eee', 
              padding: '20px 0',
              alignItems: 'center' 
            }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0', fontSize: '18px' }}>{item.name}</h3>
                <p style={{ color: '#007600', fontSize: '12px', margin: '5px 0' }}>In Stock</p>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#007185', 
                    cursor: 'pointer', 
                    padding: '0',
                    fontSize: '13px'
                  }}>
                  Delete
                </button>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Rs. {item.price}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Subtotal Box */}
        <div style={{ 
          flex: '0.8', 
          backgroundColor: '#f3f3f3', 
          padding: '20px', 
          borderRadius: '8px', 
          height: 'fit-content',
          minWidth: '250px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>
            Subtotal ({cartItems.length} items): 
            <span style={{ fontWeight: 'bold' }}> Rs. {totalPrice.toLocaleString()}</span>
          </h3>
          
          <button 
            onClick={() => router.push('/checkout')}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#FFD814', 
              border: '1px solid #FCD200', 
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            Proceed to Checkout
          </button>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '15px', textAlign: 'center' }}>
            Aapki security hamari zimmedari hai.
          </p>
        </div>

      </div>
    </main>
  );
}