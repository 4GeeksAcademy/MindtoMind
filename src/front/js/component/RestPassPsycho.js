import React ,{useState}from "react";
import { useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/resetemail.css";
import { BsLock } from "react-icons/bs";

export const ResetPassword= ({ token }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook de navegación
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const apiUrl = process.env.BACKEND_URL + "/api";

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }
        
        try {
          const response = await fetch(apiUrl + "/reset_password_psychologist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              reset_token: token,
              new_password: password
            })
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData.message);
            alert(`Error: ${errorData.message}`);
          } else {
            const result = await response.json();
            console.log(result.message);
            alert("Contraseña restablecida con éxito. Ahora puedes iniciar sesión.");
            navigate("/login"); // Redirige al usuario a la página de inicio de sesión
          }
        } catch (error) {
          console.error("Fetch error:", error);
          alert("Ocurrió un problema al intentar restablecer la contraseña.");
        }
   
    } 

    return(
       
        <div className="container d-flex">
        <div className=" rest ">
            <div className="resetclass">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <br/>
                            <h2 > Modificación de Contraseña</h2>
                        <br/>
                        <p className="titlerest">Por favor, ingresa y confirme su nueva contraseña.</p>

                            <div className="titlerest">
                                <label htmlFor="newpassword" className="form-label mt-3">
                                <BsLock /> Nueva Contraseña
                                </label>
                            </div>
                                <input
                                name="password"
                                type="password"
                                className="form-control inputrest"
                                 id="newpassword"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                
                                    />

                                <div className="titlerest">
                                <label htmlFor="confirmPassword" className="form-label mt-3">
                                <BsLock /> Confirma la Contraseña
                                </label>
                            </div>
                                <input
                                name="confirmPassword"
                                type="password"
                                className="form-control inputrest"
                                 id="confirmPassword"
                                 value={confirmPassword}
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                                
                                    />
                        </div>
                    <div className="d-flex justify-content-around">
                        
                        <button
                            type="submit"
                            className="btn btn-outline-primary  buttonemail "
                        >
                            Enviar
                        </button>

                    </div>
                   
                    <br/>
                    </form>
                </div>
        </div>
    </div>
    );
};

    
