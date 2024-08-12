import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Usuario = () => {
	const { store, actions } = useContext(Context);

	return ( 
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="container-fluid text-center w-50">
                <div className="card">
                    <div className="card-header"><strong>Usuario</strong></div>
                    <div Nameclass="card-body">
                        <div className="fill-all p-2" role="alert">Por favor rellena todos los datos</div>
                        <form action="">
                            <div class="row">
                                <label class="col-xl-12" for="userName"><strong>Nombre de Usuario</strong><input type="text" id="userName" class="form-control"  aria-label="User Name" /></label>
                            </div>
                            <div class="row">
                                <label class="col-xl-6" for="password"><strong>Password</strong><input type="password" id="pasword" class="form-control"  aria-label="password" / ></label>
                                <label for="password2" class="col-xl-6"><strong>Repetir Password</strong><input type="password" id="password2" class="form-control"  aria-label="password2" / ></label>
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
