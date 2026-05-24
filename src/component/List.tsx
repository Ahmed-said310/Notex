import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, MoreHorizontal } from "lucide-react";
import Fetch from "../api/fetch";

export default function List({ onNavigate }: { onNavigate?: () => void }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await Fetch("tasks");
        setNotes(res);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <ul className="space-y-1">
      {notes.map((note: any) => (
        <li key={note.id}>
          <button 
            onClick={() => { 
                navigate(`/note/${note._id}`); 
                if(onNavigate) onNavigate(); // Xir Sidebar-ka mobile-ka
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