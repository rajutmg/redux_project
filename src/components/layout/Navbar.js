import React from "react";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
const Navbar = () => {
  const history = useHistory();
  const firebase = useFirebase();
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="img-fluid logo" alt="logo" />
        </Link>

        <div>
          <ul className="navbar-nav mr-auto"></ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link to="/studentForm" className="btn btn-primary mr-3">
                Add Student
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-a dropdown-toggle"
                href="!#"
                id="navbarDropdown"
                data-toggle="dropdown"
              >
                <img src={user} className="img-fluid user" alt="user" />
                <span className="ml-2 navbar-text">Raju Tamang</span>
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="!#">
                  Profile
                </a>
                <a
                  className="dropdown-item"
                  href="!#"
                  onClick={(firebase.logout(), history.push("/login"))}
                >
                  Logout
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="!#">
                  Ads
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
