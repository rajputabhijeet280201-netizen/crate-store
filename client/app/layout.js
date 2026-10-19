import { Archivo_Black, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Header from '@/components/Header';

const head = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-head' });
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });

export const metadata = { title: 'Crate — digital products you own', description: 'Templates, UI kits, code and audio. Buy once, download forever.' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body><StoreProvider><Header /><main>{children}</main></StoreProvider></body>
    </html>
  );
}
