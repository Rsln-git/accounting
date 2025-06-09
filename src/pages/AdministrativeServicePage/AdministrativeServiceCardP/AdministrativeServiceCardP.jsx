import "./AdministrativeServiceCardP.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container } from "react-bootstrap";
import StaticBlock from "./StaticBlockCard/StaticBlockCard";
import GeneralBlock from "./GeneralBlock/GeneralBlock";
import CustomTabs from "../../../components/Tabs/Tabs";
import { useState } from "react";
// import GeoModal  from "../../../components/Modal/GeoModal/GeoModal";

function AdministrativeServiceCardPage() {
  const { t } = useTranslation("tabs");
  const [errorTab, setErrorTab] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { label: t("general"), value: "general" },
    { label: t("termofservices"), value: "termofservices" },
    { label: t("sms"), value: "sms" },
    { label: t("access"), value: "access" },
    { label: t("workingwindows"), value: "workingwindows" },
    { label: t("regulations"), value: "regulations" },
    { label: t("additionally"), value: "additionally" },
    { label: t("portal"), value: "portal" },
    { label: t("archive"), value: "archive" },
    { label: t("settings"), value: "settings" },
    { label: t("regulatorydocuments"), value: "regulatorydocuments" },
    { label: t("documentstosubmit"), value: "documentstosubmit" },
    { label: t("props"), value: "props" },
    // { label: "Шаблони", value: "templates" },
  ];



  return (
    <Container fluid className="AdministrativeServiceCardPageWrapper">
      {/* <h5>{t("title")}</h5> */}
      <StaticBlock />
      <CustomTabs 
        tabs={tabs}
        activeKey={activeTab}
        onSelect={setActiveTab}
        error={errorTab}
      />
      <GeneralBlock style={{ display: activeTab === "general" ? "block" : "none" }} />
   {/* <GeoModal /> */}
    </Container>
  );
}

export default AdministrativeServiceCardPage;
