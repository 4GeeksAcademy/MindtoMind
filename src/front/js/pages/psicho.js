import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Psicho = () => {
	const { store, actions } = useContext(Context);

	return ( 
        <div className="d-flex justify-content-center align-items-center">
            <div className="container-fluid text-center w-50">
                <div className="card">
                    <div className="card-header"><strong>Psicólogo</strong></div>
                    <div Nameclass="card-body">
                        <div className="fill-all p-2" role="alert">Por favor rellena todos los datos</div>
                        <form action="">
                            <div class="row">
                                <label class="col-xl-6" for="firstName"><strong>Nombre</strong><input type="text" id="firstName" class="form-control"  aria-label="First name" /></label>
                                <label class="col-xl-6" for="lastName"><strong>Apellido</strong><input type="text" id="lastName" class="form-control"  aria-label="Last name" /></label>
                            </div>
                            <div class="row">
                                <label class="col-xl-6" for="City"><strong>Teléfono</strong><input type="text" id="city" class="form-control"  aria-label="Last name" / ></label>
                                <label for="city" class="col-xl-3"><strong>Especialidad</strong><input type="text" id="city" class="form-control"  aria-label="Last name" / ></label>
                                <label for="years" class="form-label col-xl-3"><strong>Años de experiencia</strong><input type="number" class="form-control number-input" id="years" placeholder="XXXXX" maxlength="5" /></label>
                            </div>
                            <div class="row">
                                <div class="col-xl-6">
                                    <label><strong>Subir Foto:</strong></label>
                                    <div class="input-group">
                                        <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                        
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <label for="message"><strong>Descripción</strong></label>
                                    <textarea class="form-control" name="message" id="message" cols="30" rows="3"></textarea>
                                    <p>Explica brevemente tu perfil como psicologo</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-body-secondary text-end py-2">
                        <button type="button" class="btn btn-outline-dark">Cancelar</button>
                        <button type="button" class="btn btn-outline-primary ms-2">Enviar</button>
                    </div>
                </div>
        </div>
    </div>
	);
};
