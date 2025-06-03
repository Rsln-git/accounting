import "./LoginPage.css";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation("loginpage");
  
  return <div className="LoginPageWrapper">{t("title")}</div>;
}

export default LoginPage;
