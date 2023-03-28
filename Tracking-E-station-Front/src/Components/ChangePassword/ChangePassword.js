import React, { useState } from 'react'
import { getSessionUser, updateUser } from '../../Service/UserService';
import './ChangePassword.css'

function ChangePassword({ user, setUser }) {

    // const [user, setUser] = useState({ username: "", email: "", location: "" });
    const [updatedUser, setUpdateUser] = useState({ uid: "", password: "", type: "", name: "", email: "", location: "" });
    const [bool, setBool] = useState(false);
    let [error, setError] = useState({
        errorPassword: "",
        errorRePassword: "",
    });


    //update data api call
    const updateProfile = async () => {
        const response = await updateUser(updatedUser);

        document.getElementById('password').value = "";
        document.getElementById('confirmpassword').value = "";

        if (response.data == "success") {

            document.getElementById("success-box").innerHTML = "Successfully Changed"
            setTimeout(() => {

                document.getElementById("success-box").innerHTML = ""
            }, 4000);
        }

    }


    // var validate = () => {
    //     error = {};
    //     const Passwordregx =
    //       /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    //     if (password == " ") {
    //       setError({ errorPassword: "*Password is required" });
    //       return false;
    //     } else if (!password.match(Passwordregx)) {
    //       setError({
    //         errorPassword: "*Password must be like Abcde@123",
    //       });
    //       return false;
    //     } else {
    //       setError({ errorPassword: "" });
    //     }

    //     if (confirmPassword ==" ") {
    //       setError({ errorRePassword: "*Confirm password is required" });
    //       return false;
    //     } else if (password !== confirmPassword) {
    //       setError({
    //         errorRePassword: "*Password does not match",
    //       });
    //       return false;
    //     } else {
    //       setError({ errorRePassword: "" });
    //       return true;
    //     }
    //   };

    //get user
    const getUser = async () => {
        const response = await getSessionUser();
        setUser(response.data);
    };



    const handleSubmit = (event) => {

        event.preventDefault();
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmpassword').value;


        if ((() => {

            error = {};
            const Passwordregx =
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


            if (password == " ") {
                setError({ errorPassword: "*Password is required" });
                return false;
            } else if (!password.match(Passwordregx)) {
                setError({
                    errorPassword: "*Password must be like Abcde@123",
                });
                return false;
            } else {
                setError({ errorPassword: "" });
            }

            if (confirmPassword == " ") {
                setError({ errorRePassword: "*Confirm password is required" });
                return false;
            } else if (password !== confirmPassword) {
                setError({
                    errorRePassword: "*Password does not match",
                });
                return false;
            } else {
                setError({ errorRePassword: "" });
                return true;
            }
        })()) {

            event.preventDefault();
            updatedUser.uid = user.uid;
            updatedUser.type = user.type;
            updatedUser.password = password;
            updatedUser.confirmPassword = confirmPassword;
            updatedUser.name = user.name;
            updatedUser.email = user.email;
            updatedUser.location = user.location;
            updateProfile();
            getUser();

        }

    }



    return (
        <div class="update-profile">
            <h2 class="update-profile-title text-center">Change Password</h2>
            <form class="update-profile-form" onSubmit={handleSubmit}>

                <div class="form-group-updateprofile">
                    <label class="form-label-updateprofile" htmlFor="email">
                        New Password
                    </label>
                    <input
                        class="form-input-updateprofile"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter New Password"
                    />
                </div>
                <span className="text-danger">{error.errorPassword}</span>


                <div class="form-group-updateprofile">
                    <label class="form-label-updateprofile" htmlFor="email">
                        Confirm Password
                    </label>
                    <input
                        class="form-input-updateprofile"
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder="Enter New Password"
                    />
                </div>
                <span className="text-danger">{error.errorRePassword}</span>
                <div id="success-box"></div>
                <div id="fail-box"></div>
                <button class="form-button-updateprofile" type="submit">
                    Change Password
                </button>
            </form>
        </div>
    )
}

export default ChangePassword