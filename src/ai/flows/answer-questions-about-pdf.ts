'use server';
/**
 * @fileOverview Answers questions about the content of a summarized PDF.
 *
 * - answerQuestionsAboutPdf - A function that answers questions about a PDF.
 * - AnswerQuestionsAboutPdfInput - The input type for the answerQuestionsAboutPdf function.
 * - AnswerQuestionsAboutPdfOutput - The return type for the answerQuestionsAboutPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionsAboutPdfInputSchema = z.object({
  pdfSummary: z.string().describe('The summarized content of the PDF.'),
  question: z.string().describe('The question to ask about the PDF content.'),
});
export type AnswerQuestionsAboutPdfInput = z.infer<typeof AnswerQuestionsAboutPdfInputSchema>;

const AnswerQuestionsAboutPdfOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the PDF content.'),
});
export type AnswerQuestionsAboutPdfOutput = z.infer<typeof AnswerQuestionsAboutPdfOutputSchema>;

export async function answerQuestionsAboutPdf(input: AnswerQuestionsAboutPdfInput): Promise<AnswerQuestionsAboutPdfOutput> {
  return answerQuestionsAboutPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutPdfPrompt',
  input: {schema: AnswerQuestionsAboutPdfInputSchema},
  output: {schema: AnswerQuestionsAboutPdfOutputSchema},
  prompt: `You are a chatbot that answers questions based on the content of a summarized PDF.

  PDF Summary: {{{pdfSummary}}}

  Question: {{{question}}}

  Answer:`,
});

const answerQuestionsAboutPdfFlow = ai.defineFlow(
  {
    name: 'answerQuestionsAboutPdfFlow',
    inputSchema: AnswerQuestionsAboutPdfInputSchema,
    outputSchema: AnswerQuestionsAboutPdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
