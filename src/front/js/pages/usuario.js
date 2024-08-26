import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { BiColor } from "react-icons/bi";

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
  const handlehome = (e) => {
    navegate('/')

  }

  // username,email,password
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="container-fluid text-center w-50">
        <div className="card">
          <div className="card-header">
            <strong className="branco">Usuario</strong>
          </div>
          <div className="card-body">
            <div  className="fill-all p-2 meutexto" role="alert">
              Por favor rellena todos los datos
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-xl-12" htmlFor="username">
                  <strong className="branco">Nombre de Usuario</strong>
                  <input
                    type="text"
                    id="username"
                    placeholder="Nombre de Usuario"
                    className="form-control branco"
                    aria-label="User Name"
                    value={username}
                    onChange={handleUserNameChange}
                    required
                  />
                </label>
              </div>
              <div className="row">
                <label className="col-xl-12" htmlFor="Email">
                  <strong className="branco">Correo electronico</strong>
                  <input
                    type="email"
                    id="email"
                    className="form-control branco"
                    placeholder="Correo electronico"
                    aria-label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </label>
              </div>
              <div className="row">
                <label className="col-xl-6" htmlFor="password">
                  <strong className="branco">Contraseña</strong>
                  <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    className="form-control branco"
                    aria-label="password"
                    required
                  />
                </label>
                <label htmlFor="confirmPassword" className="col-xl-6">
                  <strong className="branco">Repetir contraseña</strong>
                  <input
                    type="password"
                    placeholder="Repetir contraseña"
                    id="confirmPassword"
                    className="form-control branco"
                    aria-label="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </label>
              </div>
              <div className="card-footer text-body-secondary text-end py-2">
                <button  onClick={handlehome} className="btn btn-outline-primary">
                  Cancelar
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
