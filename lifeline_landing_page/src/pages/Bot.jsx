import React, { useEffect } from "react";
import './../css/bot.css';

function Bot() {
  useEffect(() => {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatLogs = document.querySelector(".chat-logs");

    const handleSubmit = async (event) => {
      event.preventDefault();

      const userPrompt = chatInput.value.trim();

      if (!userPrompt) {
        return; // Don't proceed if the input is empty
      }

      // Display user message in the chat log
      displayUserMessage(userPrompt);

      try {
        // Clear the input
      chatInput.value = "";
      chatLogs.scrollTop = chatLogs.scrollHeight;
        // Call the Flask API chatbot
        const response = await fetch("http://localhost:5001/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_prompt: userPrompt }),
        });

        if (response.ok) {
          const data = await response.json();
          // Display bot's response in the chat log
          displayBotResponse(data.response);
          // Scroll to the bottom of the chat logs
          chatLogs.scrollTop = chatLogs.scrollHeight;
        } else {
          console.error("Error fetching response.");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      // Clear the input
      chatInput.value = "";
    };

    const displayUserMessage = (message) => {
      const chatLog = document.createElement("div");
      chatLog.className = "chat-msg user";
      chatLog.innerHTML = `<div class="cm-msg-text">${message}</div>`;
      chatLogs.appendChild(chatLog);
    };

    const displayBotResponse = (response) => {
      const chatLog = document.createElement("div");
      chatLog.className = "chat-msg self";
      chatLog.innerHTML = `<div class="cm-msg-text">${response}</div>`;
      chatLogs.appendChild(chatLog);
    };

    chatForm.addEventListener("submit", handleSubmit);

    // Cleanup function
    return () => {
      chatForm.removeEventListener("submit", handleSubmit);
    };
  }, []); // Empty dependency array for componentDidMount behavior
  return (
    <div>

 <div id="body">
          <div id="chat-circle" className="btn btn-raised">
            <img
              id="chat-bot"
              src="./assets/img/chatbot.png"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="chat-box">
            <div className="chat-box-header">
              Ask for Help?
              <span className="chat-box-toggle">
                <i className="material-icons">close</i>
              </span>
            </div>
            <div className="chat-box-body chatP">
              <div className="chat-box-overlay" />
              <div className="chat-logs" />
            </div>
            <div className="chat-input">
              <form id="chat-form">
                <input
                  type="text"
                  id="chat-input"
                  name="chat-input"
                  placeholder="Send a message..."
                />
                <button type="submit" className="chat-submit">
                  <i className="material-icons">Send</i>
                </button>
              </form>
            </div>
          </div>
        </div>
</div>

  );
}

export default Bot;
