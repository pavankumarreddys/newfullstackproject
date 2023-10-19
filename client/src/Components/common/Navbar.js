import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import {FaBars} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Navbar() {
  const [navItemsDispaly,setNavItemsDispaly] = useState(false)
  const navigate = useNavigate();

  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between bg-light">
        <div>
             <a className="navbar-brand" href="#">
        <img src="" style={{ marginRight: '10px' }} />
        Your Logo
      </a>
      
        </div>
        <div className="d-none d-md-block" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Career
            </a>
          </li>
          </ul>
          
        </div>
        <button
        className="navbar-toggler"
        onClick={()=>{
            setNavItemsDispaly(!navItemsDispaly)
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FaBars/>
      </button>
      </nav>
    </div>
  );
}

export default Navbar;
{/* <Button
            onClick={(e) => {
              console.log("out");
              localStorage.removeItem("isLogin");
              navigate('/login');
            }}
            variant="contained"
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button> */}