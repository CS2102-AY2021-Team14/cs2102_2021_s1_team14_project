import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";

const links = [
    {
        key: "Home",
        link: ROUTES.CARE_TAKER_HOME
    },
    {
        key: "History",
        link: "#"
    },
    {
        key: "Salary",
        link: "#"
    },
    {
        key: "Availability",
        link: "#"
    },
    {
        key: "Settings",
        link: "#"
    }

];

const CaretakerSidebar = ({ defaultKey }) => {
    return (
        <>
            <Sidebar defaultKey={defaultKey} links={links} />
        </>
    );
};

export default CaretakerSidebar;