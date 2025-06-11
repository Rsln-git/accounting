import Nav from "react-bootstrap/Nav";
// import { Row, Col, Container } from "react-bootstrap";
import "./Tabs.css";


function CustomTabs({ tabs = [], activeKey, onSelect, errorTabs = [] }) {
  return (
    <div className="TabsWrapper mt-3">
      <Nav variant="tabs" activeKey={activeKey} onSelect={onSelect}>
        {tabs.map((tab) => {
          const isError = errorTabs.includes(tab.value);
          return (
            <Nav.Item key={tab.value}>
              <Nav.Link
                eventKey={tab.value}
                className={isError ? "tab-error" : ""}
              >
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
}
  
  export default CustomTabs;
