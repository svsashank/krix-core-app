
import React, { useState } from "react";
import { Message } from "../types";
import { Bot, Check, Copy, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { toast } from "sonner";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const isUserMessage = message.role === "user";
  
  // Parse thinking and response for DeepSeek models
  const processDeepSeekContent = (content: string) => {
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
    const thinking = thinkMatch ? thinkMatch[1].trim() : null;
    const mainResponse = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    
    return { thinking, mainResponse: mainResponse || content };
  };
  
  const isDeepSeekModel = message.model.provider === "Krutrim" && 
                          message.model.id.toLowerCase().includes("deepseek");
                          
  const { thinking, mainResponse } = isDeepSeekModel && !isUserMessage 
    ? processDeepSeekContent(message.content) 
    : { thinking: null, mainResponse: message.content };
  
  return (
    <div className={`flex items-start gap-4 animate-fade-in ${isUserMessage ? "" : "group"}`}>
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUserMessage ? "bg-muted" : "bg-primary/20"
        }`}
      >
        {isUserMessage ? (
          <User size={18} />
        ) : (
          <div className="flex items-center justify-center">
            <Bot size={18} />
          </div>
        )}
      </div>
      
      <div 
        className={`flex-1 p-4 rounded-lg ${
          isUserMessage 
            ? "bg-muted/30 text-foreground" 
            : "glass-morphism"
        }`}
      >
        {!isUserMessage && (
          <div className="flex items-center mb-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-full mr-2" 
              style={{ backgroundColor: message.model.avatarColor }}
            />
            <span className="text-xs font-medium">{message.model.name}</span>
          </div>
        )}
        
        <div className="chat-message">
          {/* Render thinking section for DeepSeek models */}
          {thinking && (
            <div className="thinking-section mb-3 border-l-2 pl-3 border-muted-foreground/40">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Thinking:</div>
              <div className="text-xs text-muted-foreground/80 italic">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {thinking}
                </ReactMarkdown>
              </div>
            </div>
          )}
          
          {/* Render main response */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const inline = !match && !className;
                
                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <div className="code-block relative group">
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 p-1 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <pre className="overflow-auto">
                      <code className={className}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              }
            }}
          >
            {mainResponse}
          </ReactMarkdown>
        </div>
      </div>
      
      {!isUserMessage && (
        <button
          onClick={copyToClipboard}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors opacity-0 group-hover:opacity-100"
          title="Copy response"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
    </div>
  );
};

export default MessageItem;
