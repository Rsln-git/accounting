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
import enTabs from "./locales/en/tabs.json";
import uaTabs from "./locales/ua/tabs.json";
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
import enGeneralBlock from "./locales/AdministrativeServiceCard/GeneralBlock/en/GeneralBlock.json";
import uaGeneralBlock from "./locales/AdministrativeServiceCard/GeneralBlock/ua/GeneralBlock.json";
import enThematicModal from "./locales/AdministrativeServiceCard/GeneralBlock/ThematicModal/en/ThematicModal.json";
import uaThematicModal from "./locales/AdministrativeServiceCard/GeneralBlock/ThematicModal/ua/ThematicModal.json";
import enCategoryModal from "./locales/AdministrativeServiceCard/GeneralBlock/CategoryModal/en/CategoryModal.json";
import uaCategoryModal from "./locales/AdministrativeServiceCard/GeneralBlock/CategoryModal/ua/CategoryModal.json";
import enTabModal from "./locales/AdministrativeServiceCard/GeneralBlock/TabModal/en/TabModal.json";
import uaTabModal from "./locales/AdministrativeServiceCard/GeneralBlock/TabModal/ua/TabModal.json";
import enResultModal from "./locales/AdministrativeServiceCard/GeneralBlock/ResultModal/en/ResultModal.json";
import uaResultModal from "./locales/AdministrativeServiceCard/GeneralBlock/ResultModal/ua/ResultModal.json";
import enEventModal from "./locales/AdministrativeServiceCard/GeneralBlock/EventModal/en/EventModal.json";
import uaEventModal from "./locales/AdministrativeServiceCard/GeneralBlock/EventModal/ua/EventModal.json";
import enTextSmsModal from "./locales/AdministrativeServiceCard/GeneralBlock/TextSmsModal/en/TextSmsModal.json";
import uaTextSmsModal from "./locales/AdministrativeServiceCard/GeneralBlock/TextSmsModal/ua/TextSmsModal.json";
import enTextDescriptionModal from "./locales/AdministrativeServiceCard/GeneralBlock/TextDescriptionModal/en/TextDescriptionModal.json";
import uaTextDescriptionModal from "./locales/AdministrativeServiceCard/GeneralBlock/TextDescriptionModal/ua/TextDescriptionModal.json";
import enTermOfServiceBlock from "./locales/AdministrativeServiceCard/TermOfServiceBlock/en/TermOfServiceBlock.json";
import uaTermOfServiceBlock from "./locales/AdministrativeServiceCard/TermOfServiceBlock/ua/TermOfServiceBlock.json";
import enCustomAddModal from "./locales/AdministrativeServiceCard/TermOfServiceBlock/CustomAddModal/en/CustomAddModal.json";
import uaCustomAddModal from "./locales/AdministrativeServiceCard/TermOfServiceBlock/CustomAddModal/ua/CustomAddModal.json";

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
          tabs: enTabs,
          mainpage: enMainPage,
          loginpage: enLoginPage,
          authorize: enAuthorizeForm,
          administrativeserv: enAdministrativeServiceP,
          administrativeservcard: enAdministrativeServiceCard,
          staticblockcard: enStaticBlock,
          executormodal: enExecutorModal,
          generalblock: enGeneralBlock,
          thematicmodal: enThematicModal,
          categorymodal: enCategoryModal,
          tabmodal: enTabModal,
          resultmodal: enResultModal,
          eventmodal: enEventModal,
          textsmsmodal: enTextSmsModal,
          textdescriptionmodal: enTextDescriptionModal,
          termofservicesblock: enTermOfServiceBlock,
          customaddmodal: enCustomAddModal,
        },
        ua: {
          header: uaHeader,
          footer: uaFooter,
          leftmenu: uaLeftMenu,
          breadcrumbs: uaCrumbs,
          search: uaSearch,
          tabs: uaTabs,
          mainpage: uaMainPage,
          loginpage: uaLoginPage,
          authorize: uaAuthorizeForm,
          administrativeserv: uaAdministrativeServiceP,
          administrativeservcard: uaAdministrativeServiceCard,
          staticblockcard: uaStaticBlock,
          executormodal: uaExecutorModal,
          generalblock: uaGeneralBlock,
          thematicmodal: uaThematicModal,
          categorymodal: uaCategoryModal,
          tabmodal: uaTabModal,
          resultmodal: uaResultModal,
          eventmodal: uaEventModal,
          textsmsmodal: uaTextSmsModal,
          textdescriptionmodal: uaTextDescriptionModal,
          termofservicesblock: uaTermOfServiceBlock,
          customaddmodal: uaCustomAddModal,
        },
      },
  lng: savedLanguage, // мова за замовчуванням
  fallbackLng: "en",
  ns: ["header", "footer", "leftmenu", "breadcrumbs", "mainpage", "loginpage", "administrativeserv", "staticblockcard", "executormodal", "search", "tabs", "generalblock", "thematicmodal", "categorymodal", "tabmodal", "resultmodal", "eventmodal", "textsmsmodal", "textdescriptionmodal", "termofservicesblock", "customaddmodal"],
  defaultNS: "header",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
