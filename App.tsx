import React, { useState, useEffect, useRef } from 'react';
import { WORKFLOW_STEPS, FEATURES, FAQS } from './constants';
import { WorkflowStep, Feature, FAQItem } from './types';
import * as pdfjsLib from 'pdfjs-dist';

// --- Premium UI Components ---

// Fix: Make children optional to resolve TypeScript errors where children are incorrectly flagged as missing in some build environments.
const Badge = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white border border-slate-100 shadow-sm text-slate-500 ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', className = '', onClick }: { children?: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline' | 'ghost', className?: string, onClick?: () => void }) => {
  const base = "px-7 py-3.5 rounded-2xl font-semibold transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2 text-[15px]";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-200",
    secondary: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    outline: "border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900",
    ghost: "text-slate-500 hover:text-slate-900"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, badge, centered = true }: { title: string, subtitle?: string, badge?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''} reveal`}>
    {badge && <Badge className="mb-4">{badge}</Badge>}
    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Mobile Carousel Component ---
const MobileCarousel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
        const x = scrollRef.current.scrollLeft;
        const w = scrollRef.current.offsetWidth;
        const totalCards = React.Children.count(children);
        // Better index calculation
        const idx = Math.min(
          totalCards - 1, 
          Math.max(0, Math.round(x / (w * 0.85)))
        ); 
        setActive(idx);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div 
        ref={scrollRef} 
        onScroll={handleScroll} 
        className="overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full"
      >
        <div className="flex gap-4 px-4 pb-8 md:hidden w-max">
          {children}
        </div>
      </div>
      
      {/* Scroll Indicators / Dots */}
      <div className="flex justify-center items-center gap-2 mb-4 md:hidden">
          {React.Children.map(children, (_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? 'bg-slate-800 w-5' : 'bg-slate-200 w-1.5'}`} 
              />
          ))}
      </div>
    </div>
  );
};

// --- Sections ---

const Navbar = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3 md:py-4 border-b border-slate-100' : 'bg-transparent py-3 md:py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 md:gap-2.5 group cursor-pointer">
          <div className="w-8 md:w-9 h-8 md:h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl group-hover:bg-indigo-600 transition-colors shrink-0">C</div>
          <span className="text-sm md:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">Certina Visual AI</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-[14px] font-semibold text-slate-500">
            <a href="#start" className="hover:text-indigo-600 transition-colors">Testen</a>
            <a href="#funktionen" className="hover:text-indigo-600 transition-colors">Funktionen</a>
            <a href="#workflow" className="hover:text-indigo-600 transition-colors">Workflow</a>
            <a href="#lösung" className="hover:text-indigo-600 transition-colors">Visual AI</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <Button variant="primary" className="text-xs md:text-sm py-2 md:py-2.5 px-4 md:px-6 rounded-lg md:rounded-xl whitespace-nowrap" onClick={onOpenContact}>Demo anfragen</Button>
      </div>
    </nav>
  );
};

const CompanyValidationVisual = () => (
  <div className="mt-auto bg-blue-50/50 rounded-2xl p-4 md:p-6 border border-blue-100">
    <div className="flex flex-col items-center justify-between gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
        <div className="flex justify-between items-start mb-2">
           <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Erfasst</div>
           <div className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded text-[10px] font-bold">Ungültig</div>
        </div>
        <div className="font-bold text-slate-700 text-sm">Certina AG</div>
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg -my-2 relative z-10">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.21-8.85"/></svg>
      </div>
      <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
        <div className="flex justify-between items-start mb-2">
           <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ergebnis</div>
           <div className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold">Validiert</div>
        </div>
        <div className="font-bold text-slate-900 text-sm">Certina GmbH</div>
      </div>
    </div>
  </div>
);

const RenamingVisual = () => (
  <div className="mt-auto bg-slate-50 rounded-2xl p-5 border border-slate-100">
    <div className="flex items-center gap-3 mb-4">
       <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
       </div>
       <div className="bg-slate-100 text-slate-400 text-[10px] px-2 py-1 rounded decoration-slate-300 line-through">scan_001.pdf</div>
    </div>
    <div className="flex items-center gap-2">
       <div className="w-8 h-8 flex items-center justify-center text-blue-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-4 4 4-4-4-4"/></svg>
       </div>
       <div className="bg-white border border-blue-200 px-3 py-2 rounded-lg text-blue-700 text-[11px] font-bold shadow-sm flex-1">Rechnung_Certina_2024.pdf</div>
    </div>
  </div>
);

const FolderStructureVisual = () => (
  <div className="mt-auto bg-slate-50 rounded-2xl p-5 border border-slate-100 font-mono text-[10px]">
    <div className="flex items-center gap-2 text-slate-400 mb-2 pl-2">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
       <span>Finanzen</span>
    </div>
    <div className="flex items-center gap-2 text-slate-400 mb-2 pl-6 border-l border-slate-200 ml-4">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
       <span className="text-slate-800 font-bold">Rechnungen</span>
    </div>
  </div>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const total = rect.height - viewportHeight;
      let p = scrolled / total;
      p = Math.max(0, Math.min(1, p));
      setScrollProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative pt-20 md:pt-44 pb-32 overflow-hidden hero-glow">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20 reveal">
          <Badge className="mb-6 bg-indigo-50/50 text-indigo-700 border-indigo-100 uppercase tracking-widest text-[11px] md:text-sm px-3 py-1.5 md:px-4 md:py-2">Die Evolution der Dokumentenverarbeitung</Badge>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8">
            The intelligence for <br className="hidden md:block"/><span className="text-slate-400">business documents.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2 md:px-0 font-medium">
            <span className="block text-slate-900 font-bold mb-2 md:mb-3">Von Eingang bis Ablage</span>
            Visuelle AI versteht Dokumente, extrahiert relevante Informationen, 
            benennt sie automatisch und legt sie strukturiert ab.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <Button variant="primary" className="w-full sm:w-auto px-10 py-4 shadow-xl shadow-slate-200/50" onClick={() => window.location.href='#workflow'}>
              Workflow ansehen
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Button>
            <button 
               className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-[0.95] flex items-center justify-center gap-2 text-base bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
               onClick={() => window.location.href='#live-test'}
            >
              Live testen
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[200vh] md:h-auto">
           <div className="sticky top-28 md:static visual-panel-gradient rounded-[32px] md:rounded-[40px] p-2 border border-slate-100 shadow-2xl overflow-hidden min-h-[440px] md:min-h-[500px] flex items-center justify-center relative bg-white/50 backdrop-blur-xl">
              
              {/* Desktop View */}
              <div className="hidden md:grid relative z-10 w-full grid-cols-3 gap-8 p-12">
                 <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1v22m5-18H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                     <span className="font-bold text-slate-800">Extraktion</span>
                   </div>
                   <div className="space-y-2">
                     <div className="h-2 bg-slate-100 rounded w-full"></div>
                     <div className="pt-2 text-blue-600 font-bold text-lg">€ 1.250,00</div>
                   </div>
                 </div>
                 <div className="bg-white rounded-3xl p-8 border border-white shadow-2xl scale-110 z-20 hover:scale-[1.15] transition-transform duration-300 flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="m16 19 2 2 4-4"/></svg></div>
                    <span className="font-bold text-slate-900 mb-1">Visual AI Logic</span>
                    <div className="mt-4 flex gap-1.5">{[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}</div>
                 </div>
                 <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                      <span className="font-bold text-slate-800">Validierung</span>
                    </div>
                    <div className="h-2 bg-emerald-50 rounded w-full mt-4"></div>
                 </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden w-full relative h-[420px] flex items-center overflow-hidden">
                 <div className="flex gap-6 transition-transform duration-75 will-change-transform" style={{ transform: `translateX(calc(10vw - ${scrollProgress * 240}vw))` }}>
                    <div className="shrink-0 w-[80vw] bg-white rounded-3xl p-8 border border-slate-100 shadow-xl flex flex-col justify-between min-h-[320px]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1v22m5-18H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                        <span className="font-bold text-slate-800 text-lg">1. Extraktion</span>
                      </div>
                      <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex justify-between items-end">
                         <span className="text-xs text-blue-600 font-bold uppercase">Betrag</span>
                         <span className="text-blue-700 font-black text-2xl">€ 1.250,00</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-[80vw] bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative flex flex-col items-center justify-center text-center min-h-[320px]">
                       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="m16 19 2 2 4-4"/></svg></div>
                       <h4 className="font-bold text-white text-xl mb-2">Visual AI Logic</h4>
                       <div className="mt-6 flex gap-2 justify-center">{[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}</div>
                    </div>
                    <div className="shrink-0 w-[80vw] bg-white rounded-3xl p-8 border border-slate-100 shadow-xl flex flex-col justify-between min-h-[320px]">
                       <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                          <span className="font-bold text-slate-800 text-lg">3. Validierung</span>
                       </div>
                       <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center gap-3 mt-8">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                          <span className="text-sm font-bold text-emerald-800">Gefunden</span>
                       </div>
                    </div>
                 </div>
                 <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {[0,1,2].map(i => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-300 ${ (i === 0 && scrollProgress < 0.33) || (i === 1 && scrollProgress >= 0.33 && scrollProgress < 0.66) || (i === 2 && scrollProgress >= 0.66) ? 'bg-slate-800 w-8' : 'bg-slate-200 w-2' }`}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => (
  <section id="funktionen" className="py-24 md:py-32 bg-[#FBFBFC]">
    <div className="container mx-auto px-4 md:px-8">
      <SectionHeading  
        badge="Features"
        title="Out-of-the-Box produktiv." 
        subtitle="Unsere Lösung deckt die wichtigsten geschäftlichen Anforderungen nativ ab." 
      />
      
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <div key={i} className="soft-card p-6 rounded-[32px] hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl group">
            <div className="flex items-start gap-4 mb-6">
               <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{f.icon}</svg>
               </div>
               <div className="pt-0.5">
                   {f.label && <div className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase mb-1">{f.label}</div>}
                   <h4 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">{f.title}</h4>
               </div>
            </div>
            <p className="text-slate-600 text-[14px] leading-6 mb-8 flex-grow font-medium">{f.description}</p>
            <div className="mt-auto pt-6 border-t border-slate-50 min-h-[140px] flex flex-col justify-end">
              {f.items ? (
                <div className="space-y-3">
                  {f.items.slice(0, 3).map(item => (
                    <div key={item} className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600">
                       <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                       <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              ) : i === 1 ? <CompanyValidationVisual /> : i === 2 ? <RenamingVisual /> : i === 3 ? <FolderStructureVisual /> : null}
            </div>
          </div>
        ))}
      </div>

      <MobileCarousel>
        {FEATURES.map((f, i) => (
          <div key={i} className="soft-card p-6 rounded-[32px] flex flex-col h-full bg-white border border-slate-100 min-w-[85vw] snap-center">
            <div className="flex items-start gap-4 mb-6">
               <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{f.icon}</svg>
               </div>
               <div className="pt-0.5">
                   {f.label && <div className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase mb-1">{f.label}</div>}
                   <h4 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">{f.title}</h4>
               </div>
            </div>
            <p className="text-slate-600 text-[14px] leading-6 mb-8 flex-grow font-medium">{f.description}</p>
            <div className="mt-auto pt-6 border-t border-slate-50 min-h-[140px] flex flex-col justify-end">
              {f.items ? (
                <div className="space-y-3">
                   {f.items.slice(0,3).map(item => (
                    <div key={item} className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600">
                       <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                       <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              ) : i === 1 ? <CompanyValidationVisual /> : i === 2 ? <RenamingVisual /> : i === 3 ? <FolderStructureVisual /> : null}
            </div>
          </div>
        ))}
      </MobileCarousel>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section id="lösung" className="py-24 md:py-32 bg-slate-50">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="reveal p-6 md:p-10 pl-4">
          <Badge className="mb-6 bg-slate-200 text-slate-600 border-slate-300">Herausforderung</Badge>
          <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-slate-800 leading-tight">Warum klassisches OCR heute nicht mehr ausreicht.</h3>
          <p className="text-base md:text-lg text-slate-500 mb-8 leading-relaxed font-medium">Klassisches OCR extrahiert nur Zeichen, aber keinen Kontext.</p>
          <div className="space-y-5">
            {["Abhängig von festen Vorlagen", "Kein Verständnis für Inhalte", "Kosten steigen unkontrolliert"].map(item => (
              <div key={item} className="flex items-start gap-4 text-slate-600 font-bold">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-[2px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative bg-white p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/60">
          <Badge className="mb-6 bg-emerald-50 text-emerald-600 border-emerald-100">Unsere Antwort</Badge>
          <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-slate-900 leading-tight">Visual AI statt Texterkennung.</h3>
          <p className="text-base md:text-lg text-slate-500 mb-8 leading-relaxed font-medium">Unsere Visual AI versteht Dokumente wie ein Mensch.</p>
          <div className="space-y-5">
            {["Maximale Flexibilität", "Kontextbasiertes Verständnis", "Abrechnung auf Einsparungsbasis"].map(item => (
              <div key={item} className="flex items-start gap-4 text-slate-700 font-bold">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm mt-[2px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WorkflowSection = () => {
    const [active, setActive] = useState(0);
    return (
      <section id="workflow" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading badge="Workflow" title="In 4 Schritten am Ziel." subtitle="Vom Eingang bis zur fertigen Buchung in wenigen Sekunden." />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             <div className="space-y-4">
                {WORKFLOW_STEPS.map((step, i) => (
                  <div key={i} onClick={() => setActive(i)} className={`p-6 md:p-8 rounded-[32px] cursor-pointer transition-all duration-500 border-2 ${active === i ? 'bg-slate-900 border-slate-900 shadow-2xl translate-x-4' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}>
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className={`w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center font-black text-lg md:text-xl shrink-0 ${active === i ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>{i + 1}</div>
                      <div>
                        <h4 className={`text-lg md:text-xl font-black mb-2 tracking-tight ${active === i ? 'text-white' : 'text-slate-900'}`}>{step.title}</h4>
                        <p className={`text-[14px] md:text-base leading-relaxed font-medium ${active === i ? 'text-slate-400' : 'text-slate-500'}`}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <div className="relative bg-slate-50 rounded-[48px] p-8 md:p-12 aspect-square flex items-center justify-center overflow-hidden border border-slate-100 reveal">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
                <div className="relative z-10 w-full max-w-[400px]">
                   {active === 0 && (
                      <div className="flex flex-col items-center animate-in zoom-in duration-500">
                         <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-blue-600 mb-6">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
                         </div>
                         <div className="text-slate-400 font-mono text-[11px] uppercase tracking-widest">Awaiting documents...</div>
                      </div>
                   )}
                   {active === 1 && (
                      <div className="animate-in zoom-in duration-500 scale-110">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 text-center">
                           <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="m16 19 2 2 4-4"/></svg>
                           </div>
                           <div className="space-y-3">
                              <div className="h-3 bg-slate-50 rounded-full w-full"></div>
                              <div className="h-3 bg-slate-50 rounded-full w-2/3 mx-auto"></div>
                              <div className="pt-4 text-emerald-500 font-bold">Context detected 99.8%</div>
                           </div>
                        </div>
                      </div>
                   )}
                   {active === 2 && <div className="animate-in zoom-in duration-500"><CompanyValidationVisual /></div>}
                   {active === 3 && <div className="animate-in zoom-in duration-500"><RenamingVisual /></div>}
                   {active === 4 && <div className="animate-in zoom-in duration-500"><FolderStructureVisual /></div>}
                </div>
             </div>
          </div>
        </div>
      </section>
    );
};

const PricingSection = () => (
    <section id="pricing" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-slate-900 rounded-[48px] p-10 md:p-20 text-center relative overflow-hidden mb-16">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-60 -mt-60"></div>
           <Badge className="mb-6 bg-white/10 text-white border-white/20 uppercase tracking-[2px]">Pricing</Badge>
           <h3 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">Fair. Transparent. Wertbasiert.</h3>
           <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed font-medium">Wir glauben nicht an statische Kosten pro Seite. Unsere Preisgestaltung richtet sich nach dem realen Mehrwert für Ihr Unternehmen.</p>
           <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-8 md:p-12 text-left">
                 <h4 className="text-xl font-bold text-white mb-2">Flexible Einrichtung</h4>
                 <p className="text-slate-400 text-sm mb-6 font-medium">Analyse Ihrer IST-Situation und nahtlose Integration in Ihre bestehende Infrastruktur.</p>
                 <div className="text-white font-black text-2xl">Individuell</div>
              </div>
              <div className="bg-blue-600 rounded-[32px] p-8 md:p-12 text-left shadow-2xl shadow-blue-500/20">
                 <h4 className="text-xl font-bold text-white mb-2">Usage Fee</h4>
                 <p className="text-blue-100/70 text-sm mb-6 font-medium">Skalierbare Preise basierend auf Transaktionsvolumen und Prozesskomplexität.</p>
                 <div className="text-white font-black text-2xl">Performance Link</div>
              </div>
           </div>
        </div>
      </div>
    </section>
);

const DeploymentSection = () => (
  <section className="py-24 md:py-32 bg-slate-50">
    <div className="container mx-auto px-4 md:px-8">
       <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
             <Badge className="mb-6">Deployment</Badge>
             <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">Einfach andocken. <br/>Sofort profitieren.</h3>
             <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">Visual AI lässt sich nahtlos in Ihre IT-Umgebung integrieren. Ob Cloud oder On-Premise – wir passen uns Ihren Sicherheitsstandards an.</p>
             <div className="flex flex-wrap gap-4">
                {["REST API", "Email-Hook", "DMS Connector", "Cloud Storage"].map(tag => (
                  <div key={tag} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 font-bold text-[13px] shadow-sm">{tag}</div>
                ))}
             </div>
          </div>
          <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 text-white reveal shadow-2xl">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
             </div>
             <div className="font-mono text-[13px] space-y-4 opacity-80">
                <div className="text-blue-400"># Start Deployment...</div>
                <div>Configuring Visual AI cluster... <span className="text-emerald-400">DONE</span></div>
                <div>Connecting to ERP System (SAP S/4HANA)... <span className="text-emerald-400">CONNECTED</span></div>
                <div>Synchronizing master data... 3.2s</div>
                <div className="text-indigo-400 underline pt-4 cursor-pointer hover:text-indigo-300">https://api.certina-ai.com/v1/analyze</div>
             </div>
          </div>
       </div>
    </div>
  </section>
);

const StepToStart = () => (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading badge="Start" title="Ihr Weg zu Visual AI." />
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Demo Call", desc: "Wir zeigen Ihnen die Power von Visual AI live an Ihren Beispielen." },
             { title: "Proof of Concept", desc: "Wir validieren die Performance in Ihrer Produktivumgebung." },
             { title: "Go-Live", desc: "In wenigen Tagen sind Ihre Prozesse automatisiert." }
           ].map((step, i) => (
             <div key={i} className="soft-card p-10 rounded-[32px] text-center bg-slate-50 border-transparent hover:border-slate-100 hover:bg-white transition-all duration-500 reveal">
                <div className="text-5xl font-black text-slate-100 mb-6">{i + 1}</div>
                <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{step.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
);

const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
      <section id="faq" className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <SectionHeading badge="Support" title="Häufig gefragt." />
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`w-full text-left p-6 md:p-8 font-bold text-base md:text-lg flex justify-between items-center transition-all duration-500 rounded-[28px] ${openIndex === i ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'bg-white text-slate-900 hover:bg-slate-100 shadow-sm'}`}
                >
                  {faq.question}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {openIndex === i && <div className="p-8 text-slate-500 leading-relaxed font-medium animate-in fade-in slide-in-from-top-4 duration-500">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

const Footer = ({ onOpenContact }: { onOpenContact: () => void }) => (
    <footer className="bg-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-slate-900 rounded-[48px] p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden mb-16">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
           <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 bg-white text-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl">C</div>
              <span className="text-2xl font-black text-white tracking-tight">Certina Visual AI</span>
           </div>
           <h3 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight relative z-10 leading-tight">Bereit für die Zukunft?</h3>
           <p className="text-slate-400 text-lg mb-10 max-w-md relative z-10 font-medium">Lassen Sie uns gemeinsam Ihre Prozesse transformieren.</p>
           <Button variant="primary" className="bg-white text-slate-900 hover:bg-blue-50 relative z-10 px-10 py-4 text-lg rounded-2xl" onClick={onOpenContact}>Demo anfragen</Button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-100 text-slate-400 text-[13px] font-bold uppercase tracking-widest gap-6">
          <span>&copy; {new Date().getFullYear()} Certina Visual AI</span>
          <div className="flex gap-8">
             <a href="#" className="hover:text-slate-900 transition-colors">Impressum</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
);

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    const contacts = [
      { name: 'Stefan Stefanovic', email: 'stefan.stefanovic@certina-group.com' },
      { name: 'Tobias Meier', email: 'tobias.meier@certina-group.com' }
    ];
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
        <div className="relative bg-white rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Kontakt aufnehmen</h3>
            <p className="text-slate-500 font-medium">Wir freuen uns auf Ihre Anfrage.</p>
          </div>
          <div className="space-y-4">
            {contacts.map((contact, i) => (
              <div key={i} className="flex flex-col p-6 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="font-black text-slate-900 text-lg mb-1">{contact.name}</div>
                <div className="text-blue-600 font-bold text-sm mb-4">{contact.email}</div>
                <button 
                  onClick={() => { navigator.clipboard.writeText(contact.email); alert('Kopiert!'); }}
                  className="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white transition-all"
                >
                  E-Mail Kopieren
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      <Hero />
      <FeaturesGrid />
      <WorkflowSection />
      <ProblemSolution />
      <PricingSection />
      <DeploymentSection />
      <StepToStart />
      <FAQAccordion />
      <Footer onOpenContact={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}