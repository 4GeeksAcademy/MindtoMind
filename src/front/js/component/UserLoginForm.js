import React from "react";
import { useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const UserLoginForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook de navegación
    
        async function submitform(e) {
            e.preventDefault();
            let formData = new FormData(e.target);
            let email = formData.get("email");
            let password = formData.get("password");
            console.log({ email, password });
            let logged = await actions.login(email, password);
            
            if (logged) {
                navigate("/");
            }else {
                alert("Credenciales inválidas. Inténtalo de nuevo.");
            }
        } 

        const handleResetPassword = (e) => {
            		e.preventDefault(); // Evita el comportamiento por defecto del botón
            		navigate("/resetpass"); // Navega al componente Resetpass
            	};

    return (
        <form onSubmit={submitform}>
            <div className="mb-3">
                <label>Correo Electrónico</label>
                <input name="email" id="exampleInputEmail1" aria-describedby="emailHelp" type="email" className="form-control" required  />
            </div>
            <div className="mb-3">
                <label>Contraseña</label>
                <input name="password" id="exampleInputPassword1" type="password" className="form-control" required />
            </div>
            <a
                // Cambié el tipo de submit a button para evitar enviar el formulario
                href=""
				onClick={handleResetPassword}>
                    ¿Has olvidado tu contraseña?
			</a>
            <br/>
            <br/>
            <button  type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
    );
};