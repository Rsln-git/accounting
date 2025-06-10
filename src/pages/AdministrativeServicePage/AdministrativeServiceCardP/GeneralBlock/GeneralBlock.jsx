import "./GeneralBlock.css";
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import ThematicModal from "./ThematicAreaModal/ThematicModal";
import CategoryModal from "./CategoryModal/CategoryModal";
import TabModal from "./TabModal/TabModal";
import ResultModal from "./ResultModal/ResultModal";
import EventModal from "./EventModal/EventModal";
import TextSmsModal from "./TextSmsModal/TextSmsModal";
import TextDescriptionModal from "./TextDescriptionModal/TextDescriptionModal";

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
      setValue('resultinput', value.resultinput || "");
      setValue('result', value.result);
      setValue('eventinput', value.eventinput || "");
      setValue('event', value.event);
      setValue("checkstopping", value.checkstopping || false);
      setValue("daysstoppinginput", value.daysstoppinginput || "");
      setValue("typedaysstopping", value.typedaysstopping || "");
      setValue("typestopping", value.typestopping || "");
      setValue("checkintermediateanswer", value.checkintermediateanswer || false);
      setValue("intermediateanswerinput", value.intermediateanswerinput || "");
      setValue("typedaysсontinuation", value.typedaysсontinuation || "");
      setValue("textsmsinput", value.textsmsinput || "");
      setValue("textsms", value.textsms || "");
      setValue("textdescriptioninput", value.textdescriptioninput || "");
      setValue("textdescription", value.textdescription || "");
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

//   ResultInput===========================

        const [showModalResult, setShowModalResult] = useState(false);
        const handleOpenModalResult = () => setShowModalResult(true);
        const handleCloseModalResult = () => setShowModalResult(false);

        const handleResultSelect = (result) => {
            setValue("result", result);
            setValue("resultinput", result.name);
            clearErrors(["result", "resultinput"]);
        };

        const clearResult = () => {
            setValue('resultinput', '');
            setValue('result', null);
        };

//   EventInput===========================

        const [showModalEvent, setShowModalEvent] = useState(false);
        const handleOpenModalEvent = () => setShowModalEvent(true);
        const handleCloseModalEvent = () => setShowModalEvent(false);

        const handleEventSelect = (result) => {
            setValue("event", result);
            setValue("eventinput", result.name);
            clearErrors(["event", "eventinput"]);
        };

        const clearEvent = () => {
            setValue('eventinput', '');
            setValue('event', null);
        };

//   EventInput===========================

        const [showModalTextSms, setShowModalTextSms] = useState(false);
        const handleOpenModalTextSms = () => setShowModalTextSms(true);
        const handleCloseModalTextSms = () => setShowModalTextSms(false);

        const handleTextSmsSelect = (textsms) => {
            setValue("textsms", textsms);
            setValue("textsmsinput", textsms.name);
            clearErrors(["textsms", "textsmsinput"]);
        };

        const clearTextSms = () => {
            setValue('textsmsinput', '');
            setValue('textsms', null);
        };

//   DescriptionInput===========================

        const [showModalTextDescription, setShowModalTextDescription] = useState(false);
        const handleOpenModalTextDescription = () => setShowModalTextDescription(true);
        const handleCloseModalTextDescription = () => setShowModalTextDescription(false);

        const handleTextDescriptionSelect = (textdesc) => {
            setValue("textdescription", textdesc);
            setValue("textdescriptioninput", textdesc.name);
            clearErrors(["textdescription", "textdescriptioninput"]);
        };

        const clearTextDescription = () => {
            setValue('textdescriptioninput', '');
            setValue('textdescription', null);
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
        <Form.Group className="formGroupCheckBoxPay">
            <Form.Label className="checkBoxPayLabel">{t("labelcheckboxpay")}</Form.Label>
                <Form.Check
                    className="mb-0"
                    type="checkbox"
                    label={t("placeholdercheckboxpay")}
                    id={`checkboxpay`}
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
                            placeholder={t("placeholdertab")}
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

        <Form.Group className="formGroupThematicStyle mt-3">
            <Form.Label>{t("labelresult")}</Form.Label>
                <div className="inputSelectThematic">
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Form.Control
                            readOnly
                            size="sm"
                            type="text"
                            placeholder={t("placeholderresult")}
                            {...register('resultinput', { required: t("errorresult") })}
                            isInvalid={!!errors.resultinput}
                            />
                                {errors.resultinput && (
                                    <Form.Text className="text-danger">{errors.resultinput.message}</Form.Text>
                                )}
                     </div>
                                <span className="btnHiddenInput" onClick={handleOpenModalResult}>...</span>
                                <span className="btnHiddenInput" onClick={clearResult}>X</span>
                 </div>
        </Form.Group>

        <div className="wrapperEventGroups">
            <Form.Group className="formGroupEvent">
                <Form.Label className="eventLabel">{t("labelevent")}</Form.Label>
                <div className="inputSelectThematic">
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                readOnly
                                size="sm"
                                type="text"
                                placeholder={t("placeholderevent")}
                                {...register('eventinput', { required: t("errorrinputevent") })}
                                isInvalid={!!errors.eventinput}
                                />
                                    {errors.eventinput && (
                                        <Form.Text className="text-danger">{errors.eventinput.message}</Form.Text>
                                    )}
                        </div>
                                    <span className="btnHiddenInput" onClick={handleOpenModalEvent}>...</span>
                                    <span className="btnHiddenInput" onClick={clearEvent}>X</span>
                    </div>
            </Form.Group>

            <Form.Group className="formGroupDaysEventStyle">
                <Form.Label>{t("labeldaysevent")}</Form.Label>
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                // readOnly
                                size="sm"
                                type="text"
                                placeholder={t("placeholderdaysevent")}
                                {...register('dayseventinput', { required: t("errorrdaysevent") })}
                                isInvalid={!!errors.dayseventinput}
                                />
                                    {errors.dayseventinput && (
                                        <Form.Text className="text-danger">{errors.dayseventinput.message}</Form.Text>
                                    )}
                    </div>
            </Form.Group>

            <Form.Group className="formGroupEventTypeDaysStyle">
                {/* <Form.Label className="ms-3">{t("labeltypedays")}</Form.Label> */}
                        <Form.Select
                            size="sm"
                            {...register('typedays', { required: t("errortypedays") })}
                            isInvalid={!!errors.typedays}
                            // defaultValue=""
                            >
                                {/* <option value="" disabled>
                                    {t("placeholdertypedaysdefault")}
                                </option> */}
                                <option value={1}>
                                    {t("placeholderworkdays")}
                                </option>
                                <option value={2}>
                                    {t("placeholdercalendarday")}
                                </option>
                        </Form.Select>
                                {errors.typedays && (
                                    <Form.Text className="text-danger">{errors.typedays.message}</Form.Text>
                                )}
            </Form.Group>
        </div>

        <div className="wrapperStoppingGroups mt-3">
            <Form.Group className="formGroupCheckBoxStopping">
                <Form.Label className="checkBoxStoppingLabel">{t("labelcheckboxstopping")}</Form.Label>
                    <Form.Check
                        className="mb-0"
                        type="checkbox"
                        label={t("placeholdercheckboxstopping")}
                        id={`checkboxstopping`}
                        {...register('checkstopping', { required: false})}
                    />
            </Form.Group>

            <Form.Group className="formGroupDaysStoppingStyle">
                {/* <Form.Label>{t("labeldaysstopping")}</Form.Label> */}
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder={t("placeholderdaysstopping")}
                                {...register('daysstoppinginput', { required: t("errorrdaysstopping") })}
                                isInvalid={!!errors.daysstoppinginput}
                                />
                                    {errors.daysstoppinginput && (
                                        <Form.Text className="text-danger">{errors.daysstoppinginput.message}</Form.Text>
                                    )}
                    </div>
            </Form.Group>

            <Form.Group className="formGroupStoppingTypeDaysStyle me-3">
                <Form.Select
                    size="sm"
                    {...register('typedaysstopping', { required: t("errortypedaysstopping") })}
                    isInvalid={!!errors.typedaysstopping}
                    >
                        <option value={1}>
                            {t("placeholderworkdays")}
                            </option>
                            <option value={2}>
                                {t("placeholdercalendarday")}
                            </option>
                    </Form.Select>
                        {errors.typedaysstopping && (
                            <Form.Text className="text-danger">{errors.typedaysstopping.message}</Form.Text>
                        )}
            </Form.Group>

            <Form.Group className="formGroupStoppingTypeStyle">
                <Form.Label>{t("labeltypestopping")}</Form.Label>
                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <Form.Select
                            size="sm"
                            {...register('typestopping', { required: t("errortypestopping") })}
                            isInvalid={!!errors.typestopping}
                            >
                                <option value={1}>
                                    {t("placeholdertypestopping1")}
                                </option>
                                <option value={2}>
                                    {t("placeholdertypestopping2")}
                                </option>
                                <option value={3}>
                                    {t("placeholdertypestopping3")}
                                </option>
                        </Form.Select>
                            {errors.typestopping && (
                                <Form.Text className="text-danger">{errors.typestopping.message}</Form.Text>
                            )}
                    </div>
            </Form.Group>
        </div>

        <div className="wrapperIntermediateAnswerGroups mt-3">
            <div className="IntermediateAnswerWrapperFirstBlock">
                <Form.Group className="formGroupCheckIntermediateAnswer">
                    <Form.Label className="checkBoxIntermediateAnswerLabel">{t("labelcheckboxintermediateanswer")}</Form.Label>
                        <Form.Check
                            className="mb-0"
                            type="checkbox"
                            label={t("placeholderintermediateanswer")}
                            id={`checkboxintermediateanswer`}
                            {...register('checkintermediateanswer', { required: false})}
                        />
                </Form.Group>

                <Form.Group className="formGroupIntermediateAnswerCountStyle me-3">
                    {/* <Form.Label>{t("labeldaysstopping")}</Form.Label> */}
                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder={t("placeholderdaysstopping")}
                                {...register('intermediateanswerinput', { required: t("errorrdaysstopping") })}
                                isInvalid={!!errors.intermediateanswerinput}
                            />
                                    {errors.intermediateanswerinput && (
                                        <Form.Text className="text-danger">{errors.intermediateanswerinput.message}</Form.Text>
                                    )}
                        </div>
                </Form.Group>

                <Form.Group className="formGroupIntermediateAnswerTypeDaysStyle">
                    <Form.Select
                        size="sm"
                        {...register('typedaysсontinuation', { required: t("errortypedaysstopping") })}
                        isInvalid={!!errors.typedaysсontinuation}
                        >
                            <option value={1}>
                                {t("placeholderworkdays")}
                                </option>
                                <option value={2}>
                                    {t("placeholdercalendarday")}
                                </option>
                        </Form.Select>
                            {errors.typedaysсontinuation && (
                                <Form.Text className="text-danger">{errors.typedaysсontinuation.message}</Form.Text>
                            )}
                </Form.Group>
            </div>

            <div className="IntermediateAnswerWrapperSecondBlock mt-3">
                <Form.Group className="formGroupTextSmsStyle">
                    <Form.Label>{t("labeltextsms")}</Form.Label>
                        <div className="inputTextSms">
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <Form.Control
                                    readOnly
                                    size="sm"
                                    type="text"
                                    placeholder={t("placeholdertextsms")}
                                    {...register('textsmsinput', { required: t("errortextsms") })}
                                    isInvalid={!!errors.textsmsinput}
                                    />
                                        {errors.textsmsinput && (
                                            <Form.Text className="text-danger">{errors.textsmsinput.message}</Form.Text>
                                        )}
                            </div>
                                        <span className="btnHiddenInput" onClick={handleOpenModalTextSms}>...</span>
                                        <span className="btnHiddenInput" onClick={clearTextSms}>X</span>
                        </div>
                </Form.Group>

                <Form.Group className="formGroupTextSmsStyle mt-3">
                    <Form.Label>{t("labeltextdescription")}</Form.Label>
                        <div className="inputTextSms">
                            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                <Form.Control
                                    readOnly
                                    size="sm"
                                    type="text"
                                    placeholder={t("placeholdertextdescription")}
                                    {...register('textdescriptioninput', { required: t("errortextdescription") })}
                                    isInvalid={!!errors.textdescriptioninput}
                                    />
                                        {errors.textdescriptioninput && (
                                            <Form.Text className="text-danger">{errors.textdescriptioninput.message}</Form.Text>
                                        )}
                            </div>
                                        <span className="btnHiddenInput" onClick={handleOpenModalTextDescription}>...</span>
                                        <span className="btnHiddenInput" onClick={clearTextDescription}>X</span>
                        </div>
                </Form.Group>
            </div>
        </div>

        <Button type="submit" variant="outline-dark" className="mt-4">{t("btnenter")}</Button>
    </Form>
        <ThematicModal show={showModalThematicArea} close={handleCloseModalThematic} onSelect={handleThematicAreaSelect}/>
        <CategoryModal show={showModalCategory} close={handleCloseModalCategory} onSelect={handleCategorySelect}/>
        <TabModal show={showModalTab} close={handleCloseModalTab} onSelect={handleTabSelect}/>
        <ResultModal show={showModalResult} close={handleCloseModalResult} onSelect={handleResultSelect}/>
        <EventModal show={showModalEvent} close={handleCloseModalEvent} onSelect={handleEventSelect}/>
        <TextSmsModal show={showModalTextSms} close={handleCloseModalTextSms} onSelect={handleTextSmsSelect}/>
        <TextDescriptionModal show={showModalTextDescription} close={handleCloseModalTextDescription} onSelect={handleTextDescriptionSelect}/>
  </div>;
}

export default GeneralBlock;
