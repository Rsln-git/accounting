import "./StaticBlockCard.css";
import { useTranslation } from "react-i18next";
// import { Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";
import ExecutorsModal from "./ExecutorModal/ExecutorModal";
import { forwardRef, useImperativeHandle } from "react";

const StaticBlockCard = forwardRef(({ value, send }, ref) => {
  const { t } = useTranslation("staticblockcard");
//   const hiddenInputRef = useRef(null);
//   const [errorFile, setErrorFile] = useState(false);
//   const [fileInput, setFileInput] = useState();

  //Робота за модальним вікном====================
  const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  

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
      setValue("code", value.code || true);
      setValue("codediia", value.codediia || "");
      setValue("typeservice", value.typeservice || "");
      setValue('inputNameExecutor', value.name || "");
      setValue('executor', value.executor);
    }
  }, [value, setValue]);

  const handleExecutorSelect = (executor) => {
    setValue('executor', executor); // або файл, або обʼєкт
    setValue('inputNameExecutor', executor.name); // показати у полі
    clearErrors(['executor', 'inputNameExecutor']);
    // setErrorFile(false);
  };

  const clearExecutor = () => {
    setValue('inputNameExecutor', '');
    setValue('executor', null); // або файл, або обʼєкт
  };


        // Доступ ззовні: submitForm()
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
    <div className="StatickBlockCardWrapper mt-3">
    <Form onSubmit={handleSubmit(() => {})} className="staticBlockForm">

        <div className="inputWrapper">
            <Form.Group className="formGroupStaticStyle">
                <Form.Label>{t("labelcode")}</Form.Label>
                    <div className="styleInputError" style={{display: "flex", flexDirection: "column"}}>
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder={t("placeholdercode")}
                            {...register('code', { 
                                required: t("errorcode"),
                                maxLength: {
                                    value: 25,
                                    message: t("maxlengthcodeerror")
                                }, 
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: t("errordigitscode")
                                }
                            })}
                            isInvalid={!!errors.code}
                            />
                                {errors.code && (
                                    <Form.Text className="text-danger">{errors.code.message}</Form.Text>
                                )}
                    </div>
            </Form.Group>

            <Form.Group className="formGroupStaticStyle">
                <Form.Label className="ms-3">{t("labeldiiacode")}</Form.Label>
                    <div className="styleInputError" style={{display: "flex", flexDirection: "column"}}>
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder={t("placeholderdiiacode")}
                            {...register('diiacode', { 
                                required: t("errordiiacode"),
                                maxLength: {
                                    value: 25,
                                    message: t("maxlengthcodeerror")
                                }, 
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: t("errordigitscode")
                                } 
                            })}
                            isInvalid={!!errors.diiacode}
                            />
                                {errors.diiacode && (
                                    <Form.Text className="text-danger">{errors.diiacode.message}</Form.Text>
                                )}
                    </div>
            </Form.Group>

            <Form.Group className="selectStyle">
                <Form.Label className="ms-3">{t("labeltypeservice")}</Form.Label>
                    <div className="styleInputError" style={{display: "flex", flexDirection: "column"}}>
                        <Form.Select
                            size="sm"
                            {...register('typeservice', { required: t("errortypeservice") })}
                            isInvalid={!!errors.typeservice}
                            >
                                <option value="" disabled>
                                    {t("placeholderselect")}
                                </option>
                                <option value="12345">
                                    Test
                                </option>
                                    {/* {types.map((type) => (
                                        <option key={type.value_type} value={type.value_type}>
                                        {type.name_type}
                                        </option>
                                    ))} */}
                        </Form.Select>
                                {errors.typeservice && (
                                    <Form.Text className="text-danger">{errors.typeservice.message}</Form.Text>
                                )}
                    </div>
            </Form.Group>

        </div>

        <Form.Group className="formGroupStaticStyle mt-3">
            <Form.Label>{t("labelservicetext")}</Form.Label>
                <div className="styleInputError" style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <Form.Control
                        size="sm"
                        as="textarea"
                        placeholder={t("placeholderservicetext")}
                        {...register('servicetext', { required: t("errorservicetext") })}
                        isInvalid={!!errors.servicetext}
                        style={{ height: '60px' }}
                        />
                            {errors.servicetext && (
                                <Form.Text className="text-danger">{errors.servicetext.message}</Form.Text>
                            )}
                </div>
        </Form.Group>

        {/* <div className="inputExecutor"> */}

                <Form.Group className="formGroupStaticStyle mt-3">
                    <Form.Label>{t("labelexecutor")}</Form.Label>
                    <div className="inputSelectExecutor">
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                readOnly
                                size="sm"
                                type="text"
                                placeholder={t("placeholderexecutor")}
                                {...register('inputNameExecutor', { required: t("errorexecutor") })}
                                isInvalid={!!errors.inputNameExecutor}
                                />
                                    {errors.inputNameExecutor && (
                                        <Form.Text className="text-danger">{errors.inputNameExecutor.message}</Form.Text>
                                    )}
                        </div>
                                <span className="btnHiddenInput" onClick={handleOpenModal}>...</span>
                                <span className="btnHiddenInput" onClick={clearExecutor}>X</span>
                    </div>
                </Form.Group>
        {/* </div> */}
            
            <Button hidden type="submit" variant="outline-dark" className="mt-4">{t("btnenter")}</Button>
    </Form>
    <ExecutorsModal show={showModal} close={handleCloseModal} onSelect={handleExecutorSelect} />
    </div>
  );
});

export default StaticBlockCard;
