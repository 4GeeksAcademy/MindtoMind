import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import "../../styles/single.css";

export const TrSingle = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [dataPsico] = useState(
    store.psychologists.filter((elm) => elm.id == id)[0]
  );

  return (
    <div className="container d-flex  ">
      <div className="left w-50">
        {/* {dataPsico ? : } */}
        <img src={dataPsico.photo} className="profile-img" />
        <div className="name">
          Soy, Dr/a {dataPsico.first_name} {dataPsico.last_name}
        </div>
        <div className="image-credit ">
          <BsTelephone /> {dataPsico.phone_number}
        </div>
        <div className="image-credit  text-start">
          <BsEnvelope /> {dataPsico.email}
        </div>
      </div>
      <div className="right">
        <div className="description">
          Especialidad: {dataPsico.specialty} | Años de Experiencia:{" "}
          {dataPsico.years_of_experience}
        </div>
        <div className="details ms-4 me-4">{dataPsico.description}</div>
      </div>
    </div>
  );
};
