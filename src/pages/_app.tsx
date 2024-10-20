import '../index.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-black text-blue-300 font-mono">
      <Navbar />
      <main className="container mx-auto mt-8 p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;