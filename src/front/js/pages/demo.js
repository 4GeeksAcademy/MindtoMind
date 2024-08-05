import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  const [messageData, setMessageData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();
      const response = await actions.mensajeApi(messageData);
      // console.log(messageData);
      setResponseMessage(response.message || "");
      setMessageData("");
    } catch (error) {
      setResponseMessage("Error al enviar el mensaje");
      console.log(response);
    }
  };
  const sendMessage = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e); 
    }
  };
  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col-3">Aqui van las conversaciones</div>
        <div className="col-6">
          <p id="output">{responseMessage}</p>
          <input
            onChange={(e) => {
              // console.log(e.target.value);
              setMessageData(e.target.value);
            }}
            onKeyDown={sendMessage}
            value={messageData}
            type="text"
            className="form-control"
            id="message"
            name="message"
            placeholder="Escribe aqui tu mensaje"
          ></input>
          {/* <button id="generate" onClick={handleSendMessage}>
            Generate
          </button> */}
        </div>
        <div className="col-3">Aqui van los psicologos</div>
      </div>

      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
