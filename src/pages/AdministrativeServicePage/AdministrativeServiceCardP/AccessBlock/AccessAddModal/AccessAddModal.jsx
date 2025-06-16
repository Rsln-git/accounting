import "./AccessAddModal.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useMemo, useEffect } from 'react';
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import axios from "../../../../../services/axiosInstance";

function AccessAddModal({show, close, value}) {
  const { t } = useTranslation("accessmodal");

  const [performers, setPerformers] = useState([
    {id: 4, performer: "Виконавець ЕЦП", performerId: 2},
    {id: 5, performer: "Виконавець ДКД", performerId: 3},
    {id: 6, performer: "Виконавець ОБЛ", performerId: 4}]);
    const [users, setUsers] = useState([
        {id: 1, user: "Admin", userId: 1},
        {id: 2, user: "User", userId: 2},
        {id: 3, user: "Moder", userId: 3}]);

  const {
    register,
    watch,
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
        setValue("typeperformer", value.performerId);
        setValue("typeuser", value.userId);
      }
    }, [value, setValue]);

    const clearForm = ()=> {
        reset({
            typeperformer: "",
            typeuser: "",
          });
    };

    const onSubmit = async (data) => {
        console.log("AccessAddModal ", data);
        // const url = value ? "/editrout" : "/addrout";

        // try {
        //     const response = await axios.post(url, data);
        //     console.log("Response: ", response);
        // } catch (err) {
        //     console.log("Error: ", err);
        // }
      };

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" size="md" className="AccessAddModalStyle">
        <Modal.Header closeButton>
            {value ? 
                <h5 className="mb-0">{t("titleedit")}</h5>
            :
                <h5 className="mb-0">{t("title")}</h5>
            }
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)} className='AccessBlockForm' id="access-form-1232">

                    <Form.Group className="formGroupAccessSelect">
                        <Form.Label>{t("labelperformer")}</Form.Label>
                            <Form.Select
                                size="sm"
                                {...register('typeperformer', { required: t("errortypepeform") })}
                                isInvalid={!!errors.typeperformer}
                                >
                                    <option value="">{t("placeholderselect")}</option>
                                    {performers.map((item) => (
                                        <option key={item.id} value={item.performerId}>
                                        {item.performer}
                                        </option>
                                    ))}
                                </Form.Select>
                                    {errors.typeperformer && (
                                        <Form.Text className="text-danger">{errors.typeperformer.message}</Form.Text>
                                    )}
                    </Form.Group>

                    <Form.Group className="formGroupAccessSelect mt-3">
                        <Form.Label>{t("labeluser")}</Form.Label>
                            <Form.Select
                                size="sm"
                                {...register('typeuser', { required: t("errortypeuser") })}
                                isInvalid={!!errors.typeuser}
                                >
                                    <option value="">{t("placeholderselect")}</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.userId}>
                                        {user.user}
                                        </option>
                                ))}
                            </Form.Select>
                    {errors.typeuser && (
                    <Form.Text className="text-danger">
                        {errors.typeuser.message}
                    </Form.Text>
                    )}
                </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={clearForm} className="me-auto">
            {t("clear")}
            </Button>
            <Button type="submit" size="sm" variant="dark" form="access-form-1232">
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

export default AccessAddModal;