const apiUrl = process.env.BACKEND_URL + "/api";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'
import logo from "../../img/logoMTM.png";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleClick = async () => {
		console.log('User ID:', store.user_id);
        const conversation = await actions.startConversation(store.user_id);  
        if (conversation) {
            navigate(`/demo`);  
        }
    };
	
	const handle = async () => {
		console.log('psyco ID:', store.psyco_id);
		
		navigate(`/changePsico/${store.psyco_id}`); 
        localStorage.setItem("idPsyco",store.psyco_id)
		localStorage.setItem("booleano", store.psycologoLogeado)
		
    };
	useEffect(() => {
		
		actions.getPsychologistById()
	
	  }, []);

	
	return (
		<nav className="navbar ">
			<div className="container">
			<a href="/">
					<span className="navbar-brand mb-0 h1"><img className="logo" src={logo} alt="Logo"  /></span>
				</a>
				
				{store.token == null ? (
				<div className="ml-auto">
					<a href="/login">
						<button className="btn btn-outline-primary">login</button>
					</a>
					<a href="/signup">
						<button className="btn btn-outline-primary ms-3">signup</button>
					</a>
				</div>
				) : (
    <>
				{store.psycologoLogeado == false ? (
					
					<div className="ml-auto">
						<button onClick={() => actions.logout()} className="btn btn-primary">logout</button>
						<button onClick={handleClick} className="btn btn-primary ms-2">Habla con nuestro chat</button>
					</div>
				) : (
					<div className="ml-auto">
						<button onClick={() => actions.logout()} className="btn btn-primary">logout</button>
						<button onClick={handle} className="btn btn-primary ms-2">Ve a tu perfil</button>
					</div>
				)}
    </>
			)}
			</div>
		</nav>
	);
};
