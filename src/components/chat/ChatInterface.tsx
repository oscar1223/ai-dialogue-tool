import { useState, useRef, useEffect } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { Bot, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "¡Hola! Soy tu asistente AI. ¿En qué puedo ayudarte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAIResponse = (userMessage: string) => {
    // Simulación de respuesta del LLM
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "Entiendo tu pregunta. Esta es una respuesta simulada del chatbot.",
        "¡Excelente pregunta! Aquí tienes información útil sobre tu consulta.",
        "He procesado tu mensaje. Esta interfaz está lista para conectar con tu LLM favorito.",
        "Gracias por tu mensaje. El sistema está funcionando correctamente y listo para integraciones.",
        `Sobre "${userMessage}": Esta es una respuesta de ejemplo que demuestra cómo funcionará el chat.`,
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Simula tiempo de respuesta variable
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    simulateAIResponse(messageText);
  };

  return (
    <div className="flex flex-col h-screen chat-gradient">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b glass-effect">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Asistente AI</h1>
          <p className="text-sm text-muted-foreground">
            {isTyping ? "Escribiendo..." : "En línea"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">¡Comienza la conversación!</h2>
            <p className="text-muted-foreground">
              Envía un mensaje para empezar a chatear con tu asistente AI.
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};