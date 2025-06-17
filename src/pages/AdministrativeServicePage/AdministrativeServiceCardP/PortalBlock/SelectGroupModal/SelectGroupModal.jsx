import "./SelectGroupModal.css";
import { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomTable from "../../../../../components/Tables/Table";
import Paginator from "../../../../../components/Pagination/PaginationSelect";
import Search from "../../../../../components/Search/Search";
import { useTranslation } from "react-i18next";

function SelectGroupModal({show, close, onSelect}) {
  const { t } = useTranslation("selectgroupmodal");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [groupArr, setGroupArr] = useState([{id: 1, group: "Group 1", code: "12345"}, {id: 2, group: "Group 2", code: "34321"}, {id: 3, group: "Group 3", code: "59683"},]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'id', label: t("id") },
      { key: 'group', label: t('group') },
      { key: 'code', label: t('code') },
    ];

    const onRowClick = (group)=>{
        console.log("group click ", group);
      onSelect(group);
      close();
    };

  // Відфільтровані виконавці
    const filteredGroupArr = useMemo(() => {
        if (!searchTerm.trim()) return groupArr;
    
        return groupArr.filter((group) =>
        Object.values(group).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, groupArr]);


  const totalItems = groupArr.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredGroupArr.slice(startIndex, endIndex);
    }, [filteredGroupArr, currentPage, itemsPerPage]);

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" fullscreen={true} className="modalSelectGroupStyle">
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

export default SelectGroupModal;