import { useNavigate } from "react-router-dom";
import { hero } from "../data/data";
import { ArrowRight, Sparkles, Feather } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 hidden w-1/3 h-full bg-slate-50 lg:block -z-10" />

      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
          
          {/* CONTENT COLUMN */}
          <div className="w-full text-center lg:w-1/2 lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
              <Sparkles size={16} className="fill-indigo-600 text-indigo-600" />
              <span>100% Free Minimalist Workspace</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.1]">
              {hero.headline}
            </h1>

            <p className="max-w-xl mt-6 text-lg leading-relaxed text-slate-600 mx-auto lg:mx-0 sm:text-xl">
              {hero.subHeadline}
            </p>

            <div className="flex flex-col gap-4 mt-10 sm:flex-row sm:justify-center lg:justify-start">
              <button 
                className="flex items-center justify-center gap-3 px-8 py-4 text-lg font-black text-white transition-all duration-300 rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95 shadow-xl shadow-indigo-600/20 cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                {hero.ctaText}
                <ArrowRight size={22} />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-slate-500 font-semibold px-4 py-2">
                <Feather size={20} className="text-indigo-500" />
                <span>Built for Thinkers</span>
              </div>
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div className="relative w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.01]">
              <img 
                src={hero.image} 
                alt="Notex Minimalist Dashboard Preview" 
                className="object-cover w-full h-[300px] sm:h-[450px] lg:h-[650px]"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
            </div>

            {/* Floating Value Proposition Card */}
            <div className="absolute -bottom-6 -left-6 z-20 hidden lg:block">
              <div className="p-6 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-5">
                <div className="flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Feather size={32} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">Pure Focus</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">No Distractions</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}