import { client } from '@/sanity/lib/client';
import ProductButtons from '@/components/ProductButtons';
import ProductReviews from '@/components/ProductReviews'; // Naya component
import Link from 'next/link';

export default async function ProductPage({ params }: { params: any }) {
  const { slug } = await params;
  
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id, name, price, description, "imageUrl": image.asset->url
  }`;
  const product = await client.fetch(query, { slug });

  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Product Not Found</div>;

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#007185', textDecoration: 'none', fontSize: '14px' }}>← Back to Shop</Link>
      </nav>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
        {/* Left: Image */}
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' }} />
        </div>

        {/* Right: Info */}
        <div style={{ flex: '1.2', minWidth: '300px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '10px' }}>{product.name}</h1>
          <p style={{ fontSize: '24px', color: '#B12704', fontWeight: 'bold' }}>${product.price}</p>
          
          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '17px' }}>Description</h3>
            <p style={{ lineHeight: '1.6', color: '#333', fontSize: '15px' }}>{product.description}</p>
          </div>

          <ProductButtons product={product} />
        </div>
      </div>

      {/* REVIEWS SECTION YAHAN AA GAYA */}
      <ProductReviews productId={product._id} />
    </main>
  );
}