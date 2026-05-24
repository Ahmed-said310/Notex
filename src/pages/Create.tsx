import { useState } from "react";
import { 
  Sparkles, 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertCircle, 
  Type, 
  AlignLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Fetch from "../api/fetch";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (title.trim() === "" || description.trim() === "") {
        setError("Please fill in all fields to capture your insight.");
        setLoading(false);
        return;
      }

      const res = await Fetch("create/task", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
      if(res.ok){
        console.log('created succesfully')
      }
      // Show success and redirect
      navigate("/"); 
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col max-w-3xl mx-auto">
      {/* 1. TOP NAVIGATION BAR (Mobile First) */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0e0e10]/80 backdrop-blur-md py-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-500" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">New Entry</span>
        </div>

        <button 
          onClick={handle_submit}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          <span>{loading ? "Saving..." : "Save"}</span>
        </button>
      </div>

      {/* 2. ERROR STATE */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 animate-in">
          <AlertCircle size={20} className="flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* 3. INPUT AREA (Psychology: Clean Focus) */}
      <div className="flex-1 space-y-6">
        <div className="group relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors">
            <Type size={20} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Insight Title..." 
            className="w-full bg-transparent text-3xl lg:text-4xl font-black text-white placeholder:text-slate-700 border-none focus:ring-0 pl-10 transition-all"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="relative min-h-[300px]">
          <div className="absolute left-0 top-1 text-slate-600 group-focus-within:text-indigo-500 transition-colors">
            <AlignLeft size={20} />
          </div>
          <textarea 
            placeholder="Start writing your thoughts here..." 
            className="w-full bg-transparent text-lg text-slate-300 placeholder:text-slate-700 border-none focus:ring-0 pl-10 resize-none leading-relaxed"
            rows={15}
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* 4. KEYBOARD SHORTCUT HINT (Premium Detail) */}
      <div className="mt-auto py-6 text-center lg:text-left">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Tip: Great ideas come from clear structure. Use short paragraphs.
        </p>
      </div>
    </div>
  );
}