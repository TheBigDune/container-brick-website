"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, MessageCircle, Mail, ChevronRight, Container, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/lib/store';
import { useEffect, useState } from 'react';

// Helper to render bold text as gradient
const renderHeroTitle = (title: string = "") => {
  const parts = title.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export default function Home() {
  const { projects, isLoaded, globalSettings } = useDataStore();
  const featuredProjects = projects.filter(p => p.featured);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const {
    heroImage,
    deskStatus,
    heroTitle,
    heroSubtitle,
    aboutTitle,
    aboutText,
    contactWhatsApp,
    contactSecondary,
    contactEmail,
    locationText
  } = globalSettings || {};

  return (
    <div className="flex flex-col bg-[#FAFAFA] text-zinc-900 scroll-smooth selection:bg-teal-500/20">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-zinc-950">
          {isLoaded && mounted && (
            <Image
              src={heroImage || "/images/hero.png"}
              alt="Premium Container Architecture"
              fill
              className="object-cover scale-105 animate-in zoom-in duration-[2000ms] ease-out opacity-80"
              priority
              unoptimized
            />
          )}
          {/* Glassmorphic dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
          <div className="max-w-4xl relative animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-10 shadow-2xl hover:bg-white/10 transition-colors">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${deskStatus === 'Open' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${deskStatus === 'Open' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-xs font-bold text-zinc-100 tracking-widest uppercase">
                {deskStatus === 'Open' ? 'Taking New Projects' : 'System Offline / Desk Closed'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.05] mb-8 text-white tracking-tight drop-shadow-xl saturate-150">
              {isLoaded ? renderHeroTitle(heroTitle) : 'Reimagining Spaces'}
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-300 mb-12 max-w-2xl font-light leading-relaxed drop-shadow-md">
              {isLoaded ? heroSubtitle : 'We convert industrial shipping containers into sustainable, high-performance residential spaces.'}
            </p>
            
            <div className="flex flex-wrap gap-5">
              <Button asChild size="lg" className="rounded-full shadow-[0_0_40px_-10px_rgba(20,184,166,0.6)] bg-teal-600 hover:bg-teal-500 text-white border-0 transition-all hover:scale-[1.02] active:scale-[0.98] duration-300 h-16 px-10 text-lg font-semibold group">
                <Link href="/gallery" className="flex items-center gap-3">
                  Explore Gallery <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98] duration-300 shadow-xl h-16 px-10 text-lg font-medium">
                <Link href="#contact">Contact Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-32 relative overflow-hidden bg-[#FAFAFA]">
        <div className="absolute top-0 right-0 w-1/3 h-[800px] bg-gradient-to-bl from-teal-50/80 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative isolate group">
              <div className="absolute inset-x-4 -inset-y-4 bg-gradient-to-tr from-teal-100/50 via-emerald-50/30 to-transparent rounded-[3rem] -rotate-3 scale-105 -z-10 transition-transform duration-700 group-hover:rotate-0" />
              <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-zinc-200/50 border border-white relative overflow-hidden group-hover:shadow-teal-100/60 transition-all duration-700">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-[2000ms]" />
                <div className="relative z-10">
                  <span className="text-teal-600 font-bold tracking-widest text-xs uppercase mb-6 block drop-shadow-sm">Process & Delivery</span>
                  <h3 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-900 leading-tight tracking-tight">
                    {isLoaded ? aboutTitle : 'Uncompromising Structural Integrity'}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed mb-12 text-xl font-light">
                    {isLoaded ? aboutText : 'Transforming robust shipping containers into sustainable modular environments.'}
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-zinc-200 via-zinc-200 to-transparent mb-12" />
                  <div className="flex items-center gap-4 bg-zinc-50/80 p-4 pl-6 rounded-2xl border border-zinc-100/50">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-teal-500" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest block mb-1">Headquarters</span>
                      <p className="text-lg font-semibold text-zinc-900 tracking-tight">{isLoaded ? locationText : 'Lagos, Nigeria'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12 lg:pl-10 relative">
              {[
                { title: 'Architectural Conversions', desc: 'Specialized structural modifications turning rigid steel into beautiful, fluid luxury homes and functional workspaces.' },
                { title: 'Commercial & Pop-Up Hubs', desc: 'Dynamic, relocatable infrastructure perfect for cafes, retail boutiques, and site display offices.' },
                { title: 'Logistics & Sourcing', desc: 'Direct procurement of premium grade containers globally for high-end project development and rapid execution.' },
              ].map((service, idx) => (
                <div key={idx} className="flex gap-6 group cursor-default">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:border-teal-500 group-hover:shadow-teal-600/30 transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                    <Container className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-500 relative z-10" />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-teal-600 transition-colors duration-500 text-zinc-900">{service.title}</h4>
                    <p className="text-zinc-500 leading-relaxed font-light text-lg">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 bg-zinc-950 text-white rounded-[3rem] mx-4 md:mx-10 my-10 relative overflow-hidden shadow-2xl isolate">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-emerald-900/10 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/30 to-transparent opacity-60" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-3">
                 <span className="w-8 h-px bg-teal-400/50" /> Portfolio Overview
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Featured Projects</h3>
              <p className="text-zinc-400 text-xl font-light leading-relaxed">Explore our most recent transformations and builds.</p>
            </div>
            <Link href="/gallery" className="group flex items-center gap-4 text-zinc-400 hover:text-white transition-colors">
              <span className="text-lg font-medium tracking-wide">Explore Entire Archive</span> 
              <span className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm">
                <ChevronRight className="w-6 h-6" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoaded ? (
              featuredProjects.slice(0, 3).map((project, idx) => (
                <Link key={project.id} href={`/gallery/${project.id}`} className="group relative block rounded-[2.5rem] overflow-hidden focus:outline-none focus:ring-4 ring-teal-500/50 isolate bg-zinc-900 shadow-2xl transition-all duration-700 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="relative aspect-[4/5] w-full">
                    {project.images?.[0] ? (
                      <>
                        <Image 
                          src={project.images[0]} 
                          alt={project.title} 
                          fill 
                          className="object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[2000ms] ease-out opacity-80 group-hover:opacity-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-black/10 group-hover:via-zinc-950/20 transition-all duration-700" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-medium">Image Missing</div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <span className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full text-xs font-bold text-white uppercase tracking-widest mb-6 inline-block shadow-xl border border-white/20">{project.date}</span>
                    <h4 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">{project.title}</h4>
                    <p className="text-zinc-300 shadow-sm text-base font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{project.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2, 3].map((i) => <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-white/5 border border-white/5 animate-pulse" />)
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-teal-50/50 to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24 animate-in fade-in duration-1000">
              <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-4 flex items-center justify-center gap-3">
                 <span className="w-8 h-px bg-teal-400/50" /> Start A Conversation <span className="w-8 h-px bg-teal-400/50" />
              </h2>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight">Ready to build?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <a href={`https://wa.me/${(contactWhatsApp || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 p-12 rounded-[2.5rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-zinc-200/50 border border-white hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100/60 transition-all duration-500 hover:-translate-y-2">
                <div className="w-24 h-24 rounded-[1.8rem] bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-emerald-500 group-hover:to-emerald-400 group-hover:text-white transition-all duration-500 shadow-xl shadow-emerald-100/50">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3 text-zinc-900 group-hover:text-emerald-600 transition-colors">Direct WhatsApp</h4>
                  <p className="text-zinc-500 font-light mb-6 text-lg leading-relaxed">Fastest response time for urgent structural queries and pricing.</p>
                  <p className="font-semibold text-zinc-900 text-2xl tracking-tight">{isLoaded ? contactWhatsApp : '+234 701 701 7722'}</p>
                </div>
              </a>

              <a href={`mailto:${contactEmail}`} className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 p-12 rounded-[2.5rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-zinc-200/50 border border-white hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100/60 transition-all duration-500 hover:-translate-y-2">
                <div className="w-24 h-24 rounded-[1.8rem] bg-gradient-to-br from-teal-100 to-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-teal-600 group-hover:to-teal-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-teal-100/50">
                  <Mail className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3 text-zinc-900 group-hover:text-teal-600 transition-colors">Digital Registry</h4>
                  <p className="text-zinc-500 font-light mb-6 text-lg leading-relaxed">For detailed architectural proposals and formal vendor inquiries.</p>
                  <p className="font-semibold text-zinc-900 text-xl tracking-tight break-all">{isLoaded ? contactEmail : 'containerbrickng@gmail.com'}</p>
                </div>
              </a>
            </div>

            {/* Support Desk Bar */}
            <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-zinc-200/60 flex flex-col md:flex-row">
               <div className="p-10 md:w-2/3">
                  <span className="text-zinc-400 font-bold tracking-widest text-xs uppercase block mb-3">Service Notice</span>
                  <p className="text-zinc-800 font-medium text-xl leading-relaxed">
                    {deskStatus === 'Open' 
                      ? "Our technical desk is currently active and prioritizing incoming project requirements for the season." 
                      : "We are temporarily pausing new intakes to focus on current constructions. You may still drop an email."}
                  </p>
               </div>
               <div className={`p-10 md:w-1/3 flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l ${deskStatus === 'Open' ? 'bg-emerald-50/50 border-emerald-100/50' : 'bg-red-50/50 border-red-100/50'}`}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4 relative">
                     <span className={`absolute inset-0 rounded-full opacity-50 blur-md ${deskStatus === 'Open' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                     <div className={`w-5 h-5 rounded-full relative ${deskStatus === 'Open' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  </div>
                  <span className={`font-bold tracking-widest uppercase text-sm ${deskStatus === 'Open' ? 'text-emerald-700' : 'text-red-700'}`}>
                    {deskStatus === 'Open' ? 'System Active' : 'System Offline'}
                  </span>
               </div>
            </div>
            
            {contactSecondary && (
              <div className="mt-8 text-center">
                 <p className="text-zinc-500 font-medium text-sm flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Alternative Line: {contactSecondary}
                 </p>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
