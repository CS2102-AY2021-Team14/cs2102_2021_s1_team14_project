import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";
import * as FaIcons from "react-icons/fa";

const sideBarData = [
    {
        icon: <FaIcons.FaHome />,
        key: "Home",
        link: ROUTES.PET_OWNER_HOME
    },
    {
        icon: <FaIcons.FaSearch />,
        key: "Search",
        link: "#"
    },
    {
        icon: <FaIcons.FaHammer />,
        key: "Bid",
        link: "#"
    },
    {
        icon: <FaIcons.FaUser />,
        key: "Caretakers",
        link: "#"
    },
    {
        icon: <FaIcons.FaPaw />,
        key: "Pets",
        link: "#"
    }

];

const PetOwnerSidebar = ({ defaultKey }) => {
    return (
        <>
            <Sidebar defaultKey={defaultKey} sideBarData={sideBarData} />
        </>
    );
};

export default PetOwnerSidebar;
