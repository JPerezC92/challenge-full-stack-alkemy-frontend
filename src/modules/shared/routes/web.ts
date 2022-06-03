import { BASE_WEB_URL } from "src/modules/shared/utils/constants";

export const mainRoutes = {
  home: BASE_WEB_URL + "/",
  movements: BASE_WEB_URL + "/operations",
};

export const movementsRoutes = {
  income: mainRoutes.movements + "/income",
  expense: mainRoutes.movements + "/expense",
};
