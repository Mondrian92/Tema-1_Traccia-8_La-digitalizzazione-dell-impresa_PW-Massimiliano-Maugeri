import { Children } from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { NavLink as Link } from "@mantine/core";
import { navbarRoutes } from "@/router/constants";

const Navbar = () => {
  const intl = useIntl();

  // Utilizzando l'array di rotte, creiamo dinamicamente l'elenco di tasti di navigazione
  return Children.toArray(
    navbarRoutes.map((page) => (
      <Link
        variant="light"
        component={NavLink}
        to={page.path}
        label={
          page.name &&
          intl.formatMessage({
            id: `navbar.nav_button.label.${page.name}`,
          })
        }
        c="textPrimary"
        pl="xl"
      />
    ))
  );
};

export default Navbar;
