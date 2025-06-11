import "./TermOfServicesBlock.css";
import { useTranslation } from "react-i18next";
import addIco from "../../../../assets/add.png";
import editIco from "../../../../assets/edit.png";
import deleteIco from "../../../../assets/delete.png";
// import { Row, Col, Container, Form } from "react-bootstrap";
// import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import CustomTable from "../../../../components/Tables/Table";
import Paginator from "../../../../components/Pagination/PaginationSelect";
import Search from "../../../../components/Search/Search";
import CustomAddModal from "./Modal/CustomAddModal";
import { forwardRef, useImperativeHandle } from "react";

const TermOfServicesBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("termofservicesblock");

//   useEffect(() => {
//     if (value) {
//       setValue("code", value.code || true);
//     }
//   }, [value, setValue]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [executors, setExecutors] = useState([{id: "1", deadline: "20.01.2025", cost: "12345", description: "Щось там", other: "Інше"}, {id: "2", deadline: "23.10.2025", cost: "34345", description: "Щось там нове", other: "Інше інше інше"},{id: "3", deadline: "22.12.2025", cost: "123", description: "Щось там ще", other: "Інше інше"}]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'deadline', label: t("deadline") },
      { key: 'cost', label: t('cost') },
      { key: 'description', label: t('description') },
      { key: 'other', label: t('other') },
    ];

    const onRowClick = (executor)=>{

    };

  // Відфільтровані виконавці
    const filteredExecutors = useMemo(() => {
        if (!searchTerm.trim()) return executors;
    
        return executors.filter((executor) =>
        Object.values(executor).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, executors]);


    const totalItems = executors.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExecutors.slice(startIndex, endIndex);
    }, [filteredExecutors, currentPage, itemsPerPage]);

    // AddModal=================================================

    const [showAddModal, setShowAddModal] = useState(false)
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

// Доступ ззовні: submitForm() ====================================
    useImperativeHandle(ref, () => ({
        submitForm: () =>
            new Promise((resolve, reject) => {
                handleSubmit(
                (data) => {
                    resolve(data);
                },
                (formErrors) => {
                    reject(formErrors);
                }
                )();
            }),
                resetForm: () => {
                    reset();
                },
    }));

  return (
    <div className="TermOfServicesdWrapper mt-3 mb-3" style={style}>
        <div className="btnBlock">
            <img src={addIco} alt="add" className="styleIco" onClick={handleShowAddModal}/>
            <img src={editIco} alt="edit" className="styleIco"/>
            <img src={deleteIco} alt="delete" className="styleIco"/>
            <Search
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={() => setCurrentPage(1)}
            />
        </div>
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
            <CustomAddModal show={showAddModal} close={handleCloseAddModal}/>
    </div>
  );
});

export default TermOfServicesBlock;
