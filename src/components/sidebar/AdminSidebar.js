import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";

const links = [
    {
        key: "Home",
        link: ROUTES.ADMIN_HOME
    },
    {
        key: "Overview",
        link: "#"
    },
    {
        key: "Caretakers",
        link: "#"
    },
    {
        key: "Pets",
        link: "#"
    }

];

const AdminSidebar = ({ defaultKey }) => {
    return (
        <>
            <Sidebar defaultKey={defaultKey} links={links} />
        </>
    );
};

export default AdminSidebar;
