import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/single.css';

export const PhSingle = () => {
	const { store, actions } = useContext(Context);
	const {id}=useParams()
    const [dataPsico, setDataPsico] = useState(store.psychologist.id);

    // useEffect(()=>{
    //     const fetchPsicoData = async () => {
    //         const dataPsico = await actions.getPsico(id);
    //         setDataPsico(dataPsico);
    // };
    // fetchPsicoData();
    // }, [id]);

    // if (!dataPsico) {
    //     return <div>Loading...</div>; 
    // }

	return (
		
		<div className="container d-flex  ">
		<div className="left">
			<img 
				src={dataPsico.photo}
			
				className="profile-img"
			/>
			<div className="name">Soy, Dr/a {dataPsico.first_name} {dataPsico.last_name}</div>
			<div className="image-credit">
			<i className="fa-solid fa-phone"></i> {dataPsico.phone_number}
			</div>
			<div className="image-credit">
				email: {dataPsico.email}
			</div>
		</div>
		<div className="right">
			<div className="description">Especialidad: {dataPsico.specialty}  | Años de Experiencia: {dataPsico.years_of_experience}</div>
			<div className="details">
				{dataPsico.description}
			</div>
			
		</div>
	</div>
	
);
}
	