import "./CustomAddModal.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useMemo, useEffect } from 'react';
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import axios from "../../../../../services/axiosInstance";

function CustomAddModal({show, close, value}) {
  const { t } = useTranslation("customaddmodal");

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      termOption: "timeofcontacting" // <- вибір за замовчуванням
    }
  });

    useEffect(() => {
      // При кожній зміні `value` оновлюємо значення форми
      if (value) {
        setValue("termOption", value.termOption);
        setValue("daysaddinput", value.daysaddinput || "");
        setValue("typedaysadd", value.typedaysadd || "");
        setValue("timetocontact", value.timetocontact || false);
        setValue("paymentamount", value.paymentamount || "");
        setValue("description", value.description || "");
      }
    }, [value, setValue]);

    const selectedOption = watch("termOption");

    const clearForm = ()=> {
        reset({
            termOption: "timeofcontacting",
            daysaddinput: "",
            typedaysadd: "1", // або "" якщо хочеш пусте
            timetocontact: false,
            paymentamount: "",
            description: "",
          });
    };

    const onSubmit = async (data) => {
        console.log("CustomAddModal ", data);
        const url = value ? "/editrout" : "/addrout";

        try {
            const response = await axios.post(url, data);
            console.log("Response: ", response);
        } catch (err) {
            console.log("Error: ", err);
        }
      };

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" size="lg" className="custoAddModalStyle">
        <Modal.Header closeButton>
            {value ? 
                <h5 className="mb-0">{t("titleedit")}</h5>
            :
                <h5 className="mb-0">{t("title")}</h5>
            }
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)} className='generalBlockForm' id="custom-form-1231">

                    <Form.Group className="formGroupTermOfServCheck me-3">
                        {/* <Form.Label className="checkBoxStoppingLabel">{t("labelcheckboxstopping")}</Form.Label> */}
                            <Form.Check
                                className="mb-0"
                                type="radio"
                                label={t("placeholdertimeofcontacting")}
                                id={`radioTimeOfContacting`}
                                value="timeofcontacting"
                                {...register('termOption', { required: true})}
                            />
                    </Form.Group>
                <div className="secondLineGroups">

                    <Form.Group className="formGroupTermOfServCheck me-5">
                        {/* <Form.Label className="checkBoxStoppingLabel">{t("labelcheckboxstopping")}</Form.Label> */}
                            <Form.Check
                                className="mb-0"
                                type="radio"
                                label={t("placeholdertermofserviceadd")}
                                id={`radioTermOfServiceAdd`}
                                value="termofserviceadd"
                                {...register('termOption', { required: true})}
                            />
                    </Form.Group>

                    <Form.Group className="formGroupTermOfServWrite me-3">
                        {/* <Form.Label>{t("labeldaysstopping")}</Form.Label> */}
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder={t("placeholderdaysadd")}
                                        disabled={selectedOption !== "termofserviceadd"}
                                        {...register('daysaddinput', { 
                                            required: selectedOption === "termofserviceadd" && t("errorrdaysadd"),
                                            maxLength: {
                                                value: 4,
                                                message: t("maxlengthddigitsbyallerror")
                                            }, 
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: t("errordigitsbyall")
                                            },
                                            validate: {
                                                notStartWithZero: (value) =>
                                                !value || value.charAt(0) !== '0' || t("errorstartfromzero")
                                            }
                                        })}
                                        isInvalid={!!errors.daysaddinput}
                                        />
                                            {errors.daysaddinput && (
                                                <Form.Text className="text-danger">{errors.daysaddinput.message}</Form.Text>
                                            )}
                            </div>
                    </Form.Group>

                    <Form.Group className="formGroupTermOfServSelect me-3">
                        <Form.Select
                            size="sm"
                            {...register('typedaysadd', { required: selectedOption === "termofserviceadd" && t("errortypedaysadd") })}
                            disabled={selectedOption !== "termofserviceadd"}
                            isInvalid={!!errors.typedaysadd}
                            >
                                <option value={1}>
                                    {t("placeholderworkdays")}
                                </option>
                                <option value={2}>
                                    {t("placeholdercalendarday")}
                                </option>
                            </Form.Select>
                                {errors.typedaysadd && (
                                    <Form.Text className="text-danger">{errors.typedaysadd.message}</Form.Text>
                                )}
                    </Form.Group>
                </div>
                    <Form.Group className="formGroupTermOfServTime mb-3 ms-3 mt-2">
                        {/* <Form.Label className="checkBoxStoppingLabel">{t("labelcheckboxstopping")}</Form.Label> */}
                            <Form.Check
                                className="mb-0"
                                type="checkbox"
                                label={t("placeholdertimetocontact")}
                                id={`checkboxtimetocontact`}
                                disabled={selectedOption !== "termofserviceadd"}
                                {...register('timetocontact', { required: false})}
                            />
                    </Form.Group>

                    <Form.Group className="formGroupPaymentAmount">
                        <Form.Label>{t("labelpaymentamount")}</Form.Label>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder={t("placeholdpayment")}
                                        disabled={selectedOption !== "termofserviceadd"}
                                        {...register('paymentamount', { 
                                            required: selectedOption === "termofserviceadd" && t("errorrdaysadd"),
                                            maxLength: {
                                                value: 10,
                                                message: t("maxlengthdigitspayerror")
                                            }, 
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: t("errordigitsbypay")
                                            },
                                            validate: {
                                                notStartWithZero: (value) =>
                                                !value || value.charAt(0) !== '0' || t("errorstartfromzero")
                                            }
                                        })}
                                        isInvalid={!!errors.paymentamount}
                                        />
                                            {errors.paymentamount && (
                                                <Form.Text className="text-danger">{errors.paymentamount.message}</Form.Text>
                                            )}
                            </div>
                    </Form.Group>

                    <Form.Group className="formGroupAddDescription mt-3">
                        <Form.Label>{t("labeldescript")}</Form.Label>
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder={t("placeholddescription")}
                                        // disabled={selectedOption !== "termofserviceadd"}
                                        {...register('description', { 
                                            required: selectedOption === "termofserviceadd" && t("errorrdaysadd"),
                                            maxLength: {
                                                value: 150,
                                                message: t("maxlengttdescrerror")
                                            }
                                        })}
                                        isInvalid={!!errors.description}
                                        />
                                            {errors.description && (
                                                <Form.Text className="text-danger">{errors.description.message}</Form.Text>
                                            )}
                            </div>
                    </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={clearForm} className="me-auto">
            {t("clear")}
            </Button>
            <Button type="submit" size="sm" variant="dark" form="custom-form-1231">
            {t("submit")}
            </Button>
            <Button size="sm" variant="secondary" onClick={close}>
            {t("close")}
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomAddModal;