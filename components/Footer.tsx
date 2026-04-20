"use client"; // Ye line Next.js ko batati hai ke isme buttons/clicks kaam karenge

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#232f3e', 
      color: '#fff', 
      fontFamily: "'Inter', sans-serif",
      marginTop: '60px'
    }}>
      {/* Back to Top button */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ 
          backgroundColor: '#37475a', 
          padding: '15px', 
          textAlign: 'center', 
          fontSize: '13px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Back to top
      </div>

      {/* Main Footer Content */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '40px 20px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        gap: '30px'
      }}>
        {/* Column 1 */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '15px', color: '#fff' }}>Get to Know Us</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.2', color: '#DDD' }}>
            <li>About Zony Cart</li>
            <li>Careers</li>
            <li>Press Releases</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '15px', color: '#fff' }}>Connect with Us</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.2', color: '#DDD' }}>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '15px', color: '#fff' }}>Let Us Help You</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.2', color: '#DDD' }}>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div style={{ 
        borderTop: '1px solid #3a4553', 
        padding: '40px 20px', 
        textAlign: 'center', 
        fontSize: '12px',
        color: '#ccc',
        backgroundColor: '#131a22'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#fff' }}>
            Zony<span style={{ color: '#febd69' }}>Cart</span>
          </span>
        </div>
        <p>© 2026, Zony-Cart.com, Inc. or its affiliates</p>
        <p style={{ marginTop: '10px', fontSize: '11px' }}>Developed for SSC Practical Project</p>
      </div>
    </footer>
  );
}