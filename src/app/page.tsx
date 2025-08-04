"use client";

import { useState } from "react";
import type { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { answerQuestionsAboutPdf } from "@/ai/flows/answer-questions-about-pdf";
import { generateSuggestedQuestions } from "@/ai/flows/suggested-questions";
import { summarizePdf } from "@/ai/flows/summarize-pdf";
import Header from "@/components/app/header";
import PdfUploadForm, {
  type PdfUploadFormSchema,
} from "@/components/app/pdf-upload-form";
import SummaryView from "@/components/app/summary-view";
import ChatView, { type Message } from "@/components/app/chat-view";
import { Loader2 } from "lucide-react";

type SummaryLevel = z.infer<typeof PdfUploadFormSchema>["summaryLevel"];
type AppState = "upload" | "summarizing" | "summary" | "chat";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [summary, setSummary] = useState<string>("");
  const [pdfTitle, setPdfTitle] = useState("");
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSummarize = async (data: z.infer<typeof PdfUploadFormSchema>) => {
    setAppState("summarizing");
    setPdfTitle(data.pdfFile.name);
    try {
      const pdfDataUri = await fileToBase64(data.pdfFile);
      const result = await summarizePdf({
        pdfDataUri,
        summaryLevel: data.summaryLevel,
      });

      if (result && result.summary) {
        setSummary(result.summary);
        setAppState("summary");
      } else {
        throw new Error("Failed to get summary.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description:
          "There was an error summarizing your document. Please try again.",
      });
      setAppState("upload");
    }
  };

  const handleStartChat = async () => {
    setAppState("chat");
    setMessages([]);
    setSuggestedQuestions([]);
    try {
      const result = await generateSuggestedQuestions({ pdfSummary: summary });
      if (result && result.suggestedQuestions) {
        setSuggestedQuestions(result.suggestedQuestions);
      }
    } catch (error) {
      console.error("Failed to get suggested questions:", error);
    }
  };

  const handleSendMessage = async (question: string) => {
    const newMessages: Message[] = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setIsAnswering(true);
    try {
      const result = await answerQuestionsAboutPdf({
        pdfSummary: summary,
        question: question,
      });

      if (result && result.answer) {
        setMessages([...newMessages, { role: "assistant", content: result.answer }]);
      } else {
        throw new Error("No answer received.");
      }
    } catch (error) {
      console.error("Failed to get answer:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get an answer. Please try again.",
      });
      setMessages(newMessages); // Keep user message on error
    } finally {
      setIsAnswering(false);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case "upload":
        return <PdfUploadForm onSubmit={handleSummarize} isLoading={false} />;
      case "summarizing":
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-center h-full min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Summarizing your document...
            </h2>
            <p className="text-muted-foreground">
              Please wait while we process your PDF. This might take a moment.
            </p>
          </div>
        );
      case "summary":
        return (
          <SummaryView
            title={pdfTitle}
            summary={summary}
            onStartChat={handleStartChat}
            onSummarizeAgain={() => setAppState("upload")}
          />
        );
      case "chat":
        return (
          <ChatView
            messages={messages}
            suggestedQuestions={suggestedQuestions}
            onSendMessage={handleSendMessage}
            isAnswering={isAnswering}
            onBackToSummary={() => setAppState("summary")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="w-full max-w-3xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
