"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug?: string;
  quantity?: number;
};

type User = {
  name: string;
  email: string;
} | null;

type CartContextType = {
  cart: Product[]; // YE LINE MAIN ADD KI HAI - ERROR FIX HONE KE LIYE
  cartItems: Product[];
  wishlistItems: Product[];
  user: User;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  cartCount: number;
  wishlistCount: number;
  clearCart?: () => void; // YE BHI ADD KIYA CLEARCART KE LIYE
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWish = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWish) setWishlistItems(JSON.parse(savedWish));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [cartItems, wishlistItems, user]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) => item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCartItems((prev) => prev.filter((item) => item._id !== id));
  
  // YE FUNCTION ADD KIYA CLEARCART KE LIYE
  const clearCart = () => {
    setCartItems([]);
  };
  
  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => setWishlistItems((prev) => prev.filter((item) => item._id !== id));

  const login = (name: string, email: string) => setUser({ name, email });
  const logout = () => setUser(null);

  return (
    <CartContext.Provider value={{ 
      cart: cartItems, // YE LINE ADD KI HAI
      cartItems, 
      wishlistItems, 
      user, 
      addToCart, 
      removeFromCart, 
      addToWishlist, 
      removeFromWishlist, 
      login, 
      logout,
      clearCart, // YE BHI ADD KIYA
      cartCount: cartItems.reduce((total, item) => total + (item.quantity || 1), 0),
      wishlistCount: wishlistItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};