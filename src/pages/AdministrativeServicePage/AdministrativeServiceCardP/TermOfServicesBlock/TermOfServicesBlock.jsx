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
    const [terms, setTerms] = useState([
        {id: "2", termOption: "termofserviceadd", daysaddinput: "10", typedaysadd: "2", timetocontact: true,  paymentamount: "10000", description: "Примітка до рядка",  deadline: "23.10.2025", cost: "34345", other: "Інше інше інше"},
        {id: "3", termOption: "termofserviceadd", daysaddinput: "20", typedaysadd: "1", timetocontact: false,  paymentamount: "15000", description: "Примітка до рядка 2",  deadline: "05.12.2026", cost: "12942", other: "Інше інше "},
        {id: "4", termOption: "timeofcontacting", daysaddinput: "", typedaysadd: "", timetocontact: false,  paymentamount: "", description: "Примітка до рядка 3",  deadline: "12.09.2024", cost: "79504", other: "Інше"}]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'deadline', label: t("deadline") },
      { key: 'cost', label: t('cost') },
      { key: 'description', label: t('description') },
      { key: 'other', label: t('other') },
    ];

    const [infoEdit, setInfoEdit] = useState();

    const onRowClick = (term)=>{
        setInfoEdit(term);
    };

  // Відфільтровані Терміни виконання
    const filteredTerms = useMemo(() => {
        if (!searchTerm.trim()) return terms;
    
        return terms.filter((term) =>
        Object.values(term).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, terms]);


    const totalItems = terms.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTerms.slice(startIndex, endIndex);
    }, [filteredTerms, currentPage, itemsPerPage]);

    // Add Edit Modal Delete=================================================

    const [showAddModal, setShowAddModal] = useState(false)
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const [showEditModal, setShowEditModal] = useState(false)
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const deleteRow = async (termToDelete) => {
        try {
          // Видалити рядок із масиву
            setTerms((prevTerms) => prevTerms.filter(term => term.id !== termToDelete.id));
      
          // Очистити вибране
            setInfoEdit(undefined);
        } catch (error) {
          console.error("Помилка при видаленні:", error);
        }
    };

// Доступ ззовні: submitForm() ====================================
    // useImperativeHandle(ref, () => ({
    //     submitForm: () =>
    //         new Promise((resolve, reject) => {
    //             handleSubmit(
    //             (data) => {
    //                 resolve(data);
    //             },
    //             (formErrors) => {
    //                 reject(formErrors);
    //             }
    //             )();
    //         }),
    //             resetForm: () => {
    //                 reset();
    //             },
    // }));

    useImperativeHandle(ref, () => ({
        submitForm: () =>
          new Promise((resolve) => {
            resolve({ terms });
          }),
        resetForm: () => {
          setTerms([]);
          setInfoEdit(undefined);
        },
      }));

  return (
    <div className="TermOfServicesdWrapper mt-3 mb-3" style={style}>
        <div className="btnBlock">
            <img src={addIco} alt="add" className="styleIco" onClick={handleShowAddModal}/>
            {infoEdit ? <>
                <img src={editIco} alt="edit" className="styleIco" onClick={handleShowEditModal}/>
                <img src={deleteIco} alt="delete" className="styleIco" onClick={()=>deleteRow(infoEdit)}/>
                </>
                :
                null
                }

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
            <CustomAddModal show={showEditModal} close={handleCloseEditModal} value={infoEdit}/>
    </div>
  );
});

export default TermOfServicesBlock;
