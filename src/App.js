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
import { useSelector } from "react-redux";

function App() {
  const isloggedin = useSelector((state) => state.isloggedin);
  console.log(isloggedin);
  //const isloggedin = true;

  return (
    <div>
      {isloggedin && <Navbar />}

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
        {isloggedin && <Route path="/home" element={<HomePage />} />}
        {isloggedin && (
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
