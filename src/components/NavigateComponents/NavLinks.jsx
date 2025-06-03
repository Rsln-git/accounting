import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

function NavigationLinks({ onClick }) {
  const { t } = useTranslation("header");

  return (
    <>
        <Nav.Link as={NavLink} to="/">
            {t("main")}
         </Nav.Link>
         <Nav.Link as={NavLink} to="/login">
            {t("login")}
         </Nav.Link>
         <NavDropdown title={t("drop")} id="collapsible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/login">Action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/login">
                Separated link
         </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={NavLink} to="/aaa">{t("btn3")}</Nav.Link>
    </>
  );
}

export default NavigationLinks;
