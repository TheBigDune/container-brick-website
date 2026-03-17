"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDataStore, Project } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Wand2, ArrowLeft, LogOut, ImageIcon, Trash2, Edit2, Layout, Database, Terminal } from 'lucide-react';
import { generateProjectDescription } from '@/ai/flows/generate-project-description-flow';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { projects, isLoaded, heroImage, deskStatus, saveProjects, saveHeroImage, saveDeskStatus } = useDataStore();
  const [authorized, setAuthorized] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    date: '',
    featured: false,
    images: []
  });
  const [imageUrl, setImageUrl] = useState('');
  const [tempHeroImage, setTempHeroImage] = useState('');
  const [tempDeskStatus, setTempDeskStatus] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('cb_admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    if (isLoaded) {
      setTempHeroImage(heroImage);
      setTempDeskStatus(deskStatus);
    }
  }, [isLoaded, heroImage, deskStatus]);

  if (!authorized || !isLoaded) return null;

  const handleLogout = () => {
    sessionStorage.removeItem('cb_admin_token');
    router.push('/');
  };

  const handleAddProject = () => {
    setEditingId('new');
    setFormData({ title: '', description: '', date: '', featured: false, images: [] });
    setImageUrl('');
  };

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setFormData({ ...p });
    setImageUrl(p.images?.[0] || '');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this entry?')) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.date) return alert('Title and Date are required.');

    const finalImages = imageUrl ? [imageUrl] : (formData.images || []);

    let updated: Project[];
    if (editingId === 'new') {
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title!,
        description: formData.description || '',
        date: formData.date!,
        featured: formData.featured || false,
        images: finalImages
      };
      updated = [...projects, newProject];
    } else {
      updated = projects.map(p => p.id === editingId ? { ...p, ...formData, images: finalImages } as Project : p);
    }

    saveProjects(updated);
    setEditingId(null);
  };

  const handleSaveAssets = () => {
    saveHeroImage(tempHeroImage);
    saveDeskStatus(tempDeskStatus);
    alert('Global assets updated successfully.');
  };

  const handleGenerateAiDescription = async () => {
    if (!formData.title) return alert('Enter a title first.');
    setIsAiLoading(true);
    try {
      const result = await generateProjectDescription({ keywords: formData.title });
      setFormData(prev => ({ ...prev, description: result.description }));
    } catch (e) {
      alert('AI generation failed.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b bg-zinc-50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-xs font-black uppercase tracking-widest">Container Brick Admin</h1>
            <nav className="flex gap-6">
              <Link href="/admin/dashboard" className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary">Registry</Link>
              <Link href="/admin/passphrases" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Access Keys</Link>
            </nav>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" /> External View
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
              <LogOut className="w-3 h-3" /> Exit
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <Tabs defaultValue="registry" className="w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 font-black mb-4">System Console</h2>
              <TabsList className="bg-transparent h-auto p-0 flex gap-8">
                <TabsTrigger value="registry" className="rounded-none bg-transparent border-none p-0 data-[state=active]:text-black text-zinc-400 shadow-none">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span className="text-2xl font-bold uppercase tracking-tight">Project Registry</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="assets" className="rounded-none bg-transparent border-none p-0 data-[state=active]:text-black text-zinc-400 shadow-none">
                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    <span className="text-2xl font-bold uppercase tracking-tight">Global Assets</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="registry" className="m-0">
              <Button onClick={handleAddProject} className="rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-8">
                <Plus className="w-4 h-4 mr-2" /> Add Entry
              </Button>
            </TabsContent>
          </div>

          <TabsContent value="registry">
            {editingId && (
              <div className="border border-zinc-200 p-10 mb-16 bg-zinc-50/30">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-zinc-400">{editingId === 'new' ? 'Create New Entry' : 'Modify Registry'}</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-10">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Designation</Label>
                      <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-none border-zinc-200 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Completion Date</Label>
                      <Input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="rounded-none border-zinc-200 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Technical Image URL</Label>
                      <Input 
                        value={imageUrl} 
                        onChange={e => setImageUrl(e.target.value)} 
                        placeholder="https://images.unsplash.com/..." 
                        className="rounded-none border-zinc-200 h-12" 
                      />
                    </div>
                    <div className="flex items-center space-x-3 pt-4">
                      <Checkbox id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})} />
                      <Label htmlFor="featured" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">Priority Listing</Label>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Specifications</Label>
                        <button onClick={handleGenerateAiDescription} disabled={isAiLoading} className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:underline disabled:opacity-50">
                          <Wand2 className="w-3 h-3" /> {isAiLoading ? 'Processing...' : 'Auto-Generate Specs'}
                        </button>
                      </div>
                      <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-none border-zinc-200 min-h-[160px]" />
                    </div>
                    <div className="border border-dashed border-zinc-300 p-4 bg-white flex flex-col items-center justify-center aspect-video relative overflow-hidden">
                      {imageUrl ? (
                        <Image src={imageUrl} alt="Technical Preview" fill className="object-cover grayscale" unoptimized />
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-zinc-300">
                          <ImageIcon className="w-10 h-10 opacity-30" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Preview Projection</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-8 border-t border-zinc-200">
                  <Button onClick={() => setEditingId(null)} variant="outline" className="rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-8">Discard</Button>
                  <Button onClick={handleSave} className="rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-10">Commit Changes</Button>
                </div>
              </div>
            )}

            <div className="border-t border-zinc-200">
              {projects.map(project => (
                <div key={project.id} className="border-b border-zinc-100 py-8 flex justify-between items-center px-4 hover:bg-zinc-50 transition-colors group">
                  <div className="flex items-center gap-10">
                    <div className="w-24 h-16 bg-zinc-100 relative overflow-hidden border border-zinc-200 shrink-0">
                      {project.images?.[0] && (
                        <Image src={project.images[0]} alt={project.title} fill className="object-cover grayscale" unoptimized />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-1">
                        <h4 className="text-base font-bold uppercase tracking-tight">{project.title}</h4>
                        {project.featured && <span className="text-[8px] border border-primary text-primary font-black px-2 py-0.5 uppercase tracking-widest">Priority</span>}
                      </div>
                      <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{project.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button onClick={() => handleEdit(project)} variant="outline" size="sm" className="rounded-none text-[9px] font-black uppercase tracking-widest h-10 px-6">
                      <Edit2 className="w-3 h-3 mr-2" /> Modify
                    </Button>
                    <Button onClick={() => handleDelete(project.id)} variant="outline" size="sm" className="rounded-none text-[9px] font-black uppercase tracking-widest h-10 px-6 text-zinc-400 hover:text-red-600 hover:border-red-600">
                      <Trash2 className="w-3 h-3 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <div className="space-y-12">
              <div className="border border-zinc-200 p-10 bg-zinc-50/30">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-zinc-400">Hero Section Configuration</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Hero Background URL</Label>
                      <Input 
                        value={tempHeroImage} 
                        onChange={e => setTempHeroImage(e.target.value)} 
                        placeholder="Enter direct image URL..."
                        className="rounded-none border-zinc-200 h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Technical Desk Status</Label>
                      <Select value={tempDeskStatus} onValueChange={setTempDeskStatus}>
                        <SelectTrigger className="rounded-none border-zinc-200 h-12 font-bold uppercase text-[10px] tracking-widest">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="Open" className="text-[10px] font-bold uppercase">Open</SelectItem>
                          <SelectItem value="Closed - drop a message or email instead" className="text-[10px] font-bold uppercase">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[9px] text-zinc-400 uppercase font-black mt-2 tracking-tight">This updates the operational status displayed in the contact registry.</p>
                    </div>
                    <Button onClick={handleSaveAssets} className="rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-10">Save Configuration</Button>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Visual Projection Preview</Label>
                    <div className="border border-dashed border-zinc-300 p-4 bg-white relative aspect-video overflow-hidden">
                      {tempHeroImage ? (
                        <div className="relative w-full h-full bg-black">
                          <Image src={tempHeroImage} alt="Hero Preview" fill className="object-cover opacity-60 grayscale" unoptimized />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-white text-[10px] font-black uppercase tracking-widest border border-white/30 px-4 py-2">Preview Overlay</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-300">
                          <ImageIcon className="w-10 h-10 opacity-30" />
                          <span className="text-[9px] font-black uppercase tracking-widest">No Image Projection</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
