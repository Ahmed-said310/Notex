import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, MessageSquare, MoreHorizontal } from "lucide-react";
import Fetch from "../api/fetch";

export default function List({ onNavigate }: { onNavigate?: () => void }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await Fetch("tasks");
        setNotes(res);
      } catch (err: any) {
        setError(err);
        if (err === 'Invalid token') {
          window.location.href = '/login'
          console.log('Invalid token. Please login again.');
          return;
        }
        console.error("Error fetching notes:", err);
      }
      finally {
        setLoading(false)
      }
    };
    fetchNotes();
  }, []);
  {
    error && (
      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 animate-in">
        <AlertCircle size={20} className="flex-shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    )
  }
  
    if (loading) {
      return (
        <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
        </div>
      );
    }
  return (
    <ul className="space-y-1">
      {notes.map((note: any) => (
        <li key={note._id}>
          <button
            onClick={() => {
              navigate(`/note/${note._id}`);
              if (onNavigate) onNavigate(); // Xir Sidebar-ka mobile-ka
            }}
            className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-[#1a1b1e] transition-all group text-left border border-transparent hover:border-white/5"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <MessageSquare size={16} className="text-slate-500 group-hover:text-indigo-400 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-100 truncate">
                {note.title || "Untitled Notebook"}
              </span>
            </div>
            <MoreHorizontal size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </li>
      ))}
    </ul>
  );
}