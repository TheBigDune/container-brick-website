"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/store';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function GalleryPage() {
  const { projects, isLoaded } = useDataStore();

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-24">
          <h1 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Portfolio</h1>
          <h2 className="text-5xl font-bold uppercase mb-8 tracking-tight">Our Projects: Current and Previous</h2>
          <p className="text-base text-zinc-500 font-medium uppercase tracking-tight leading-relaxed">
            A showcase of our modular architectural transformations and professional engineering solutions.
          </p>
        </div>

        {isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group block border p-0 overflow-hidden hover:border-primary transition-colors">
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 border-b">
                    {project.images?.[0] && (
                      <Image 
                        src={project.images[0]} 
                        alt={project.title} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="p-10 bg-white">
                    <div className="flex justify-between items-start mb-12">
                      <span className="text-[10px] font-bold text-primary uppercase">{project.date}</span>
                      {project.featured && <span className="text-[9px] font-bold border border-primary text-primary px-2 py-0.5 uppercase">Featured</span>}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-4 tracking-tight">{project.title}</h3>
                      <p className="text-zinc-500 text-[10px] font-bold uppercase leading-normal line-clamp-3 mb-8">
                        {project.description}
                      </p>
                    </div>
                    <div className="pt-6 border-t flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-primary transition-all">
                      View Project Details <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center border bg-zinc-50">
                <BookOpen className="w-6 h-6 mx-auto mb-4 text-zinc-300" />
                <p className="text-zinc-400 uppercase font-bold text-[10px]">No projects found in the registry.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <div key={i} className="h-96 border bg-zinc-50 animate-pulse" />)}
          </div>
        )}
      </div>
    </div>
  );
}
