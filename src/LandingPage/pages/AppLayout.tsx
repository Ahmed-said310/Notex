import { useEffect } from "react";
import Hero from "./Hero";
import Benefits from "./Benifits";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
export default function App() {
    const navigate = useNavigate();
  function GoToDashboard(){
    if(localStorage.getItem("accesBrowserTotheENDUSERS") || localStorage.getItem("MainREfreshPageEND")) {
      return navigate('/create');
    } 
  }
  useEffect(() => {
    GoToDashboard()
  }, [])
  // High-End UX: Ensures the user always starts fresh at the top on reload
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 antialiased">
      
      {/* 
          MODERN UI BLOOM: 
          Subtle background gradients to make the minimalist workspace feel deep and high-end. 
      */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50/60 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[5%] w-[30%] h-[30%] bg-violet-50/50 blur-[100px] rounded-full" />
      </div>

      {/* 1. NAVIGATION BAR */}
      <Navbar />

      <main className="relative">
        
        {/* SECTION 1: HERO */}
        <section id="hero">
          <Hero />
        </section>

        {/* SECTION 2: BENEFITS (Why minimalist thinking works) */}
        <section id="benefits">
          <Benefits />
        </section>
         {/* SECTION 4: FAQ (Overcoming objections about simplicity) */}
        <section id="faq">
          <Faq />
        </section>

        {/* SECTION 5: FINAL CALL TO ACTION */}
        <div className="bg-white">
          <FinalCta />
        </div>
      </main>

      {/* 2. FOOTER */}
      <Footer /> 

      {/* 
          GLOBAL PREMIUM STYLES
          Includes the 'scroll-margin-top' fix to ensure Navbar doesn't cover section headers.
      */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        /* Essential for Fixed Navbars: Prevents section headers from being hidden */
        section {
          scroll-margin-top: 100px;
        }
        
        /* Custom scrollbar for a polished tech aesthetic */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4f46e5; /* Indigo-600 */
        }

        /* Performance: Prevent layout shift */
        img {
          content-visibility: auto;
        }

        /* Smooth reveal animation for sections */
        .animate-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}