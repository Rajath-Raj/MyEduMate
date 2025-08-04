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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const PdfUploadFormSchema = z.object({
  pdfFile: z
    .any()
    .refine((file): file is File => file instanceof File, "Please upload a file.")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .pdf files are accepted."
    ),
  summaryLevel: z.enum(["Beginner", "Intermediate", "Expert"]),
});

type PdfUploadFormProps = {
  onSubmit: (data: z.infer<typeof PdfUploadFormSchema>) => void;
  isLoading: boolean;
};

export default function PdfUploadForm({
  onSubmit,
  isLoading,
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
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">
          Hi, what would you like to learn today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload a PDF</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF (MAX. 5MB)
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
                    </div>
                  </FormControl>
                  <FormDescription>
                    {fileName
                      ? `Selected file: ${fileName}`
                      : "Please upload a PDF document you want to summarize."}
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
                  <FormLabel>Select Summary Level</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Beginner" />
                        </FormControl>
                        <FormLabel className="font-normal">🐣 Beginner</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Intermediate" />
                        </FormControl>
                        <FormLabel className="font-normal">🎓 Intermediate</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Expert" />
                        </FormControl>
                        <FormLabel className="font-normal">🚀 Expert</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
              suppressHydrationWarning
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload & Summarize
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
