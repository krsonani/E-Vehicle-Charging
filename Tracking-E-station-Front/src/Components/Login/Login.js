import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../Service/UserService";

const Login = () => {
  var navigate = useNavigate();
  var [errorEmail, setEmail] = useState("");
  var [errorPassword, setPassword] = useState("");

  let [data, setData] = useState();

  var handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  var handleSubmit = async (event) => {
    event.preventDefault();
    await getUserData(data).then((response) => {
      if (response.status === 200) {  
        setEmail("");
        setPassword("");
        
        sessionStorage.setItem("jwtToken", "Bearer " + response.data.jwtToken);
        if (response.data.user.type !== "admin") {
          navigate(`/dashbord`);
        } else {
          navigate(`/admin`);
        }
      }
    }).catch((error) => {
      setEmail("*invalid Email");
      setPassword("*invalid Password");
    });
  
  };

  return (
    <div style={{ minHeight: "100vh", minWidth: "700px", height: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "6fr 6fr",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="signInImage">
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <h1 style={{ textShadow: "1px 1px #2c3e50" }}>
              E-Vehicle Charging
            </h1>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Join now and track e-vehicle charging station and book your slot in advance!
            </p>
          </div>
        </div>
        <div>
          <div className="container-signin">
            <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
              Sign In
            </h1>
            <form onSubmit={handleSubmit}>
              {/* <div className="mt-4 d-flex justify-content-center align-items-center w-100">
                <select
                  aria-label="Default select example"
                  name="type"
                  onChange={handleChange}
                  className="form-control shadow-none w-50"
                >
                  <option>Signin As</option>
                  <option value="user">User</option>
                  <option value="vendor">Ecstation</option>
                  <option value="admin">admin</option>
                </select>
              </div> */}
              <div className="mt-3 d-flex flex-column justify-content-center">
                <label htmlFor="email">Email-Id</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email-Id"
                  onChange={handleChange}
                  className="form-control shadow-none"
                />
              </div>
              <span className="text-danger">{errorEmail}</span>
              <div className="mt-3 d-flex flex-column justify-content-center">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                  className="form-control shadow-none"
                />
              </div>
              <span className="text-danger">
                {errorPassword}
              </span>
              <p className="signup-link-signin">
              Don't have an account? <Link to='/Signup'> Sign Up </Link> 
              </p>

              <p className="signup-link-signin">
             <Link to='/forgot-password'> Forgot Password? </Link>  
              </p>

              <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                <button
                  type="submit"
                  style={{ backgroundColor: "green", color: "white" }}
                  id="signbtn"
                  className="btn w-50"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
