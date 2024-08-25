import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const PhSingle = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    specialty: "",
    years_of_experience: "",
    photo: "",
    description: ""
  });

  useEffect(() => {
    const id = localStorage.getItem("idPsyco");
    actions.getPsychologistById(id);
  }, []);

  useEffect(() => {
    if (store.psychologist) {
      setFormData({
        first_name: store.psychologist.first_name || "",
        last_name: store.psychologist.last_name || "",
        phone_number: store.psychologist.phone_number || "",
        email: store.psychologist.email || "",
        specialty: store.psychologist.specialty || "",
        years_of_experience: store.psychologist.years_of_experience || "",
        photo: store.psychologist.photo || "",
        description: store.psychologist.description || ""
      });
    }
  }, [store.psychologist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    actions.updatePsico(formData);
    const modalElement = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };
  const handletwo = () =>{
      
      
      actions.deletePsico(id);
      actions.logout();
   
      navigate(`/`)
    

  }

  return (
    <div>

      <button type="button" className="btn btn-primary me-2" onClick={handletwo}>Eliminar cuenta</button>
      
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@fat"
        onClick={handleSubmit}
      >
        Edita tu perfil
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="first_name" className="col-form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="col-form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone_number" className="col-form-label">
                    Telefono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="specialty" className="col-form-label">
                    Especialidad
                  </label>
                  <textarea
                    className="form-control"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="Especialidad"
                    type="text"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="years_of_experience" className="col-form-label">
                    Años de experiencia
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="years_of_experience"
                    name="years_of_experience"
                    value={formData.years_of_experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="col-form-label">
                    Foto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="photo"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">
                    Descripcion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Esta es la vista */}

      <div className="container d-flex  ">
        <div className="left">
          <img src={formData.photo} className="profile-img" alt="Profile" />
          <div className="name">
            Soy, Dr/a {formData.first_name} {formData.last_name}
          </div>
          <div className="image-credit">
            <i className="fa-solid fa-phone"></i> {formData.phone_number}
          </div>
          <div className="image-credit">email: {formData.email}</div>
        </div>
        <div className="right">
          <div className="description">
            Especialidad: {formData.specialty} | Años de Experiencia: {formData.years_of_experience}
          </div>
          <div className="details">{formData.description}</div>
        </div>
      </div>
    </div>
  );
};

