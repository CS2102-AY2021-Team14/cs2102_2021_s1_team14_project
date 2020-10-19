import React from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = ({
    defaultKey, links
}) => {
    return (
        <>
            <div className="sidenav">
                <Nav defaultActiveKey={defaultKey} variant="pills" className="flex-column">
                    {links.map(item =>
                        <Nav.Link key={item.key} eventKey={item.key} href={item.link}> {item.key} </Nav.Link>
                    )}
                </Nav>
            </div>
        </>
    );
};

export default Sidebar;
