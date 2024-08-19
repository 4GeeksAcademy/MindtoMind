import React, { useState } from "react";
import "../../styles/login.css";
import { PsychologistLoginForm } from "../component/PsychologistLoginForm";
import { UserLoginForm } from "../component/UserLoginForm";

export const Login = () => {
	    const [activeTab, setActiveTab] = useState("usuario");

		const handleTabClick = (tab) => {
			setActiveTab(tab);
			if (tab === "psicologo") {
				window.history.pushState({}, "", "/api/login_psychologist");
			} else {
				window.history.pushState({}, "", "/api/login");
			}
		};
	
	
	return (
		        <div className="login-container">
					<div className="myclass">
						<div className="login-tabs ">
							<div
								className={`login-tab ${activeTab === "usuario" ? "active" : ""}`}
								onClick={() => handleTabClick("usuario")}
							>
								Usuario
							</div>
							<div
								className={`login-tab ${activeTab === "psicologo" ? "active" : ""}`}
								onClick={() => handleTabClick("psicologo")}
							>
								Psicólogo
							</div>
						</div>
			
						<div className="login-form">
							{activeTab === "usuario" ? (
									<UserLoginForm />
								) : (
										<PsychologistLoginForm />
									)}
								</div>
					</div>	
				</div>
	 );
}; 