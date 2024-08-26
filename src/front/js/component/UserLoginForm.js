import React from "react";
import { useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { BsLock } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";

export const UserLoginForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 
    
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
            		e.preventDefault(); 
            		navigate("/resetpass");
            	};

    return (
        <form onSubmit={submitform}>
            <div className="mb-3">
                <label className="text2"><BsEnvelope /> Correo Electrónico </label>
                <input name="email" id="exampleInputEmail1" aria-describedby="emailHelp" type="email" className="form-control" required  />
            </div>
            <div className="mb-3">
                <label className="text2"><BsLock /> Contraseña</label>
                <input name="password" id="exampleInputPassword1" type="password" className="form-control" required />
            </div>
            <a
         
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