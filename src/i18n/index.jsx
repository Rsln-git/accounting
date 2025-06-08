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
import enSearch from "./locales/en/search.json";
import uaSearch from "./locales/ua/search.json";
import enMainPage from "./locales/en/mainpage.json";
import uaMainPage from "./locales/ua/mainpage.json";
import enLoginPage from "./locales/en/loginpage.json";
import uaLoginPage from "./locales/ua/loginpage.json";
import enAuthorizeForm from "./locales/en/authorize.json";
import uaAuthorizeForm from "./locales/ua/authorize.json";
import enAdministrativeServiceP from "./locales/AdministrativeServicePage/en/AdministrServiceP.json";
import uaAdministrativeServiceP from "./locales/AdministrativeServicePage/ua/AdministrativeServiceP.json";
import enAdministrativeServiceCard from "./locales/AdministrativeServiceCard/en/AdministrativeServiceCard.json";
import uaAdministrativeServiceCard from "./locales/AdministrativeServiceCard/ua/AdministrativeServiceCard.json";
import enStaticBlock from "./locales/AdministrativeServiceCard/StaticBlock/en/staticblock.json";
import uaStaticBlock from "./locales/AdministrativeServiceCard/StaticBlock/ua/staticblock.json";
import enExecutorModal from "./locales/AdministrativeServiceCard/StaticBlock/ExecutorModal/en/executormodal.json";
import uaExecutorModal from "./locales/AdministrativeServiceCard/StaticBlock/ExecutorModal/ua/executormodal.json";



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
          search: enSearch,
          mainpage: enMainPage,
          loginpage: enLoginPage,
          authorize: enAuthorizeForm,
          administrativeserv: enAdministrativeServiceP,
          administrativeservcard: enAdministrativeServiceCard,
          staticblockcard: enStaticBlock,
          executormodal: enExecutorModal,
        },
        ua: {
          header: uaHeader,
          footer: uaFooter,
          leftmenu: uaLeftMenu,
          breadcrumbs: uaCrumbs,
          search: uaSearch,
          mainpage: uaMainPage,
          loginpage: uaLoginPage,
          authorize: uaAuthorizeForm,
          administrativeserv: uaAdministrativeServiceP,
          administrativeservcard: uaAdministrativeServiceCard,
          staticblockcard: uaStaticBlock,
          executormodal: uaExecutorModal,
        },
      },
  lng: savedLanguage, // мова за замовчуванням
  fallbackLng: "en",
  ns: ["header", "footer", "leftmenu", "breadcrumbs", "mainpage", "loginpage", "administrativeserv", "staticblockcard", "executormodal", "search"],
  defaultNS: "header",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
