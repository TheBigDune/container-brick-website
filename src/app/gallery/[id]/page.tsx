"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Info, Phone, Wrench, Layers } from 'lucide-react';
import { useDataStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, isLoaded, globalSettings } = useDataStore();
  const router = useRouter();

  if (!isLoaded) return <div className="min-h-[80vh] flex items-center justify-center text-sm font-semibold text-teal-600 uppercase tracking-widest animate-pulse bg-[#FAFAFA]">Syncing Registry...</div>;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="bg-[#FAFAFA] min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100/30 blur-3xl rounded-full" />
        <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center relative z-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-zinc-200/50 flex items-center justify-center mb-8 border border-zinc-100">
            <Layers className="w-10 h-10 text-zinc-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">Project Missing</h1>
          <p className="text-zinc-500 mb-10 max-w-md text-lg leading-relaxed">The configuration block you are looking for does not exist or has been removed from the registry.</p>
          <Button onClick={() => router.push('/gallery')} className="rounded-full shadow-xl shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white font-medium px-10 h-14 text-base">
            Return to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const { contactWhatsApp, contactSecondary, locationText } = globalSettings || {};

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-40 relative selection:bg-teal-500/20">
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-bl from-teal-50/80 to-transparent blur-3xl -z-10 rounded-full" />
      <div className="absolute top-[40%] left-0 w-1/3 h-[500px] bg-gradient-to-tr from-emerald-50/60 to-transparent blur-3xl -z-10 rounded-full" />

      {/* Navigation Bar */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white py-6 sticky top-0 z-40 shadow-sm transition-all">
        <div className="container mx-auto px-6">
          <Link href="/gallery" className="inline-flex items-center gap-3 text-sm font-bold text-zinc-500 hover:text-teal-600 transition-colors group uppercase tracking-widest">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center group-hover:border-teal-200 group-hover:bg-teal-50 transition-colors">
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> 
            </div>
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-24">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-in slide-in-from-bottom-8 duration-700">
             <div>
                <div className="flex items-center gap-3 text-xs font-bold text-teal-600 uppercase tracking-widest mb-6 bg-white border border-teal-100 shadow-sm shadow-teal-100/50 inline-flex px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4" /> Completed: {project.date}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
                  {project.title}
                </h1>
             </div>
             {project.featured && (
               <div className="px-5 py-2.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold uppercase tracking-widest text-xs shrink-0 shadow-sm shadow-teal-100/50">
                 Featured Space
               </div>
             )}
          </div>

          <div className="relative aspect-video w-full mb-24 rounded-[3rem] bg-white border border-white shadow-2xl shadow-zinc-200/60 overflow-hidden group animate-in zoom-in-95 duration-1000 isolate">
            {project.images?.[0] ? (
               <>
                 <Image 
                   src={project.images[0]} 
                   alt={project.title} 
                   fill 
                   className="object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                   priority
                   unoptimized
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50">
                 <Layers className="w-12 h-12 mb-4 opacity-30" />
                 <span className="font-medium tracking-widest uppercase text-sm">No Primary Visual</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24 animate-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="lg:col-span-2">
              <div className="pl-6 md:pl-10 border-l-[3px] border-teal-500 py-2 relative">
                <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-white border-4 border-teal-500 shadow-sm" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-teal-600 mb-8 flex items-center gap-3">
                  <Wrench className="w-5 h-5" /> Structural Specifications
                </h3>
                <div className="text-xl text-zinc-600 leading-relaxed font-light whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-white hover:border-teal-100 hover:shadow-teal-100/50 transition-all duration-500">
                <h4 className="text-sm font-bold tracking-widest uppercase text-zinc-900 mb-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm">
                    <Info className="w-5 h-5 text-teal-600" />
                  </div>
                  Technical Inquiry
                </h4>
                <p className="text-[15px] font-medium text-zinc-500 mb-8 leading-relaxed">
                  For architectural consultations regarding modular specifications and structural integration.
                </p>
                <div className="space-y-4">
                  {contactWhatsApp && (
                    <Button asChild className="w-full rounded-full shadow-[0_0_30px_-5px_rgba(20,184,166,0.5)] bg-teal-600 hover:bg-teal-500 text-white h-14 font-semibold px-8 text-base transition-all hover:scale-[1.02]">
                      <a href={`https://wa.me/${contactWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"><Phone className="w-4 h-4 mr-3" /> Connect with Desk</a>
                    </Button>
                  )}
                  {contactSecondary && (
                    <Button asChild variant="outline" className="w-full rounded-full h-14 text-zinc-600 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 font-bold px-8 text-base shadow-sm transition-all hover:scale-[1.02]">
                      <a href={`tel:${contactSecondary.replace(/[^0-9+]/g, '')}`}>Secondary Support Line</a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-white">
                <h4 className="text-sm font-bold tracking-widest uppercase text-zinc-900 mb-8 border-b border-zinc-100 pb-4">Registry Details</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest group-hover:text-teal-600 transition-colors">Status</span>
                    <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">Archived Masterpiece</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest group-hover:text-teal-600 transition-colors">Type</span>
                    <span className="text-[15px] font-semibold text-zinc-900">Modular Conversion</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest group-hover:text-teal-600 transition-colors">Region</span>
                    <span className="text-[15px] font-semibold text-zinc-900">{locationText || 'Lagos, Nigeria'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
