"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, User, Send, Loader2, ArrowLeft, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatViewProps = {
  messages: Message[];
  suggestedQuestions: string[];
  onSendMessage: (message: string) => void;
  isAnswering: boolean;
  onBackToSummary: () => void;
};

export default function ChatView({
  messages,
  suggestedQuestions,
  onSendMessage,
  isAnswering,
  onBackToSummary,
}: ChatViewProps) {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleSuggestedQuestionClick = (question: string) => {
    onSendMessage(question);
  };

  return (
    <Card className="w-full h-full shadow-lg flex flex-col animate-in fade-in-50 duration-500">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBackToSummary}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold font-headline">Chat about the document</h2>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isAnswering && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            
            {messages.length === 0 && !isAnswering && (
                <div className="text-center text-muted-foreground pt-8">
                    <BrainCircuit className="mx-auto h-12 w-12 mb-4" />
                    <p className="font-semibold">Ask me anything about the document!</p>
                    <p className="text-sm">You can start with one of the suggestions below.</p>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-background">
          {suggestedQuestions.length > 0 && messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {suggestedQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestionClick(q)}
                  disabled={isAnswering}
                >
                  {q}
                </Button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              disabled={isAnswering}
            />
            <Button type="submit" disabled={!inputValue.trim() || isAnswering}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
