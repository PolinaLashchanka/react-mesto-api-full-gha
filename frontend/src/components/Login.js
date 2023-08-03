import React, { useState } from "react";
import Authorisation from "./Authorisation";

function Login({ onHandleLogin }) {
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
    onHandleLogin(email, password);
  };

  return (
    <Authorisation
      title="Вход"
      buttonName="Войти"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      email={email}
      password={password}
    />
  );
}

export default Login;
