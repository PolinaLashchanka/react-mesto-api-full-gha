import React from "react";

function Authorisation({
  title,
  buttonName,
  handleSubmit,
  handleChange,
  email,
  password,
  children
}) {
  return (
    <div className="authorisation">
      <div className="authorisation__container">
        <h2 className="authorisation__title">{title}</h2>
        <form
          id="authorisation"
          className="authorisation__form"
          name="authorisation"
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            className="authorisation__form-item"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            id="password"
            className="authorisation__form-item"
            name="password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <button
            className="button authorisation__form_submit-button"
            type="submit"
          >
            {buttonName}
          </button>
        </form>
        {children}
      </div>
    </div>
  );
}

export default Authorisation;
