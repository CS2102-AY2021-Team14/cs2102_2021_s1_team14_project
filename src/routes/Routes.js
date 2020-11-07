const ROUTES = {
  HOME: "/",
  SIGN_IN: "/signin",
  REGISTER: "/register",

  PET_OWNER_HOME: "/petOwner",
  PET_OWNER_SEARCH: "/petOwner/search",
  PET_OWNER_BIDS: "/petOwner/bids",
  PET_OWNER_CARETAKERS: "/petOwner/caretakers",
  PET_OWNER_PETS: "/petOwner/pets",
  PET_OWNER_OBSESSION: "/petOwner/obsession",

  CARE_TAKER_HOME: "/careTaker",
  CARE_TAKER_SALARY: "/careTaker/salary",
  CARE_TAKER_HISTORY: "/careTaker/history",
  CARE_TAKER_OFFERS: "/careTaker/offers",
  CARE_TAKER_AVAILABILITY: "/careTaker/availability",

  ADMIN_HOME: "/admin",
  ADMIN_PET_INFO: "/admin/petinfo",
  ADMIN_CARE_TAKER: "/admin/careTakers",
  ADMIN_OVERVIEW: "/admin/overview",
  ADMIN_EMPLOYEE_OF_MONTH: "/admin/employeeofmonth",
};

module.exports = ROUTES;
