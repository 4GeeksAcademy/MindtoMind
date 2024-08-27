import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiSpeakLine } from "react-icons/ri";
import { PiFlowerLotusDuotone } from "react-icons/pi";
import "../../styles/demo.css";

import { Context } from "../store/appContext";

const processMessage = (message) => {
  const listRegex = /^(\d+\.\s|•\s|-+\s)/gm;

  if (listRegex.test(message)) {
    const listItems = message
      .split(listRegex)
      .filter((item) => item.trim() !== "");

    return (
      <div className="p-2 rounded ">
        {listItems.map((item, index) => (
          <p key={index}>{item.trim()}</p>
        ))}
      </div>
    );
  }

  return <p className="p-2 rounded">{message}</p>;
};

export const Demo = () => {
  const { store, actions } = useContext(Context);

  const [messageData, setMessageData] = useState("");
  const [messages, setMessages] = useState([]);
  const [savedConversations, setSavedConversations] = useState([]);

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

  const handleClearConversation = async () => {
    try {
      await actions.saveMessage(messages);
      setSavedConversations((prevSavedConversations) => [
        ...prevSavedConversations,
        { id: Date.now(), messages },
      ]);
      setMessages([]);
    } catch (error) {
      console.error("Error al guardar la conversación:", error);
    }
    actions.getUserMessages(store.user_id);
  };

  useEffect(() => {
    actions.getAllPsico();
    actions.getUserMessages(store.user_id);
    
  }, []);

  return (

    <div className="container vistaConversaciones ">
      <div className="row ">
        {/* Este div contiene las conversaciones guardadas */}
        <div className="col-3">
          <ul className="lista-chat list-group flex-nowrap overflow-auto">

            {/* {store.userMessages.map((conversation))} */}
            {store.userMessages.map((conversation, index) => (
              <li key={index} className="list-group-item">
                  

                
                {conversation.message.map((msg, idx) => (

                  <div
                    key={idx}
                    className={`message ${
                      msg.type === "user" ? "text-end mb-2" : "text-start mb-2"
                    }`}
                  >
                    <div
                      className={`p-2 rounded ${
                        msg.type === "user" ? "bg-purple " : "bg-light"
                      }`}
                    >
                      {processMessage(msg.text)}
                    </div>
                  </div>


                ))}
                <small>{new Date(conversation.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>

        {/* Este div contiene la vista del chat */}

        <div className="vistachat col-6 d-flex flex-column flex-nowrap overflow-auto">
          <div className="messages-container  flex-grow-1 overflow-auto">
            {/* align-items-end */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === "user" ? "text-end mb-2" : "text-start mb-2"
                }`}
              >
                <div
                  className={` p-2 rounded ${
                    msg.type === "user" ? "bg-purple " : "bg-light"
                  }`}
                >
<PiFlowerLotusDuotone />
                  {processMessage(msg.text)}
                </div>
              </div>
            ))}
          </div>
          <div className=" input-container">
            <input
              onChange={(e) => setMessageData(e.target.value)}
              onKeyDown={sendMessage}
              value={messageData}
              type="text"
              className="form-control "
              id="message"
              name="message"
              placeholder="Escribe aqui tu mensaje"
            />
          </div>
        </div>
        {/* Este div contiene los psicologos */}

        <div className="col-3 vistaPsicologos">
          <ul className="list-group psicologos flex-nowrap overflow-auto">
            {store.psychologists.map((psychologist, index) => {
              return (
                <li key={index} className="list-group-item border border-0">
                  <Link to={"/single/" + psychologist.id}>
                    <span className="d-flex justify-content-center">
                      <img
                        src={psychologist.photo}
                        className="img-size rounded-circle w-75 d-flex"
                      ></img>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <br />
      <Link to="/">
        <button className="boton-demo btn ">Volver</button>
      </Link>
      <button className="boton-demo btn ms-2" onClick={handleClearConversation}>
        Generar nueva conversacion
      </button>
    </div>
  );
};
