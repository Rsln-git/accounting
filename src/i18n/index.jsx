import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enHeader from "./locales/en/header.json";
import uaHeader from "./locales/ua/header.json";
import enFooter from "./locales/en/footer.json";
import uaFooter from "./locales/ua/footer.json";
import enLeftMenu from "./locales/en/leftMenu.json";
import uaLeftMenu from "./locales/ua/leftMenu.json";
import enCrumbs from "./locales/en/breadcrumbs.json";
import uaCrumbs from "./locales/ua/breadcrumbs.json";
import enMainPage from "./locales/en/mainpage.json";
import uaMainPage from "./locales/ua/mainpage.json";
import enLoginPage from "./locales/en/loginpage.json";
import uaLoginPage from "./locales/ua/loginpage.json";
import enAuthorizeForm from "./locales/en/authorize.json";
import uaAuthorizeForm from "./locales/ua/authorize.json";

const savedLanguage = localStorage.getItem("lang") || "ua";
if(savedLanguage === "ua"){
    localStorage.setItem("lang", "ua");
}

i18n.use(initReactI18next).init({
    resources: {
        en: {
          header: enHeader,
          footer: enFooter,
          leftmenu: enLeftMenu,
          breadcrumbs: enCrumbs,
          mainpage: enMainPage,
          loginpage: enLoginPage,
          authorize: enAuthorizeForm,
        },
        ua: {
          header: uaHeader,
          footer: uaFooter,
          leftmenu: uaLeftMenu,
          breadcrumbs: uaCrumbs,
          mainpage: uaMainPage,
          loginpage: uaLoginPage,
          authorize: uaAuthorizeForm,
        },
      },
  lng: savedLanguage, // мова за замовчуванням
  fallbackLng: "en",
  ns: ["header", "footer", "leftmenu", "breadcrumbs", "mainpage", "loginpage"],
  defaultNS: "header",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
