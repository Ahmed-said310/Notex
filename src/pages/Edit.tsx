import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Check, 
  Loader2, 
  AlertCircle, 
  PenTool, 
  FileText,
  History
} from "lucide-react";
import Fetch from "../api/fetch";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const fetchNote = async () => {
    setFetching(true);
    try {
      const res = await Fetch(`task/${id}`);
      setTitle(res.title);
      setDescription(res.description);
    } catch (err: any) {
      setError(err.message || "Failed to retrieve the note.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (title.trim() === "" || description.trim() === "") {
      setError("Please ensure both fields are refined before saving.");
      setLoading(false);
      return;
    }

    try {
      const res = await Fetch(`task/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
      });
      // Navigate to the note info after successful update
      if(res.ok){
        console.log('edited succesfully')
      }
      navigate(`/note/${id}`);
    } catch (err: any) {
      setError("Update failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Syncing Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col max-w-3xl mx-auto px-4">
      {/* 1. HEADER NAVIGATION */}
      <div className="flex items-center justify-between mb-10 sticky top-0 bg-[#0e0e10]/80 backdrop-blur-md py-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <History size={16} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Edit Mode</span>
        </div>

        <button 
          onClick={handle_submit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-slate-200 disabled:bg-slate-500 text-sm font-black rounded-xl transition-all shadow-xl active:scale-95"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Check size={16} strokeWidth={3} />
          )}
          <span>{loading ? "Updating..." : "Done"}</span>
        </button>
      </div>

      {/* 2. ERROR NOTIFICATION */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 animate-in">
          <AlertCircle size={18} />
          <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
        </div>
      )}

      {/* 3. EDITABLE CONTENT AREA */}
      <div className="flex-1 space-y-8">
        {/* Title Input */}
        <div className="group relative border-l-2 border-transparent focus-within:border-indigo-500 transition-all pl-6">
          <label className="absolute -top-6 left-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">Headline</label>
          <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 bg-[#0e0e10] p-1 text-slate-700 group-focus-within:text-indigo-500 transition-colors">
            <PenTool size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Note Title" 
            className="w-full bg-transparent text-3xl lg:text-5xl font-black text-white placeholder:text-slate-800 border-none focus:ring-0 transition-all"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Textarea */}
        <div className="group relative border-l-2 border-transparent focus-within:border-indigo-500/50 transition-all pl-6">
           <label className="absolute -top-6 left-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">Body</label>
          <div className="absolute left-[-10px] top-4 bg-[#0e0e10] p-1 text-slate-700 group-focus-within:text-indigo-500 transition-colors">
            <FileText size={18} />
          </div>
          <textarea 
            placeholder="Expand your thoughts..." 
            className="w-full bg-transparent text-lg text-slate-400 placeholder:text-slate-800 border-none focus:ring-0 min-h-[400px] resize-none leading-relaxed"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* 4. FOOTER STATUS */}
      <footer className="py-8 border-t border-white/5 mt-10">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] text-center italic">
          Drafting Excellence since 2026
        </p>
      </footer>
    </div>
  );
}