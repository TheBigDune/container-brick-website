"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Lock } from 'lucide-react';

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
      setError('Invalid passphrase. Please try again.');
      setPassphrase('');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-6">
      <Card className="w-full max-w-md border-0 shadow-2xl rounded-none">
        <CardHeader className="text-center pt-12">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-black uppercase tracking-tighter">Admin Access</CardTitle>
          <CardDescription className="uppercase tracking-widest text-[10px] font-bold mt-2">
            Enter secure passphrase to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="px-12 pb-8">
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Secure Passphrase"
                className="h-14 rounded-none border-zinc-300 focus-visible:ring-primary"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                autoFocus
              />
              {error && <p className="text-destructive text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="px-12 pb-12">
            <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-none font-black uppercase tracking-widest text-xs">
              Authorize Entry
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
