import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";
import * as FaIcons from "react-icons/fa";

const sideBarData = [
    {
        icon: <FaIcons.FaHome />,
        key: "Home",
        link: ROUTES.ADMIN_HOME
    },
    {
        icon: <FaIcons.FaBook />,
        key: "Overview",
        link: ROUTES.ADMIN_OVERVIEW
    },
    {
        icon: <FaIcons.FaUser />,
        key: "Caretakers",
        link: ROUTES.ADMIN_CARE_TAKER
    },
    {
        icon: <FaIcons.FaPaw />,
        key: "Pets",
        link: ROUTES.ADMIN_PET_INFO
    }

];

const AdminSidebar = ({ defaultKey }) => {
    return (
        <>
            <Sidebar defaultKey={defaultKey} sideBarData={sideBarData} />
        </>
    );
};

export default AdminSidebar;
