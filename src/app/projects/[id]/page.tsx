"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Info } from 'lucide-react';
import { useDataStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, isLoaded } = useDataStore();
  const router = useRouter();

  if (!isLoaded) return <div className="p-20 text-center text-[10px] font-bold uppercase">Syncing Registry...</div>;

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-40 text-center">
        <h1 className="text-xl font-bold uppercase mb-6">Entry Missing</h1>
        <Button onClick={() => router.push('/gallery')} variant="outline" className="rounded-none font-bold uppercase text-xs">
          Return to Registry
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="border-b py-8">
        <div className="container mx-auto px-6">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-400 hover:text-black transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Portfolio Registry
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase mb-6">
            <Calendar className="w-3 h-3" /> Completed: {project.date}
          </div>
          <h1 className="text-5xl font-bold uppercase tracking-tight mb-12">
            {project.title}
          </h1>

          <div className="relative aspect-video w-full mb-20 bg-zinc-100 border">
            {project.images?.[0] && (
              <Image 
                src={project.images[0]} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2">
              <div className="border-l-2 border-primary pl-8 py-2">
                <h3 className="text-[10px] font-bold uppercase text-zinc-400 mb-6">Structural Specifications</h3>
                <div className="text-base text-zinc-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-zinc-50 p-8 border">
                <h4 className="text-[10px] font-bold uppercase text-zinc-400 mb-6 flex items-center gap-2">
                  <Info className="w-3 h-3" /> Technical Inquiry
                </h4>
                <p className="text-[11px] font-medium text-zinc-500 mb-8 uppercase leading-normal">
                  For architectural consultations regarding modular specifications and structural integration.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full rounded-none h-12 uppercase text-xs font-bold">
                    <a href="tel:+2347017017722">Call Primary Support</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-none h-12 uppercase text-xs font-bold">
                    <a href="tel:+2348101063676">Technical Desk</a>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase text-zinc-400">Registry Details</h4>
                <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase">
                  <div className="text-zinc-400">Status</div>
                  <div>Archived</div>
                  <div className="text-zinc-400">Type</div>
                  <div>Modular Conversion</div>
                  <div className="text-zinc-400">Location</div>
                  <div>Lagos, Nigeria</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
