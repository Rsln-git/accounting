import "./AdditionalResultModal.css";
import { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomTable from "../../../../../components/Tables/Table";
import Paginator from "../../../../../components/Pagination/PaginationSelect";
import Search from "../../../../../components/Search/Search";
import { useTranslation } from "react-i18next";

function AdditionalResultModal({show, close, onSelect}) {
  const { t } = useTranslation("additionallyresultmodal");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [resultArr, setResultArr] = useState([{id: "1", doc: "Text numb 1", code: "12345"}, {id: "2", doc: "Text numb 2", code: "45457"}, {id: "3", doc: "Text numb 3", code: "54622"}]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'id', label: t("Id") },
      { key: 'doc', label: t('doc') },
      { key: 'code', label: t('code') },
    ];

    const onRowClick = (res)=>{
        console.log("Additional result click ", res);
      onSelect(res);
      close();
    };

  // Відфільтровані виконавці
    const filteredResultArr = useMemo(() => {
        if (!searchTerm.trim()) return resultArr;
    
        return resultArr.filter((res) =>
        Object.values(res).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, resultArr]);


  const totalItems = resultArr.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredResultArr.slice(startIndex, endIndex);
    }, [filteredResultArr, currentPage, itemsPerPage]);

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" fullscreen={true} className="modalAdditionalResultStyle">
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

export default AdditionalResultModal;