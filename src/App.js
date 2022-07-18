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

function App() {
  return (
    <div>
      <Navbar />

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
        <Route path="/home" element={<HomePage />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
