import "./BreadCrumbs.css";
import { Breadcrumb } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Breadcrumbs() {
  const { t, i18n } = useTranslation("breadcrumbs");
  const location = useLocation();

  // Шлях, розділений на частини
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="Crumbs">
      <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
      {t("main")}
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Breadcrumb.Item active key={name}>
             {t(`${name}`, name)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            linkAs={NavLink}
            linkProps={{ to: routeTo }}
            key={name}
          >
             {t(`${name}`, name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default Breadcrumbs;
