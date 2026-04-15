"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/store';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function GalleryPage() {
  const { projects, isLoaded } = useDataStore();

  return (
    <div className="py-24 bg-[#FAFAFA] min-h-[90vh]">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-24 animate-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-teal-600 font-bold tracking-widest text-xs uppercase mb-4">Portfolio</h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-zinc-900 tracking-tight">Our Projects</h2>
          <p className="text-lg text-zinc-500 font-light leading-relaxed">
            A comprehensive showcase of our modular architectural transformations and professional engineering solutions.
          </p>
        </div>

        {isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group block focus:outline-none focus:ring-4 ring-teal-500/30 rounded-[2.5rem] bg-white shadow-xl shadow-zinc-200/40 border border-zinc-100 overflow-hidden hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {project.images?.[0] ? (
                      <>
                        <Image 
                          src={project.images[0]} 
                          alt={project.title} 
                          fill 
                          className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">No Image Provided</div>
                    )}
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-semibold text-teal-600 tracking-wide bg-teal-50 px-3 py-1 rounded-full">{project.date}</span>
                      {project.featured && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Featured</span>}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-teal-600 transition-colors">{project.title}</h3>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed line-clamp-3 mb-8">
                        {project.description}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-zinc-100 flex items-center gap-2 text-sm font-semibold text-zinc-400 group-hover:text-teal-600 transition-colors">
                      View full details <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm">
                <BookOpen className="w-10 h-10 mx-auto mb-6 text-zinc-200" />
                <p className="text-zinc-400 font-medium">No projects found in the registry.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-white border border-zinc-100 shadow-sm animate-pulse" />)}
          </div>
        )}
      </div>
    </div>
  );
}
