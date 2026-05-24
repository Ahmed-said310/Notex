import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Loader2, 
  AlertCircle, 
  Sparkles
} from "lucide-react";
import Fetch from "../api/fetch";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
        setError("Every field is essential to your new journey.");
        setLoading(false);
        return;
      }
      if(password.length < 6) {
        setError("For security, your password must be at least 6 characters.");
        setLoading(false);
        return;
      }
      const res = await Fetch("signup", {
        method: "POST",
        body: JSON.stringify({
          name: username,
          password,
          email
        })
      });

      if (res.token) {
        localStorage.setItem("accesBrowserTotheENDUSERS", res.token);
        localStorage.setItem("MainREfreshPageEND", res.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/"); // Redirect to dashboard after successful signup
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/5 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in">
        {/* Branding Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-[1px]">
            <div className="w-full h-full bg-[#0e0e10] rounded-[15px] flex items-center justify-center">
              <UserPlus className="text-white" size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">
            Get Started
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Join the premium community of organized thinkers.
          </p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={18} />
            <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        {/* Inputs Section */}
        <form onSubmit={handle_submit} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

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

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="Create Password" 
              className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/40 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full group flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/10 active:scale-95"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <span>Create Account</span>
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Alternative Actions */}
        <div className="text-center space-y-4">
          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Or</span>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>

          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            Already registered?{" "}
            <Link to="/login" className="text-white hover:text-indigo-400 transition-colors underline underline-offset-8 decoration-indigo-500/30">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}