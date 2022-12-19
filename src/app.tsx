import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue } from "recoil";

// Pages
//import Home from "./pages";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Maintenance from "./pages/Maintenance";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

// Atoms
import { tokenState } from "./atoms/user";

// Env
const { REACT_APP_MAINTENANCE } = process.env;
const maintenanceMode = REACT_APP_MAINTENANCE
  ? JSON.parse(REACT_APP_MAINTENANCE)
  : false;

const App = () => {
  const token = useRecoilValue(tokenState);

  interface AppProps {
    token: any;
    children: any;
  }

  const ProtectedRoute = ({ token, children }: AppProps) => {
    if (!token) {
      return <Navigate to="/connexion" replace />;
    }

    return children;
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={maintenanceMode ? <Maintenance /> : <Home />}
          />
          <Route path="/concept" element={<LandingPage />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Signup />} />
          <Route
            path="/tableau-de-bord"
            element={
              <ProtectedRoute token={token}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
          <Route
            path="/reinitialisation-mot-de-passe/:token"
            element={<ResetPassword />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/panneau-administrateur" element={<AdminPanel />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
