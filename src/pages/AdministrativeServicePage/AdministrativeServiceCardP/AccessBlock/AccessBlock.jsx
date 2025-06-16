import "./AccessBlock.css";
import { useTranslation } from "react-i18next";
import addIco from "../../../../assets/add.png";
import editIco from "../../../../assets/edit.png";
import deleteIco from "../../../../assets/delete.png";
import { Row, Col, Container, Form } from "react-bootstrap";
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
import CustomTable from "../../../../components/Tables/Table";
import Paginator from "../../../../components/Pagination/PaginationSelect";
import Search from "../../../../components/Search/Search";
import { forwardRef, useImperativeHandle } from "react";
import AccessAddModal from "./AccessAddModal/AccessAddModal";

const AccessBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("accessblock");

  const accessOptions = [
    { value: 1, label: 'Адміністратор' },
    { value: 2, label: 'Модератор' },
    { value: 3, label: 'Користувач' }
  ];
  

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    // При кожній зміні `value` оновлюємо значення форми
    if (value) {
      setValue("checkfullaccess", value.checkfullaccess || false);
      setValue("typeaccess", value.typeaccess || "");
    }
  }, [value, setValue]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [performers, setPerformers] = useState([
        {id: 2, performer: "Виконавець ЕЦП", performerId: 2, user: "Admin", userId: 1},
        {id: 3, performer: "Виконавець ДКД", performerId: 3, user: "User", userId: 2},
        {id: 4, performer: "Виконавець ОБЛ", performerId: 4, user: "Admin", userId: 1}]);
    const [searchTerm, setSearchTerm] = useState("");

    const head = [
      { key: 'id', label: t("id") },
      { key: 'performer', label: t("performer") },
      { key: 'user', label: t('user') },
    ];

    const [infoEdit, setInfoEdit] = useState();

    const onRowClick = (term)=>{
        setInfoEdit(term);
    };

  // Відфільтровані Терміни виконання
    const filteredPerformers = useMemo(() => {
        if (!searchTerm.trim()) return performers;
    
        return performers.filter((performer) =>
        Object.values(performer).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [searchTerm, performers]);


    const totalItems = performers.length;

    const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPerformers.slice(startIndex, endIndex);
    }, [filteredPerformers, currentPage, itemsPerPage]);

    // Add Edit Modal Delete=================================================

    const [showAddModal, setShowAddModal] = useState(false)
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const [showEditModal, setShowEditModal] = useState(false)
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);

    const deleteRow = async (perfToDelete) => {
        try {
          // Видалити рядок із масиву
          setPerformers((prevPerformer) => prevPerformer.filter(perf => perf.id !== perfToDelete.id));
      
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
            resolve({ performers });
          }),
        resetForm: () => {
            setPerformers([]);
          setInfoEdit(undefined);
        },
      }));

  return (
    <div className="AccessBlockWrapper mt-3 mb-3" style={style}>
        <Form onSubmit={handleSubmit(() => {})} className='AccessBlockForm'>
            <div className="wrappCheckSelect mt-2">
                <Form.Group className="formGroupCheckBoxAccess">
                    <Form.Label className="checkBoxAccessLabel">{t("labelcheckboxaccess")}</Form.Label>
                        <Form.Check
                            className="mb-0 checkToAll"
                            type="checkbox"
                            label={t("placeholdercheckboxaccess")}
                            id={`checkboxaccess`}
                            {...register('checkfullaccess', { required: false})}
                        />
                </Form.Group>

                <Controller
                  name="typeaccess"
                  control={control}
                  rules={{ validate: (value) =>
                    value && value.length > 0 || t("errortypeaccess") }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={accessOptions}
                      isMulti
                      className="ControlSelect"
                      classNamePrefix="react-select"
                      placeholder={t("placeholdperformers")}
                    />
                  )}
                />

                  {errors.typeaccess && (
                    <Form.Text className="text-danger">
                      {errors.typeaccess.message}
                    </Form.Text>
                  )}
                {/* <Form.Group className="formGroupSelectAccess ms-3">
                    <Form.Select
                        size="sm"
                        {...register('typeaccess', { required: t("errortypeaccess") })}
                        isInvalid={!!errors.typeaccess}
                        >
                            <option value={1}>
                                {t("placeholdadmin1")}
                            </option>
                            <option value={2}>
                                {t("placeholdadmin2")}
                            </option>
                            <option value={2}>
                                {t("placeholdadmin3")}
                            </option>
                    </Form.Select>
                        {errors.typeaccess && (
                            <Form.Text className="text-danger">{errors.typeaccess.message}</Form.Text>
                        )}
                </Form.Group> */}
            </div>
        </Form>

            <div className="btnAccessBlock mt-3">
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
            <AccessAddModal show={showAddModal} close={handleCloseAddModal}/>
            <AccessAddModal show={showEditModal} close={handleCloseEditModal} value={infoEdit}/>
    </div>
  );
});

export default AccessBlock;
