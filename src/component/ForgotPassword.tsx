import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  Send,
  CheckCircle2,
  Fingerprint
} from "lucide-react";
import Fetch from "../api/fetch";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (email.trim() === "") {
        setError("Please provide your registered email address.");
        setLoading(false);
        return;
      }

      const res = await Fetch("forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsSent(true);
      }
    } catch (err: any) {
      setError("We couldn't process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS STATE: Markii Email-ka la diro
  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6 animate-in">
          <div className="mx-auto w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center justify-center text-green-500 mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Check your inbox</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We've sent a recovery link to <span className="text-white font-bold">{email}</span>. 
            Follow the instructions to reset your password.
          </p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in">
        {/* Navigation back */}
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Login</span>
        </button>

        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-500">
            <Fingerprint size={28} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Recover Account</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Enter your email and we'll send you a secure link to regain access to your notes.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={18} />
            <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        <form onSubmit={handle_submit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black hover:bg-slate-200 disabled:bg-slate-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <span>Send Reset Link</span>
                <Send size={16} strokeWidth={3} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}