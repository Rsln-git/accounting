import "./PortalBlock.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from "react";
import SelectGroupModal from "./SelectGroupModal/SelectGroupModal";

const PortalBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("portalblock");

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
          setValue("textarea", value.textarea || "");
          setValue("registerportal", value.registerportal || false);
          setValue("representativeperformer", value.representativeperformer || false);
          setValue("othersystem", value.othersystem || false);
          setValue("inputgoogleform", value.inputgoogleform || "");
          setValue("inputgooglesheet", value.inputgooglesheet || "");
          setValue("inputgoogleguid", value.inputgoogleguid || "");
          setValue("inputportalservice", value.inputportalservice || "");
          setValue("portalservice", value.portalservice || null);
        }
      }, [value, setValue]);

      //Робота за модальним вікном====================
            const [showModal, setShowModal] = useState(false);
            const handleOpenModal = () => setShowModal(true);
            const handleCloseModal = () => setShowModal(false);

            const handleGroupSelect = (group) => {
                setValue('portalservice', group); 
                setValue('inputportalservice', group.group);
                clearErrors(['portalservice', 'inputportalservice']);
                // setErrorFile(false);
              };
            
              const clearGroup = () => {
                setValue('inputportalservice', '');
                setValue('portalservice', null); 
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
    <div className="PortalBlockWrapper mt-3 mb-3" style={style}>
    <Form onSubmit={handleSubmit(() => {})} className='PortalBlockForm'>

                <Form.Group className="formGroupTextArea mt-2 mb-3">
                    <Form.Label>{t("labeltextarea")}</Form.Label>
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                size="sm"
                                as="textarea"
                                rows={4}
                                placeholder={t("placeholdertextarea")}
                                {...register('textarea', { required: t("errortextarea"),
                                    maxLength: {
                                        value: 400,
                                        message: t("errorlength")
                                      },
                                      pattern: {
                                        value: /^[A-Za-z0-9\s.,!?()'"«»\-:;]*$/,
                                        message: t("errorenglish")
                                      }
                                 })}
                                isInvalid={!!errors.textarea}
                                />
                                    {errors.textarea && (
                                        <Form.Text className="text-danger">{errors.textarea.message}</Form.Text>
                                    )}
                        </div>
                </Form.Group>

                <div className="EctronicServices">
                    <Form.Label className="labelBlock">{t("labelblock")}</Form.Label>

                    <Form.Group className="formGroupCheckBoxPortal mb-1">
                        <Form.Check
                            className="mb-0"
                            type="checkbox"
                            label={t("placeholderregisterportal")}
                            id={`registerportal`}
                            {...register('registerportal', { required: false})}
                        />
                    </Form.Group>

                    <Form.Group className="formGroupCheckBoxPortal mb-1">
                        <Form.Check
                            className="mb-0"
                            type="checkbox"
                            label={t("placeholderrepresentativeperformer")}
                            id={`representativeperformer`}
                            {...register('representativeperformer', { required: false})}
                        />
                    </Form.Group>

                    <Form.Group className="formGroupCheckBoxPortal mb-1">
                        <Form.Check
                            className="mb-0"
                            type="checkbox"
                            label={t("placeholderothersystem")}
                            id={`othersystem`}
                            {...register('othersystem', { required: false})}
                        />
                    </Form.Group>

                    <Form.Group className="formGroupGoogleFormStyle mt-3">
                        <Form.Label>{t("labelgoogleform")}</Form.Label>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder={t("placeholdergoogleform")}
                                    {...register('inputgoogleform', { required: t("errorgoogleform"),
                                        pattern: {
                                            value: /^https:\/\/docs\.google\.com\/forms\/.+$/i,
                                            message: t("errorvalidgoogleform")
                                          }
                                     })}
                                    isInvalid={!!errors.inputgoogleform}
                                    />
                                        {errors.inputgoogleform && (
                                            <Form.Text className="text-danger">{errors.inputgoogleform.message}</Form.Text>
                                        )}
                            </div>
                    </Form.Group>

                    <Form.Group className="formGroupGoogleSheetStyle mt-2">
                        <Form.Label>{t("labelgooglesheet")}</Form.Label>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder={t("placeholdergooglesheet")}
                                    {...register('inputgooglesheet', { required: t("errorgooglesheet"),
                                        pattern: {
                                            value: /^https:\/\/docs\.google\.com\/spreadsheets\/.+$/i,
                                            message: t("errorvalidgooglesheet")
                                          }
                                     })}
                                    isInvalid={!!errors.inputgooglesheet}
                                    />
                                        {errors.inputgooglesheet && (
                                            <Form.Text className="text-danger">{errors.inputgooglesheet.message}</Form.Text>
                                        )}
                            </div>
                    </Form.Group>

                    <Form.Group className="formGroupGoogleGuidStyle mt-2">
                        <Form.Label>{t("labelgoogleguid")}</Form.Label>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder={t("placeholdergoogleguid")}
                                    {...register('inputgoogleguid', { required: t("errorgoogleguid"),
                                        pattern: {
                                            value: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                                            message: t("errorguidinvalid")
                                          }
                                     })}
                                    isInvalid={!!errors.inputgoogleguid}
                                    />
                                        {errors.inputgoogleguid && (
                                            <Form.Text className="text-danger">{errors.inputgoogleguid.message}</Form.Text>
                                        )}
                            </div>
                    </Form.Group>

                    <Form.Group className="formGroupPortalServiceStyle mt-2">
                        <Form.Label>{t("labelportalservice")}</Form.Label>
                        <div className="inputBtnsPortalService">
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <Form.Control
                                    readOnly
                                    size="sm"
                                    type="text"
                                    placeholder={t("placeholderportalservice")}
                                    {...register('inputportalservice', { required: t("errorportalservice") })}
                                    isInvalid={!!errors.inputportalservice}
                                    />
                                        {errors.inputportalservice && (
                                            <Form.Text className="text-danger">{errors.inputportalservice.message}</Form.Text>
                                        )}
                            </div>
                                    <span className="btnHiddenInput" onClick={handleOpenModal}>...</span>
                                    <span className="btnHiddenInput" onClick={clearGroup}>X</span>
                        </div>
                    </Form.Group>
                </div>

    </Form>
    <SelectGroupModal show={showModal} close={handleCloseModal} onSelect={handleGroupSelect} />
    </div>
  );
});

export default PortalBlock;
