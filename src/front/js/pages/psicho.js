import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Psicho = () => {
  const { store, actions } = useContext(Context);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [years_of_experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  

  const First_NameChange = (e) => {
    setFirst_Name(e.target.value);
  };
  const LastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const PhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const EmailChange = (e) => {
    setEmail(e.target.value);
  };
  const PasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const SpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };
  const ExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  const DescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const PhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (password !== ConfirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const dataToSend = {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      specialty,
      years_of_experience,
      description,
     
    };
    await actions.signupPsico(dataToSend,photo);
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container-fluid text-center w-75">
        <div className="card">
          <div className="card-header">
            <strong>Psicólogo</strong>
          </div>
          <div className="card-body">
            <div className="fill-all p-2" role="alert">
              Por favor rellena todos los datos
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <label className="col-xl-6" htmlFor="first_Name">
                  <strong>Nombre</strong>
                  <input
                    type="text"
                    id="first_Name"
                    className="form-control"
                    aria-label="First name"
                    value={first_name}
                    onChange={First_NameChange}
                  />
                </label>
                <label className="col-xl-6" htmlFor="first_Name">
                  <strong>Email</strong>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    aria-label="email"
                    value={email}
                    onChange={EmailChange}
                  />
                </label>
                <label className="col-xl-6" htmlFor="lastName">
                  <strong>Apellido</strong>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    ariast_name_namea-label="Last name"
                    value={last_name}
                    onChange={LastNameChange}
                  />
                </label>
              </div>
              <div className="row">
                <label className="col-xl-6" htmlFor="password">
                  <strong>passwoord</strong>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    aria-label="First name"
                    value={password}
                    onChange={PasswordChange}
                  />
                </label>
                <label className="col-xl-6" htmlFor="rpasswrd">
                  <strong>Repetir contraseña</strong>
                  <input
                    type="password"
                    id="rpassword"
                    className="form-control"
                    aria-label="Last name"
                    value={ConfirmPassword}
                    onChange={ConfirmPasswordChange}
                  />
                </label>
              </div>
              <div className="row">
                <label className="col-xl-6" htmlFor="phone">
                  <strong>Teléfono</strong>
                  <input
                    type="number"
                    id="phone"
                    className="form-control"
                    aria-label="Last name"
                    value={phone_number}
                    onChange={PhoneChange}
                  />
                </label>
                <label htmlFor="especiality" className="col-xl-3">
                  <strong>Especialidad</strong>
                  <input
                    type="text"
                    id="especialidad"
                    className="form-control"
                    aria-label="Last name"
                    value={specialty}
                    onChange={SpecialtyChange}
                  />
                </label>
                <label htmlFor="years" className="form-label col-xl-3">
                  <strong>Años de experiencia</strong>
                  <input
                    type="number"
                    className="form-control number-input"
                    id="years"
                    placeholder="XXXXX"
                    value={years_of_experience}
                    onChange={ExperienceChange}
                  />
                </label>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <label>
                    <strong>Subir Foto:</strong>
                  </label>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      
                      onChange={PhotoChange}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <label htmlFor="message">
                    <strong>Descripción</strong>
                  </label>
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    cols="30"
                    rows="3"
                    value={description}
                    onChange={DescriptionChange}
                  ></textarea>
                  <p>Explica brevemente tu perfil como psicologo</p>
                </div>
              </div>
              <div className="card-footer text-body-secondary text-end py-2">
                <button type="button" className="btn btn-outline-dark">
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
