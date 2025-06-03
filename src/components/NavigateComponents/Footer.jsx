import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";

// import NavDropdown from "react-bootstrap/NavDropdown";

function FooterCollapsible() {
    const { t, i18n } = useTranslation("footer");
  
  return (
    <Navbar collapseOnSelect expand="lg"  bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">{t("title")}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#features">{t("btn1")}</Nav.Link>
          <Nav.Link href="#pricing">{t("btn2")}</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">{t("btn3")}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default FooterCollapsible;
