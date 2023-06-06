import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBot from "react-simple-chatbot";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  let OpenAIKey = "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";
  // Initialize OpenAI API
  if (typeof process !== "undefined") {
    // Node.js environment code here
    OpenAIKey = process.env.OPENAI_API_KEY;
    console.log(OpenAIKey);
  }
  const configuration = new Configuration({
    apiKey: OpenAIKey ? OpenAIKey : "",
  });
  const openai = new OpenAIApi(configuration);

  // Function to handle chat input
  const handleInput = async (message) => {
    const response = await openai.createCompletion({
      engine: "davinci",
      prompt: message,
      maxTokens: 150,
      n: 1,
      stop: ["\n"],
    });

    // Store response from ChatGPT
    setMessages((prevState) => [
      ...prevState,
      { user: "bot", text: response.choices[0].text },
    ]);
  };

  const steps = [
    {
      id: "0",
      message: "Welcome to react chatbot!",
      trigger: "1",
    },
    {
      id: "1",
      message: "Bye!",
      end: true,
    },
  ];
  return (
    <div>
      <h1>Real-time Chat App</h1>
      <ScrollToBottom className="chat-container">
        {messages.map((message, index) => (
          <p key={index}>
            {message.user}: {message.text}
          </p>
        ))}
      </ScrollToBottom>

      <ChatBot steps={steps} />
    </div>
  );
};

export default ChatApp;
