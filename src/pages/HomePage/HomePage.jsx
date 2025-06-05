import "./HomePage.css";
import { useTranslation } from "react-i18next";
import GeoModal  from "../../components/Modal/GeoModal/GeoModal";
// import { useState } from "react";

function HomePage() {
  const { t } = useTranslation("mainpage");

  return <div className="HomePageWrapper">{t("title")}
   <GeoModal />
  </div>;
}

export default HomePage;
