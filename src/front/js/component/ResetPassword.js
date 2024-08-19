import React from "react";
import { useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ResetPassword= () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook de navegación

    return(
<div className="container">
    <form>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
                Contraseña
            </label>
            <input
                type="password"
                className="form-control"
                id="exampleInputPassword"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
                Repite la Contraseña
            </label>
            <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
            />
        </div>
        <button
        type="submit"
        className="btn btn-outline-primary submit-login mb-2"
        >
        Enviar
        </button>
  </form>      
</div>
    );
};

    