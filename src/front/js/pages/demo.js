import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  const [messageData, setMessageData] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageData.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageData, type: "user" },
    ]);

    try {
      const response = await actions.mensajeApi(messageData);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.message || "No response", type: "ai" },
      ]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hubo un error al enviar el mensaje.", type: "error" },
      ]);
    }

    setMessageData("");
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
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === "user" ? "text-end mb-2" : "text-start mb-2"
                }`}
              >
                <p
                  className={` p-2 rounded ${
                    msg.type === "user" ? "bg-purple " : "bg-light"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
              // <p key={index} className={msg.type}>
              //   {msg.text}
              // </p>
            ))}
          </div>
          <input
            onChange={(e) => setMessageData(e.target.value)}
            onKeyDown={sendMessage}
            value={messageData}
            type="text"
            className="form-control"
            id="message"
            name="message"
            placeholder="Escribe aqui tu mensaje"
          />
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
