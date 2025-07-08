'use client'
import React, { useState, useRef, useEffect } from 'react';

// Define the structure of a chat message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// LoveLife brand color palette
const colors = {
  primary: 'bg-[#F17475] hover:bg-[#F17475]',
  secondary: 'bg-amber-400 hover:bg-amber-500',
  background: 'bg-gray-100',
  text: 'text-gray-800',
  assistantMessage: 'bg-white',
  userMessage: 'bg-[#90ccc7]',
  input: 'bg-white border-gray-300 focus:ring-2 focus:ring-green-500',
  buttonDisabled: 'bg-gray-400 cursor-not-allowed',
  buttonEnabled: 'bg-green-500 hover:bg-green-600',

};

const Chat: React.FC = () => {
  // State to hold the conversation history
  const [messages, setMessages] = useState<Message[]>([]);
  // State for the user's current input
  const [input, setInput] = useState('');
  // State to track if the bot is currently typing
  const [isLoading, setIsLoading] = useState(false);
  // State to manage the visibility of the chat window
  const [isOpen, setIsOpen] = useState(false);

  // Ref to the end of the messages list for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to send a welcome message when the chat is opened for the first time
  useEffect(() => {
    // If the chat is opened and there are no messages yet, send a welcome message.
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      // Use a timeout to simulate the bot "typing" for a more natural feel.
      setTimeout(() => {
        const welcomeMessage: Message = {
          role: 'assistant',
          content: "Hey there! I'm Livy, your friendly guide to all things LoveLife! What scoop are you looking for today?",
        };
        setMessages([welcomeMessage]);
        setIsLoading(false);
      }, 750); // 0.75 second delay
    }
  }, [isOpen]); // This effect runs whenever the 'isOpen' state changes.

  // Function to handle sending a message
  const handleSendMessage = async () => {
    // Prevent sending empty messages
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    // Add user message to the conversation
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare the conversation history for the API
    const chatHistory = [
      {
        role: 'user',
        parts: [
          {
            text: `You are "Livy", a friendly and enthusiastic chatbot assistant for "LoveLife", a premium vegan ice cream brand. Your tone should be cheerful, helpful, and slightly playful. You love using ice cream-related puns. Your goal is to answer customer questions, promote the brand, and make them feel happy.

            Here are some key points about LoveLife:
            - **100% Vegan:** All our products are plant-based and cruelty-free.
            - **Gourmet Flavors:** We offer unique and delicious flavors like "Mint Avalanche," "Cosmic Caramel," and "Berry Bliss."
            - **Natural Ingredients:** We use only high-quality, natural ingredients. No artificial stuff!
            - **Sustainability:** Our packaging is eco-friendly and we source ingredients responsibly.
            - **Mission:** To spread joy and love for delicious, kind-to-the-planet treats.

            Now, respond to the following user message: ${input}`,
          },
        ],
      },
    ];

    try {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents: chatHistory }),
  });

  // More detailed error handling
  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    
    // Try to get more detailed error info if available
    try {
      const errorData = await response.json();
      if (errorData.error && errorData.error.message) {
        errorMessage += `: ${errorData.error.message}`;
      }
    } catch (e) {
      console.error('Failed to parse error response:', e);
    }
    
    throw new Error(errorMessage);
  }

  const result = await response.json();

  // Handle cases where the response structure isn't as expected
  if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Unexpected API response structure');
  }

  const botResponse = result.candidates[0].content.parts[0].text;
  const assistantMessage: Message = { role: 'assistant', content: botResponse };
  setMessages((prevMessages) => [...prevMessages, assistantMessage]);

} catch (error) {
  console.error('Error in chat API:', error);
  const errorMessage: Message = { 
    role: 'assistant', 
    content: error instanceof Error 
      ? `Whoops! ${error.message}` 
      : "Something went wrong. Please try again later."
  };
  setMessages((prevMessages) => [...prevMessages, errorMessage]);
} finally {
  setIsLoading(false);
}};

  // Handle key press for sending message with 'Enter'
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 font-sans z-50">
      {/* Chat Bubble Toggle */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className={`p-4 rounded-full text-black cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 ${
    isOpen ? 'bg-red-500 hover:bg-red-600' : colors.primary
  }`}
  aria-label="Toggle Chat"
>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.003 9.003 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          transition-all duration-500 ease-in-out
          absolute bottom-20 right-0 w-80 sm:w-96 h-[60vh] bg-[${colors.background}] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-4 border-white
        `}
      >
        {/* Header */}
       <div className={`bg-[#F17475] text-white p-4 text-center rounded-t-lg shadow-md`}>
  <h3 className="text-xl font-bold">Chat with Livy!</h3>
  <p className="text-sm opacity-90">Your friendly AI LoveLife assistant</p>
</div>

        {/* Messages Area */}
       <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
  {messages.map((msg, index) => (
    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`
          max-w-[80%] p-3 rounded-2xl text-sm
          ${msg.role === 'user' 
            ? 'bg-green-100 text-gray-800 rounded-br-none' 
            : 'bg-white text-gray-800 rounded-bl-none'}
          shadow-md
        `}
      >
        {msg.content}
      </div>
    </div>
  ))}
  {isLoading && messages.length > 0 && (
    <div className="flex justify-start mb-3">
      <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
        </div>
      </div>
    </div>
  )}
  <div ref={messagesEndRef} />
</div>
        {/* Input Area */}
       <div className="p-4 bg-[#90ccc7] border-t border-gray-200">
  <div className="flex items-center gap-2">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="Ask about our flavors!"
      className={`flex-1 p-3 border rounded-full focus:outline-none transition-shadow ${
        colors.input
      }`}
      disabled={isLoading}
    />
    <button
      onClick={handleSendMessage}
      disabled={isLoading || input.trim() === ''}
      className={`p-3 rounded-full text-white transition-all duration-300 shadow-md ${
        isLoading || input.trim() === '' 
          ? colors.buttonDisabled 
          : colors.primary
      }`}
      aria-label="Send Message"
    >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
