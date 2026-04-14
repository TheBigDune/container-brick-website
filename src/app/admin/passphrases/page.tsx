"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDataStore, Passphrase } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, ArrowLeft, LogOut, Key, Check, X } from 'lucide-react';
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
    if (confirm('Delete this passphrase? Use caution as this cannot be undone.')) {
      const updated = passphrases.filter(p => p.id !== id);
      savePassphrases(updated);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-24">
      <div className="bg-white border-b py-6 mb-12">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-xs font-black uppercase tracking-widest">Container Brick Admin</h1>
            <div className="flex gap-4">
              <Link href="/admin/dashboard" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">Registry</Link>
              <Link href="/admin/passphrases" className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary pb-1">Access Keys</Link>
            </div>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" /> External View
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-600 transition-colors">
              <LogOut className="w-3 h-3" /> Exit
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 font-black mb-4">Security Protocol</h2>
              <h3 className="text-3xl font-bold uppercase tracking-tight">Access Control</h3>
            </div>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} className="rounded-none font-black uppercase text-[10px] h-10 px-8">
                <Plus className="w-4 h-4 mr-2" /> New Key
              </Button>
            )}
          </div>

          {isAdding && (
            <div className="bg-white p-8 mb-8 border shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Generate New Access Point</h4>
              <div className="flex gap-4">
                <Input 
                  value={newValue} 
                  onChange={e => setNewValue(e.target.value)} 
                  placeholder="Enter secure value..."
                  className="rounded-none border-zinc-200 h-12 text-[10px]"
                  autoFocus
                />
                <Button onClick={handleAdd} className="rounded-none h-12 px-6 font-black uppercase tracking-widest text-[10px]"><Check className="w-4 h-4" /></Button>
                <Button onClick={() => setIsAdding(false)} variant="outline" className="rounded-none h-12 px-6 font-black uppercase tracking-widest text-[10px]"><X className="w-4 h-4" /></Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {passphrases.map(p => (
              <div key={p.id} className="bg-white p-6 border flex justify-between items-center group hover:bg-zinc-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <Key className="w-3 h-3" />
                  </div>
                  <div>
                    <code className="text-[10px] font-black bg-zinc-100 px-3 py-1 text-zinc-800 tracking-widest">
                      {p.value}
                    </code>
                  </div>
                </div>
                <Button 
                  onClick={() => handleDelete(p.id)} 
                  variant="ghost" 
                  className="text-zinc-300 hover:text-red-600 hover:bg-transparent rounded-none"
                  disabled={passphrases.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 border bg-white text-[10px] text-zinc-400 font-black uppercase leading-loose">
            Note: Maintain confidentiality of access keys. Unauthorized registry access allows for data modification.
          </div>
        </div>
      </div>
    </div>
  );
}
