"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview' },
    { href: '/gallery', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="border-b bg-background sticky top-0 z-50 h-20 flex items-center">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold uppercase tracking-wider hover:text-primary transition-colors">
          Container Brick
        </Link>
        <div className="flex gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
