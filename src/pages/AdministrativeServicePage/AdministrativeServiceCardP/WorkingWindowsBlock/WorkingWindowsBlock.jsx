import "./WorkingWindowsBlock.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from "react";

const WorkingWindowsBlock = forwardRef(({ style, value }, ref) => {
  const { t } = useTranslation("workingwindowsblock");

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
          setValue("checkselected", value.checkselected || false);
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
    <div className="WorkingWindowsBlockWrapper mt-3 mb-3" style={style}>
    <Form onSubmit={handleSubmit(() => {})} className='WorkingWindowsBlockForm'>

        <Form.Group className="formGroupCheckBoxSelected">
            {/* <Form.Label className="checkBoxSuccessLabel">{t("labelcheckboxsuccess")}</Form.Label> */}
                <Form.Check
                    className="mb-0"
                    type="checkbox"
                    label={t("placeholdercheckselected")}
                    id={`checkboxselected`}
                    {...register('checkselected', { required: false})}
                />
            </Form.Group>

    </Form>
    </div>
  );
});

export default WorkingWindowsBlock;
