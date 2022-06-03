import React from "react";
import { FC } from "react";
import "../popup.css";

interface NavbarProps {
  setIsSidebarOpen: any;
}

const Navbar: FC<NavbarProps> = ({ setIsSidebarOpen }) => {
  function handleClosePopup() {
    window.close();
  }
  function handleOpenSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }
  return (
    <div className="navbar">
      <div className="navbar__container _container">
        <i
          className="bars icon navbar-icon_burger"
          onClick={handleOpenSidebar}
        ></i>
        <i
          className="close icon navbar-icon_close"
          onClick={handleClosePopup}
        ></i>
      </div>
    </div>
  );
};

export default Navbar;
