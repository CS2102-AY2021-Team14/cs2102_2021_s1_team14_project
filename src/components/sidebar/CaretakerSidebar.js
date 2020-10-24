import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";
import * as FaIcons from "react-icons/fa"

const sideBarData = [
    {
        icon: <FaIcons.FaHome />,
        key: "Home",
        link: ROUTES.CARE_TAKER_HOME
    },
    {
        icon: <FaIcons.FaClock />,
        key: "History",
        link: ROUTES.CARE_TAKER_HISTORY
    },
    {
        icon: <FaIcons.FaDollarSign />,
        key: "Salary",
        link: "#"
    },
    {
        icon: <FaIcons.FaBookOpen />,
        key: "Availability",
        link: "#"
    },
    {
        icon: <FaIcons.FaCog />,
        key: "Settings",
        link: "#"
    }

];

const CaretakerSidebar = ({ defaultKey }) => {
    return (
        <>
            <Sidebar defaultKey={defaultKey} sideBarData={sideBarData} />
        </>
    );
};

export default CaretakerSidebar;
