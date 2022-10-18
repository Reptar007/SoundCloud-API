import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import SongCreateButton from "./CreateSong/SongCreateButton";
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <SongCreateButton user={user} />
      <div className="profile-btn">
        <button onClick={openMenu}>
          <i className="fas fa-user-circle fa-2x" />
        </button>
        {showMenu && (
          <div className="profile-dropdown">
            <p>
              Hello <span className="quackster">Quackster!</span> <br />
              Username: <br />
              <span className="username">{user.username}</span>
            </p>
            <NavLink className='dropdownNav' to={`/${user.id}/songs`}>Profile</NavLink>
            <p className='logoutNav' onClick={logout}>Log Out</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
