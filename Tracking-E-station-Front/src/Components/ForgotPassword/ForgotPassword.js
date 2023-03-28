import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { changeForgotPassword, checkEmailforForgotPassword } from '../../Service/UserService';
import emailjs from "emailjs-com"
import "./ForgotPassword.css"

function ForgotPassword() {

  const [email, setEmail] = useState();
  const [bool, setBool] = useState(false)
  const [myotp, setMyotp] = useState(0)
  const [openconfirmotp, setOpenConfirmOtp] = useState(false)
  const [confirmotpbool, setConfirmOtpBool] = useState(false)

  const navigate = useNavigate();

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await checkEmailforForgotPassword(email);

    e.target.otp.value = getRandomInt(1000, 9999);
    setMyotp(e.target.otp.value);

    if (response.data == "found") {

      localStorage.setItem("myemail", email);

      emailjs.sendForm('service_gasa60i', 'template_j2npq0d', e.target, 'zIrtERkAxlmUpkrW7').then(res => {
        document.getElementById("success-box-1").innerHTML = "Check your email for OTP"
        setTimeout(() => {

          document.getElementById("success-box-1").innerHTML = ""

          setOpenConfirmOtp(!openconfirmotp);
        }, 4000); 



      }).catch(err => {
      })

    } else {

      document.getElementById("fail-box-1").innerHTML = "email address not found in database"
      setTimeout(() => {

        document.getElementById("fail-box-1").innerHTML = " "
      }, 4000);

    }

    setBool(!bool)
  }

  const handleChange = (e) => {

    setEmail(e.target.value);
  

  }

  const handleSubmitConfirmOTP =(e)=>{
    e.preventDefault();
   if (e.target.confirmOTP.value == myotp){
       setOpenConfirmOtp(!openconfirmotp)
      setConfirmOtpBool(!confirmotpbool);
   } else {
    document.getElementById("fail-box-1").innerHTML = "Wrong OTP. Please enter correct OTP"
    setTimeout(() => {

      document.getElementById("fail-box-1").innerHTML = " "
    }, 4000);
   }
  }

  const ChangePassword = async(password)=>{

    const response = await changeForgotPassword(localStorage.getItem("myemail"),password);
    if(response.data == "sucess"){
      localStorage.removeItem("myemail");
      document.getElementById("success-box-1").innerHTML = "Password changed successfully"
      setTimeout(() => {

        navigate('/Signin');
       
      }, 2000);
    }else{

      document.getElementById("fail-box-1").innerHTML = "Something went wrong!"
    setTimeout(() => {

      document.getElementById("fail-box-1").innerHTML = " "
    }, 4000);
    }


  }


  const handleConfirmPassword=(e)=>{
    e.preventDefault();
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;
    if(password == confirmPassword){
      ChangePassword(password);
    }else{

      document.getElementById("fail-box-1").innerHTML = "Both passwords should match!"
      setTimeout(() => {
  
        document.getElementById("fail-box-1").innerHTML = " "
      }, 4000);
    }

  }



  useEffect(() => {
    getRandomInt(1000, 9999);
  }, [bool])


  const showSetNewPasswordform = () => {

    return (
      <div style={{ minHeight: "100vh", minWidth: "700px", height: "auto" }}>

        <div className="container-signin">
          <h2>Set New Password</h2>
          <form onSubmit={handleConfirmPassword}>

            <div className="mt-3 d-flex flex-column justify-content-center">
              <label htmlFor="email">New Password</label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="New Password"
                onChange={handleChange}
                className="form-control shadow-none"
              />

              <label htmlFor="email">Confirm Password</label>
              <input
                name="confirmpassword"
                id="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="form-control shadow-none"
              />
            </div>

            <div id="success-box-1"></div>
            <div id="fail-box-1"></div>
            <div className="w-100 d-flex justify-content-center align-items-center mt-3">
            <div id="fail-box-1"></div>
              <button
                type="submit"
                style={{ backgroundColor: "green", color: "white" }}
                id="signbtn"
                className="btn w-50"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }


  const showConfirmOTPform = () => {


    return (
      <div style={{ minHeight: "100vh", minWidth: "700px", height: "auto" }}>

        <div className="container-signin">
          <h2>Confirm OTP</h2>
          <form onSubmit={handleSubmitConfirmOTP}>

            <div className="mt-3 d-flex flex-column justify-content-center">
              <label htmlFor="email">Enter OTP</label>
              <input
                name="confirmOTP"
                type="password"
                placeholder="Enter OTP"
                onChange={handleChange}
                className="form-control shadow-none"
              />
            </div>

            <div id="success-box-1"></div>
            <div id="fail-box-1"></div>
            <div className="w-100 d-flex justify-content-center align-items-center mt-3">
              <button
                type="submit"
                style={{ backgroundColor: "green", color: "white" }}
                id="signbtn"
                className="btn w-50"
              >
                Confirm OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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

        {
          openconfirmotp == true ? showConfirmOTPform() : confirmotpbool == true ? showSetNewPasswordform() :

            <div>
              <div className="container-signin">
                <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
                  Forgot Password?
                </h1>
                <form onSubmit={handleSubmit}>

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

                  <input hidden
                    name="otp"
                    type="hidden"
                    className="form-control shadow-none"
                  />
                  <p className="signup-link-signin">
                    Don't have an account? <a href="/Signup">Sign Up</a>
                  </p>
                  <div id="success-box-1"></div>
                  <div id="fail-box-1"></div>
                  <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                    <button
                      type="submit"
                      style={{ backgroundColor: "green", color: "white" }}
                      id="signbtn"
                      className="btn w-50"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
              </div>
            </div>

        }
      </div>
    </div>
  )
}


export default ForgotPassword