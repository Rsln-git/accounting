import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LeftSideMenu from "../../components/NavigateComponents/LeftSideMenu";
import NavLinks from "../NavigateComponents/NavLinks";
// import React, { useEffect, useState } from "react";

function HeaderCollapsible() {
  const { t, i18n } = useTranslation("header");

  const selectLang = localStorage.getItem("lang");

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // ← зберігаємо мову
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
      <LeftSideMenu />
        <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <NavLinks />
          </Nav>
          <div>
        <span className={`btnLangUa ${selectLang === "ua" ? "btnLangActive" : ""}`} onClick={() => handleLanguageChange("ua")}>UA</span>
        <span className={`btnLangEn ${selectLang === "en" ? "btnLangActive" : ""}`} onClick={() => handleLanguageChange("en")}>EN</span>
      </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderCollapsible;
