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
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      login: async (email, password) => {
        let resp = await fetch(apiUrl + "/login", {
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
        setStore({ token: data.token });
        localStorage.setItem("token", data.token);
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
        try {
          const resp = await fetch(apiUrl + "/enviarmensaje", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.API_KEY_AI,
            },
            body: JSON.stringify({ message }),
          });
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error saving messages to backend", error);
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
      signupPsico: async(dataToSend, photo) => {
        let formData = new FormData();
        for (const key in dataToSend) {
          formData.append(key, dataToSend[key]);
        }
        if (photo) {
          formData.append("photo", photo);
          
        }

        const response = await fetch(apiUrl +"/register_psychologist",
          {
            method: "POST",
            headers: {
              
              "Access-Control-Allow-Origin":"*"
            },
            body: formData,
          }
        );
        console.log(dataToSend);
        if (response.ok) {
          const responseData = await response.json();
          alert("Usuario creado");
        } else {
          alert("Error al crear usuario");
        }
      },
      loadSession: async () => {
				let storageToken = localStorage.getItem("token");
				if (!storageToken) return;
				setStore({ token: storageToken });
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
				let resp = await fetch(apiUrl + "/logout", {
					method: "POST",
					headers: {
						"Authorization": "Bearer " + token
					},
				});
				if (!resp.ok) return false;
				setStore({ token: null, userInfo: null });
				localStorage.removeItem("token");
				return true;
			},
    },
  };
};

export default getState;
