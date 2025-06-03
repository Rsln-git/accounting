import "./HomePage.css";
import { useTranslation } from "react-i18next";
// import { useState } from "react";

function HomePage() {
  const { t } = useTranslation("mainpage");

  return <div className="HomePageWrapper">{t("title")}
   
  </div>;
}

export default HomePage;
