import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Lock, 
  ShieldCheck, 
  Loader2, 
  AlertCircle, 
  KeyRound, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import Fetch from "../api/fetch";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [valid, setValid] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  async function TestLink() {
    setVerifying(true);
    try {
      const res = await Fetch(`reset/password?resetLink=${encodeURIComponent(token || "")}`);
      if (res.ok) {
        setValid(true);
      } else {
        setError("This recovery link is invalid or has expired.");
      }
    } catch (err: any) {
      setError("Security token verification failed.");
    } finally {
      setVerifying(false);
    }
  }

  useEffect(() => {
    TestLink();
  }, [token]);

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.trim() === "" || confirmPassword.trim() === "") {
      setError("Please complete all security fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }
    if (password.length < 6) {
      setError("Security requirement: Minimum 6 characters.");
      return;
    }
    if (!valid) {
      setError("Cannot proceed with an invalid token.");
      return;
    }

    try {
      setLoading(true);
      const res = await Fetch("reset-password", {
        method: "POST",
        body: JSON.stringify({
          resetLink: token,
          newPassword: password
        })
      });
      if (res.ok) {
        navigate("/login"); // Redirect to login after success
      }
    } catch (err: any) {
      setError("Update failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // State 1: Verifying the Token
  if (verifying) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Verifying Identity</p>
      </div>
    );
  }

  // State 2: Invalid Token UI
  if (!valid && !verifying) {
    return (
      <div className="min-h-[80vh] flex flex-center justify-center items-center px-6 text-center">
        <div className="max-w-sm space-y-6 animate-in">
          <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Link Expired</h2>
          <p className="text-slate-500 text-sm">The password reset link is no longer valid. For security reasons, recovery links expire quickly.</p>
          <button onClick={() => navigate("/forgot-password")} className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-500 mb-2">
            <KeyRound size={28} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Set New Password</h2>
          <p className="text-slate-500 text-sm font-medium">Ensure your new password is secure and unique.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={18} />
            <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        <form onSubmit={handle_submit} className="space-y-4">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="New Password" 
              className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className="relative group">
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
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
                <span>Update Password</span>
                <ArrowRight size={18} strokeWidth={3} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}