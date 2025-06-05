import "./Footer.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// import NavDropdown from "react-bootstrap/NavDropdown";

function FooterCollapsible() {
    const { t, i18n } = useTranslation("footer");
    const [address, setAddress] = useState("");

    useEffect(() => {
      const loadAddress = () => {
        const cached = localStorage.getItem("cachedGeolocation");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed?.address) {
              setAddress(parsed.address.displayName);
            }
          } catch (e) {
            console.error("Failed to parse cachedGeolocation:", e);
          }
        }
      };
    
      // Спершу при завантаженні
      loadAddress();
    
      // Далі слухаємо власну подію
      window.addEventListener("geolocationUpdated", loadAddress);
    
      return () => {
        window.removeEventListener("geolocationUpdated", loadAddress);
      };
    }, []);
  
  return (
    <div className="footerWrapper">
    <Navbar collapseOnSelect expand="lg"  bg="dark" data-bs-theme="dark" className="navbarStyle">
      <Container>
        <Navbar.Brand href="#home">{t("title")}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#features">{t("btn1")}</Nav.Link>
          <Nav.Link href="#pricing">{t("btn2")}</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="ms-auto" href="#deets">{t("btn3")}</Nav.Link>
        </Nav>
      </Container>
      {address ? 
    <span className="addressStyle">{address}</span>
    :
    <span className="addressStyle">Геопозицію не визначено</span>

    }
    </Navbar>
    </div>
  );
}

export default FooterCollapsible;
