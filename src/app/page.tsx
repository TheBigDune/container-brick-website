"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/lib/store';

export default function Home() {
  const { projects, isLoaded, heroImage, deskStatus } = useDataStore();
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="flex flex-col bg-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b bg-black">
        <div className="absolute inset-0 z-0">
          {isLoaded && (
            <Image
              src={heroImage || "https://picsum.photos/seed/architecture/1920/1080"}
              alt="Structural Engineering Background"
              fill
              className="object-cover opacity-50 grayscale"
              priority
              data-ai-hint="industrial architecture"
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8 uppercase tracking-tighter text-white">
              Modular Architectural <br />
              <span className="text-primary">Engineering Solutions.</span>
            </h1>
            <p className="text-lg text-zinc-300 mb-12 max-w-2xl font-medium uppercase tracking-tight leading-relaxed">
              Industrial container conversions for high-performance residential and commercial infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-none h-14 px-10 font-bold uppercase text-xs tracking-widest bg-white text-black hover:bg-zinc-200 border-none">
                <Link href="/gallery">Our Projects</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none h-14 px-10 font-bold uppercase text-xs tracking-widest bg-transparent text-white border-white hover:bg-white hover:text-black">
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 border-b bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Expertise Division</h2>
              <h3 className="text-4xl font-bold uppercase mb-8 tracking-tight">Structural Integrity</h3>
              <p className="text-base text-zinc-500 font-medium leading-relaxed mb-12 uppercase tracking-tight">
                Implementing precise engineering standards for the transformation of shipping containers into sustainable, modular environments.
              </p>
              <div className="space-y-8">
                {[
                  { title: 'Architectural Container Modifications', desc: 'Specialized structural transformations for high-performance workspaces' },
                  { title: 'Industrial Logistics', desc: 'Procurement and sales of high-grade containers.' },
                  { title: 'Cabin Rentals', desc: 'Site Offices and Mobile Offices.' },
                ].map((service, idx) => (
                  <div key={idx} className="flex gap-4 border-l-2 border-zinc-200 pl-6 py-2">
                    <div>
                      <h4 className="font-bold text-xs uppercase mb-1 tracking-wider">{service.title}</h4>
                      <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-zinc-200 bg-white p-12 flex flex-col justify-center">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Main Logistics Hub</span>
              <p className="text-2xl font-bold uppercase mt-4 tracking-tight">Lagos, Nigeria Operations</p>
              <div className="mt-12 pt-8 border-t border-zinc-100 text-xs font-black uppercase text-zinc-400 flex justify-between tracking-widest">
                <span>System Status</span>
                <span className="text-primary">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b pb-8">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Registry</h2>
              <h3 className="text-4xl font-bold uppercase tracking-tight">Featured</h3>
            </div>
            <Link href="/gallery" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors inline-flex items-center gap-3">
              All Archives <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {isLoaded ? (
              featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group block border border-zinc-200 overflow-hidden hover:border-primary transition-colors">
                  <div className="relative aspect-[16/9] w-full bg-zinc-100 border-b border-zinc-200">
                    {project.images?.[0] ? (
                      <Image 
                        src={project.images[0]} 
                        alt={project.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs uppercase font-black text-zinc-300">No Technical Image</div>
                    )}
                  </div>
                  <div className="p-10 bg-white">
                    <span className="text-xs font-black text-primary uppercase mb-4 block tracking-widest">{project.date}</span>
                    <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight group-hover:text-primary transition-colors">{project.title}</h4>
                    <p className="text-zinc-500 text-xs font-bold uppercase leading-relaxed line-clamp-2 tracking-tight">{project.description}</p>
                    <div className="mt-8 pt-8 border-t border-zinc-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 text-zinc-400 group-hover:text-primary transition-colors">
                      Access Specifications <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              [1, 2].map((i) => <div key={i} className="h-[500px] border border-zinc-100 bg-zinc-50 animate-pulse" />)
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Technical Inquiries</h2>
            <h3 className="text-4xl font-bold uppercase mb-16 tracking-tight">Connect with our Desk</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-50 border flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4">Direct WhatsApp</h4>
                    <div className="space-y-4 text-sm font-bold uppercase tracking-tight">
                      <a href="https://wa.me/2347017017722" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                        +234 701 701 7722 <ArrowRight className="w-3 h-3" />
                      </a>
                      <a href="https://wa.me/2348101063676" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                        +234 810 106 3676 <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-50 border flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4">Email Registry</h4>
                    <div className="space-y-2 text-sm font-bold uppercase tracking-tight lowercase">
                      <a href="mailto:containerbrick@gmail.com" className="block hover:text-primary transition-colors">containerbrick@gmail.com</a>
                      <a href="mailto:containerbrickng@gmail.com" className="block hover:text-primary transition-colors">containerbrickng@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-zinc-50 border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4">Logistics Hub</h4>
                    <p className="text-sm font-bold uppercase tracking-tight">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 border p-12">
                <h4 className="text-xs font-black uppercase tracking-widest mb-6">Service Availability</h4>
                <p className="text-xs font-bold uppercase tracking-tight leading-loose text-zinc-500">
                  Our technical desks are generally available for consultations Monday through Friday, 09:00 - 17:00 WAT. 
                  For urgent site logistics, please contact the primary support line directly via WhatsApp.
                </p>
                <div className="mt-12 pt-12 border-t flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Desk Status</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${deskStatus === 'Open' ? 'text-primary' : 'text-red-500'}`}>
                      {deskStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
