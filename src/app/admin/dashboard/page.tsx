"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDataStore, Project, GlobalSettings } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Wand2, ArrowLeft, LogOut, ImageIcon, Trash2, Edit2, Layout, Database, Terminal, Container, UploadCloud, Loader2 } from 'lucide-react';
import { generateProjectDescription } from '@/ai/flows/generate-project-description-flow';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { projects, isLoaded, globalSettings, saveProjects, saveGlobalSettings } = useDataStore();
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
  
  // Local state for global settings form
  const [tempSettings, setTempSettings] = useState<Partial<GlobalSettings>>({});
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isProjectFileUploading, setIsProjectFileUploading] = useState(false);
  const [isHeroFileUploading, setIsHeroFileUploading] = useState(false);

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
      setTempSettings(globalSettings);
    }
  }, [isLoaded, globalSettings]);

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
    saveGlobalSettings(tempSettings);
    alert('Global assets and copy updated successfully.');
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

  const uploadFileToR2 = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload to R2 properly.');
    }
    
    const data = await response.json();
    return data.url;
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsProjectFileUploading(true);
    try {
      const fileUrl = await uploadFileToR2(e.target.files[0]);
      setImageUrl(fileUrl);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProjectFileUploading(false);
      e.target.value = ''; 
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsHeroFileUploading(true);
    try {
      const fileUrl = await uploadFileToR2(e.target.files[0]);
      setTempSettings({ ...tempSettings, heroImage: fileUrl });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsHeroFileUploading(false);
      e.target.value = ''; 
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-white border-b border-zinc-100 py-4 shadow-sm relative z-20">
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
              <Link href="/admin/dashboard" className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-1">Gallery</Link>
              <Link href="/admin/passphrases" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">Access Keys</Link>
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

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <Tabs defaultValue="registry" className="w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-teal-600 font-semibold tracking-wider text-xs uppercase mb-2">Management Area</h2>
              <TabsList className="bg-transparent h-auto p-0 flex gap-6">
                <TabsTrigger value="registry" className="rounded-xl bg-transparent border-none p-3 px-0 data-[state=active]:text-zinc-900 text-zinc-400 shadow-none hover:text-zinc-700 transition-colors relative before:absolute before:bottom-0 before:h-0.5 before:bg-teal-500 before:transition-all data-[state=active]:before:w-full before:w-0">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5" />
                    <span className="text-3xl font-bold tracking-tight">Gallery Config</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="assets" className="rounded-xl bg-transparent border-none p-3 px-0 data-[state=active]:text-zinc-900 text-zinc-400 shadow-none hover:text-zinc-700 transition-colors relative before:absolute before:bottom-0 before:h-0.5 before:bg-teal-500 before:transition-all data-[state=active]:before:w-full before:w-0 ml-8">
                  <div className="flex items-center gap-3">
                    <Layout className="w-5 h-5" />
                    <span className="text-3xl font-bold tracking-tight">Platform Settings</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="registry" className="m-0">
              <Button onClick={handleAddProject} className="rounded-full shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white font-medium h-12 px-6">
                <Plus className="w-5 h-5 mr-2" /> Add Entry
              </Button>
            </TabsContent>
          </div>

          <TabsContent value="registry" className="mt-8">
            {editingId && (
              <div className="bg-white rounded-3xl p-8 mb-12 shadow-xl shadow-zinc-200/40 border border-zinc-100 animate-in fade-in slide-in-from-top-4">
                <h4 className="text-xl font-bold mb-8 text-zinc-900 flex items-center gap-3">
                  <Edit2 className="w-5 h-5 text-teal-500" />
                  {editingId === 'new' ? 'Launch New Gallery Item' : 'Edit Gallery Details'}
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-zinc-700">Project Name</Label>
                      <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="rounded-xl border-zinc-200 h-12 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500" placeholder="e.g. The Glass Container" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-zinc-700">Completion Date</Label>
                      <Input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="rounded-xl border-zinc-200 h-12 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500" placeholder="e.g. October 2025" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-zinc-700">Cover Image URL (Direct / Cloudflare R2 Upload)</Label>
                      <div className="flex gap-3">
                        <Input 
                          value={imageUrl} 
                          onChange={e => setImageUrl(e.target.value)} 
                          placeholder="Public URL or Upload via R2 Local..." 
                          className="rounded-xl border-zinc-200 h-12 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 flex-1" 
                        />
                        <div className="relative shrink-0 flex items-center">
                           <Button type="button" disabled={isProjectFileUploading} className="rounded-xl border-zinc-200 text-zinc-700 bg-white shadow-sm hover:bg-zinc-50 font-semibold h-12 px-6">
                              {isProjectFileUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2 text-teal-500" />}
                              Upload
                           </Button>
                           <input type="file" accept="image/*" onChange={handleProjectImageUpload} disabled={isProjectFileUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 pt-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                      <Checkbox id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})} className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 w-5 h-5" />
                      <Label htmlFor="featured" className="text-sm font-semibold text-zinc-700 cursor-pointer">Feature on Homepage</Label>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <Label className="text-sm font-semibold text-zinc-700">Rich Description</Label>
                        <button onClick={handleGenerateAiDescription} disabled={isAiLoading} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-50 text-teal-600 flex items-center gap-2 hover:bg-teal-100 transition-colors disabled:opacity-50">
                          <Wand2 className="w-3.5 h-3.5" /> {isAiLoading ? 'Generating...' : 'AI Auto-Draft'}
                        </button>
                      </div>
                      <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-xl border-zinc-200 min-h-[160px] bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 resize-none text-base" placeholder="Describe the structural modifications and layout..." />
                    </div>
                    <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center aspect-video relative overflow-hidden group">
                      {imageUrl ? (
                        <>
                          <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-zinc-400">
                          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">No cover image specified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-6 border-t border-zinc-100">
                  <Button onClick={() => setEditingId(null)} variant="outline" className="rounded-full font-medium h-12 px-8 text-zinc-500 bg-white border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900">Cancel</Button>
                  <Button onClick={handleSave} className="rounded-full font-medium h-12 px-10 shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white">Save Gallery Details</Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-[2rem] p-4 shadow-xl shadow-zinc-200/30 border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all group flex flex-col">
                  <div className="w-full aspect-video bg-zinc-100 rounded-3xl relative overflow-hidden shadow-inner mb-6 shrink-0">
                    {project.images?.[0] ? (
                      <Image src={project.images[0]} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-zinc-300" /></div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => handleEdit(project)} size="icon" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-zinc-700 hover:text-teal-600 hover:bg-white shadow-sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDelete(project.id)} size="icon" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-zinc-700 hover:text-red-600 hover:bg-white shadow-sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h4 className="text-xl font-bold text-zinc-900 leading-tight">{project.title}</h4>
                      {project.featured && <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full shrink-0 uppercase tracking-wider">Featured</span>}
                    </div>
                    <p className="text-sm text-zinc-500 font-medium mb-4">{project.date}</p>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="col-span-full bg-white rounded-[2rem] p-12 text-center text-zinc-400 font-medium text-sm border border-zinc-100 shadow-xl shadow-zinc-200/30">
                  No projects stored. Add one above to start building your gallery.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assets" className="mt-8">
            <div className="bg-white rounded-3xl p-10 shadow-xl shadow-zinc-200/40 border border-zinc-100">
              <h4 className="text-xl font-bold mb-8 text-zinc-900 flex items-center gap-3 border-b border-zinc-100 pb-6">
                <Layout className="w-6 h-6 text-teal-500" />
                Platform Website Content Management
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Visual Settings Column */}
                <div className="space-y-8">
                  <h5 className="text-sm font-bold uppercase tracking-widest text-teal-600 bg-teal-50 inline-block px-3 py-1.5 rounded-full">Visual Assets & Status</h5>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Hero Section Background Image</Label>
                    <div className="flex gap-3">
                      <Input 
                        value={tempSettings.heroImage || ''} 
                        onChange={e => setTempSettings({...tempSettings, heroImage: e.target.value})} 
                        className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base flex-1" 
                      />
                      <div className="relative shrink-0 flex items-center">
                         <Button type="button" disabled={isHeroFileUploading} className="rounded-xl border-zinc-200 text-zinc-700 bg-white shadow-sm hover:bg-zinc-50 font-semibold h-14 px-8">
                            {isHeroFileUploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <UploadCloud className="w-5 h-5 mr-3 text-teal-500" />}
                            Upload
                         </Button>
                         <input type="file" accept="image/*" onChange={handleHeroImageUpload} disabled={isHeroFileUploading} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Operational Desk Status</Label>
                    <Select value={tempSettings.deskStatus || 'Open'} onValueChange={val => setTempSettings({...tempSettings, deskStatus: val})}>
                      <SelectTrigger className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus:bg-white focus:ring-teal-500 px-5 text-base font-medium">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Open" className="font-medium text-emerald-700">Taking Projects (Open)</SelectItem>
                        <SelectItem value="Closed" className="font-medium text-zinc-500">Temporarily Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <h5 className="text-sm font-bold uppercase tracking-widest text-teal-600 bg-teal-50 inline-block px-3 py-1.5 rounded-full mt-6">Contact & Info</h5>

                   <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">WhatsApp / Primary Contact Number</Label>
                    <Input 
                      value={tempSettings.contactWhatsApp || ''} 
                      onChange={e => setTempSettings({...tempSettings, contactWhatsApp: e.target.value})} 
                      className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base" 
                    />
                  </div>

                   <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Secondary Contact Number</Label>
                    <Input 
                      value={tempSettings.contactSecondary || ''} 
                      onChange={e => setTempSettings({...tempSettings, contactSecondary: e.target.value})} 
                      className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base" 
                    />
                  </div>

                   <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Digital Registry Email</Label>
                    <Input 
                      value={tempSettings.contactEmail || ''} 
                      onChange={e => setTempSettings({...tempSettings, contactEmail: e.target.value})} 
                      className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base" 
                    />
                  </div>
                  
                   <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Headquarters Location</Label>
                    <Input 
                      value={tempSettings.locationText || ''} 
                      onChange={e => setTempSettings({...tempSettings, locationText: e.target.value})} 
                      className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base" 
                    />
                  </div>

                </div>

                {/* Text Settings Column */}
                <div className="space-y-8">
                   <h5 className="text-sm font-bold uppercase tracking-widest text-teal-600 bg-teal-50 inline-block px-3 py-1.5 rounded-full">Hero Typography</h5>
                   
                   <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Hero Main Title</Label>
                    <Input 
                      value={tempSettings.heroTitle || ''} 
                      onChange={e => setTempSettings({...tempSettings, heroTitle: e.target.value})} 
                      className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base" 
                    />
                    <p className="text-xs text-zinc-400 font-medium">Use **text** for gradient highlight. E.g. Reimagining Spaces w/ **Modular Elegance**</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Hero Subtitle</Label>
                    <Textarea 
                      value={tempSettings.heroSubtitle || ''} 
                      onChange={e => setTempSettings({...tempSettings, heroSubtitle: e.target.value})} 
                      className="rounded-xl border-zinc-200 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base resize-none h-32" 
                    />
                  </div>

                  <h5 className="text-sm font-bold uppercase tracking-widest text-teal-600 bg-teal-50 inline-block px-3 py-1.5 rounded-full mt-6">Process Section</h5>

                   <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Core Capability Title</Label>
                    <Input 
                      value={tempSettings.aboutTitle || ''} 
                      onChange={e => setTempSettings({...tempSettings, aboutTitle: e.target.value})} 
                      className="rounded-xl border-zinc-200 h-14 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base" 
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-zinc-700">Core Capability Overview</Label>
                    <Textarea 
                      value={tempSettings.aboutText || ''} 
                      onChange={e => setTempSettings({...tempSettings, aboutText: e.target.value})} 
                      className="rounded-xl border-zinc-200 bg-zinc-50 focus-visible:bg-white focus-visible:ring-teal-500 px-5 text-base resize-none h-40" 
                    />
                  </div>

                  <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 flex justify-between items-center mt-12 shadow-inner">
                    <div className="text-sm font-medium text-zinc-500">Unsaved changes will be lost upon exit.</div>
                    <Button onClick={handleSaveAssets} className="rounded-full shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white font-medium h-14 px-10 text-base">Save All Global Content</Button>
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
