import "./AdministrativeServiceCardP.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container } from "react-bootstrap";
import StaticBlock from "./StaticBlockCard/StaticBlockCard";
// import GeoModal  from "../../../components/Modal/GeoModal/GeoModal";

function AdministrativeServiceCardPage() {
  const { t } = useTranslation("administrativeservcard");

  return (
    <Container fluid className="AdministrativeServiceCardPageWrapper">
      {/* <h5>{t("title")}</h5> */}
      <StaticBlock />
   {/* <GeoModal /> */}
    </Container>
  );
}

export default AdministrativeServiceCardPage;
