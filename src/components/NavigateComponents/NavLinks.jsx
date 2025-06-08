import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
// import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { logout } from '../../services/authService';
// import React, { useEffect, useState } from "react";

function NavigationLinks({ onClick }) {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("header");
  const selectLang = localStorage.getItem("lang");

  // Отримуємо користувача з localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = Boolean(user); // або можна окремо перевірити apiKey якщо треба

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // ← зберігаємо мову
  };

  return (
    <>
        <Nav.Link as={NavLink} to="/">
            {t("main")}
         </Nav.Link>
         <Nav.Link as={NavLink} to="/administrative-services">
            {t("administrservice")}
         </Nav.Link>
         {!isAuthenticated && (
         <Nav.Link as={NavLink} to="/login">
            {t("login")}
         </Nav.Link>)}
         <NavDropdown title={t("drop")} id="collapsible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/login">Action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/login">
                Separated link
         </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={NavLink} to="/aaa">{t("btn3")}</Nav.Link>
        <div className="langBtnWrapper">
          <span className={`btnLangUa ${selectLang === "ua" ? "btnLangActive" : ""}`} onClick={() => handleLanguageChange("ua")}>UA</span>
          <span className={`btnLangEn ${selectLang === "en" ? "btnLangActive" : ""}`} onClick={() => handleLanguageChange("en")}>EN</span>
        </div>
        <div className="exitBtnWrapper">
          {!isAuthenticated  && (
            <span className={`btnLogin`} onClick={() => navigate("/login")}>{t("loginbtn")}</span>)}
            {isAuthenticated  && (
              <span className="btnExit" onClick={() => {
                logout();
                navigate("/login");
              }}>
                {t("logoutbtn")}
              </span>
            )}
        </div>
    </>
  );
}

export default NavigationLinks;
