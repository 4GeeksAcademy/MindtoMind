import React, { useState, useContext, useEffect } from "react";
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
      <div className="p-2 rounded">
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
    <div className="container vistaConversaciones">
      <div className="row">
        {/* Vista de las conversaciones guardadas */}
        <div className="col-12 col-md-3 vistaPsicologos">
          <ul className="lista-chat list-group flex-nowrap overflow-auto">
            {store.userMessages.map((conversation, index) => (
              <li key={index} className="list-group-item">
                <div className="accordion" id={`accordionExample-${index}`}>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${index}`}
                      >
                        {new Date(conversation.timestamp).toLocaleString()}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent={`#accordionExample-${index}`}
                    >
                      <div className="accordion-body">
                        {conversation.message.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`message ${
                              msg.type === "user"
                                ? "text-end mb-2"
                                : "text-start mb-2"
                            }`}
                          >
                            <div
                              className={`p-2 rounded ${
                                msg.type === "user"
                                  ? "bg-purple"
                                  : "bg-light"
                              }`}
                            >
                              {processMessage(msg.text)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Vista del chat */}
        <div className="col-12 col-md-6 vistachat d-flex flex-column flex-nowrap overflow-auto">
          <div className="messages-container flex-grow-1 overflow-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === "user" ? "text-end mb-2" : "text-start mb-2"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.type === "user" ? "bg-purple" : "bg-light"
                  }`}
                >
                  <PiFlowerLotusDuotone />
                  {processMessage(msg.text)}
                </div>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              onChange={(e) => setMessageData(e.target.value)}
              onKeyDown={sendMessage}
              value={messageData}
              type="text"
              className="form-control"
              id="message"
              name="message"
              placeholder="Escribe aquí tu mensaje"
            />
          </div>
        </div>

        {/* Vista de los psicólogos */}
        <div className="col-12 col-md-3 vistaPsicologos">
          <ul className="list-group psicologos flex-nowrap overflow-auto">
            {store.psychologists.map((psychologist, index) => {
              return (
                <li key={index} className="list-group-item border border-0">
                  <Link to={"/single/" + psychologist.id}>
                    <span className="d-flex justify-content-center">
                      <img
                        src={psychologist.photo}
                        className="img-size rounded-circle w-75"
                        alt="Psychologist"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <Link to="/">
          <button className="boton-demo btn">Volver</button>
        </Link>
        <button
          className="boton-demo btn ms-2"
          onClick={handleClearConversation}
        >
          Generar nueva conversación
        </button>
      </div>
    </div>
  );
};
