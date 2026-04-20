"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check karna ke kya hum Studio mein hain
  const isStudio = pathname.startsWith("/studio");

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CartProvider>
          {/* Studio ke ilawa baqi har page par Navbar nazar aayega */}
          {!isStudio && <Navbar />}

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            {children}
          </div>

          {/* Footer: Company Information (Sirf Studio ke bahar nazar aayega) */}
          {!isStudio && (
            <footer style={{ backgroundColor: '#232f3e', color: '#fff', padding: '40px 20px', marginTop: '50px' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>About ZonyCart</h3>
                  <p style={{ fontSize: '14px', color: '#DDD', lineHeight: '1.6' }}>
                    ZonyCart is your one-stop shop for all your needs. We provide high-quality products with the best customer service.
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Contact Us</h3>
                  <p style={{ fontSize: '14px', color: '#DDD' }}>Email: support@zonycart.com</p>
                  <p style={{ fontSize: '14px', color: '#DDD' }}>Phone: +92 300 1234567</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Quick Links</h3>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#DDD' }}>
                    <li style={{ marginBottom: '8px' }}>Privacy Policy</li>
                    <li style={{ marginBottom: '8px' }}>Terms of Service</li>
                    <li>Help Center</li>
                  </ul>
                </div>
              </div>
              <div style={{ textAlign: 'center', borderTop: '1px solid #3a4553', marginTop: '30px', paddingTop: '20px', fontSize: '13px', color: '#DDD' }}>
                © 2026 ZonyCart. All rights reserved.
              </div>
            </footer>
          )}
        </CartProvider>
      </body>
    </html>
  );
}