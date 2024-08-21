import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, Navigate } from "react-router-dom";

export const Psicho = () => {
    const { store, actions } = useContext(Context);
    const apiUrl = process.env.BACKEND_URL + "/api";

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        specialty: '',
        years_of_experience: '',
        description: '',
        password: '',
        photo: null,
    });
    const [responseMessage, setResponseMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0], 
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        // Agregar los datos del formulario al FormData
        data.append("first_name", formData.first_name);
        data.append("last_name", formData.last_name);
        data.append("phone_number", formData.phone_number);
        data.append("email", formData.email);
        data.append("specialty", formData.specialty);
        data.append("description", formData.description);
        data.append("password", formData.password);
        data.append("years_of_experience", formData.years_of_experience);
        data.append("photo", formData.photo); // Agregar el archivo al FormData
        try {
            const response = await fetch(apiUrl + "/register_psychologist", {
                method: 'POST',          
                body: data,
            });
            const result = await response.json();
            setResponseMessage(result.message || "Success");
        } catch (error) {
            setResponseMessage('An error occurred: ' + error.message);
        }
        
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
                    className="form-control"
                    aria-label="First name"
                    value={formData.first_name}
                    onChange={handleChange}
                    name="first_name"
                    placeholder="First Name"
                    required
                  />
                </label>
                <label className="col-xl-6" htmlFor="first_Name">
                  <strong>Email</strong>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="email"
                    aria-label="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label className="col-xl-6" htmlFor="lastName">
                  <strong>Apellido</strong>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    ariast_name_namea-label="Last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    name="last_name"
                    placeholder="Apellido"
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
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Contraseña"
                  />
                </label>
                {/* <label className="col-xl-6" htmlFor="rpasswrd">
                  <strong>Repetir contraseña</strong>
                  <input
                    type="password"
                    id="rpassword"
                    className="form-control"
                    aria-label="Last name"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                  />
                </label> */}
              </div>
              <div className="row">
                <label className="col-xl-6" htmlFor="phone">
                  <strong>Teléfono</strong>
                  <input
                    type="number"
                    id="phone"
                    className="form-control"
                    aria-label="Last name"
                    value={formData.phone_number}
                    onChange={handleChange}
                    name="phone_number"
                    placeholder="Numero de telefono"
                  />
                </label>
                <label htmlFor="especiality" className="col-xl-3">
                  <strong>Especialidad</strong>
                  <input
                    type="text"
                    id="especialidad"
                    className="form-control"
                    aria-label="Last name"
                    value={formData.specialty}
                    onChange={handleChange}
                    name="specialty"
                    placeholder="Especialidad"
                  />
                </label>
                <label htmlFor="years" className="form-label col-xl-3">
                  <strong>Años de experiencia</strong>
                  <input
                    type="number"
                    className="form-control number-input"
                    id="years"
                    placeholder="XXXXX"
                    value={formData.years_of_experience}
                    onChange={handleChange}
                    name="years_of_experience"
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
                      name="photo"
                      className="form-control"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      onChange={handleFileChange}
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
                    name="description"
                    id="message"
                    cols="30"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripcion"
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
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}




