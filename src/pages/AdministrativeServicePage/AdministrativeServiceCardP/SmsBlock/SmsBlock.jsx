import "./SmsBlock.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from "react";
import SmsModal from "./SmsModal/SmsModal";

const SmsBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("smsblock");

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
          setValue("checksuccess", value.checksuccess || false);
          setValue("smstextinput", value.smstextinput.name || "");
          setValue("smstext", value.smstext || "");
        }
      }, [value, setValue]);

      const [showModalSms, setShowModalSms] = useState(false);
      const handleOpenModalSms = () => setShowModalSms(true);
      const handleCloseModalSms = () => setShowModalSms(false);

      const handleSmsSelect = (sms) => {
          setValue("smstext", sms);
          setValue("smstextinput", sms.text);
          clearErrors(["smstext", "smstextinput"]);
      };

      const clearSms = () => {
          setValue('smstextinput', '');
          setValue('smstext', null);
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
    <div className="SmsBlockWrapper mt-3 mb-3" style={style}>
    <Form onSubmit={handleSubmit(() => {})} className='SmsBlockForm'>

        <Form.Group className="formGroupCheckBoxSuccess">
            <Form.Label className="checkBoxSuccessLabel">{t("labelcheckboxsuccess")}</Form.Label>
                <Form.Check
                    className="mb-0"
                    type="checkbox"
                    label={t("placeholdercheckboxsuccess")}
                    id={`checkboxsuccess`}
                    {...register('checksuccess', { required: false})}
                />
            </Form.Group>

            <Form.Group className="formGroupSuccessSmsStyle mt-3">
                <Form.Label>{t("labelsuccesssms")}</Form.Label>
                    <div className="inputSelectSms">
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                readOnly
                                size="sm"
                                type="text"
                                placeholder={t("placeholdersuccesssms")}
                                {...register('smstextinput', { required: t("errorsmstext") })}
                                isInvalid={!!errors.smstextinput}
                                />
                                    {errors.smstextinput && (
                                        <Form.Text className="text-danger">{errors.smstextinput.message}</Form.Text>
                                    )}
                        </div>
                                    <span className="btnHiddenInput" onClick={handleOpenModalSms}>...</span>
                                    <span className="btnHiddenInput" onClick={clearSms}>X</span>
                    </div>
            </Form.Group>

    </Form>
        <SmsModal show={showModalSms} close={handleCloseModalSms} onSelect={handleSmsSelect} />
    </div>
  );
});

export default SmsBlock;
