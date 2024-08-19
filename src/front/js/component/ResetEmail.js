import React from "react";
import { useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ResetEmail= () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook de navegación

    return(
    <div className="container">
        <form>
            <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label mt-3">
                        Correo Electrónico
                    </label>
                    <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
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
}

