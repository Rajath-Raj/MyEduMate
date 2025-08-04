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
import { Button } from "@/components/ui/button";
import { Loader2, Home as HomeIcon, History, User, Plus } from "lucide-react";
import WelcomeScreen from "@/components/app/welcome-screen";

type SummaryLevel = z.infer<typeof PdfUploadFormSchema>["summaryLevel"];
type AppState = "welcome" | "dashboard" | "upload" | "summarizing" | "summary" | "chat";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("welcome");
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

  const handleGuestLogin = () => {
    setAppState("dashboard");
  }

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
      case "welcome":
        return <WelcomeScreen onGuestLogin={handleGuestLogin} />
      case "dashboard":
        return (
          <div className="text-center p-4">
            <h1 className="text-2xl font-bold mb-2">Hi, Alex! Ready to learn today?</h1>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 border rounded-lg shadow-sm">
                <p>Math</p>
                <p className="text-sm text-muted-foreground">Uploaded 2 days ago</p>
              </div>
               <div className="p-4 border rounded-lg shadow-sm">
                <p>Science</p>
                <p className="text-sm text-muted-foreground">Uploaded 5 days ago</p>
              </div>
               <div className="p-4 border rounded-lg shadow-sm">
                <p>History</p>
                <p className="text-sm text-muted-foreground">Uploaded 1 week ago</p>
              </div>
               <div className="p-4 border rounded-lg shadow-sm">
                <p>Literature</p>
                <p className="text-sm text-muted-foreground">Uploaded 2 weeks ago</p>
              </div>
            </div>
          </div>
        )
      case "upload":
        return <PdfUploadForm onSubmit={handleSummarize} isLoading={false} onBack={() => setAppState("dashboard")} />;
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
            onChangeLevel={() => setAppState("upload")}
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

  const showBottomNav = ["dashboard", "upload", "summary", "chat"].includes(appState);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {appState !== 'welcome' && <Header />}
      <main className="flex-1 container mx-auto px-4 py-8 pb-24">
        <div className="w-full max-w-3xl mx-auto">{renderContent()}</div>
      </main>
      
      {appState === 'dashboard' && (
         <Button
            size="lg"
            className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg"
            onClick={() => setAppState('upload')}
          >
            <Plus className="h-7 w-7" />
          </Button>
      )}

      {showBottomNav && (
        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-inner">
          <nav className="container mx-auto px-4 h-16 flex justify-around items-center">
            <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
              <HomeIcon />
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <History />
              <span className="text-xs mt-1">History</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
              <User />
              <span className="text-xs mt-1">Profile</span>
            </Button>
          </nav>
        </footer>
      )}
    </div>
  );
}
