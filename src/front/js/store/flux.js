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
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
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
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
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
                    'Authorization': `Bearer ${store.token}`  // Asegúrate de enviar el token si es necesario
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
				let storageToken = localStorage.getItem("token");
        let coversatioStorage=localStorage.getItem("conversation_id")
        let storageUser = localStorage.getItem("user_id")

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
					setStore({ token: null });
					localStorage.removeItem("token")
					return false;
				}
				let data = await resp.json();
				setStore({ userInfo: data });
				return true;
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
				return true;
			},
    },
  };
};

export default getState;
