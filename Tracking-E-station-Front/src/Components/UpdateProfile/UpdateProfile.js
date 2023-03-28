import React, { useEffect, useState } from "react";
import { getSessionUser, updateUser } from "../../Service/UserService";

import "./UpdateProfile.css";

function UpdateProfile({user, bool, setBool}) {

  // const [user, setUser] = useState({ username: "", email: "", location: "" });
  const [updatedUser, setUpdateUser] = useState({uid:"", password: "", type:"", name: "", email: "", location: ""});


   //update data api call
   const updateProfile = async()=>{
    const response = await updateUser(updatedUser);

    console.log(response.data);

    if(response.data === "success"){
      document.getElementById("success-box").innerHTML = "Successfully Updated"
      setTimeout(() => {

          document.getElementById("success-box").innerHTML = ""
      }, 4000);
    }
    setBool(!bool);

  }

  //get user
  // const getUser = async () => {
  //   const response = await getSessionUser();
  //   setUser(response.data);
  // };



  
  const handleSubmit = (event) => {
    event.preventDefault();
    updatedUser.uid = user.uid;
    updatedUser.type = user.type;
    updatedUser.password = user.password;
    // updatedUser.confirmPassword = "";
    updatedUser.name = document.getElementById('name').value;
    updatedUser.email = document.getElementById('email').value;
    updatedUser.location = document.getElementById('location').value;
    updateProfile();
    
  };

  useEffect(()=>{

  },[bool])

  return (

    <div class="update-profile">
      <h2 class="update-profile-title text-center">Update Profile</h2>
      <form class="update-profile-form" onSubmit={handleSubmit}>

      <div class="form-group-updateprofile">
          <label class="form-label-updateprofile" htmlFor="email">
            Name
          </label>
          <input
            class="form-input-updateprofile"
            type="text"
            id="name"
            name="name"
            placeholder="Enter email"
           defaultValue={user.name}
          />
        </div>

        <div class="form-group-updateprofile">
          <label class="form-label-updateprofile" htmlFor="email">
            Email Id
          </label>
          <input
            class="form-input-updateprofile"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            defaultValue={user.email}
          />
        </div>
        {/* <p className="validate">{formErrors.email}</p> */}

        <div class="form-group-updateprofile">
          <label class="form-label-updateprofile" htmlFor="email">
            City
          </label>
          <input
            class="form-input-updateprofile"
            type="text"
            id="location"
            name="location"
            autoComplete="off"
            placeholder="Enter City"
            defaultValue={user.location}
          />
        </div>

        <div id="success-box"></div>  
        <button class="form-button-updateprofile" type="submit">

          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
