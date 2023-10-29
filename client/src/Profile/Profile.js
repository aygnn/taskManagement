import React, { useEffect } from "react";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div>
    
      <div id="user-profile">
        <div class="profile">
          <div class="profile-left">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" />
            <h3 class="profile-username">{user?.username}</h3>
            <h5 class="profile-email">{user?.email}</h5>
          </div>
          <div class="profile-right">
            <div class="head">
              <h4 class="info">Information</h4>
              <hr />
            </div>
            <div class="emailname">
              <div class="name">
                <h4 class="emailname-h4">Username</h4>
                <p class="emailname-p">{user?.username}</p>
              </div>
              <div class="email">
                <h4 class="emailname-h4">Email</h4>
                <p class="emailname-p">{user?.email}</p>
              </div>
            </div>
            <div class="head">
              <h4 class="info">Company and Adress</h4>
              <hr />
            </div>
            <div class="emailname">
              <div class="email">
                <h4 class="emailname-h4">Company</h4>
                <p class="emailname-p gowish">{user?.companyName}</p>
              </div>
              <div class="name">
                <h4 class="emailname-h4">Adress</h4>
                <p class="emailname-p gobasket">{user?.adress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
         
    </div>
  );
}
