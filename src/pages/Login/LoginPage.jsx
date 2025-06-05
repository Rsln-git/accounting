import "./LoginPage.css";
import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useTranslation } from "react-i18next";
import AuthorizeForm from "../../components/Form/authorize/authorize";

function LoginPage() {
  const { t } = useTranslation("loginpage");

  
  return <div className="LoginPageWrapper">
    <h4>{t("title")}</h4>
  <AuthorizeForm/>
  </div>;
}

export default LoginPage;
