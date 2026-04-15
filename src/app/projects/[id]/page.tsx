"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Info, Phone, Wrench } from 'lucide-react';
import { useDataStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, isLoaded } = useDataStore();
  const router = useRouter();

  if (!isLoaded) return <div className="min-h-[60vh] flex items-center justify-center text-sm font-semibold text-teal-600 uppercase tracking-widest animate-pulse">Syncing Registry...</div>;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-40 text-center min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">Project Missing</h1>
        <p className="text-zinc-500 mb-8 max-w-md">The project you are looking for does not exist or has been removed from the registry.</p>
        <Button onClick={() => router.push('/gallery')} className="rounded-full shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white font-medium px-8 h-12">
          Return to Portfolio
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-32">
      <div className="bg-white border-b border-zinc-100 py-6 sticky top-0 z-40 shadow-sm/50">
        <div className="container mx-auto px-6">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-teal-600 transition-colors group">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 text-xs font-semibold text-teal-600 uppercase tracking-widest mb-6 bg-teal-50 inline-flex px-4 py-2 rounded-full animate-in slide-in-from-bottom-4">
            <Calendar className="w-4 h-4" /> Completed: {project.date}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-12 animate-in slide-in-from-bottom-8 duration-700">
            {project.title}
          </h1>

          <div className="relative aspect-video w-full mb-20 rounded-[2.5rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden group animate-in zoom-in-95 duration-1000">
            {project.images?.[0] ? (
              <Image 
                src={project.images[0]} 
                alt={project.title} 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">No Image Provided</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24 animate-in slide-in-from-bottom-12 duration-1000">
            <div className="lg:col-span-2">
              <div className="pl-6 md:pl-10 border-l-4 border-teal-500 py-2">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-teal-600 mb-6 flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> Structural Specifications
                </h3>
                <div className="text-lg text-zinc-600 leading-relaxed font-light whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-zinc-200/40 border border-zinc-100">
                <h4 className="text-sm font-semibold tracking-widest uppercase text-zinc-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                    <Info className="w-4 h-4 text-teal-600" />
                  </div>
                  Technical Inquiry
                </h4>
                <p className="text-sm font-light text-zinc-500 mb-8 leading-relaxed">
                  For architectural consultations regarding modular specifications and structural integration.
                </p>
                <div className="space-y-4">
                  <Button asChild className="w-full rounded-full shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-500 text-white h-14 font-medium px-8 text-base">
                    <a href="tel:+2347017017722"><Phone className="w-4 h-4 mr-2" /> Primary Support</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full h-14 text-zinc-600 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 font-medium px-8 text-base">
                    <a href="tel:+2348101063676">Technical Desk</a>
                  </Button>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-zinc-200/40 border border-zinc-100">
                <h4 className="text-sm font-semibold tracking-widest uppercase text-zinc-900 mb-6">Registry Details</h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                    <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Status</span>
                    <span className="text-sm font-semibold text-teal-600">Archived</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                    <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Type</span>
                    <span className="text-sm font-medium text-zinc-900">Modular Conversion</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Location</span>
                    <span className="text-sm font-medium text-zinc-900">Lagos, Nigeria</span>
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
