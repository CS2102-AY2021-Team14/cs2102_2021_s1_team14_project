import React from "react";
import Sidebar from "./Sidebar";
import ROUTES from "../../routes/Routes";
import * as FaIcons from "react-icons/fa";

const sideBarData = [
  {
    icon: <FaIcons.FaHome />,
    key: "Home",
    link: ROUTES.PET_OWNER_HOME,
  },
  {
    icon: <FaIcons.FaSearch />,
    key: "Search",
    link: ROUTES.PET_OWNER_SEARCH,
  },
  {
    icon: <FaIcons.FaHammer />,
    key: "Bids",
    link: ROUTES.PET_OWNER_BIDS,
  },
  {
    icon: <FaIcons.FaUser />,
    key: "Caretakers",
    link: ROUTES.PET_OWNER_CARETAKERS,
  },
  {
    icon: <FaIcons.FaPaw />,
    key: "Pets",
    link: ROUTES.PET_OWNER_PETS,
  },
];

const PetOwnerSidebar = ({ defaultKey }) => {
  return (
    <>
      <Sidebar defaultKey={defaultKey} sideBarData={sideBarData} />
    </>
  );
};

export default PetOwnerSidebar;
