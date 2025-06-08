import "./AdministrativeServicePage.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { useState } from "react";

function AdministrativeServicePage() {
  const { t } = useTranslation("administrativeserv");

  return (
  <div className="AdministrativeServicePageWrapper">
    <h5>{t("title")}</h5>
        <Row className="row-xl-1 row-lg-1 row-md-2 row-xs-4">
            <Col className="col-12 col-xl-3 col-lg-3 col-md-6 col-xs-12 column-1">
                <Link to="/administrative-services/administrative-service-card">
                    {t("administrativecardlink")}
                </Link>
            </Col>
            <Col className="col-12 col-xl-3 col-lg-3 col-md-6 col-xs-12 column-2">2</Col>
            <Col className="col-12 col-xl-3 col-lg-3 col-md-6 col-xs-12 column-3">3</Col>
            <Col className="col-12 col-xl-3 col-lg-3 col-md-6 col-xs-12 column-4">4</Col>
        </Row>
        <Outlet />
  </div>
)}

export default AdministrativeServicePage;
