import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/single.css';
import { PhSingle } from "../component/PhSingle";
import { ModalPerfil } from "../component/ModalPerfil";


export const ChangePsico = () => {
	const { store, actions } = useContext(Context);
	const {id} = useParams();


	
	return (
		<div className="container mt-2">
		<div className="row justify-content-center">
		  <div className="col-12">
			<PhSingle />
			
		  </div>
		</div>
	  </div>
		
	
);
}
	

ChangePsico.propTypes = {
	match: PropTypes.object
};
