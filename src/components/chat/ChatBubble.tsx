import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 message-appear",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm",
        isUser 
          ? "bg-chat-user-bubble text-chat-user-foreground rounded-br-md" 
          : "bg-chat-bot-bubble text-chat-bot-foreground rounded-bl-md glass-effect"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className={cn(
            "text-xs mt-1 opacity-70",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};