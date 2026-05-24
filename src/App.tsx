import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./LandingPage/pages/AppLayout";
import DashboardLayout from "./pages/AppLayout";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./component/ForgotPassword";
import SearchPage from "./component/search";
import NoteInfo from "./pages/NoteInfo";
import Edit from "./pages/Edit";
import ResetPassword from "./component/ResetPassword";
import ProtectedRoute from "./component/ProtectedRoute";

export default function App() {
    return (
        <div className="bg-[#0e0e10] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased min-h-screen">
            <Routes>
                <Route path="/" element={<AppLayout />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/create" element={<Create />} />
                        <Route path="/note/:id" element={<NoteInfo />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <style>{`
        .animate-in {
          animation: page-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes page-reveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #232326;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: rgba(79, 70, 229, 0.4) !important;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.05);
        }
      `}</style>
        </div>
    );
}