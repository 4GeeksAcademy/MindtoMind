import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Usuario = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navegate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const dataToSend = { email, password, username };
      const success = actions.signupUsuario(dataToSend);

      if(success){
        
        alert("Usuario creado con éxito");
        navegate('/login')
      }
  };

  // username,email,password
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="container-fluid text-center w-50">
        <div className="card">
          <div className="card-header">
            <strong>Usuario</strong>
          </div>
          <div className="card-body">
            <div className="fill-all p-2" role="alert">
              Por favor rellena todos los datos
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-xl-12" htmlFor="username">
                  <strong>Nombre de Usuario</strong>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    aria-label="User Name"
                    value={username}
                    onChange={handleUserNameChange}
                    required
                  />
                </label>
              </div>
              <div className="row">
                <label className="col-xl-12" htmlFor="Email">
                  <strong>Email</strong>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    aria-label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </label>
              </div>
              <div className="row">
                <label className="col-xl-6" htmlFor="password">
                  <strong>Contraseña</strong>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="form-control"
                    aria-label="password"
                    required
                  />
                </label>
                <label htmlFor="confirmPassword" className="col-xl-6">
                  <strong>Repetir contraseña</strong>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    aria-label="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </label>
              </div>
              <div className="card-footer text-body-secondary text-end py-2">
                <button type="button" className="btn btn-outline-dark">
                  <a href='/'>Cancelar</a>
                </button>
                <button type="submit" className="btn btn-outline-primary ms-2">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
