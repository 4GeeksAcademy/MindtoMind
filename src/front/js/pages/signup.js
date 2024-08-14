import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Usuario</h5>
              <p className="card-text">
                Necesitas ayuda con problemas de ansiedad o depresión con una IA
                o buscar un profesional, registrate con nosotros.
              </p>
              <a href="/usuario" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Psicólogo</h5>
              <p className="card-text">
                Eres un profesional de la Psicología? Quieres ofrecer tus
                servicios? Registrate acá!.
              </p>
              <a href="/psicho" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
