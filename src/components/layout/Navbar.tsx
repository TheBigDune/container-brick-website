"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Container } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview' },
    { href: '/gallery', label: 'Portfolio' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 h-20 flex items-center border-b border-zinc-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
            <Container className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-teal-600 transition-colors">
            Container Brick
          </span>
        </Link>
        <div className="flex gap-8 items-center bg-zinc-50/50 px-6 py-3 rounded-full border border-zinc-100/50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold tracking-wide transition-all hover:text-teal-600 relative",
                pathname === link.href ? "text-teal-600" : "text-zinc-500"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-teal-500 rounded-full animate-in zoom-in" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
