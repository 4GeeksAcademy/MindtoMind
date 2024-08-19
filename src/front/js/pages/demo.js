import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

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
  };

  // const decodedToken = jwtDecode(token);
  // const userId = decodedToken.user_id;
  // console.log('User ID:', userId);

  return (
    <div className="container">
      <div className="row ">
        {/* Este div contiene las conversaciones guardadas */}
        <div className="col-3">
          <h5>Conversaciones Guardadas</h5>
          <ul className="list-group">
            {savedConversations.map((conversation) => (
              <li key={conversation.id} className="list-group-item">
                {conversation.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.type === "user" ? "text-end mb-2" : "text-start mb-2"
                    }`}
                  >
                    <p
                      className={`p-2 rounded ${
                        msg.type === "user" ? "bg-purple " : "bg-light"
                      }`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>

        
        {/* Este div contiene la vista del chat */}

        <div className="col-6 d-flex flex-column ">
          <div className="messages-container  flex-grow-1 overflow-auto">
            {/* align-items-end */}
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
            ))}
          </div>
          <div className="mt-auto input-container">
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

        <div className="col-3">
          Aqui van los psicologos
          <ul className="list-group">
            {store.demo.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-center border border-0"
                  style={{ background: item.background }}
                >
                  <Link to={"/single/" + index}>
                    <span>
                      <img
                        src="https://img.freepik.com/foto-gratis/vista-posterior-mujer-haciendo-yoga-al-aire-libre_23-2148769551.jpg"
                        className="rounded-circle w-75"
                        

                      ></img>
                    </span>
                  </Link>
                  {/* {
                    // Conditional render example
                    // Check to see if the background is orange, if so, display the message
                    item.background === "orange" ? (
                      <p style={{ color: item.initial }}>
                        Check store/flux.js scroll to the actions to see the
                        code
                      </p>
                    ) : null
                  }
                  <button
                    className="btn btn-success"
                    onClick={() => actions.changeColor(index, "orange")}
                  >
                    Change Color
                  </button> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
      <button className="btn btn-danger" onClick={handleClearConversation}>
        Clear Conversation
      </button>
    </div>
  );
};
