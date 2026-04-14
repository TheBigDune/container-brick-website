import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t py-24 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-8">
              Container Brick
            </h3>
            <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest leading-loose max-w-sm">
              Modular architectural firm specializing in high-performance shipping container conversions and technical logistics infrastructure.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-black mb-8">Inquiries</h4>
            <div className="space-y-6 text-xs font-bold uppercase tracking-widest">
              <div className="space-y-3">
                <a href="tel:+2347017017722" className="block hover:text-primary transition-colors">+234 701 701 7722</a>
                <a href="tel:+2348101063676" className="block hover:text-primary transition-colors">+234 810 106 3676</a>
              </div>
              <div className="space-y-3 pt-4 border-t border-zinc-100">
                <a href="mailto:containerbrick@gmail.com" className="block hover:text-primary transition-colors lowercase">containerbrick@gmail.com</a>
                <a href="mailto:containerbrickng@gmail.com" className="block hover:text-primary transition-colors lowercase">containerbrickng@gmail.com</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary font-black mb-8">Hub</h4>
            <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest leading-relaxed">
              Lagos, Nigeria
            </p>
            <div className="mt-12">
              <Link href="/admin" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                Registry Access
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-black">
          <p>© {new Date().getFullYear()} Container Brick</p>
          <p>Structural Engineering Division</p>
        </div>
      </div>
    </footer>
  );
}
