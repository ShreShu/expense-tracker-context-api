import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SignUpForm from "./Components/SignUpForm";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="sign-up">
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;
