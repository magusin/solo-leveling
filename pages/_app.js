import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
