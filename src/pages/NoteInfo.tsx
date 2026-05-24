import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock, 
  Loader2,
  AlertCircle
} from "lucide-react";
import Fetch from "../api/fetch";

interface Note {
  title: string;
  description: string;
  createdAt?: string; // Haddii backend-kaagu soo dirayo taariikhda
}

export default function NoteInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const res = await Fetch(`task/${id}`);
        setNote(res);
      } catch (err: any) {
        setError(err.message || "The note you are looking for does not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this insight?")) {
      try {
        await Fetch(`task/${id}`, { method: "DELETE" });
        navigate("/"); // Redirect to dashboard
      } catch (err) {
        alert("Action failed. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">Retrieving Insight</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-black text-white uppercase italic mb-2">Error Encountered</h2>
        <p className="text-slate-500 text-sm max-w-xs">{error}</p>
        <button onClick={() => navigate("/")} className="mt-6 text-indigo-500 font-bold text-xs uppercase tracking-widest border-b border-indigo-500/30 pb-1">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 lg:px-8 py-6">
      {/* 1. TOP TOOLBAR */}
      <div className="flex items-center justify-between mb-12 sticky top-0 bg-[#0e0e10]/80 backdrop-blur-md py-4 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
        </button>

        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={() => navigate(`/edit/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-all border border-white/5"
          >
            <Edit3 size={16} />
            <span className="text-xs font-bold hidden md:block">Edit Note</span>
          </button>
          
          <button 
            onClick={handleDelete}
            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* 2. CONTENT AREA (Reader Optimized) */}
      {note && (
        <article className="animate-in">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-slate-600">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <Calendar size={12} />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-white">{note.createdAt?.split('T')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter">
              <Clock size={12} />
              <span>3 min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-black text-white leading-[1.1] mb-10 tracking-tight">
            {note.title}
          </h1>

          {/* Description / Body */}
          <div className="prose prose-invert prose-slate max-w-none">
            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed whitespace-pre-wrap font-medium">
              {note.description}
            </p>
          </div>
        </article>
      )}

      {/* 3. FOOTER ACTIONS */}
      <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center space-y-6">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
        <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">
          End of Insight
        </p>
      </footer>
    </div>
  );
}