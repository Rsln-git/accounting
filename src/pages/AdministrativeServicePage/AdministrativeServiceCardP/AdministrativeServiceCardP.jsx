import "./AdministrativeServiceCardP.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import StaticBlock from "./StaticBlockCard/StaticBlockCard";
import GeneralBlock from "./GeneralBlock/GeneralBlock";
import TermOfServicesBlock from "./TermOfServicesBlock/TermOfServicesBlock";
import SmsBlock from "./SmsBlock/SmsBlock";
import AccessBlock from "./AccessBlock/AccessBlock";
import CustomTabs from "../../../components/Tabs/Tabs";
import { useState, useRef } from "react";
// import GeoModal  from "../../../components/Modal/GeoModal/GeoModal";

function AdministrativeServiceCardPage() {
  const { t } = useTranslation("tabs");
  const staticRef = useRef();
  const generalRef = useRef();
  const termOfServicesRef = useRef();
  const smsRef = useRef();
  const accessRef = useRef();

  const [errorTabs, setErrorTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("general");
  const [allData, setAllData] = useState([]);

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

  const submitByAll = async () => {
    const errors = [];
    const data = [];

    try {
      const staticData = await staticRef.current?.submitForm();
      data.push(staticData);
      console.log("Зібрані всі дані:", staticData);
    } catch (err) {
      console.error("Помилка під час збору даних", err);
    }

    try {
      const generalData = await generalRef.current?.submitForm();
      console.log("Зібрані всі дані:", generalData);
      data.push(generalData);
    } catch {
      errors.push("general");
    }

    try {
      const termOfServicesData = await termOfServicesRef.current?.submitForm();
      console.log("Зібрані всі дані:", termOfServicesData);
      data.push(termOfServicesData);
    } catch {
      errors.push("termofservices");
    }

    try {
      const SmsData = await smsRef.current?.submitForm();
      console.log("Зібрані всі дані:", SmsData);
      data.push(SmsData);
    } catch {
      errors.push("sms");
    }

    try {
      const AccessData = await accessRef.current?.submitForm();
      console.log("Зібрані всі дані:", AccessData);
      data.push(SmsData);
    } catch {
      errors.push("access");
    }

    setErrorTabs(errors);
    setAllData(data);

    if (errors.length === 0) {
      console.log("Усі дані зібрано успішно ", data);
      await staticRef.current?.resetForm?.();
      await generalRef.current?.resetForm?.();
      await termOfServicesRef.current?.resetForm?.();
      await SmsRef.current?.resetForm?.();
    } else {
      console.error("Є помилки в табах:", errors);
    }
  };

  return (
    <Container fluid className="AdministrativeServiceCardPageWrapper">
      <StaticBlock ref={staticRef}/>
      <CustomTabs 
        tabs={tabs}
        activeKey={activeTab}
        onSelect={setActiveTab}
        errorTabs={errorTabs}
      />
      <GeneralBlock style={{ display: activeTab === "general" ? "block" : "none" }} ref={generalRef} />
      <TermOfServicesBlock style={{ display: activeTab === "termofservices" ? "flex" : "none" }} ref={termOfServicesRef} />
      <SmsBlock style={{ display: activeTab === "sms" ? "block" : "none" }} ref={smsRef} />
      <AccessBlock style={{ display: activeTab === "access" ? "block" : "none" }} ref={accessRef} />
      <Button variant="primary" style={{ display: activeTab === "props" ? "block" : "none" }} onClick={submitByAll}>Надіслати всі дані</Button>
   {/* <GeoModal /> */}
    </Container>
  );
}

export default AdministrativeServiceCardPage;
