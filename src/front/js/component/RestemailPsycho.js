import React from "react";
import { useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/resetemail.css";
import { BsEnvelope } from "react-icons/bs";

export const ResetEmail= () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook de navegación

    async function submitform(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get("email");
        
        console.log({ email });
        let success = await actions.PasswordResetPsycho(email);
        
        if (success) {
            navigate("/");
        }else {
            alert("Credenciales inválidas. Inténtalo de nuevo.");
        }
    } 

    return(
        
        <div className="container d-flex">
        <div className=" rest ">
            <div className="resetclass">
                    <form onSubmit={submitform}>
                        <div className="mb-3">
                        <br/>
                            <h2 > ¿Has olvidado tu contraseña?</h2>
                        <br/>
                        <p className="titlerest">Por favor, ingresa tu dirección de correo electrónico. 
                            Te enviaremos un enlace para que puedas restablecer tu contraseña de manera segura</p>

                            <div className="titlerest">
                                <label htmlFor="exampleInputEmail" className="form-label mt-3">
                                <BsEnvelope /> Correo Electrónico
                                </label>
                            </div>
                                <input
                                name="email"
                                type="email"
                                className="form-control inputrest"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                    />
                        </div>
                    <div className="d-flex justify-content-around">
                        <button
                                type="button"
                                className="btn btn-outline-primary  buttonemail "
                                onClick={() => navigate("/")}
                            >
                                Cancela
                            </button>
                        <button
                            type="submit"
                            className="btn btn-outline-primary  buttonemail "
                        >
                            Enviar
                        </button>

                    </div>
                   
                    <br/>
                    </form>
                </div>
        </div>
    </div>
 );
}

