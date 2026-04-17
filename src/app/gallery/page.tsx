"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/store';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function GalleryPage() {
  const { projects, isLoaded } = useDataStore();

  return (
    <div className="py-32 bg-[#FAFAFA] min-h-[90vh] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-bl from-teal-100/40 to-transparent blur-3xl -z-10 rounded-full opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/3 h-[500px] bg-gradient-to-tr from-emerald-100/30 to-transparent blur-3xl -z-10 rounded-full opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24 animate-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-3">
             <span className="w-8 h-px bg-teal-400" /> Digital Space
          </h1>
          <h2 className="text-6xl md:text-7xl font-bold mb-8 text-zinc-900 tracking-tight drop-shadow-sm">Project Gallery</h2>
          <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
            A comprehensive showcase of our modular architectural transformations and professional engineering solutions.
          </p>
        </div>

        {isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <Link key={project.id} href={`/gallery/${project.id}`} className="group block focus:outline-none focus:ring-4 ring-teal-500/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl shadow-xl shadow-zinc-200/40 border border-white overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-100/60 hover:border-teal-100 transition-all duration-[600ms] animate-in fade-in slide-in-from-bottom-12" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                    {project.images?.[0] ? (
                      <>
                        <Image 
                          src={project.images[0]} 
                          alt={project.title} 
                          fill 
                          className="object-cover transform group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={idx < 3}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                        <Layers className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-sm font-medium uppercase tracking-widest">Awaiting Media</span>
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-6 right-6">
                        <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-teal-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg border border-white/50">Featured Selection</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-10 relative bg-white/50 group-hover:bg-white transition-colors duration-500">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold text-teal-600 tracking-wide bg-teal-50 px-4 py-1.5 rounded-full uppercase">{project.date}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight text-zinc-900 group-hover:text-teal-600 transition-colors duration-500">{project.title}</h3>
                      <p className="text-zinc-500 text-base font-light leading-relaxed line-clamp-3 mb-10">
                        {project.description}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-zinc-100 flex items-center gap-3 text-sm font-bold text-zinc-400 group-hover:text-teal-600 transition-colors uppercase tracking-widest">
                      Enter Details <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white shadow-xl shadow-zinc-200/40">
                <div className="w-24 h-24 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <BookOpen className="w-10 h-10 text-zinc-300" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">Gallery is Empty</h3>
                <p className="text-zinc-500 font-medium text-lg">No conceptual or physical projects currently loaded into the registry.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => <div key={i} className="aspect-[4/5] rounded-[3rem] bg-white/60 border border-white shadow-xl shadow-zinc-200/20 animate-pulse" />)}
          </div>
        )}
      </div>
    </div>
  );
}
