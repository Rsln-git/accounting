import "./LeftSideMenu.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";
import NavLinks from "../NavigateComponents/NavLinks";

function LeftSideMenu() {
  const { t, i18n } = useTranslation("leftmenu");

  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow((prev) => !prev);

  return (
    <>
      <Button className="leftBtn" variant="dark" onClick={toggleMenu}>
      {show ? "←" : "☰"}
      </Button>

      <Offcanvas show={show} onHide={toggleMenu} data-bs-theme="dark" className="custom-width">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("title")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <NavLinks />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LeftSideMenu;
