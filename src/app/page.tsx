"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, MessageCircle, Mail, ChevronRight, Container } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { projects, isLoaded, heroImage, deskStatus } = useDataStore();
  const featuredProjects = projects.filter(p => p.featured);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col bg-[#FAFAFA] text-zinc-900 scroll-smooth selection:bg-teal-500/20">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {isLoaded && mounted && (
            <Image
              src={heroImage || "/images/hero.png"}
              alt="Premium Container Architecture"
              fill
              className="object-cover scale-105 animate-in zoom-in duration-[2000ms] ease-out"
              priority
              unoptimized
            />
          )}
          {/* Subtle gradient overlay to enhance text readability while keeping the image vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-zinc-100 tracking-wider uppercase">Operational & Ready to Build</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-8 text-white tracking-tight">
              Reimagining Spaces with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Modular Elegance.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl font-light leading-relaxed">
              We convert industrial shipping containers into sustainable, high-performance residential spaces and modern commercial infrastructure.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <Button asChild size="lg" className="rounded-full shadow-2xl shadow-teal-900/30 bg-teal-600 hover:bg-teal-500 text-white border-0 transition-all hover:scale-105 duration-300 h-14 px-8 text-base">
                <Link href="/gallery" className="flex items-center gap-2">
                  View Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105 duration-300 shadow-xl h-14 px-8 text-base">
                <Link href="#contact">Contact Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-100/50 to-emerald-50 rounded-[3rem] -rotate-3 scale-105 -z-10" />
              <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-zinc-200/50 border border-zinc-100/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-full blur-[80px] opacity-70 group-hover:scale-150 transition-transform duration-[2000ms]" />
                <div className="relative z-10">
                  <span className="text-teal-600 font-bold tracking-widest text-xs uppercase mb-6 block">Process & Delivery</span>
                  <h3 className="text-4xl font-bold mb-8 text-zinc-900 leading-tight tracking-tight">Uncompromising Structural Integrity</h3>
                  <p className="text-zinc-600 leading-relaxed mb-12 text-lg font-light">
                    Transforming robust shipping containers into sustainable, highly isolated modular environments that stand the test of time while offering premium architectural finishes and superior insulation.
                  </p>
                  <div className="h-[1px] w-full bg-gradient-to-r from-zinc-200 to-transparent mb-12" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-2">Headquarters</span>
                      <p className="text-xl font-bold text-zinc-900 flex items-center gap-3"><MapPin className="w-5 h-5 text-teal-500 object-contain"/> Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12 lg:pl-10">
              {[
                { title: 'Architectural Conversions', desc: 'Specialized structural modifications turning rigid steel into beautiful, fluid luxury homes and functional workspaces.' },
                { title: 'Commercial & Pop-Up Hubs', desc: 'Dynamic, relocatable infrastructure perfect for cafes, retail boutiques, and site display offices.' },
                { title: 'Logistics & Sourcing', desc: 'Direct procurement of premium grade containers globally for high-end project development and rapid execution.' },
              ].map((service, idx) => (
                <div key={idx} className="flex gap-6 group cursor-default">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:shadow-xl group-hover:shadow-teal-600/20 transition-all duration-300 group-hover:scale-110">
                    <Container className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold mb-3 tracking-tight group-hover:text-teal-600 transition-colors duration-300">{service.title}</h4>
                    <p className="text-zinc-500 leading-relaxed font-light text-[1.05rem]">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 bg-zinc-950 text-white rounded-[3rem] mx-4 md:mx-10 my-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-teal-900/30 via-emerald-900/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-teal-900/20 to-transparent blur-3xl opacity-40" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-teal-400 font-bold tracking-widest text-xs uppercase mb-4">Portfolio Overview</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">Featured Projects</h3>
              <p className="text-zinc-400 text-lg font-light">Explore our most recent transformations and builds.</p>
            </div>
            <Link href="/gallery" className="group flex items-center gap-4 text-zinc-300 hover:text-white transition-colors">
              <span className="font-semibold tracking-wide">Explore Entire Archive</span> 
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:scale-110 transition-all shadow-lg">
                <ChevronRight className="w-5 h-5" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoaded ? (
              featuredProjects.slice(0, 3).map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group relative block rounded-[2.5rem] overflow-hidden focus:outline-none focus:ring-4 ring-teal-500/50 isolate">
                  <div className="relative aspect-[4/5] w-full bg-zinc-900">
                    {project.images?.[0] ? (
                      <>
                        <Image 
                          src={project.images[0]} 
                          alt={project.title} 
                          fill 
                          className="object-cover transform group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-[1500ms] ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-medium">Image Missing</div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-5 inline-block shadow-lg border border-white/10">{project.date}</span>
                    <h4 className="text-3xl font-bold text-white mb-3 tracking-tight">{project.title}</h4>
                    <p className="text-zinc-300 shadow-sm text-sm font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3].map((i) => <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-zinc-800/50 animate-pulse" />)
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20 animate-in fade-in duration-1000">
              <h2 className="text-teal-600 font-bold tracking-widest text-xs uppercase mb-6">Start A Conversation</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight">Let's talk about your next project.</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <a href="https://wa.me/2347017017722" target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 p-12 rounded-[2.5rem] bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100 transition-all duration-300">
                <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-emerald-100">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">Direct WhatsApp</h4>
                  <p className="text-zinc-500 font-light mb-6 text-lg leading-relaxed">Fastest response time for urgent structural queries and pricing.</p>
                  <p className="font-semibold text-zinc-900 text-xl tracking-tight">+234 701 701 7722</p>
                </div>
              </a>

              <a href="mailto:containerbrick@gmail.com" className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 p-12 rounded-[2.5rem] bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100 transition-all duration-300">
                <div className="w-20 h-20 rounded-[1.5rem] bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-teal-100">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-teal-600 transition-colors">Digital Registry</h4>
                  <p className="text-zinc-500 font-light mb-6 text-lg leading-relaxed">For detailed architectural proposals and formal vendor inquiries.</p>
                  <p className="font-semibold text-zinc-900 text-xl tracking-tight">containerbrickng@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="mt-12 p-8 md:p-10 w-full rounded-[2.5rem] bg-white border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-lg shadow-zinc-100">
              <div>
                <span className="text-zinc-400 font-semibold tracking-widest text-[10px] uppercase block mb-1">Service Status</span>
                <p className="text-zinc-800 font-medium text-lg">Currently taking on new projects for Q3.</p>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-50 border border-zinc-100">
                <div className={`w-3 h-3 rounded-full ${deskStatus === 'Open' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-red-500'}`} />
                <span className="font-semibold text-zinc-900 tracking-wide">{deskStatus}</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
