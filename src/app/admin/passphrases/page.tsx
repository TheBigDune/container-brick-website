"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDataStore, Passphrase } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, ArrowLeft, LogOut, Key, Check, X, Container, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PassphraseManagement() {
  const router = useRouter();
  const { passphrases, isLoaded, savePassphrases } = useDataStore();
  const [authorized, setAuthorized] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('cb_admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized || !isLoaded) return null;

  const handleLogout = () => {
    sessionStorage.removeItem('cb_admin_token');
    router.push('/');
  };

  const handleAdd = () => {
    if (!newValue.trim()) return;
    const updated = [...passphrases, { id: Date.now().toString(), value: newValue }];
    savePassphrases(updated);
    setNewValue('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (passphrases.length <= 1) return alert('At least one passphrase must remain for system access.');
    if (confirm('Delete this access key? Use caution as this cannot be undone.')) {
      const updated = passphrases.filter(p => p.id !== id);
      savePassphrases(updated);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24">
      <div className="bg-white border-b border-zinc-100 py-4 shadow-sm relative z-20 mb-16">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                <Container className="w-4 h-4 text-teal-600" />
              </div>
              <h1 className="text-sm font-bold text-zinc-900 tracking-tight">Admin System</h1>
            </div>
            <div className="h-6 w-px bg-zinc-200" />
            <nav className="flex gap-6">
              <Link href="/admin/dashboard" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">Registry</Link>
              <Link href="/admin/passphrases" className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-1">Access Keys</Link>
            </nav>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-teal-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Go to Website
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors px-4 py-2 rounded-full hover:bg-red-50">
              <LogOut className="w-4 h-4" /> Exit Setup
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-teal-600 font-semibold tracking-wider text-xs uppercase mb-2">Security Protocol</h2>
              <div className="flex items-center gap-3">
                <Key className="w-6 h-6 text-zinc-900" />
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900">Access Control</h3>
              </div>
            </div>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} className="rounded-full shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white font-medium h-12 px-6">
                <Plus className="w-5 h-5 mr-2" /> Generate Key
              </Button>
            )}
          </div>

          {isAdding && (
            <div className="bg-white p-8 rounded-3xl mb-10 border border-zinc-100 shadow-xl shadow-zinc-200/40 animate-in fade-in slide-in-from-top-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2"><Plus className="w-4 h-4" /> Issue New Security Signature</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  value={newValue} 
                  onChange={e => setNewValue(e.target.value)} 
                  placeholder="Enter secure value..."
                  className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 flex-1 px-6 text-base"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button onClick={handleAdd} className="rounded-xl h-14 px-8 font-semibold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/20">Commit Key</Button>
                  <Button onClick={() => setIsAdding(false)} variant="outline" className="rounded-xl h-14 px-6 border-zinc-200 text-zinc-500 hover:bg-zinc-50"><X className="w-5 h-5" /></Button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/30 overflow-hidden divide-y divide-zinc-100">
            {passphrases.map(p => (
              <div key={p.id} className="p-6 flex justify-between items-center group hover:bg-zinc-50/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <code className="text-base font-bold text-zinc-900 tracking-wide font-mono">
                      {p.value}
                    </code>
                    <p className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mt-1">Authorized Access Token</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleDelete(p.id)} 
                  variant="ghost" 
                  className="text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full h-12 w-12 p-0 opacity-0 group-hover:opacity-100 transition-all"
                  disabled={passphrases.length <= 1}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-amber-200 bg-amber-50 text-sm font-medium text-amber-800 flex gap-4">
            <div className="mt-1">
              <Lock className="w-5 h-5 text-amber-500" />
            </div>
            <p className="leading-relaxed">
              <strong>Security Protocol Notice:</strong> Maintain strict confidentiality of active access keys. Any user possessing these credentials can freely edit the project registry and operational status overlays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
