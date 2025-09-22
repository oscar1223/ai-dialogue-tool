export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-chat-bot-bubble text-chat-bot-foreground px-4 py-3 rounded-2xl rounded-bl-md glass-effect">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-current rounded-full opacity-60 typing-dot"></div>
          <div className="w-2 h-2 bg-current rounded-full opacity-60 typing-dot"></div>
          <div className="w-2 h-2 bg-current rounded-full opacity-60 typing-dot"></div>
        </div>
      </div>
    </div>
  );
};