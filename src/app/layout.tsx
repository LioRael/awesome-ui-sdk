import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/geist';
import './globals.css';
import { AgentBridge } from '../components/agent-bridge';
import { siteDescription, siteTitle, siteUrl } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: '/' },
  robots: { index: process.env.VERCEL_ENV !== 'preview', follow: process.env.VERCEL_ENV !== 'preview' },
  openGraph: {
    type: 'website',
    siteName: 'Awesome UI SDK',
    title: siteTitle,
    description: siteDescription,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription },
  icons: { icon: 'data:,' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f2e8' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1e1c' },
  ],
};

const themeScript = `let savedTheme;try{savedTheme=localStorage.getItem('awesome-ui-sdk-theme')}catch{}document.documentElement.dataset.theme=savedTheme==='dark'||(!savedTheme&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}<AgentBridge /></body>
    </html>
  );
}
