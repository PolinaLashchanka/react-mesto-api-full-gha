import React, { useState } from "react";
import Authorisation from "./Authorisation";
import { Link } from "react-router-dom";

function Register({ onHandleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    onHandleRegister(email, password);
  };

  return (
    <Authorisation
      title="Регистрация"
      buttonName="Зарегистироваться"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      email={email}
      password={password}
    >
      <Link to="/sign-in" className="authorisation__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </Authorisation>
  );
}

export default Register;
