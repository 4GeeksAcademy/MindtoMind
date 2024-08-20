import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/single.css';
import { TrSingle } from "../component/TrSingle";

export const Single = () => {
	const { store, actions } = useContext(Context);
	const {id} = useParams();


	
	return (
		<div className="container mt-2">
		<div className="row justify-content-center">
		  <div className="col-10">
			<TrSingle />
		  </div>
		</div>
	  </div>
		
	
);
}
	

Single.propTypes = {
	match: PropTypes.object
};
