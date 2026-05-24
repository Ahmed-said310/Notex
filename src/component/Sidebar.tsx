import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Menu, 
  LogOut, 
  LifeBuoy, 
  User 
} from "lucide-react";
import List from "./List";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handle_logout = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (!confirm) return;
    localStorage.clear();
    navigate("/");
  };

  const handle_support = () => {
    window.location.href = "mailto:axmedsaid098@gmail.com?subject=Notex%20Support%20Request";
  };

  const userData = localStorage.getItem("user");
  const userName = userData ? JSON.parse(userData) : "User";

  return (
    <>
      {/* 1. MOBILE HEADER - AI Style (ChatGPT/Gemini) */}
      <div className="lg:hidden flex items-center p-3 bg-[#0e0e10] text-white sticky top-0 z-50">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Menu size={22} className="text-slate-300" />
        </button>
        
        <div className="flex-1 text-center pr-10"> {/* Padding to balance the menu button */}
          <span className="font-black tracking-tighter italic uppercase text-sm text-slate-200">Notex</span>
        </div>
      </div>

      {/* 2. OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-[2px] transition-all" 
          onClick={toggleSidebar} 
        />
      )}

      {/* 3. SIDEBAR MAIN BOX */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-[280px] bg-[#171717] text-[#ececec] transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:h-screen lg:min-w-[280px] border-r border-white/5
      `}>
        
        <div className="flex flex-col h-full p-3">
          
          {/* New Insight Button - Top like AI Apps */}
          <button 
            onClick={() => { navigate("/create"); setIsOpen(false); }}
            className="flex items-center gap-3 w-full p-3 mb-2 hover:bg-white/5 rounded-xl transition-all group border border-white/5 hover:border-white/10"
          >
            <div className="p-1 rounded-md bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all">
              <Plus size={18} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold tracking-tight">New Insight</span>
          </button>

          {/* Search Trigger */}
          <button 
            onClick={() => { navigate('/search'); setIsOpen(false); }}
            className="flex items-center gap-3 w-full p-3 mb-6 hover:bg-white/5 rounded-xl transition-all text-slate-400 group"
          >
            <Search size={18} />
            <span className="text-sm font-medium">Search history</span>
          </button>

          {/* Scrollable History Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 ml-2">
              Recent Activity
            </h3>
            <List onNavigate={() => setIsOpen(false)} />
          </div>

          {/* Footer Section: Support & Profile */}
          <div className="mt-auto space-y-1 pt-4 border-t border-white/5">
            
            {/* Support Button */}
            <button 
              onClick={handle_support}
              className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl transition-all text-slate-300 group"
            >
              <LifeBuoy size={18} className="group-hover:text-indigo-400" />
              <span className="text-sm font-semibold">Help & Support</span>
            </button>

            {/* Profile & Logout */}
            <div className="flex items-center justify-between p-2 mt-2 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                  <User size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white leading-none mb-1 uppercase tracking-tighter italic">
                    {userName}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Pro Account</span>
                </div>
              </div>
              <button 
                onClick={handle_logout}
                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-500 transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #444; }
      `}</style>
    </>
  );
}