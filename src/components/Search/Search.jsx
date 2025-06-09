import "./Search.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function SearchBlock({ value, onChange, onSearch }) {
  const { t } = useTranslation("search");

  return (
    <div className="SearchWrapper mb-3" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
      {/* <h5>{t("title")}</h5> */}
      <Form className="d-flex">
            <Form.Control
                size="sm"
                type="search"
                placeholder={t("placeholdersearch")}
                aria-label="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {/* <Button variant="outline-success" size="sm">{t("searchbtn")}</Button> */}
          </Form>
    </div>
  );
}

export default SearchBlock;
