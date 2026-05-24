import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import Fetch from "../api/fetch";

export default function Login() {
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
      if (email.trim() === "" || password.trim() === "") {
        setError("Please enter your credentials to continue.");
        setLoading(false);
        return;
      }

      const res = await Fetch("login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Storage logic
      localStorage.setItem("accesBrowserTotheENDUSERS", res.token);
      localStorage.setItem("MainREfreshPageEND", res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));

    return navigate("/create"); // Redirect to home/dashboard
    } catch (error: any) {
      setError("Authentication failed. Please check your email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 mb-4">
            <ShieldCheck className="text-indigo-500" size={32} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Access your secure notebook and insights.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={18} />
            <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handle_submit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-[#131314] border border-white/5 focus:border-indigo-500/50 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 transition-all outline-none" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="flex justify-end px-2">
              <Link to="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black hover:bg-slate-200 disabled:bg-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center pt-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:text-indigo-400 underline-offset-4 hover:underline transition-all">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}