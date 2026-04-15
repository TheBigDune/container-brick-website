"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const { passphrases, isLoaded } = useDataStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    const isValid = passphrases.some(p => p.value === passphrase);
    if (isValid) {
      sessionStorage.setItem('cb_admin_token', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid security signature. Please try again.');
      setPassphrase('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-50 via-zinc-50 to-white pointer-events-none" />
      
      <Link href="/" className="absolute top-10 left-10 text-sm font-semibold text-zinc-500 hover:text-teal-600 transition-colors z-20 flex items-center gap-2">
        <ArrowRight className="w-4 h-4 rotate-180" /> Go Back
      </Link>

      <Card className="w-full max-w-md border border-zinc-100 shadow-2xl shadow-zinc-200/50 rounded-[2.5rem] bg-white/80 backdrop-blur-xl relative z-10 animate-in zoom-in-95 duration-500">
        <CardHeader className="text-center pt-14 pb-8">
          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-teal-100">
            <Lock className="w-8 h-8 text-teal-600" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">Admin Portal</CardTitle>
          <CardDescription className="uppercase tracking-widest text-xs font-semibold text-zinc-400">
            Encrypted Access Terminal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="px-10 pb-8">
            <div className="space-y-5">
              <Input
                type="password"
                placeholder="Enter Secure Passphrase"
                className="h-16 rounded-2xl border-zinc-200 focus-visible:ring-teal-500 bg-zinc-50 focus-visible:bg-white text-center text-lg tracking-widest px-6"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                autoFocus
              />
              {error && <p className="text-red-500 text-xs font-semibold uppercase tracking-widest text-center animate-in fade-in bg-red-50 py-2 rounded-xl border border-red-100">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="px-10 pb-12">
            <Button type="submit" className="w-full h-16 bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-500/20 text-white rounded-full font-semibold text-lg transition-all group">
              Authorize Entry <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <p className="mt-8 text-zinc-400 text-xs font-medium uppercase tracking-widest z-10 text-center px-6">
        Protected Database Environment &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
