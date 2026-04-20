import { client } from '../sanity/lib/client';
import ProductCard from '@/components/ProductCard'; // Naya component import kiya

// Ye function server par data fetch karta hai (Bohat fast hai)
async function getProducts(search: string) {
  const query = search 
    ? `*[_type == "product" && name match $search + "*"]{
        _id, name, price, "slug": slug.current, "imageUrl": image.asset->url
      }`
    : `*[_type == "product"]{
        _id, name, price, "slug": slug.current, "imageUrl": image.asset->url
      }`;
  
  return await client.fetch(query, { search });
}

export default async function Home({ searchParams }: { searchParams: any }) {
  // URL se search query nikalna
  const params = await searchParams;
  const queryParam = params.query || "";
  const products = await getProducts(queryParam);

  return (
    <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 20px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
        {queryParam ? `Results for "${queryParam}"` : "Featured Products"}
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '20px' 
      }}>
        {products.map((product: any) => (
          // Har product ke liye naya Card component use ho raha hai
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}