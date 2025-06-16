import "./AdditionalModal.css";
import { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomTable from "../../../../../components/Tables/Table";
import Paginator from "../../../../../components/Pagination/PaginationSelect";
import Search from "../../../../../components/Search/Search";
import { useTranslation } from "react-i18next";

function AdditionalModal({show, close, onSelect}) {
  const { t } = useTranslation("additionallymodal");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [textArr, setTextArr] = useState([{id: "1", text: "Text numb 1", code: "12345"}, {id: "2", text: "Text numb 2", code: "45457"}, {id: "3", text: "Text numb 3", code: "54622"}]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'id', label: t("Id") },
      { key: 'text', label: t('text') },
      { key: 'code', label: t('code') },
    ];

    const onRowClick = (text)=>{
        console.log("Additional click ", text);
      onSelect(text);
      close();
    };

  // Відфільтровані виконавці
    const filteredTextArr = useMemo(() => {
        if (!searchTerm.trim()) return textArr;
    
        return textArr.filter((text) =>
        Object.values(text).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, textArr]);


  const totalItems = textArr.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTextArr.slice(startIndex, endIndex);
    }, [filteredTextArr, currentPage, itemsPerPage]);

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" fullscreen={true} className="modalAdditionalStyle">
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
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdditionalModal;