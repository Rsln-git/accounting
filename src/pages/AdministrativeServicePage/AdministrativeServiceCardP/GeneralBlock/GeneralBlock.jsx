import "./GeneralBlock.css";
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import ThematicModal from "./ThematicAreaModal/ThematicModal";
import CategoryModal from "./CategoryModal/CategoryModal";
import TabModal from "./TabModal/TabModal";
// import { useState } from "react";

function GeneralBlock({style, value, send}) {
  const { t } = useTranslation("generalblock");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    // При кожній зміні `value` оновлюємо значення форми
    if (value) {
      setValue("checkpay", value.checkpay || false);
      setValue("thematicareainput", value.thematicareainput || "");
      setValue("thematicarea", value.thematicarea || "");
      setValue('categoryinput', value.categoryinput || "");
      setValue('category', value.category);
    }
  }, [value, setValue]);

//   ThematicInput===========================

    const [showModalThematicArea, setShowModalThematicAreaModal] = useState(false);
        const handleOpenModalThematic = () => setShowModalThematicAreaModal(true);
        const handleCloseModalThematic = () => setShowModalThematicAreaModal(false);

        const handleThematicAreaSelect = (area) => {
            setValue("thematicarea", area);
            setValue("thematicareainput", area.name);
            clearErrors(["thematicarea", "thematicareainput"]);
        };

        const clearThematicArea = () => {
            setValue('thematicareainput', '');
            setValue('thematicarea', null);
        };

//   CategoryInput===========================

    const [showModalCategory, setShowModalCategory] = useState(false);
        const handleOpenModalCategory = () => setShowModalCategory(true);
        const handleCloseModalCategory = () => setShowModalCategory(false);

        const handleCategorySelect = (category) => {
            setValue("category", category);
            setValue("categoryinput", category.name);
            clearErrors(["category", "categoryinput"]);
        };

        const clearCategory = () => {
            setValue('categoryinput', '');
            setValue('category', null);
        };

//   TabInput===========================

const [showModalTab, setShowModalTab] = useState(false);
const handleOpenModalTab = () => setShowModalTab(true);
const handleCloseModalTab = () => setShowModalTab(false);

const handleTabSelect = (tab) => {
    setValue("tab", tab);
    setValue("tabinput", tab.name);
    clearErrors(["tab", "tabinput"]);
};

const clearTab = () => {
    setValue('tabinput', '');
    setValue('tab', null);
};
  

  const onSubmit = async (data) => {
    try {
    //   send(data);
    } catch (err) {
      console.error(err);
    }
  };

  return <div className="GeneralBlockWrapper" style={style}>
    <Form onSubmit={handleSubmit(onSubmit)} className='generalBlockForm'>
        <Form.Group className="formGroupCheckBox">
            <Form.Label className="checkBoxLabel">{t("labelcheckbox1")}</Form.Label>
                <Form.Check
                    className="mb-0"
                    type="checkbox"
                    label={t("placeholdercheckbox")}
                    id={`checkbox1`}
                    {...register('checkpay', { required: false})}
                />
        </Form.Group>

        <Form.Group className="formGroupThematicStyle mt-3">
            <Form.Label>{t("labelthematicarea")}</Form.Label>
                <div className="inputSelectThematic">
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Form.Control
                            readOnly
                            size="sm"
                            type="text"
                            placeholder={t("placeholderthematicarea")}
                            {...register('thematicareainput', { required: t("errorthematicarea") })}
                            isInvalid={!!errors.thematicareainput}
                            />
                                {errors.thematicareainput && (
                                    <Form.Text className="text-danger">{errors.thematicareainput.message}</Form.Text>
                                )}
                     </div>
                                <span className="btnHiddenInput" onClick={handleOpenModalThematic}>...</span>
                                <span className="btnHiddenInput" onClick={clearThematicArea}>X</span>
                 </div>
        </Form.Group>

        <Form.Group className="formGroupThematicStyle mt-3">
            <Form.Label>{t("labelcategory")}</Form.Label>
                <div className="inputSelectThematic">
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Form.Control
                            readOnly
                            size="sm"
                            type="text"
                            placeholder={t("placeholdercategory")}
                            {...register('categoryinput', { required: t("errorcategory") })}
                            isInvalid={!!errors.categoryinput}
                            />
                                {errors.categoryinput && (
                                    <Form.Text className="text-danger">{errors.categoryinput.message}</Form.Text>
                                )}
                     </div>
                                <span className="btnHiddenInput" onClick={handleOpenModalCategory}>...</span>
                                <span className="btnHiddenInput" onClick={clearCategory}>X</span>
                 </div>
        </Form.Group>

        <Form.Group className="formGroupThematicStyle mt-3">
            <Form.Label>{t("labeltab")}</Form.Label>
                <div className="inputSelectThematic">
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Form.Control
                            readOnly
                            size="sm"
                            type="text"
                            placeholder={t("placeholdtab")}
                            {...register('tabinput', { required: t("errortab") })}
                            isInvalid={!!errors.tabinput}
                            />
                                {errors.tabinput && (
                                    <Form.Text className="text-danger">{errors.tabinput.message}</Form.Text>
                                )}
                     </div>
                                <span className="btnHiddenInput" onClick={handleOpenModalTab}>...</span>
                                <span className="btnHiddenInput" onClick={clearTab}>X</span>
                 </div>
        </Form.Group>

        <Button hidden type="submit" variant="outline-dark" className="mt-4">{t("btnenter")}</Button>
    </Form>
        <ThematicModal show={showModalThematicArea} close={handleCloseModalThematic} onSelect={handleThematicAreaSelect}/>
        <CategoryModal show={showModalCategory} close={handleCloseModalCategory} onSelect={handleCategorySelect}/>
        <TabModal show={showModalTab} close={handleCloseModalTab} onSelect={handleTabSelect}/>

  </div>;
}

export default GeneralBlock;
