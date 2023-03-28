import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import DashBord from "./Components/DashBord";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Admin from "./Components/Admin/Admin";
import Payment from "./Components/Payment/Payment";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashbord" element={<DashBord />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
