import React, { Fragment } from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
// import { Row, } from "react-bootstrap"
// import * as FaIcons from "react-icons/fa";

const Sidebar = ({ defaultKey, sideBarData }) => {
  return (
    <>
      <div className="sidenav">
        <Nav
          defaultActiveKey={defaultKey}
          variant="pills"
          className="flex-column"
        >
          {sideBarData.map(item => {
            return (
              <Nav.Link key={item.key} eventKey={item.key} href={item.link}>
                {" "}
                <div className="sidebar-tag">
                  {item.icon} {item.key}
                </div>
              </Nav.Link>
            );
          })}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
