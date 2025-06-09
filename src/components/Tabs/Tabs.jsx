import Nav from "react-bootstrap/Nav";
import "./Tabs.css";


function CustomTabs({ tabs, activeKey, onSelect, error }) {
    return (
      <div className="TabsWrapper mt-3">
        <Nav variant="tabs" activeKey={activeKey} onSelect={onSelect}>
          {tabs.map((tab) => (
            <Nav.Item key={tab.value}>
              <Nav.Link
                eventKey={tab.value}
                className={error ? "tab-error" : ""}
              >
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    );
  }
  
  export default CustomTabs;
