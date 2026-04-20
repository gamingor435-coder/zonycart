"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext"; 

export default function CheckoutPage() {
  const cartData = useCart();
  
  const cart = cartData?.cart || cartData?.cartItems || [];
  
  // Amount Calculation
  const calculatedTotal = cart.reduce((acc: number, item: any) => {
    return acc + (Number(item.price) * Number(item.quantity || 1));
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
          price: Number(item.price), // Sirf number bhej rahay hain
        })),
        totalAmount: Number(totalPrice),
        status: 'pending',
        orderDate: new Date().toISOString(),
      };

      await client.create(orderObject);
      
      alert(`Mubarak ho! Order mil gaya. Total Bill: Rs. ${totalPrice}`);
      clearCart();
      window.location.href = "/"; 

    } catch (error: any) {
      console.error("Sanity Error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Checkout (Rupees)</h2>
      
      <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="fullName" placeholder="Pura Naam" onChange={handleChange} required style={inputStyle} />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="address" placeholder="Ghar ka Pata" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="city" placeholder="Shehar ka Naam" onChange={handleChange} required style={inputStyle} />
        <input type="text" name="phone" placeholder="Mobile Number" onChange={handleChange} required style={inputStyle} />

        <div style={{ background: '#fcfcfc', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
          <p style={{ margin: '5px 0' }}><b>Kul Items:</b> {cart.length}</p>
          {/* Displaying Rs. instead of $ */}
          <p style={{ fontSize: '22px', color: '#d32f2f', fontWeight: 'bold', margin: '0' }}>
            Total Bill: Rs. {totalPrice.toLocaleString()}
          </p>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: isSubmitting ? '#999' : '#000', 
            color: '#fff', padding: '15px', border: 'none', 
            borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'
          }}
        >
          {isSubmitting ? "Order Bheja Ja Raha Hai..." : "Confirm Order (Rs.)"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px'
};