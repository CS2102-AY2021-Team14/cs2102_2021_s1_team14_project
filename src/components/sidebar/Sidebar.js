import React, { Fragment } from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
// import { Row, } from "react-bootstrap"
// import * as FaIcons from "react-icons/fa";

const Sidebar = ({
    defaultKey, sideBarData
}) => {
    return (
        <>
            <div className="sidenav">
                <Nav defaultActiveKey={defaultKey} variant="pills" className="flex-column">
                    {sideBarData.map(item => 
                        {return (
                            <Fragment>
                                <Nav.Link key={item.key} eventKey={item.key} href={item.link}>{item.icon} {item.key}</Nav.Link>
                            </Fragment>
                        );}
                    )}
                </Nav>
            </div>
        </>
    );
};

export default Sidebar;
