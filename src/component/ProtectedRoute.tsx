import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Waxaan hubineynaa haddii xogta qofku ay ku jirto localStorage
  let isAuthenticated = false;
    if(localStorage.getItem("accesBrowserTotheENDUSERS") || localStorage.getItem("user") || localStorage.getItem("MainREfreshPageEND")) {
      isAuthenticated = true;
    }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;