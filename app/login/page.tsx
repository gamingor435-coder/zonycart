"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useCart();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      login(name, email);
      router.push('/'); // Login ke baad home page par bhej dega
    }
  };

  return (
    <main style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign-In</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Your Name</label>
          <input 
            type="text" required value={name} onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Email</label>
          <input 
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#FFD814', padding: '10px', border: '1px solid #FCD200', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Continue
        </button>
      </form>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '20px', textAlign: 'center' }}>
        By continuing, you agree to ZonyCart's Conditions of Use and Privacy Notice.
      </p>
    </main>
  );
}