"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, UploadCloud, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const PdfUploadFormSchema = z.object({
  pdfFile: z
    .any()
    .refine((file): file is File => file instanceof File, "Please upload a file.")
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      `Max file size is 20MB.`
    )
    .refine(
      (file) => file && ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .pdf files are accepted."
    ),
  summaryLevel: z.enum(["Beginner", "Intermediate", "Expert"]),
});

type PdfUploadFormProps = {
  onSubmit: (data: z.infer<typeof PdfUploadFormSchema>) => void;
  isLoading: boolean;
  onBack: () => void;
};

export default function PdfUploadForm({
  onSubmit,
  isLoading,
  onBack,
}: PdfUploadFormProps) {
  const [fileName, setFileName] = useState("");

  const form = useForm<z.infer<typeof PdfUploadFormSchema>>({
    resolver: zodResolver(PdfUploadFormSchema),
    defaultValues: {
      summaryLevel: "Beginner",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("pdfFile", file, { shouldValidate: true });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold">Upload your PDF</h1>
        </div>
        <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors p-5"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          Drag and drop or tap to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDFs only, up to 20MB
                        </p>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={ACCEPTED_FILE_TYPES.join(",")}
                      />
                    </label>
                  </FormControl>
                  <FormDescription className="text-center">
                    {fileName
                      ? `Selected file: ${fileName}`
                      : ""}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summaryLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Difficulty Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-2"
                    >
                      {["Beginner", "Intermediate", "Expert"].map((level) => (
                        <FormItem key={level} className="flex items-center">
                            <FormControl>
                                <RadioGroupItem value={level} id={level} className="sr-only" />
                            </FormControl>
                            <FormLabel 
                                htmlFor={level}
                                className={`w-full text-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${field.value === level ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted border-border'}`}
                            >
                                {level === "Beginner" && "🐣"}
                                {level === "Intermediate" && "🎓"}
                                {level === "Expert" && "🚀"}
                                <span className="block mt-1 text-sm font-medium">{level}</span>
                            </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="w-full"
              size="lg"
              suppressHydrationWarning
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Summarize This
            </Button>
          </form>
        </Form>
        </div>
    </div>
  );
}
