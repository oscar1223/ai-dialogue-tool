import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 glass-effect border-t">
      <div className="flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          disabled={disabled}
          className="w-full p-3 bg-chat-input-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-h-[50px] max-h-[120px]"
          rows={1}
          style={{
            transition: 'var(--transition-smooth)',
          }}
        />
      </div>
      <Button 
        type="submit" 
        size="icon" 
        variant="chat"
        disabled={!message.trim() || disabled}
        className="self-end h-[50px] w-[50px]"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};