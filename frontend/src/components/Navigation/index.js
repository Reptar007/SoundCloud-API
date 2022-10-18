import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />
  } else {
    sessionLinks = (
      <div className="loginSignup">
        <LoginFormModal />
        <SignUpFormModal />
      </div>
    );
  }

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <NavLink exact to="/">
            <img src="https://i.imgur.com/i9i0UBU.png" alt="" />
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
