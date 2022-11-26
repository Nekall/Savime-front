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
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Atoms
import { tokenState } from "./atoms/user";

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
          <Route path="/" element={<Maintenance />} />
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
          {/*<Route path="*" element={<ErrorPage />} />*/}
        </Routes>
      </Router>
    </>
  );
};

export default App;
