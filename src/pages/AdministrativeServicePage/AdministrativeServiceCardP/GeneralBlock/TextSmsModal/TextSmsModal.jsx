import "./TextSmsModal.css";
import { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomTable from "../../../../../components/Tables/Table";
import Paginator from "../../../../../components/Pagination/PaginationSelect";
import Search from "../../../../../components/Search/Search";
import { useTranslation } from "react-i18next";

function TextSmsModal({show, close, onSelect}) {
  const { t } = useTranslation("textsmsmodal");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [textSms, setTextSms] = useState([{id: "1", name: "Stepan", code: "12345"}, {id: "2", name: "Andrij", code: "67890"}, {id: "3", name: "Fedor", code: "452367"}]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'id', label: t("Id") },
      { key: 'name', label: t('text') },
      { key: 'code', label: t('code') },
    ];

    const onRowClick = (text)=>{
      onSelect(text);
      close();
    };

  // Відфільтровані виконавці
    const filteredTexts = useMemo(() => {
        if (!searchTerm.trim()) return textSms;
    
        return textSms.filter((text) =>
        Object.values(text).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, textSms]);


  const totalItems = textSms.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTexts.slice(startIndex, endIndex);
    }, [filteredTexts, currentPage, itemsPerPage]);

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" fullscreen={true} className="modalTextSmsStyle">
        <Modal.Header closeButton>
          <h5>{t("title")}</h5>
        </Modal.Header>
        <Modal.Body>
            <Search
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={() => setCurrentPage(1)} // Скидаємо на 1 сторінку при пошуку
            />
            <CustomTable head={head} body={currentRows} onRowClick={onRowClick}/>
            <Paginator 
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                perPageOptions={[15, 20, 25]}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(count) => {
                 setItemsPerPage(count);
                  setCurrentPage(1); // Скидаємо сторінку при зміні кількості
                 }}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={close}>
            {t("btnclose")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TextSmsModal;