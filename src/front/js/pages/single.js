import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/single.css';

export const Single = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		
		<div className="container d-flex  ">
		<div className="left">
			<img 
				src="https://image.freepik.com/free-photo/portrait-happy-young-woman_171337-21183.jpg" 
				alt="Bertie Norton" 
				className="profile-img"
			/>
			<div className="name">Soy, Dr/a Bertie Norton</div>
			<div className="image-credit">
			<i className="fa-solid fa-phone"></i> 654-987-256
			</div>
		</div>
		<div className="right">
			<div className="description">Especialidad: Psicoligia Infantil  | Años de Experiencia: 8</div>
			<div className="details">
				Sollicitudin ac orci phasellus egestas tellus rutrum. Venenatis cras sed felis eget. Amet risus nullam eget felis eget nunc. 
				Lacus vestibulum sed arcu non odio euismod. Consectetur adipiscing elit duis tristique. Pharetra magna ac placerat vestibulum 
				lectus mauris ultrices.Sollicitudin ac orci phasellus egestas tellus rutrum. Venenatis cras sed felis eget. Amet risus nullam eget felis eget nunc. 
				Lacus vestibulum sed arcu non odio euismod. Consectetur adipiscing elit duis tristique. Pharetra magna ac placerat vestibulum 
				lectus mauris ultrices.<br></br>
				Sollicitudin ac orci phasellus egestas tellus rutrum. Venenatis cras sed felis eget. Amet risus nullam eget felis eget nunc. 
				Lacus vestibulum sed arcu non odio euismod. Consectetur adipiscing elit duis tristique. Pharetra magna ac placerat vestibulum 
				lectus mauris ultrices.
			</div>
			
		</div>
	</div>
	
);
}
	

Single.propTypes = {
	match: PropTypes.object
};
