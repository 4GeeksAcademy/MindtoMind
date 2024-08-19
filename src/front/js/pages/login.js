import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate(); // Hook de navegación

	const handleResetPassword = (e) => {
		e.preventDefault(); // Evita el comportamiento por defecto del botón
		navigate("/resetpass"); // Navega al componente Resetpass
	};

	return ( 
		<div className="container">
			<form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label mt-3">Direccioón de Email</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">Nosotros nunca compartiremos tu correo electrónico con nadie más.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<button type="submit" className="btn btn-outline-primary submit-login mb-2">Entrar</button>
				<button 
					type="button" // Cambié el tipo de submit a button para evitar enviar el formulario
					className="btn btn-primary recuperar" 
					onClick={handleResetPassword}>Recuperar Contraseña
				</button>
			</form>
		</div>
	);
};
