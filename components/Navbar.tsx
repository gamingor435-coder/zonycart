"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { cartCount, wishlistCount, user, logout } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?query=${searchQuery}`);
  };

  return (
    <nav style={{ backgroundColor: '#131921', padding: '10px 20px', color: '#fff', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
        
        <Link href="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '22px', fontWeight: 'bold' }}>
          Zony<span style={{ color: '#febd69' }}>Cart</span>
        </Link>

        <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1, maxWidth: '600px', height: '38px' }}>
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, padding: '0 15px', borderRadius: '4px 0 0 4px', border: 'none', outline: 'none' }} />
          <button type="submit" style={{ backgroundColor: '#febd69', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}>🔍</button>
        </form>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* User Account Section */}
          {user ? (
            <div style={{ cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '12px', display: 'block' }}>Hello, {user.name}</span>
              <span onClick={logout} style={{ fontSize: '14px', fontWeight: 'bold', color: '#febd69' }}>Sign Out</span>
            </div>
          ) : (
            <Link href="/login" style={{ color: '#fff', textDecoration: 'none' }}>
              <span style={{ fontSize: '12px', display: 'block' }}>Hello, sign in</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Account & Lists</span>
            </Link>
          )}

          <Link href="/wishlist" style={{ color: '#fff', textDecoration: 'none', position: 'relative' }}>
             ❤️ <span style={{ fontSize: '11px', position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#B12704', padding: '2px 6px', borderRadius: '50%' }}>{wishlistCount}</span>
          </Link>

          <Link href="/cart" style={{ color: '#fff', textDecoration: 'none', position: 'relative' }}>
             🛒 <span style={{ fontSize: '11px', position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#febd69', color: '#000', padding: '2px 6px', borderRadius: '50%' }}>{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}