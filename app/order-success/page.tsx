import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '60px', color: '#007600' }}>✔️</div>
      <h1 style={{ fontSize: '32px', margin: '20px 0' }}>Mubarak Ho! Aapka Order Place ho gaya hai.</h1>
      <p style={{ color: '#555', fontSize: '18px', marginBottom: '30px' }}>
        Humein aapka order mil gaya hai. Jald hi aapko confirmation email mil jayegi.
      </p>
      <Link href="/" style={{ 
        backgroundColor: '#FFD814', 
        padding: '12px 30px', 
        borderRadius: '25px', 
        textDecoration: 'none', 
        color: '#000', 
        fontWeight: 'bold',
        border: '1px solid #FCD200'
      }}>
        Wapas Shopping Karein
      </Link>
    </div>
  );
}