import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SignUpForm from "./Components/SignUpForm";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import HomePage from "./Components/HomePage";
import UpdateProfile from "./Components/UpdateProfile";
import ForgotPassword from "./Components/ForgotPassword";
import AuthContext from "./Store/AuthContext";
import { useContext } from "react";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      {authCtx.isloggedin && <Navbar />}

      <Routes>
        <Route
          path="/signup"
          element={
            <div className="sign-up">
              <SignUpForm />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="sign-up">
              <LoginForm />
            </div>
          }
        />
        {authCtx.isloggedin && <Route path="/home" element={<HomePage />} />}
        {authCtx.isloggedin && (
          <Route path="/updateprofile" element={<UpdateProfile />} />
        )}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="*"
          element={
            <div className="sign-up">
              <LoginForm />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
