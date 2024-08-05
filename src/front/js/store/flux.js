const apiUrl = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
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
          console.log(data);
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
        // const respuesta = document.querySelector("#prompt");
        // const button = document.querySelector("#generate");
        // const output = document.querySelector("#output");
        // button.addEventListener("click", async () => {
        //   if (!respuesta.value) return;

        //   const response = await mensajeApi(respuesta.value);
        //   output.innerHTML = response.choices[0].message.content;
        // });
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
    },
  };
};

export default getState;
