import React, { useState } from 'react';
import './css/NavBar.css';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaUser, FaCarAlt} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosPricetags } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const NavBar = () => {
  const nav = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [subMenuVisible, setSubMenuVisible] = useState({});

  const toggleSubMenu = (index) => {
    setSubMenuVisible(prevState => ({ ...prevState, [index]: !prevState[index] }));
  };

  return (
    <div className='side-bar'>
      <div>
        <h3 className='side-bar-header'>Admin</h3>
        <ul>
          <li 
            onClick={() => { nav('/admin'); setActiveIndex(0); }} 
            className={activeIndex === 0 ? "Admin-navigation-cn" : ""}
          >
            <div className='menu-select'><MdDashboard />Dashboard</div>
          </li>
          <li 
            onClick={() => { toggleSubMenu(1); setActiveIndex(1); }} 
            className={activeIndex === 1 ? "Admin-navigation-cn" : ""}
          >
            <div className='menu-item'>
             <div className='menu-select'> <FaUser />User</div>
              {subMenuVisible[1] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {subMenuVisible[1] && (
              <ul className='sub-menu'>
                <li onClick={() => nav('/admin/users/add')}>Add User</li>
                <li onClick={() => nav('/admin/users/drivers')}>All Drivers</li>
                <li onClick={() => nav('/admin/users/riders')}>All Riders</li>

              </ul>
            )}
          </li>

          <li 
            onClick={() => { toggleSubMenu(2); setActiveIndex(2); }} 
            className={activeIndex === 2 ? "Admin-navigation-cn" : ""}
          >
            <div className='menu-item'>
             <div className='menu-select'> <IoIosPricetags />Pricing</div>
              {subMenuVisible[2] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {subMenuVisible[2] && (
              <ul className='sub-menu'>
                <li onClick={() => nav('/admin/pricing/add')}>Add Pricing</li>
                <li onClick={() => nav('/admin/pricing/manage')}>Manage pricing</li>
              </ul>
            )}
          </li>
          <li 
            onClick={() => { toggleSubMenu(3); setActiveIndex(3); }} 
            className={activeIndex === 3 ? "Admin-navigation-cn" : ""}
          >
            <div className='menu-item'>
             <div className='menu-select'> <FaCarAlt />cab</div>
              {subMenuVisible[3] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {subMenuVisible[3] && (
              <ul className='sub-menu'>
                <li onClick={() => nav('/admin/cab/add')}>Add cab</li>
                <li onClick={() => nav('/admin/cab/manage')}>Manage cab</li>
              </ul>
            )}
          </li>
          <li 
            onClick={() => { toggleSubMenu(4); setActiveIndex(4); }} 
            className={activeIndex === 4 ? "Admin-navigation-cn" : ""}
          >
            <div className='menu-item'>
             <div className='menu-select'> <FaCircleDollarToSlot />Subcription</div>
              {subMenuVisible[4] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {subMenuVisible[4] && (
              <ul className='sub-menu'>
                <li onClick={() => nav('/admin/subcription/driver')}>Driver</li>
                <li onClick={() => nav('/admin/subcription/rider')}>Rider</li>

                <li onClick={() => nav('/admin/subcription/manage')}>Manage subcription</li>
              </ul>
            )}
          </li>
          
          {/* <li 
            onClick={() => { nav('/admin/profile'); setActiveIndex(3); }} 
            className={activeIndex === 3 ? "Admin-navigation-cn" : ""}
          >
            <div className='menu-select'><CgProfile />Profile</div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;


