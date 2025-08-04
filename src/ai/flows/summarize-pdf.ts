'use server';

/**
 * @fileOverview A PDF summarization AI agent.
 *
 * - summarizePdf - A function that handles the PDF summarization process.
 * - SummarizePdfInput - The input type for the summarizePdf function.
 * - SummarizePdfOutput - The return type for the summarizePdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
  summaryLevel: z.enum(['Beginner', 'Intermediate', 'Expert']).describe('The desired level of detail in the summary.'),
});
export type SummarizePdfInput = z.infer<typeof SummarizePdfInputSchema>;

const SummarizePdfOutputSchema = z.object({
  summary: z.string().describe('The summarized text of the PDF document.'),
});
export type SummarizePdfOutput = z.infer<typeof SummarizePdfOutputSchema>;

export async function summarizePdf(input: SummarizePdfInput): Promise<SummarizePdfOutput> {
  return summarizePdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePdfPrompt',
  input: {schema: SummarizePdfInputSchema},
  output: {schema: SummarizePdfOutputSchema},
  prompt: `You are an expert summarizer, skilled at condensing large documents into concise summaries tailored to different expertise levels.

You will receive a PDF document and a desired summary level (Beginner, Intermediate, or Expert).  Create a summary appropriate for the given level.

PDF Content: {{media url=pdfDataUri}}
Summary Level: {{{summaryLevel}}}

Summary:`, // Corrected Handlebars syntax and added PDF content instruction
});

const summarizePdfFlow = ai.defineFlow(
  {
    name: 'summarizePdfFlow',
    inputSchema: SummarizePdfInputSchema,
    outputSchema: SummarizePdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
