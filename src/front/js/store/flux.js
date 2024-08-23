const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "Eduardo",
          background: "white",
          initial: "white",
          src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmSaaddBQKHgvmxPcxZ5f7c6fAFpE7cf9yfw&s",
        },
        {
          title: "Alexis",
          background: "white",
          initial: "white",
          
        },
        {
          title: "Juan",
          background: "white",
          initial: "white",
        },
      ],
      token: null,
      userinfo: null,
      conversation_id: null,
      psychologists:[],
      psychologist:[],
      psycologoLogeado:false,
      psicologoGuardado: {},
      userMessages:[]
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      
      //rest password
      requestPasswordReset: async (email) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        const body = JSON.stringify({ email: email });
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: body,
          redirect: "follow"
        };
      
        try {
          const response = await fetch(apiUrl + "/generate_reset_token", requestOptions);
          
          if (!response.ok) {
            // Muestra un error si el servidor responde con un código de estado no exitoso
            const error = await response.json();
            console.error("Error:", error.message);
          } else {
            // Si la solicitud fue exitosa, maneja la respuesta
            const result = await response.json();
            console.log(result.message);
            alert("Se ha enviado un enlace para restablecer la contraseña a tu correo.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          alert("Ocurrió un problema al intentar enviar la solicitud.");
        }
      },


      PasswordResetPsycho: async (email) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        const body = JSON.stringify({ email: email });
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: body,
          redirect: "follow"
        };
      
        try {
          const response = await fetch(apiUrl + "/generate_reset_token_psychologist", requestOptions);
          
          if (!response.ok) {
            // Muestra un error si el servidor responde con un código de estado no exitoso
            const error = await response.json();
            console.error("Error:", error.message);
          } else {
            // Si la solicitud fue exitosa, maneja la respuesta
            const result = await response.json();
            console.log(result.message);
            alert("Se ha enviado un enlace para restablecer la contraseña a tu correo.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          alert("Ocurrió un problema al intentar enviar la solicitud.");
        }
      },

      

      login: async (email, password) => {
        let resp = await fetch(apiUrl + "/login", {
          method: "POST",
          body: JSON.stringify({ email, password}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          setStore({ token: null });
          return false;
        }
        let data = await resp.json();
        setStore({ token: data.token, user_id:data.user_id });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        console.log(data.token)
        console.log(data.user_id)
        
        return true;
      },

      login_psychologist: async (email, password) => {
        let resp = await fetch(apiUrl + "/login_psychologist", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          setStore({ token: null });
          return false;
        }
        let data = await resp.json();
        setStore({ token: data.token, psyco_id:data.psychologist_id });
        localStorage.setItem("token", data.token);
        localStorage.setItem("psyco_id", data.psychologist_id);
        setStore({psycologoLogeado: true})
        return true;
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(apiUrl + "/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },


      mensajeApi: async (message) => {
        try {
          // fetching data from the backend
          const resp = await fetch(apiUrl + "/demo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.API_KEY_AI,
            },
            body: JSON.stringify({
              content: message,
            }),
          });

          const data = await resp.json();
          // console.log(data);
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },


      // changeColor: (index, color) => {
      //   //get the store
      //   const store = getStore();

      //   //we have to loop the entire demo array to look for the respective index
      //   //and change its color
      //   const demo = store.demo.map((elm, i) => {
      //     if (i === index) elm.background = color;
      //     return elm;
      //   });

      //   //reset the global store
      //   setStore({ demo: demo });
      // },


      saveMessage: async (message) => {
        console.log("no estoy dando error")
        try {
          
          const store = getStore();
          const conversation_id=store.conversation_id
         
         
          if (!conversation_id){
            throw new Error("ID no encontrada ")
          }
          
          console.log(store.conversation_id)
          console.log(message)
          const resp = await fetch(apiUrl + "/enviarmensaje", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${store.token}`
            },
            body: JSON.stringify({ 
              message:message,
              conversation_id:conversation_id
            }),
          });
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error saving messages to backend", error);
        }
      },

      startConversation: async (userId) => {
        const store = getStore();
        try {
			const response = await fetch(apiUrl +'/start_conversation', {
				method: 'POST',
                headers: {
					'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.token}`  
                },
                body: JSON.stringify({
					        user_id: userId
                })
            });
            if (!response.ok) {
				throw new Error('Failed to start conversation');
            }
			
            const data = await response.json();
			
			console.log(data)
			setStore({ conversation_id: data.id })
      const ides = localStorage.setItem("conversation_id",store.conversation_id)
  
			console.log("[Flux]conversation_id",store.conversation_id)
            return data;  
        } catch (error) {
            console.error('Error starting conversation:', error);
        }
    },

      signupUsuario: async(dataToSend) => {
        const response = await fetch(apiUrl + "/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify(dataToSend),
          }
        );
        console.log(dataToSend);
        const responseData = await response.json();
        if (response.ok) {
          alert("Usuario creado");
        } else {
          alert("Error al crear usuario");
        }
      },

     

      loadSession: async () => {
        try {
          let storageToken = localStorage.getItem("token");
          let coversatioStorage=localStorage.getItem("conversation_id")
          let storageUser = localStorage.getItem("user_id")
          let id =localStorage.getItem("idPsyco")
          let bool=localStorage.getItem("booleano")
          if (!storageToken) return;
          setStore({ token: storageToken });

          if (!coversatioStorage) return;
          setStore({ conversation_id: coversatioStorage });


          if (!storageUser) return;
          setStore({ user_id: storageUser });

          let resp = await fetch(apiUrl + "/userinfo", {
            headers: {
              Authorization: "Bearer " + storageToken,

            },
          });

          if (!resp.ok) {
            setStore({ token: null, userInfo:null });
            localStorage.removeItem("token");
            localStorage.removeItem("conversation_id");
            localStorage.removeItem("user_id");
            localStorage.removeItem("idPsyco")
            localStorage.removeItem("booleano")
            return false;
          }
          let data = await resp.json();
          setStore({ userInfo: data });
          return true;
        } catch (error) {
          // Manejar errores de la solicitud
          console.error("Error loading session:", error);
          setStore({ token: null, userInfo: null });
          localStorage.removeItem("token");
          localStorage.removeItem("conversation_id");
          localStorage.removeItem("user_id");
          return false;
        }
			},
      
			logout: async () => {
				let { token } = getStore();
				// let resp = await fetch(apiUrl + "/logout", {
				// 	method: "POST",
				// 	headers: {
				// 		"Authorization": "Bearer " + token
				// 	},
				// });
				// if (!resp.ok) return false;
				setStore({ token: null, userInfo: null });
				localStorage.removeItem("token");
        localStorage.removeItem("conversationID");
        localStorage.removeItem("user_id");
        localStorage.removeItem("conversation_id");
        localStorage.removeItem("psyco_id");
        localStorage.removeItem("idPsyco")
        localStorage.removeItem("booleano")
				return true;
			},
// trae la info desde user
      getPsico: async (id) => {
        try {
          let resp = await fetch(apiUrl + `/psychologist/${id}`);
          if (!resp.ok) {
            console.error("Error en la peticion: ${resp.status}");
            return;
          }
          let data = await resp.json();
          let psychologist = {
            id: data.result.id,
            first_name: data.result.first_name,
            last_name: data.result.last_name,
            phone_number: data.result.phone_number,
            email: data.result.email,
            specialty: data.result.specialty,
            years_of_experience: data.result.years_of_experience,
            description: data.result.description,
            photo:data.result.photo,
          };

          const store = getStore();
          setStore({
            psychologists: [...store.psychologists, psychologist],
          });

          setStore({
            psychologist: data.data
          });

        } catch (error) {
          console.error("Error en la promesa: ${error}");
          return;
        }
      },
      // trae la info desde psicologo
      getPsychologistById: async (id) => {
        try {
            const response = await fetch(apiUrl + `/psychologist/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token") 
                }
            });
    
            if (!response.ok) {
                if (response.status === 404) {
                    console.error("Psicologo no encontrado");
                } else {
                    console.error("Error con el fetch del psicólogo:", response.statusText);
                }
                return null;
            }
    
            const data = await response.json();
            console.log("Información del psicólogo:", data);
            setStore({
                psychologist: data.data
               }); 
    
        } catch (error) {
            console.error("Error con el fetch:", error);
            return null;
        }
    },

      getAllPsico: async () => {

        try {
          let resp = await fetch(apiUrl + `/psychologists`,{
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer " + localStorage.getItem("token") 
            }
          });
          if (!resp.ok) {
            console.error("Error en la peticion: ${resp.status}");
            return;
          }
          let data = await resp.json();
          
          setStore({
            psychologists: data.data
          });
        } catch (error) {
          console.error("Error en la promesa: ${error}");
          return;
        }
      },
      updatePsico: async (nuevosDatosPsico) => {
        const store = getStore();
        try {
          const response = await fetch(apiUrl + `/psico/${store.psychologist.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevosDatosPsico)
          });

          if (response.ok) {
            const data = await response.json();
            setStore({ psychologist: data }); 
            console.log("Datos del psicólogo actualizados:", data);
          } else {
            console.error("Error al actualizar los datos del psicólogo:", response.statusText);
          }
        } catch (error) {
          console.error("Error en la actualización de los datos:", error);
        }
      },
      getUserMessages: async (userId) => {
        const store = getStore();
        try {
            const response = await fetch(apiUrl + `/users/${userId}/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${store.token}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los mensajes");
            }

            const data = await response.json();
            setStore({ userMessages: data });

        } catch (error) {
            console.error("Error con el fetch de los mensajes:", error);
        }
         
      },
      // saveContactPsico: (psicologo) => {
      //   setStore({psicologoGuardado:psicologo})
      // },

      
      // loadPsico: async () => {
      //   const actions = getActions();
      //   const psicoPromises = [];
      //   setStore({ psychologists: [] });
      //   for (let i = 1; i <= 10; i++) {
      //     psicoPromises.push(actions.getPsico(i));
      //   }
      //   await Promise.all(psicoPromises);
      // },
    },
  };
};

export default getState;
