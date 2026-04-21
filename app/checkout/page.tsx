"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {

  const cartData: any = useCart();

  // FIX: sirf ek hi cart define karo
  const cart = cartData?.cartItems || [];

  // Amount Calculation
  const calculatedTotal = cart.reduce((acc: number, item: any) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + (price * quantity);
  }, 0);

  const totalPrice = cartData?.totalPrice || calculatedTotal;
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

      await client.create(orderObject);

      alert(`Mubarak ho! Order mil gaya. Total Bill: Rs. ${totalPrice}`);

      clearCart();

      window.location.href = "/";

    } catch (error: any) {
      console.error("Sanity Error:", error);
      alert("Error: " + (error.message || "Order fail ho gaya"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      <form onSubmit={handlePlaceOrder}>
        <input name="fullName" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />

        <p>Total: Rs. {totalPrice}</p>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}