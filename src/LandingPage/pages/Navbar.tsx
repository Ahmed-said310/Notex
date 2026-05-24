import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { companyName } from '../data/data';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
  const scrollToSection = (id: any) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Benefits', id: 'benefits' },
    { name: 'FAQ', id: 'faq' }
  ];

  return (
    <nav className="fixed w-full top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          
          {/* Brand Identity */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="text-xl font-black tracking-[0.25em] text-slate-900 uppercase italic">
              {companyName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            
            {/* Primary CTA */}
            <button 
              onClick={() => navigate('/signup')}
              className="bg-slate-900 text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all hover:-translate-y-1 shadow-xl shadow-slate-200 flex items-center gap-2 cursor-pointer"
            >
              Open Notex — It's Free <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-900 p-2 cursor-pointer"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 top-[96px] bg-white z-[90] transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} lg:hidden`}>
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollToSection(link.id)}
              className="text-3xl font-black uppercase tracking-tighter text-slate-900 border-b border-slate-50 pb-6 text-left hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          
          <button 
            onClick={() => navigate('/signup')}
            className="w-full bg-indigo-600 text-white p-7 rounded-3xl text-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 mt-4 shadow-2xl shadow-indigo-100 active:scale-95 transition-transform cursor-pointer"
          >
            Start Writing Free <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;