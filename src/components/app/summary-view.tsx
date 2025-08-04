"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BrainCircuit, BookUp, FileText, ArrowLeft, Mic } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type SummaryViewProps = {
  title: string;
  summary: string;
  onStartChat: () => void;
  onSummarizeAgain: () => void;
  onChangeLevel: () => void;
};

export default function SummaryView({
  title,
  summary,
  onStartChat,
  onSummarizeAgain,
  onChangeLevel,
}: SummaryViewProps) {
  // Simple split for accordion. In a real app, this would be more robust.
  const sections = summary.split('\n\n');
  const tldr = sections.shift() || "";
  
  return (
    <div className="w-full">
        <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={onSummarizeAgain}>
                <ArrowLeft />
            </Button>
            <div>
                <h1 className="text-2xl font-bold">Summary</h1>
                <p className="text-muted-foreground">{title}</p>
            </div>
        </div>
        <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
        <CardContent className="pt-6">
            <div className="mb-4">
                <h3 className="font-bold text-lg mb-2">TL;DR</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tldr}</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section, index) => {
                const parts = section.split(':');
                const title = parts.length > 1 ? parts[0] : `Section ${index + 1}`;
                const content = parts.length > 1 ? parts.slice(1).join(':') : section;
                return (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent>{content.trim()}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
        </CardContent>
        </Card>
        <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" onClick={onChangeLevel}>
              Change Level
            </Button>
            <Button onClick={onStartChat}>
              <BrainCircuit className="mr-2" />
              Ask a Question
            </Button>
             <Button>
              <Mic className="mr-2" />
              Listen
            </Button>
        </div>
    </div>
  );
}
