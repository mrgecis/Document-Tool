
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
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Sections ---

const Navbar = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4 border-b border-slate-100' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-600 transition-colors">C</div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Certina Visual AI</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-[14px] font-semibold text-slate-500">
            <a href="#start" className="hover:text-indigo-600 transition-colors">Testen</a>
            <a href="#funktionen" className="hover:text-indigo-600 transition-colors">Funktionen</a>
            <a href="#workflow" className="hover:text-indigo-600 transition-colors">Workflow</a>
            <a href="#lösung" className="hover:text-indigo-600 transition-colors">Visual AI</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="primary" className="text-sm py-2.5 px-6 rounded-xl" onClick={onOpenContact}>Demo anfragen</Button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-44 pb-32 overflow-hidden hero-glow">
    <div className="container mx-auto px-8">
      <div className="max-w-4xl mx-auto text-center mb-20 reveal">
        <Badge className="mb-6 bg-indigo-50/50 text-indigo-700 border-indigo-100 uppercase tracking-wider">Die Evolution der Dokumentenverarbeitung</Badge>
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-8">
          The intelligence for <br/><span className="text-slate-400">business documents.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          <span className="block text-slate-900 font-semibold mb-3">Von Eingang bis Ablage</span>
          Visuelle AI versteht Dokumente, extrahiert relevante Informationen, <br className="hidden md:block"/>
          benennt sie automatisch und legt sie strukturiert ab.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button variant="primary" className="px-10 py-4 shadow-2xl" onClick={() => window.location.href='#workflow'}>
            Workflow ansehen
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </Button>
          <button 
             className="px-10 py-4 rounded-2xl font-semibold transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2 text-[15px] bg-slate-400 text-white shadow-2xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200"
             onClick={() => window.location.href='#live-test'}
          >
            Live testen
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Hero Visual Panel - Following Dribbble Style */}
      <div className="relative max-w-6xl mx-auto reveal" style={{ transitionDelay: '0.2s' }}>
        <div className="visual-panel-gradient rounded-[40px] p-2 border border-slate-100 shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center relative">
           <svg className="absolute opacity-[0.03] pointer-events-none" width="100%" height="100%" viewBox="0 0 800 400">
             <path d="M0 200 Q 200 100 400 200 T 800 200" fill="none" stroke="#4f46e5" strokeWidth="2" />
             <path d="M0 250 Q 200 150 400 250 T 800 250" fill="none" stroke="#f59e0b" strokeWidth="1" />
           </svg>
           
           <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
              <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg transform -rotate-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1v22m5-18H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <span className="font-bold text-slate-800">Extraktion</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 rounded w-full"></div>
                  <div className="h-2 bg-slate-100 rounded w-2/3"></div>
                  <div className="pt-2 text-blue-600 font-bold text-lg">€ 1.250,00</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-white shadow-2xl scale-110 z-20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="m16 19 2 2 4-4"/></svg>
                  </div>
                  <span className="font-bold text-slate-900 block mb-1">Visual AI Logic</span>
                  <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">Context detected</span>
                  <div className="mt-4 flex gap-1.5">
                    {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{animationDelay: `${i*0.2}s`}}></div>)}
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg transform rotate-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span className="font-bold text-slate-800">Validierung</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-emerald-50 rounded w-full"></div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">Firma gefunden</div>
                </div>
              </div>
           </div>
           
           <div className="absolute bottom-10 right-10 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[13px] font-bold flex items-center gap-3 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              99.8% Accuracy Score
           </div>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section id="lösung" className="py-32 bg-slate-50">
    <div className="container mx-auto px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Problem */}
        <div className="reveal p-10 pl-4 border border-transparent">
          <Badge className="mb-6 bg-slate-200 text-slate-600 border-slate-300">Herausforderung</Badge>
          <h3 className="text-4xl font-extrabold mb-6 tracking-tight text-slate-800 min-h-[80px] flex items-end pb-1">Warum klassisches OCR heute nicht mehr ausreicht.</h3>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium min-h-[56px]">
            Klassisches OCR extrahiert nur einzelne Zeichen und Wörter, aber keinen Kontext.
          </p>
          <div className="space-y-5">
            {[
              "Abhängig von festen Layouts und Vorlagen",
              "Kein Verständnis für Inhalte oder Zusammenhänge",
              "Kosten steigen meist unkontrolliert mit Volumen und Seitenzahl"
            ].map(item => (
              <div key={item} className="flex items-start gap-4 text-slate-600 font-medium min-h-[40px]">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-[2px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right: Solution */}
        <div className="reveal relative bg-white p-10 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/60">
          <Badge className="mb-6 bg-emerald-50 text-emerald-600 border-emerald-100">Unsere Antwort</Badge>
          <h3 className="text-4xl font-extrabold mb-6 tracking-tight text-slate-900 leading-tight min-h-[80px] flex items-end pb-1">
            Visual AI statt klassischer Texterkennung.
          </h3>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium min-h-[56px]">
            Unsere Visual AI versteht Dokumente wie ein menschlicher Sachbearbeiter.
          </p>
          <div className="space-y-5">
            {[
              "Maximale Flexibilität bei variierenden Dokumenten",
              "Kontextbasiertes Verständnis und Extraktion",
              "Abrechnung auf Basis realer Einsparungen statt pro Seite"
            ].map(item => (
              <div key={item} className="flex items-start gap-4 text-slate-700 font-semibold min-h-[40px]">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-200 mt-[2px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesGrid = () => (
  <section id="funktionen" className="py-32 bg-[#FBFBFC]">
    <div className="container mx-auto px-8">
      <SectionHeading 
        badge="Features"
        title="Out-of-the-Box produktiv." 
        subtitle="Unsere Lösung ist sofort einsatzbereit und deckt die wichtigsten geschäftlichen Anforderungen nativ ab." 
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <div key={i} className="soft-card p-6 rounded-[32px] hover:translate-y-[-8px] transition-all duration-500 reveal flex flex-col h-full group bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl">
            
            {/* Header: Icon + Text Side-by-Side */}
            <div className="flex items-start gap-4 mb-6">
               <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{f.icon}</svg>
               </div>
               <div className="pt-0.5">
                   {f.label && (
                       <div className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase mb-1">
                         {f.label}
                       </div>
                   )}
                   <h4 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">{f.title}</h4>
               </div>
            </div>

            <p className="text-slate-600 text-[14px] leading-6 mb-8 whitespace-pre-line flex-grow pl-1 hyphens-auto font-medium">{f.description}</p>
            
            <div className="mt-auto pt-6 border-t border-slate-50 min-h-[80px] flex flex-col justify-end">
              {f.items ? (
                /* Card 1: Features List */
                <div className="space-y-3">
                  {f.intro && <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">{f.intro}</div>}
                  {f.items.map(item => (
                    <div key={item} className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600">
                       <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                       <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              ) : i === 1 ? (
                /* Card 2: Validation Matches */
                 <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Live-Validierung</div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <span>Firma</span>
                        <div className="flex items-center gap-1.5 text-emerald-600">
                           <span className="text-slate-700 font-normal">Muster GmbH</span>
                           <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <span>Adresse</span>
                        <div className="flex items-center gap-1.5 text-emerald-600">
                           <span className="text-slate-700 font-normal">Berlin, DE</span>
                           <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                    </div>
                 </div>
              ) : i === 2 ? (
                /* Card 3: Renaming Flow */
                 <div className="group/renaming">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">Auto-Rename</div>
                    <div className="flex items-center gap-2">
                       <div className="bg-slate-100 text-slate-400 text-[10px] px-2 py-1.5 rounded decoration-slate-400 line-through decoration-1">scan_02.pdf</div>
                       <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-4 4 4-4-4-4"/></svg>
                       <div className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1.5 rounded border border-blue-100 shadow-sm truncate">Rechnung_2024.pdf</div>
                    </div>
                 </div>
              ) : i === 3 ? (
                /* Card 4: Folder Structure */
                 <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3">Struktur</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 overflow-hidden">
                        <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        <span className="truncate">Finanzen</span>
                        <svg className="w-3 h-3 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                        <span className="truncate">2024</span>
                        <svg className="w-3 h-3 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                        <span className="font-semibold text-slate-700 truncate">Rechnungen</span>
                    </div>
                 </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const CompanyValidationVisual = () => (
  <div className="mt-auto bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Left: Invalid */}
      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm w-full md:w-[45%] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
        <div className="flex justify-between items-start mb-2">
           <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Erfasst</div>
           <div className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded text-[10px] font-bold">Ungültig</div>
        </div>
        <div className="font-bold text-slate-700 text-sm mb-0.5">Certina AG</div>
        <div className="text-slate-400 text-xs">Musterstraße 12, Berlin</div>
      </div>

      {/* Center: Arrow/AI */}
      <div className="flex flex-col items-center justify-center shrink-0">
         <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.21-8.85"/></svg>
         </div>
         <div className="text-[9px] font-bold text-blue-600 uppercase tracking-wide">AI Check</div>
      </div>

      {/* Right: Valid */}
      <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm w-full md:w-[45%] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
        <div className="flex justify-between items-start mb-2">
           <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Korrigiert</div>
           <div className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold">Validiert</div>
        </div>
        <div className="font-bold text-slate-900 text-sm mb-0.5">Certina GmbH</div>
        <div className="text-slate-500 text-xs">Musterstraße 12, Berlin</div>
      </div>
    </div>

    {/* Bottom: Notification */}
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-4">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm shrink-0">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>
      <div>
         <div className="font-bold text-slate-900 text-sm mb-0.5">Korrekturmail wird automatisch vorbereitet</div>
         <div className="text-xs text-slate-500">Die AI erstellt eine Antwort mit der korrekten Firmenbezeichnung.</div>
      </div>
    </div>
  </div>
);


const RenamingVisual = () => {
  const [isRenamed, setIsRenamed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRename = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsRenamed(true);
      setIsAnimating(false);
    }, 800);
  };

  const handleReset = () => {
    setIsRenamed(false);
  };

  return (
    <div className="mt-auto bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
      
      {/* File Card */}
      <div className={`relative w-full max-w-sm bg-white rounded-2xl border transition-all duration-700 ease-out p-8 shadow-sm ${isRenamed ? 'border-blue-200 shadow-blue-50' : 'border-slate-200'}`}>
        
        {/* Loading Overlay */}
        {isAnimating && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center rounded-2xl">
             <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3"></div>
             <div className="text-xs font-bold text-blue-600 uppercase tracking-widest animate-pulse">Analysing...</div>
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          {/* Icon Transition */}
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isRenamed ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-slate-100 text-slate-400'}`}>
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isRenamed ? "2" : "1.5"}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
          </div>

          {/* Filename Transition */}
          <div className="h-10 flex items-center justify-center w-full mb-1">
             <div key={isRenamed ? 'new' : 'old'} className="animate-in fade-in zoom-in duration-300">
                <span className={`text-lg font-bold break-all ${isRenamed ? 'text-blue-900' : 'text-slate-500 font-mono'}`}>
                  {isRenamed ? 'Rechnung Lieferant A 08.08.2024' : 'Scan_633'}
                </span>
             </div>
          </div>
          
          {/* Subtitle / Extension */}
          <div className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-6">PDF Document • 1.2 MB</div>

          {/* Action Button */}
          {!isRenamed ? (
            <button 
              onClick={handleRename}
              disabled={isAnimating}
              className="group relative overflow-hidden rounded-xl bg-slate-900 px-8 py-3 transition-all hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center gap-2 text-white font-bold text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/><line x1="13.25" y1="2.25" x2="21.75" y2="10.75"/><line x1="21.75" y1="2.25" x2="13.25" y2="10.75"/></svg>
                <span>Jetzt umbenennen</span>
              </div>
            </button>
          ) : (
             <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                <button 
                  onClick={handleReset}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors mx-auto"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  <span>Zurück zum Original</span>
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}


const FolderStructureVisual = () => {
  const [expanded, setExpanded] = useState({
      firmen: true,
      certina: true,
      rechnungen: true
  });
  const [isVisible, setIsVisible] = useState(true);

  const toggle = (key: keyof typeof expanded) => {
      setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClose = () => {
    setIsVisible(false);
  }

  const handleOpen = () => {
    setIsVisible(true);
    setExpanded({
        firmen: true,
        certina: true,
        rechnungen: true
    });
  }

  return (
    <div className="mt-auto bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-center min-h-[300px] relative">
      {!isVisible ? (
         <div className="flex flex-col items-center justify-center h-full w-full absolute inset-0 animate-in fade-in zoom-in duration-300 cursor-pointer" onClick={handleOpen}>
             {/* Finder Icon */}
             <div className="w-24 h-24 hover:scale-105 transition-transform duration-300">
                <img src="/finder-icon.png" alt="Finder" className="w-full h-full object-contain drop-shadow-xl" />
             </div>
             <p className="mt-4 text-sm font-semibold text-slate-500 bg-white/50 px-3 py-1 rounded-full border border-slate-100 shadow-sm">Klicken zum Öffnen</p>
         </div>
      ) : (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full max-w-sm mx-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2 group/header">
            <div className="flex gap-1.5">
                 {/* Close */}
                <div 
                    onClick={handleClose}
                    className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-110 transition-all cursor-pointer"
                >
                    <svg className="opacity-0 group-hover/header:opacity-100 transition-opacity text-black/40 w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </div>
                {/* Minimize */}
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-110 transition-all">
                    <svg className="opacity-0 group-hover/header:opacity-100 transition-opacity text-black/40 w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                </div>
                {/* Maximize */}
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-110 transition-all">
                    <svg className="opacity-0 group-hover/header:opacity-100 transition-opacity text-black/40 w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8M12 8v8"/></svg>
                </div>
            </div>
            <div className="text-[10px] font-medium text-slate-400 ml-2">DMS Explorer</div>
        </div>

        {/* Body */}
        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed select-none overflow-x-auto">
            
            {/* Level 1 */}
            <div 
                className="flex items-center gap-2 text-slate-500 mb-2 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => toggle('firmen')}
            >
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-200 ${expanded.firmen ? 'rotate-90' : 'rotate-0'}`}><path d="M9 18l6-6-6-6"/></svg>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                 <span>Firmen</span>
            </div>

            {expanded.firmen && (
                <div className="pl-4 border-l border-slate-100 ml-1.5 animate-in slide-in-from-top-1 fade-in duration-200">
                     {/* Level 2 */}
                    <div 
                        className="flex items-center gap-2 text-slate-500 mb-2 cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={() => toggle('certina')}
                    >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-200 ${expanded.certina ? 'rotate-90' : 'rotate-0'}`}><path d="M9 18l6-6-6-6"/></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        <span>Certina GmbH</span>
                    </div>

                    {expanded.certina && (
                        <div className="pl-4 border-l border-slate-100 ml-1.5 animate-in slide-in-from-top-1 fade-in duration-200">
                            {/* Level 3 */}
                            <div 
                                className="flex items-center gap-2 text-slate-500 mb-2 cursor-pointer hover:text-blue-500 transition-colors"
                                onClick={() => toggle('rechnungen')}
                            >  
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-200 ${expanded.rechnungen ? 'rotate-90' : 'rotate-0'}`}><path d="M9 18l6-6-6-6"/></svg>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                                <span>Rechnungen</span>
                            </div>

                            {expanded.rechnungen && (
                                <div className="pl-5 border-l border-slate-100 ml-1.5 animate-in slide-in-from-top-1 fade-in duration-200 pt-1 pb-1">
                                    {/* File */}
                                    <div className="flex items-center gap-2.5">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                                        <span className="font-semibold text-blue-700 text-[11px] whitespace-nowrap">
                                            Rechnung Lieferant A 08.08.2024.pdf
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
      )}
    </div>
  );
};

const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Standard Blue Color
  const getStepColor = (idx: number) => {
    return 'blue';
  };

  const getStepClasses = (idx: number, isActive: boolean) => {
    const color = getStepColor(idx);
    if (!isActive) return 'bg-transparent border border-transparent hover:bg-slate-50 text-slate-600';
    // Active state
    return `bg-${color}-50 border border-${color}-100 text-${color}-900`;
  };

  const currentStepColor = getStepColor(activeStep);

  return (
    <section id="workflow" className="py-32 bg-white">
      <div className="container mx-auto px-8">
        <SectionHeading 
          badge="Prozess"
          title="Der intelligente Flow." 
          subtitle="Vom Dokumenteneingang bis zur strukturierten Ablage – so arbeitet unsere Visual AI."
        />
        
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          <div className="lg:w-1/3 space-y-3">
            {WORKFLOW_STEPS.map((step, idx) => {
              const color = getStepColor(idx);
              const isActive = activeStep === idx;
              return (
              <button 
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-6 rounded-[24px] transition-all duration-300 flex items-center gap-5 ${isActive ? `bg-${color}-50 border border-${color}-100` : 'bg-transparent border border-transparent hover:bg-slate-50'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg ${isActive ? `bg-${color}-600 text-white shadow-lg` : 'bg-slate-100 text-slate-400'}`}>
                  {idx + 1}
                </div>
                <div>
                  <h5 className={`font-bold text-[17px] ${isActive ? `text-${color}-900` : 'text-slate-600'}`}>{step.shortTitle || step.title}</h5>
                </div>
              </button>
            )})}
          </div>

          <div className="lg:w-2/3 bg-slate-50 rounded-[40px] p-12 md:p-16 border border-slate-100 relative overflow-hidden reveal">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-${currentStepColor}-100/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2`}></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className={`w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-${currentStepColor}-600 shadow-xl shadow-${currentStepColor}-100 mb-10`}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {WORKFLOW_STEPS[activeStep].icon}
                </svg>
              </div>
              <h4 className="text-3xl font-extrabold mb-6 text-slate-900 tracking-tight">{WORKFLOW_STEPS[activeStep].title}</h4>
              <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-xl">{WORKFLOW_STEPS[activeStep].description}</p>
              
              {/* Step 5: Storage Options */}
              {WORKFLOW_STEPS[activeStep].id === 5 && (
                <div className="mb-8 animate-in slide-in-from-bottom-2 fade-in duration-500">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Ablage in bestehenden Systemen</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                     {/* Local Systems */}
                     <div className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-slate-300 hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105 transition-all duration-300 shrink-0">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm mb-0.5">Lokale Systeme</div>
                          <div className="text-[11px] font-medium text-slate-400">Server, Netzlaufwerke…</div>
                        </div>
                     </div>

                     {/* Cloud Systems */}
                     <div className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-slate-300 hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:scale-105 transition-all duration-300 shrink-0">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                        </div>
                         <div>
                          <div className="font-bold text-slate-800 text-sm mb-0.5">Cloud-Speicher</div>
                          <div className="text-[11px] font-medium text-slate-400">OneDrive, SharePoint…</div>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {WORKFLOW_STEPS[activeStep].channels && (
                <div className="mt-auto space-y-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Beispielhafte Eingangskanäle</div>
                  <div className="grid sm:grid-cols-1 gap-4">
                    {WORKFLOW_STEPS[activeStep].channels?.map((channel, idx) => (
                      <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 bg-white/50 p-6 rounded-2xl border border-slate-100 group/item hover:bg-white hover:shadow-md transition-all duration-300`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-6 bg-${currentStepColor}-500 rounded-full`}></div>
                          <span className="text-slate-900 font-bold text-[15px]">{channel.label}</span>
                        </div>
                        <span className="text-slate-500 text-sm font-medium">{channel.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {WORKFLOW_STEPS[activeStep].capabilities && (
                <div className="mt-auto space-y-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Diese Informationen erkennt und verarbeitet die Visual AI</div>
                  <div className="grid sm:grid-cols-1 gap-4">
                    {WORKFLOW_STEPS[activeStep].capabilities?.map((cap, idx) => (
                      <div key={idx} className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-${currentStepColor}-100 transition-all duration-300`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-lg bg-${currentStepColor}-50 flex items-center justify-center shrink-0 mt-0.5`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-${currentStepColor}-600`}>
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 mb-1.5">{cap.label}</h5>
                            <p className="text-slate-500 text-sm leading-relaxed">{cap.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {WORKFLOW_STEPS[activeStep].id === 3 && <CompanyValidationVisual />}
              {WORKFLOW_STEPS[activeStep].id === 4 && <RenamingVisual />}
              {WORKFLOW_STEPS[activeStep].id === 5 && <FolderStructureVisual />}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const [cost, setCost] = useState(1000);
  const [savings, setSavings] = useState(50);
  const [isEditingCost, setIsEditingCost] = useState(false);
  const calculatedSavings = cost * (savings / 100);
  const finalPrice = calculatedSavings * 0.20;

  return (
    <section id="pricing" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#0B0F19' }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(900px circle at 15% 20%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(700px circle at 85% 30%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(800px circle at 50% 80%, rgba(236,72,153,0.12), transparent 65%), linear-gradient(180deg, rgba(8,11,18,0.98) 0%, rgba(9,12,22,0.98) 60%, rgba(6,8,14,0.98) 100%)'
        }}
      ></div>
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")"
        }}
      ></div>
      <div className="container mx-auto px-8 relative z-10">
        <div className="mb-16 text-center reveal">
          <Badge className="mb-4 bg-indigo-500/10 border-indigo-500/20 text-indigo-400">Preismodell</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">Wir verdienen nur, wenn Sie sparen.</h2>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">Wertbasiertes Pricing statt Abrechnung pro Seite. Faire Partnerschaft auf Augenhöhe.</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          {/* Left Content */}
          <div className="reveal flex flex-col items-start py-0">
            <div className="mb-12">
              <div className="text-[100px] leading-none font-black mb-8 text-white tracking-tighter">
                20%
              </div>
              <h4 className="text-3xl font-bold mb-6 text-white tracking-tight leading-snug">
                Beteiligung an der <br/>realisierten Ersparnis.
              </h4>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Keine Grundgebühr, keine Risiko-Kosten. Sie zahlen nur einen Bruchteil dessen, was wir nachweislich für Sie einsparen.
              </p>
            </div>
            
            <div className="mt-auto w-full grid sm:grid-cols-2 gap-x-5 gap-y-10">
              {[
                "ROI-fokussiert",
                "Volle Transparenz",
                "Planbare Kosten",
                "Faire Abrechnung"
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-slate-200 font-medium bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: ROI Dashboard */}
          <div className="bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-[32px] reveal relative border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <h4 className="text-xl font-extrabold text-white tracking-tight">ROI-Dashboard</h4>
              <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold tracking-wider uppercase text-slate-300">Live Kalkulator</div>
            </div>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4 items-end">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Aktuelle IST-KOSTEN pro Monat</label>
                  {isEditingCost ? (
                    <div className="flex items-center gap-1 border-b border-indigo-500">
                      <input 
                        type="text" 
                        value={cost === 0 ? "" : cost.toLocaleString('de-DE')} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          setCost(val === '' ? 0 : parseInt(val, 10));
                        }}
                        onBlur={() => setIsEditingCost(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingCost(false)}
                        autoFocus
                        className="bg-transparent text-white font-bold text-lg tabular-nums focus:outline-none w-32 text-right appearance-none"
                        placeholder="0"
                      />
                      <span className="text-white font-bold text-lg">€</span>
                    </div>
                  ) : (
                    <span 
                      className="font-bold text-white text-lg tabular-nums cursor-pointer hover:text-indigo-400 transition-colors"
                      onClick={() => {
                        setIsEditingCost(true);
                        setCost(0);
                      }}
                    >
                      {cost.toLocaleString('de-DE')} €
                    </span>
                  )}
                </div>
                <input 
                  type="range" min="500" max="10000" step="100" 
                  value={cost > 10000 ? 10000 : cost} onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-4 items-end">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Einsparpotenzial in Prozent</label>
                  <span className="font-bold text-white text-lg tabular-nums">{savings}%</span>
                </div>
                <input 
                  type="range" min="10" max="100" step="1" 
                  value={savings} onChange={(e) => setSavings(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
              
              <div className="pt-10 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center text-slate-400 font-medium">
                  <span>Ihre monatliche Einsparung:</span>
                  <span className="text-emerald-400 font-bold text-xl tabular-nums">{calculatedSavings.toLocaleString('de-DE')} €</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 text-center sm:text-left">
                     <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Ihr monatlicher <br className="hidden sm:block"/> Zahlbetrag (20%)</span>
                     <span className="text-3xl md:text-4xl font-black tabular-nums tracking-tighter text-white whitespace-nowrap">{finalPrice.toLocaleString('de-DE')} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-32 pt-16 border-t border-white/10">
          <div className="mb-12">
            <h5 className="text-3xl font-black text-white mb-4 tracking-tight">Individuelle Anpassungen und Erweiterungen</h5>
            <p className="text-slate-400 text-lg max-w-2xl">Wir setzen Ihre Ideen zuverlässig um.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Service & Add-on Boxes */}
            <div className="lg:col-span-9 grid sm:grid-cols-2 gap-6">
              {/* Professional Services */}
              <div className="group bg-white/[0.03] border border-white/10 p-8 rounded-[24px] hover:bg-white/[0.06] hover:border-blue-500/50 transition-all duration-500 reveal">
                <h6 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </div>
                  Professional Services
                </h6>
                <ul className="space-y-3">
                  {[
                    "Initialkonfiguration der Visual-AI-Lösung",
                    "Kundenspezifische Anpassungen",
                    "Workflow-Design und Feinjustierung"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 group-hover:text-white transition-colors text-[15px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      <span className="font-medium leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Add-ons */}
              <div className="group bg-white/[0.03] border border-white/10 p-8 rounded-[24px] hover:bg-white/[0.06] hover:border-emerald-500/50 transition-all duration-500 reveal">
                <h6 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  Premium Add-ons
                </h6>
                <ul className="space-y-3">
                  {[
                    "App-Integrationen (z. B. DATEV, Onlinebanking)",
                    "Volltextsuche & Freigabe-Workflows",
                    "Buchungsvorschläge"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 group-hover:text-white transition-colors text-[15px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <span className="font-medium leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Tagessatz */}
            <div className="lg:col-span-3">
              <div className="h-full bg-gradient-to-b from-blue-500/10 to-transparent border border-white/10 rounded-[24px] p-6 flex flex-col items-center justify-center group hover:border-blue-500/30 transition-all duration-700 reveal">
                <div className="text-[12px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3 text-center">Tagessatz</div>
                <div className="relative">
                  <div className="absolute -inset-8 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="flex items-baseline gap-2 relative">
                    <div className="text-5xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">681</div>
                    <div className="text-2xl font-black text-blue-500">€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DeploymentSection = () => (
  <section id="betrieb" className="pt-32 pb-20 bg-[#FBFBFC]">
    <div className="container mx-auto px-8">
      <SectionHeading 
        badge="Infrastruktur"
        title="Betrieb nach Ihren Regeln." 
        subtitle="Cloud oder vollständig lokal – Sie entscheiden."
      />
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Cloud Native Card */}
        <div className="group relative h-[480px] rounded-[40px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-700 hover:shadow-[0_4px_48px_rgba(0,0,0,0.08)] reveal">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
          
          <div className="relative p-10 h-full flex flex-col">
            <div className="mb-6">
              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Flexibilität</span>
              <h4 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">Cloud-Lösung</h4>
              <p className="mt-3 text-slate-500 font-medium text-base leading-relaxed">
                Bereitstellung in einer gesicherten Cloud-Umgebung.
              </p>
            </div>
            
            {/* Visual Element: Professional Studio Cloud */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative scale-110">
                  {/* Subtle Glow Background */}
                  <div className="absolute -inset-10 bg-blue-500/25 blur-[50px] rounded-full transition-all duration-700"></div>
                  
                  {/* Cloud Asset Mockup */}
                  <div className="relative bg-gradient-to-b from-white to-slate-50/50 border border-slate-300 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-500">
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-1 bg-slate-900/15 rounded-full"></div>
                      <div className="flex items-center gap-4">
                        <img 
                          src="/cloud-119.png" 
                          alt="Cloud" 
                          className="w-8 h-8 object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                        />
                        <div className="space-y-1">
                          <div className="w-20 h-1 bg-slate-900/60 rounded-full transition-all"></div>
                          <div className="w-10 h-1 bg-slate-900/10 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-12 h-1 bg-slate-900/15 rounded-full self-end"></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* On-Prem Card */}
        <div className="group relative h-[480px] rounded-[40px] overflow-hidden bg-[#0A0B10] shadow-2xl transition-all duration-700 reveal">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          
          <div className="relative p-10 h-full flex flex-col">
            <div className="mb-6">
              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Souveränität</span>
              <h4 className="text-3xl font-black text-white leading-tight tracking-tight">On-Prem-Lösung</h4>
              <p className="mt-3 text-slate-400 font-medium text-base leading-relaxed">
                Bereitstellung in Ihrer eigenen IT-Umgebung.
              </p>
            </div>
            
            {/* Visual Element: Secure Hardware */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative scale-110">
                {/* Shield Glow Background */}
                <div className="absolute -inset-8 bg-emerald-500/40 blur-[40px] rounded-full transition-all duration-700"></div>
                
                <div className="relative bg-gradient-to-b from-white/10 to-transparent border border-emerald-500/30 p-8 rounded-3xl backdrop-blur-md shadow-2xl transition-colors duration-500">
                  <div className="flex flex-col gap-3">
                    <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 text-emerald-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <div className="space-y-1">
                        <div className="w-20 h-1 bg-emerald-500 rounded-full transition-all"></div>
                        <div className="w-10 h-1 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-12 h-1 bg-white/20 rounded-full self-end"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StepToStart = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    absender: string;
    empfaenger: string;
    dokumententyp: string;
    dokumentKategorie: string;
    datum: string;
    rechnungsnummer?: string;
    betrag?: string;
    buchungsvorschlag?: string;
    suggestedName: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF.js Worker Setup
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (droppedFile && (allowedTypes.includes(droppedFile.type) || droppedFile.type.startsWith('image/'))) {
      setFile(droppedFile);
      setAnalysisResult(null);
      setError(null);
      analyzeDocument(droppedFile);
    } else {
      setError('Bitte laden Sie eine PDF- oder Bilddatei hoch.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysisResult(null);
      setError(null);
      analyzeDocument(selectedFile);
    }
  };

  const convertPdfToImage = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    
    // Sehr niedrige Auflösung für maximale Geschwindigkeit
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context not available');
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas
    }).promise;
    
    // Sehr starke Kompression
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  };

  const compressImage = async (base64: string, maxWidth = 1200): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8).split(',')[1]);
      };
      img.src = `data:image/jpeg;base64,${base64}`;
    });
  };

  const analyzeDocument = async (fileToAnalyze: File) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('Start Analyse:', fileToAnalyze.name);
      let base64Image: string;
      
      // PDF zu Bild konvertieren oder Bild direkt verwenden
      if (fileToAnalyze.type === 'application/pdf') {
        console.log('Konvertiere PDF...');
        base64Image = await convertPdfToImage(fileToAnalyze);
        console.log('PDF konvertiert, Größe:', base64Image.length);
      } else {
        console.log('Komprimiere Bild...');
        const rawBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(fileToAnalyze);
        });
        base64Image = await compressImage(rawBase64);
        console.log('Bild komprimiert, Größe:', base64Image.length);
      }

      console.log('Sende an OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analysiere dieses Dokument und extrahiere folgende Informationen. Antworte NUR mit JSON in diesem exakten Format:

{
  "absender": "Name/Firma des Absenders",
  "empfaenger": "Name/Firma des Empfängers",
  "dokumententyp": "Der genaue Typ (z.B. Mahnung, Zahlungserinnerung, Mitteilung, Rechnung, Lieferschein, Vertrag, etc.)",
  "dokumentKategorie": "MUSS einer dieser Werte sein: Rechnungen, Steuerdokument, Buchhaltungsdokumente, Sonstige",
  "datum": "Datum im Format YYYY-MM-DD",
  "rechnungsnummer": "nur wenn es eine Rechnung ist",
  "betrag": "nur wenn es eine Rechnung ist, Format: 1234.56",
  "buchungsvorschlag": "nur wenn es eine Rechnung ist: Buchungssatz basierend auf SKR03 (z.B. 'Soll: 1400 Forderungen / Haben: 8400 Erlöse 19% USt + 1776 USt 19%')",
  "suggestedName": "Dateiname im Format: YYYY-MM-DD_Dokumententyp_Absender_Details"
}

WICHTIG: 
- dokumentKategorie muss EXAKT einer dieser Werte sein: Rechnungen, Steuerdokument, Buchhaltungsdokumente, Sonstige
- rechnungsnummer, betrag und buchungsvorschlag NUR bei Rechnungen angeben, sonst weglassen
- Für buchungsvorschlag verwende SKR03 Kontenrahmen: häufige Konten sind z.B. 1400 (Forderungen), 1600 (Verbindlichkeiten), 8400 (Erlöse 19%), 1776 (USt 19%), 1576 (Vorsteuer 19%), 4930 (Bürobedarf), 4910 (Porto), 4920 (Telekom), 4210 (Miete), etc.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                    detail: 'auto'
                  }
                }
              ]
            }
          ],
          max_tokens: 800,
          temperature: 0.1
        })
      });

      console.log('OpenAI Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI Error:', errorText);
        throw new Error('API-Fehler');
      }

      const data = await response.json();
      console.log('OpenAI Response:', data);
      const content = data.choices[0].message.content;
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        console.log('Analyse erfolgreich:', result);
        setAnalysisResult(result);
      } else {
        throw new Error('Ungültige Antwort');
      }
    } catch (err: any) {
      console.error('Fehler:', err);
      setError(err.message || 'Analyse fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
  <section id="start" className="py-32 bg-[#FBFBFC] relative overflow-hidden">
    <div className="container mx-auto px-8 relative z-10">
      <SectionHeading 
        badge="Starten"
        title="Ready to transform?" 
        subtitle="In drei Schritten zum messbaren Automatisierungserfolg."
      />

      <div className="relative grid md:grid-cols-3 gap-8 mb-32 max-w-6xl mx-auto">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-slate-100">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent w-full h-full opacity-50"></div>
        </div>

        {[
          { 
            icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>, 
            title: "Demo-Call", 
            desc: "Persönlicher Praxischeck & Bedarfsanalyse."
          },
          { 
            icon: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>, 
            title: "Due Diligence", 
            desc: "Analyse von Ist-Kosten und Einsparpotenzial."
          },
          { 
            icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>, 
            title: "Pricing", 
            desc: "Preisfindung auf Basis Ihrer Einsparungen."
          }
        ].map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center group reveal">
            
            {/* Card & Icon */}
            <div className="relative z-10 w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:border-blue-500/20 transition-all duration-500">
               {/* Floating Badge */}
               <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border-[3px] border-[#FBFBFC] text-white font-bold text-sm flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-colors duration-500">
                 {i + 1}
               </div>

               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600 group-hover:text-blue-600 transition-colors duration-500">
                 {step.icon}
               </svg>
            </div>

            <h4 className="text-xl font-bold mb-3 tracking-tight text-slate-900">{step.title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed max-w-[260px] text-[15px]">{step.desc}</p>
          </div>
        ))}
      </div>
      
      {/* Live Test Box */}
      <div id="live-test" className="scroll-mt-32 max-w-4xl mx-auto bg-white rounded-[40px] p-2 border border-slate-100 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.06)] reveal">
         <div className="rounded-[32px] bg-slate-50/50 border border-slate-100 p-8 md:p-12 relative overflow-hidden">
             
             {/* Header */}
             <div className="text-center mb-8">
                <Badge className="mb-6">Live-Test</Badge>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight text-slate-900">Testen Sie unsere Visual AI</h3>
             </div>

             {/* Drop Zone */}
             <div
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               onClick={() => !isAnalyzing && !analysisResult && fileInputRef.current?.click()}
               className={`relative border-2 border-dashed rounded-3xl p-8 md:p-12 text-center transition-all duration-300 cursor-pointer mb-6 ${
                 isDragging 
                   ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' 
                   : isAnalyzing
                   ? 'border-blue-300 bg-blue-50/30'
                   : analysisResult
                   ? 'border-emerald-300 bg-emerald-50/30'
                   : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
               }`}
             >
               <input
                 ref={fileInputRef}
                 type="file"
                 accept=".pdf,image/*"
                 onChange={handleFileSelect}
                 className="hidden"
               />

               {isAnalyzing ? (
                 /* Analyzing State */
                 <div className="py-8">
                   <div className="relative w-20 h-20 mx-auto mb-6">
                     {/* Outer spinning ring */}
                     <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                     {/* Inner icon */}
                     <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                         <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                         <circle cx="12" cy="12" r="3"/>
                       </svg>
                     </div>
                   </div>
                   <div className="text-lg font-bold text-slate-900 mb-2">Visual AI analysiert...</div>
                   <div className="text-sm text-slate-500">{file?.name}</div>
                   <div className="flex justify-center gap-1 mt-4">
                     {[0, 1, 2].map(i => (
                       <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>
                     ))}
                   </div>
                 </div>
               ) : analysisResult ? (
                 /* Success State - File Info */
                 <div className="py-4">
                   <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600">
                       <polyline points="20 6 9 17 4 12"/>
                     </svg>
                   </div>
                   <div className="text-lg font-bold text-slate-900 mb-1">Analyse abgeschlossen</div>
                   <div className="text-sm text-slate-500 mb-4">{file?.name}</div>
                   <button 
                     onClick={(e) => { e.stopPropagation(); resetAnalysis(); }}
                     className="text-sm font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-2 mx-auto px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                   >
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                       <path d="M3 3v5h5"/>
                     </svg>
                     Neues Dokument testen
                   </button>
                 </div>
               ) : (
                 /* Default Upload State */
                 <div className="py-8">
                   <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                     <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                       <polyline points="17 8 12 3 7 8"/>
                       <line x1="12" y1="3" x2="12" y2="15"/>
                     </svg>
                   </div>
                   <div className="text-lg font-bold text-slate-900 mb-2">Dokument hier ablegen</div>
                   <div className="text-sm text-slate-500 mb-4">oder klicken zum Auswählen</div>
                   <div className="text-xs text-slate-400 flex items-center justify-center gap-2">
                     <span className="px-2 py-1 bg-slate-100 rounded">PDF</span>
                     <span className="px-2 py-1 bg-slate-100 rounded">PNG</span>
                     <span className="px-2 py-1 bg-slate-100 rounded">JPG</span>
                   </div>
                 </div>
               )}
             </div>

             {/* Error Message */}
             {error && (
               <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-3">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <circle cx="12" cy="12" r="10"/>
                   <line x1="15" y1="9" x2="9" y2="15"/>
                   <line x1="9" y1="9" x2="15" y2="15"/>
                 </svg>
                 {error}
               </div>
             )}

             {/* Analysis Results */}
             {analysisResult && (
               <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
                 
                 {/* Basis-Informationen Grid */}
                 <div className="grid gap-4 sm:grid-cols-2">
                   
                   {/* Absender */}
                   <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                           <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                           <circle cx="8.5" cy="7" r="4"/>
                           <line x1="20" y1="8" x2="20" y2="14"/>
                           <line x1="23" y1="11" x2="17" y2="11"/>
                         </svg>
                       </div>
                       <div className="flex-1">
                         <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Absender</div>
                         <p className="text-slate-900 font-bold text-lg">{analysisResult.absender}</p>
                       </div>
                     </div>
                   </div>

                   {/* Empfänger */}
                   <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                           <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                           <circle cx="8.5" cy="7" r="4"/>
                           <polyline points="17 11 19 13 23 9"/>
                         </svg>
                       </div>
                       <div className="flex-1">
                         <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Empfänger</div>
                         <p className="text-slate-900 font-bold text-lg">{analysisResult.empfaenger}</p>
                       </div>
                     </div>
                   </div>

                   {/* Dokumententyp */}
                   <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                           <path d="M14 2v6h6"/>
                           <path d="M16 13H8"/>
                           <path d="M16 17H8"/>
                           <path d="M10 9H8"/>
                         </svg>
                       </div>
                       <div className="flex-1">
                         <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dokumententyp</div>
                         <p className="text-slate-900 font-bold text-lg">{analysisResult.dokumententyp}</p>
                       </div>
                     </div>
                   </div>

                   {/* Dokument-Kategorie */}
                   <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600">
                           <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                         </svg>
                       </div>
                       <div className="flex-1">
                         <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dokument-Kategorie</div>
                         <div className="inline-flex items-center gap-2">
                           <span className="text-slate-900 font-bold text-lg">{analysisResult.dokumentKategorie}</span>
                           <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase">KI</span>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Datum */}
                   <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                     <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600">
                           <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                           <line x1="16" y1="2" x2="16" y2="6"/>
                           <line x1="8" y1="2" x2="8" y2="6"/>
                           <line x1="3" y1="10" x2="21" y2="10"/>
                         </svg>
                       </div>
                       <div className="flex-1">
                         <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Datum</div>
                         <p className="text-slate-900 font-bold text-lg">{analysisResult.datum}</p>
                       </div>
                     </div>
                   </div>

                 </div>

                 {/* Rechnungsspezifische Informationen - nur bei Rechnungen */}
                 {analysisResult.rechnungsnummer && (
                   <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-sm">
                     <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                           <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                           <line x1="1" y1="10" x2="23" y2="10"/>
                         </svg>
                       </div>
                       <h3 className="text-lg font-bold text-emerald-900">Rechnungsinformationen</h3>
                     </div>
                     
                     <div className="grid gap-4 sm:grid-cols-3">
                       {/* Rechnungsnummer */}
                       <div className="bg-white rounded-xl p-4 border border-emerald-100">
                         <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Rechnungsnummer</div>
                         <div className="text-slate-900 font-bold text-lg">{analysisResult.rechnungsnummer}</div>
                       </div>

                       {/* Betrag */}
                       <div className="bg-white rounded-xl p-4 border border-emerald-100">
                         <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Betrag</div>
                         <div className="text-slate-900 font-bold text-lg">{analysisResult.betrag} €</div>
                       </div>

                       {/* Buchungsvorschlag */}
                       <div className="bg-white rounded-xl p-4 border border-emerald-100 sm:col-span-1">
                         <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Buchungsvorschlag (SKR03)</div>
                         <div className="text-slate-900 font-semibold text-sm leading-relaxed">{analysisResult.buchungsvorschlag}</div>
                       </div>
                     </div>
                   </div>
                 )}

                 {/* Suggested Name Card */}
                 <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                         <path d="M12 20h9"/>
                         <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                       </svg>
                     </div>
                     <div className="flex-1">
                       <div className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1">Benennungsvorschlag</div>
                       <div className="text-white font-bold text-lg">{analysisResult.suggestedName}</div>
                     </div>
                     <button 
                       onClick={() => navigator.clipboard.writeText(analysisResult.suggestedName)}
                       className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-semibold transition-colors flex items-center gap-2"
                     >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                       </svg>
                       Kopieren
                     </button>
                   </div>
                 </div>

               </div>
             )}
             
             {/* Background Decoration */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-50/0 via-blue-50/50 to-indigo-50/0 rounded-full blur-[80px] pointer-events-none opacity-50"></div>
         </div>
      </div>
    </div>
  </section>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-32 bg-white">
      <div className="container mx-auto px-8 max-w-3xl">
        <SectionHeading badge="Support" title="Häufig gefragt." />
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="reveal">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left p-8 font-bold text-[17px] flex justify-between items-center transition-all duration-300 rounded-[24px] ${openIndex === i ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'}`}
              >
                {faq.question}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-white' : 'text-slate-300'}`}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {openIndex === i && (
                <div className="p-8 text-slate-500 leading-relaxed text-base animate-in fade-in slide-in-from-top-4 duration-500">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenContact }: { onOpenContact: () => void }) => (
  <footer className="bg-white pt-20 pb-10">
    <div className="container mx-auto px-4 md:px-8">
      <div className="bg-slate-50 rounded-[48px] p-12 md:p-20 grid lg:grid-cols-2 gap-16 items-center mb-16 relative">
        <div className="text-center lg:text-left lg:pr-8">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">C</div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Certina Visual AI</span>
          </div>
          <p className="text-slate-500 text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
            Die nächste Generation der Business Intelligence. Wertbasiert, sicher und hochflexibel.
          </p>
        </div>
        
        <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-slate-200"></div>
        
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right lg:pl-8">
           <h4 className="text-3xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">Bereit für den nächsten Schritt?</h4>
           <p className="text-slate-500 text-lg mb-8 max-w-md leading-relaxed">Vereinbaren Sie noch heute Ihren persönlichen Demo-Call.</p>
           <Button variant="primary" className="min-w-[260px] justify-center shadow-xl hover:shadow-2xl py-4 px-8 text-lg rounded-2xl transition-all" onClick={onOpenContact}>Jetzt Termin buchen</Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center pt-12 border-t border-slate-100 text-slate-400 text-sm font-medium">
        <span>&copy; {new Date().getFullYear()} Certina Visual AI</span>
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Gespräch vereinbaren</h3>
          <p className="text-slate-500">Wir freuen uns auf den Austausch. Kontaktieren Sie uns direkt:</p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 font-bold border border-slate-100 shadow-sm uppercase">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm">{contact.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{contact.email}</div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(contact.email)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="E-Mail kopieren"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
           <button onClick={onClose} className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors">
             Schließen
           </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
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
