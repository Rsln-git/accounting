import "./RegulationsBlock.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from "react";

const RegulationsBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("regulationsblock");

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
          setValue("placeholderregulations", value.placeholderregulations || false);
        }
      }, [value, setValue]);

    //   const [showModalSms, setShowModalSms] = useState(false);
    //   const handleOpenModalSms = () => setShowModalSms(true);
    //   const handleCloseModalSms = () => setShowModalSms(false);

    //   const handleSmsSelect = (sms) => {
    //       setValue("smstext", sms);
    //       setValue("smstextinput", sms.text);
    //       clearErrors(["smstext", "smstextinput"]);
    //   };

    //   const clearSms = () => {
    //       setValue('smstextinput', '');
    //       setValue('smstext', null);
    //   };

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
    <div className="RegulationsBlockWrapper mt-3 mb-3" style={style}>
    <Form onSubmit={handleSubmit(() => {})} className='RegulationsBlockForm'>

        <Form.Group className="formGroupCheckBoxRegulations">
            {/* <Form.Label className="checkBoxSuccessLabel">{t("labelcheckboxsuccess")}</Form.Label> */}
                <Form.Check
                    className="mb-0"
                    type="checkbox"
                    label={t("placeholderregulations")}
                    id={`regulations`}
                    {...register('placeholderregulations', { required: false})}
                />
            </Form.Group>

    </Form>
    </div>
  );
});

export default RegulationsBlock;
