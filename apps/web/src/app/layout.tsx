import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZIVOPO | Beyond Connections',
  description: 'ZIVOPO is a premium human assistance ecosystem for students, professionals, families, and communities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
