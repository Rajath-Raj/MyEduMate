"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, BookUp, FileText } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type SummaryViewProps = {
  title: string;
  summary: string;
  onStartChat: () => void;
  onSummarizeAgain: () => void;
};

export default function SummaryView({
  title,
  summary,
  onStartChat,
  onSummarizeAgain,
}: SummaryViewProps) {
  return (
    <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle className="truncate font-headline">{title}</CardTitle>
        </div>
        <CardDescription>Here is the summary of your document.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/50">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {summary}
          </p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="outline" onClick={onSummarizeAgain}>
          <BookUp className="mr-2 h-4 w-4" />
          Summarize another document
        </Button>
        <Button onClick={onStartChat}>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Ask a Question
        </Button>
      </CardFooter>
    </Card>
  );
}
