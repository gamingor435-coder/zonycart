"use client";
// @ts-nocheck

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext"; 

export default function CheckoutPage() {
  // TypeScript error se bachne ke liye 'any' cast kiya
  const cartData = useCart() as any;
  
  // Cart items ko safety ke saath pick kiya
  const cart = cartData?.cartItems || cartData?.cart || [];
  
  // Amount Calculation (Rs. focus)
  const calculatedTotal = cart.reduce((acc: number, item: any) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + (price * quantity);
  }, 0);

  const totalPrice = cartData?.totalPrice || cartData?.cartTotal || calculatedTotal;
  const clearCart = cartData?.clearCart || (() => {});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Aapka cart khali hai!");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const orderObject = {
        _type: 'order',
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        cartItems: cart.map((item: any, index: number) => ({
          _type: 'object',
          _key: `item-${index}-${new Date().getTime()}`, 
          productName: item.name || item.title || "Product",
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
        })),
        totalAmount: Number(totalPrice),
        status: 'pending',
        orderDate: new Date().toISOString(),
      };

      // Sanity mein order create karna
      await client.create(orderObject);
      
      alert(`Mubarak ho! Order mil gaya. Total Bill: Rs. ${totalPrice}`);
      
      // Cart khali karna
      if (clearCart) clearCart();
      
      // Home page par wapis bhejna
      window.location.href = "/"; 

    } catch (error: any) {
      console.error("Sanity Error:", error);
      alert("Sanity Error: " + (error.message || "Order complete nahi ho saka"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Checkout (Zony Cart)</h2>
      
      <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="fullName" placeholder="Pura Naam" onChange={handleChange} required style={inputStyle} />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="address" placeholder="Ghar ka Pata" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="city" placeholder="Shehar ka Naam" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="phone" placeholder="Mobile Number" onChange={handleChange} required style={inputStyle} />

        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginTop: '10px' }}>
          <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}><b>Kul Items:</b> {cart.length}</p>
          <p style={{ fontSize: '22px', color: '#d32f2f', fontWeight: 'bold', margin: '0' }}>
            Total Bill: Rs. {Number(totalPrice).toLocaleString()}
          </p>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: isSubmitting ? '#999' : '#111', 
            color: '#fff', padding: '15px', border: 'none', 
            borderRadius: '6px', cursor: isSubmitting ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold', fontSize: '16px', marginTop: '10px',
            transition: '0.3s'
          }}
        >
          {isSubmitting ? "Order Bheja Ja Raha Hai..." : "Confirm Order (Cash on Delivery)"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none'
};