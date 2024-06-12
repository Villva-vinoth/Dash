import React, { useState } from 'react';
import './css/Header.css';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const nav = useNavigate();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  return (
    <div className='header'>
      <div className='logo'>
        LOGO
      </div>
      <div className='profile'>
        <CgProfile className='profile-icon' onClick={toggleProfileMenu} />
        {profileMenuVisible && (
          <div className='profile-menu'>
            <div className='profile-menu-item' onClick={() => {nav('/admin/profile');setProfileMenuVisible(false)}}>Profile</div>
            <div className='profile-menu-item' onClick={() => {nav('/');localStorage.removeItem()}}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
