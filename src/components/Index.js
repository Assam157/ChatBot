import{ React, useState } from "react";
import "./App.css"; // Import styles

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages([...messages, userMessage, { role: "bot", content: data.reply }]);
      } else {
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }

    setInput("");
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Our Chatbot</h1>
        <p>Chat with our AI assistant!</p>
      </header>

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
