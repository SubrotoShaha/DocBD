import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout wrapper that includes Navbar + Footer around page content
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
