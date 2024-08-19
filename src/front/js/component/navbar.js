import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext'
import logo from "../../img/logoMTM.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar ">
			<div className="container">
			<a href="/">
					<span className="navbar-brand mb-0 h1"><img className="logo" src={logo} alt="Logo"  /></span>
				</a>
				
				{store.token == null ?
					<div className="ml-auto">
						<a href="/login">
							<button className="btn btn-outline-primary">login</button>
						</a>
						<a href="/signup">
							<button className="btn btn-outline-primary ms-3">signup</button>
						</a>
					</div>
					:
					<div className="ml-auto">
						<button onClick={() => actions.logout()} className="btn btn-primary">logout</button>
					</div>
				}
			</div>
		</nav>
	);
};