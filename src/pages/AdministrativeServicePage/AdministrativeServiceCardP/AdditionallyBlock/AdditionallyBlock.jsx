import "./AdditionallyBlock.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from "react";
import AdditionallyBlockModal from "./AdditionalModal/AdditionalModal";
import AdditionallyBlockResultModal from "./AdditionalResultModal/AdditionalResultModal";

const AdditionallyBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("additionallyblock");

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
          setValue("separatepage", value.separatepage || false);
          setValue("anotherregister", value.anotherregister || false);
          setValue("anotheraddition1", value.anotheraddition1 || false);
          setValue("anotheraddition2", value.anotheraddition2 || false);
          setValue("anotheraddition3", value.anotheraddition3 || false);
          setValue("additionaltext", value.additionaltext || null);
          setValue("inputadditionaltext", value.inputadditionaltext || "");
          setValue("separateline", value.separateline || false);
          setValue("inputadditionalresult", value.inputadditionalresult || "");
          setValue("additionalresult", value.additionalresult || null);
          setValue("bycategory", value.bycategory || false);
          setValue("creatingreport", value.creatingreport || false);
          setValue("executiondate", value.executiondate || false);
          setValue("transfertokaidoc", value.transfertokaidoc || false);
        }
      }, [value, setValue]);

      //Робота за модальним вікном====================
            const [showModal, setShowModal] = useState(false);
            const handleOpenModal = () => setShowModal(true);
            const handleCloseModal = () => setShowModal(false);

            const handleTextSelect = (addittext) => {
                setValue('additionaltext', addittext); // або файл, або обʼєкт
                setValue('inputadditionaltext', addittext.text); // показати у полі
                clearErrors(['additionaltext', 'inputadditionaltext']);
                // setErrorFile(false);
              };
            
              const clearText = () => {
                setValue('inputadditionaltext', '');
                setValue('additionaltext', null); // або файл, або обʼєкт
              };

              const [showModalResult, setShowModalResult] = useState(false);
            const handleOpenModalResult = () => setShowModalResult(true);
            const handleCloseModalResult = () => setShowModalResult(false);

            const handleResultSelect = (res) => {
                setValue('additionalresult', res); 
                setValue('inputadditionalresult', res.doc); 
                clearErrors(['additionalresult', 'inputadditionalresult']);
              };
            
              const clearResult = () => {
                setValue('inputadditionalresult', '');
                setValue('additionalresult', null); 
              };

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
    <div className="AdditionallyBlockWrapper mt-3 mb-3" style={style}>
    <Form onSubmit={handleSubmit(() => {})} className='AdditionallyBlockForm'>
        <Row className="row-cols-2 row-xl-1 row-lg-1 row-md-2 row-xs-2 additionally-row">

            <Col className="col-12 col-xl-6 col-lg-6 col-md-12 col-xs-12 relative-col">
                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-1">
                    <Form.Label className="checkBoxdescript">{t("labelcheckworkonadescriptionform")}</Form.Label>
                        <Form.Check
                            className="mb-0"
                            type="checkbox"
                            label={t("placeholderseparatepage")}
                            id={`separatepage`}
                            {...register('separatepage', { required: false})}
                        />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-1">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderanotherregister")}
                        id={`anotherregister`}
                        {...register('anotherregister', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mt-3  mb-1">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderanotheraddition1")}
                        id={`anotheraddition1`}
                        {...register('anotheraddition1', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-1">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderanotheraddition2")}
                        id={`anotheraddition2`}
                        {...register('anotheraddition2', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-1">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderanotheraddition3")}
                        id={`anotheraddition3`}
                        {...register('anotheraddition3', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupAdditionalTextStyle mt-3">
                    <Form.Label>{t("labeladditionaltext")}</Form.Label>
                    <div className="inputSelectAdditionalText">
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                readOnly
                                size="sm"
                                type="text"
                                placeholder={t("placeholderadditionaltext")}
                                {...register('inputadditionaltext', { required: t("erroradditionaltext") })}
                                isInvalid={!!errors.inputadditionaltext}
                                />
                                    {errors.inputadditionaltext && (
                                        <Form.Text className="text-danger">{errors.inputadditionaltext.message}</Form.Text>
                                    )}
                        </div>
                                <span className="btnHiddenInput" onClick={handleOpenModal}>...</span>
                                <span className="btnHiddenInput" onClick={clearText}>X</span>
                    </div>
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mt-4 mb-1">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderseparateline")}
                        id={`separateline`}
                        {...register('separateline', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupAdditionalResultStyle">
                    <Form.Label>{t("labeladditionalresult")}</Form.Label>
                    <div className="inputSelectAdditionalResult">
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                readOnly
                                size="sm"
                                type="text"
                                placeholder={t("placeholderadditionalresult")}
                                {...register('inputadditionalresult', { required: t("erroradditionalresult") })}
                                isInvalid={!!errors.inputadditionalresult}
                                />
                                    {errors.inputadditionalresult && (
                                        <Form.Text className="text-danger">{errors.inputadditionalresult.message}</Form.Text>
                                    )}
                        </div>
                                <span className="btnHiddenInput" onClick={handleOpenModalResult}>...</span>
                                <span className="btnHiddenInput" onClick={clearResult}>X</span>
                    </div>
                </Form.Group>
                
            </Col>

            <Col className="col-12 col-xl-6 col-lg-6 col-md-12 col-xs-12">
                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-2">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderbycategory")}
                        id={`bycategory`}
                        {...register('bycategory', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-2">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholdercreatingreport")}
                        id={`creatingreport`}
                        {...register('creatingreport', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock mb-2">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholderexecutiondate")}
                        id={`executiondate`}
                        {...register('executiondate', { required: false})}
                    />
                </Form.Group>

                <Form.Group className="formGroupCheckBoxAdditionallyBlock">
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholdertransfertokai")}
                        id={`transfertokaidoc`}
                        {...register('transfertokaidoc', { required: false})}
                    />
                </Form.Group>
            </Col>
        </Row>

    </Form>
    <AdditionallyBlockModal show={showModal} close={handleCloseModal} onSelect={handleTextSelect} />
    <AdditionallyBlockResultModal show={showModalResult} close={handleCloseModalResult} onSelect={handleResultSelect} />
    </div>
  );
});

export default AdditionallyBlock;
