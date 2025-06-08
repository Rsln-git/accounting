import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LeftSideMenu from "../../components/NavigateComponents/LeftSideMenu";
import NavLinks from "../NavigateComponents/NavLinks";
import { useAuth } from "../../contexts/AuthContext";

// import React, { useEffect, useState } from "react";

function HeaderCollapsible() {
  const { t, i18n } = useTranslation("header");
  const { user, logout } = useAuth();

  const selectLang = localStorage.getItem("lang");

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // ← зберігаємо мову
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="headerNav">
      <Container fluid className="headerContainer">
      {/* <LeftSideMenu /> */}
        <Navbar.Brand className="headerTitle">{t("title")}</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          {/* <Nav> */}
          {/* <NavLinks /> */}
          {/* </Nav> */}
          <div className="langBtnWrapper">
            <span className={`btnLangUa ${selectLang === "ua" ? "btnLangActive" : ""}`} onClick={() => handleLanguageChange("ua")}>UA</span>
            <span className={`btnLangEn ${selectLang === "en" ? "btnLangActive" : ""}`} onClick={() => handleLanguageChange("en")}>EN</span>
          </div>
            {user && (
              <span className="btnExit" onClick={logout}>
                {t("logoutbtn")}
              </span>
            )}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default HeaderCollapsible;
