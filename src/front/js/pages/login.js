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

	async function submitform(e) {
		e.preventDefault();
		let formData = new FormData(e.target);
		let email = formData.get("email");
		let password = formData.get("password");
		console.log({ email, password });
		let logged = await actions.login(email, password);
		if (logged) navigate("/");
	}
	return ( 
		<div className="container">
			<form onSubmit={submitform}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label mt-3">Email address</label>
					<input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input name="password" type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<button type="submit" className="btn btn-outline-primary submit-login mb-2">Submit</button>
				<button 
					type="button" // Cambié el tipo de submit a button para evitar enviar el formulario
					className="btn btn-primary recuperar" 
					onClick={handleResetPassword}>Recuperar Contraseña
				</button>
			</form>
		</div>
	);
};
