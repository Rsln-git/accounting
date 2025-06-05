import "./authorize.css";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../../services/authService';
import openEye from "../../../assets/eye-open.png";
import closeEye from "../../../assets/eye-close.png";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/AuthContext";
import parseJwt from "../../../services/parseJwt";
import { useNavigate } from "react-router";

function Authorize() {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation("authorize");
    const { login: loginContext } = useAuth(); // ← виклик з контексту
    const navigate = useNavigate();

    const showPass = ()=> setShowPassword((prev)=>!prev);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data.useremail, data.password);
      const decoded = parseJwt(res.accessToken); // декодуємо токен
      loginContext(decoded); // зберігаємо в контексті
      navigate("/");
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='authorizeFormStyle'>
        <Form.Group>
          <Form.Label>{t("labelemail")}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t("placeholderemail")}
            {...register('useremail', { required: t("erroremail") })}
            isInvalid={!!errors.useremail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.useremail?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>{t("labelpassword")}</Form.Label>
          <div className="inputWrapper">
            <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder={t("placeholderpassword")}
            {...register('password', { required: t("errorpassword") })}
            isInvalid={!!errors.password}
            />
            <img
            className="eyeStyle"
            src={showPassword ? closeEye : openEye}
            onClick={showPass}
            alt="toggle password"
            />
        </div>
            {errors.password && (
             <Form.Text className="text-danger">{errors.password.message}</Form.Text>
            )}
        </Form.Group>

      <Button type="submit" variant="outline-dark" className="mt-4">{t("btnenter")}</Button>
    </Form>
  );
}

export default Authorize;
