import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: "Yong Zheng's Life Operating System",
    template: "%s | Yong Zheng's Life Operating System"
  },
  description:
    'A bilingual personal knowledge website about Life OS, first principles, systems thinking, education, investing, technology, and civilization.',
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
