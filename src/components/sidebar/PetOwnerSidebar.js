import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";

const links = [
    {
        key: "Home",
        link: ROUTES.PET_OWNER_HOME
    },
    {
        key: "Search",
        link: "#"
    },
    {
        key: "Bid",
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

const PetOwnerSidebar = ({ defaultKey }) => {
    return (
        <>
            <Sidebar defaultKey={defaultKey} links={links} />
        </>
    );
};

export default PetOwnerSidebar;
