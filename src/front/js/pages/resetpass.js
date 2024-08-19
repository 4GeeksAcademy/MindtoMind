import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
import "../../styles/home.css";
import { ResetPassword } from "../component/ResetPassword";
import { ResetEmail } from "../component/ResetEmail";


export const Resetpass = () => {
  const { store, actions } = useContext(Context);
  const [token, setToken] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extraer el token de la URL
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);
  return (
    <div>
              {token ? (
        // Mostrar el formulario de restablecimiento de contraseña si hay un token
        <ResetPassword token={token} />
      ) : (
        // Mostrar el formulario para ingresar el correo electrónico de lo contrario
        <ResetEmail />
      )}

    </div>
  );
};
