import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0e0e10] text-[#ececec] selection:bg-indigo-500/30">
      
      {/* SIDEBAR: Wuxuu ahaanayaa mid go'an dhinaca bidix */}
      <Sidebar />

      {/* MAIN CONTENT AREA: Halkan ayay boggaga kale ka soo baxayaan (Outlet) */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto custom-scrollbar">
        
        {/* Ambient Glow Background (Optional for Premium Feel) */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-indigo-600/5 blur-[120px] -z-10 pointer-events-none" />

        {/* Dynamic Content */}
        <div className="flex-1 w-full max-w-5xl mx-auto py-6 lg:py-10">
          <Outlet />
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #232326; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #2d2d30; }
      `}</style>
    </div>
  );
}