const apiUrl = process.env.BACKEND_URL + "/api";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logoMTM.png";
import { useNavigate, useParams } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClick = async () => {
        console.log("User ID:", store.user_id);
        const conversation = await actions.startConversation(store.user_id);
        if (conversation) {
            navigate(`/demo`);
        }
    };

    const handle = async () => {
        console.log("psyco ID:", store.psyco_id);
        localStorage.setItem("idPsyco", store.psyco_id);
        localStorage.setItem("booleano", store.psycologoLogeado);

        navigate(`/changePsico/${store.psyco_id}`);
    };

    async function submitform(e) {
        e.preventDefault(); // Previene cualquier comportamiento predeterminado del formulario

        console.log('Intentando cerrar sesión...');

        let success = await actions.logout();

        console.log('Resultado de logout:', success);
        if (success) {
            console.log('Cierre de sesión exitoso, navegando a home...');
            navigate('/');
        }
    }

    const handletwo = () => {
        const userId = localStorage.getItem("user_id");
        actions.deleteUser(userId);

        actions.logout();

        navigate(`/`)
    }

    useEffect(() => {
        const idPsyco = localStorage.getItem("psyco_id");
        if (idPsyco) {
            actions.getPsychologistById(idPsyco);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a href="/">
                    <span className="navbar-brand mb-0 h1">
                        <img className="logo" src={logo} alt="Logo" />
                    </span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {store.token == null ? (
                        <div className="ms-auto d-flex flex-wrap align-items-center">
                            <a href="/login" className="btn btn-outline-primary mb-2 mb-lg-0">Iniciar sesión</a>

                            <div className="dropdown ms-3 mb-2 mb-lg-0">
                                <a
                                    className="btn btn-outline-primary dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Registrarse
                                </a>

                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item btn btn-outline-primary" href="/usuario">
                                            Usuario
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item btn btn-outline-primary" href="/psicho">
                                            Psicólogo
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <button
                                className="btn btn-outline-primary ms-3 mb-2 mb-lg-0 OBOTAO"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Hablar con nuestro chat
                            </button>

                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content d-flex">
                                        <div className="modal-header justify-content-center">
                                            <h1 className="modal-title fs-5 branco" id="exampleModalLabel">
                                                ¡ATENCION!
                                            </h1>
                                        </div>
                                        <div className="modal-body">
                                            <h6 className="branco">
                                                Para acceder a nuestro chat de asistencia con IA, es
                                                necesario registrarse como usuario. ¡Regístrate ahora para
                                                obtener una experiencia personalizada y un soporte más
                                                rápido!
                                            </h6>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                data-bs-dismiss="modal"
                                            >
                                                ¡OK! VOY REGISTRARME
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="ms-auto d-flex flex-wrap align-items-center">
                            {store.psycologoLogeado == false ? (
                                <>
                                    <button onClick={submitform} className="btn btn-primary mb-2 mb-lg-0">
                                        Cerrar sesión
                                    </button>
                                    <button onClick={handleClick} className="btn btn-primary ms-2 mb-2 mb-lg-0">
                                        Habla con nuestro chat
                                    </button>
                                    <button type="button" className="btn btn-primary ms-2 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Eliminar cuenta
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content d-flex">
                                                <div className="modal-header justify-content-center">
                                                    <h1 className="modal-title fs-5 branco" id="exampleModalLabel"> ¡ATENCION!</h1>
                                                </div>
                                                <div className="modal-body">
                                                    <h6 className="branco">¿Realmente deseas borrar tu cuenta? Esta acción es irreversible y perderás toda la información asociada. Haz clic en 'Confirmar' para proceder o en 'Cancelar' para mantener tu cuenta activa.</h6>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handletwo}>Confirmar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button onClick={submitform} className="btn btn-primary mb-2 mb-lg-0">
                                        Cerrar sesión
                                    </button>
                                    <button onClick={handle} className="btn btn-primary ms-2 mb-2 mb-lg-0">
                                        Ve a tu perfil
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
