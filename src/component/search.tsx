import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Fetch from "../api/fetch";
import { Search, X, Loader2 } from "lucide-react";

interface Note {
    _id: string;
    title: string;
    description: string;
}

function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export default function SearchPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function searchNotes(term: string) {
        if (!term.trim()) {
            setResults([]);
            setSearched(false);
            return;
        }
        setLoading(true);
        setSearched(true);
        try {
            const res = await Fetch(`search?query=${encodeURIComponent(term)}`);
            setResults(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const debouncedSearch = useCallback(debounce(searchNotes, 500), []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setQuery(val);
        debouncedSearch(val);
    }

    function clearSearch() {
        setQuery("");
        setResults([]);
        setSearched(false);
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            {/* Input */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search notes..."
                    className="input input-bordered w-full pl-9 pr-9"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* States */}
            {loading && (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-primary" size={24} />
                </div>
            )}

            {!loading && searched && results.length === 0 && (
                <p className="text-center text-gray-500 py-8">No notes found for "{query}"</p>
            )}

            {!loading && results.length > 0 && (
                <ul className="space-y-2">
                    {results.map((note) => (
                        <li
                            key={note._id}
                            onClick={() => navigate(`/note/${note._id}`)}
                            className="p-4 border border-base-300 rounded-xl cursor-pointer hover:bg-base-200 transition-all"
                        >
                            <h3 className="font-bold text-sm">{note.title}</h3>
                            <p className="text-gray-500 text-xs line-clamp-2 mt-1">{note.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}