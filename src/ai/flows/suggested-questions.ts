'use server';

/**
 * @fileOverview A flow for generating suggested questions related to a PDF summary.
 *
 * - generateSuggestedQuestions - A function that generates suggested questions based on the PDF summary.
 * - GenerateSuggestedQuestionsInput - The input type for the generateSuggestedQuestions function.
 * - GenerateSuggestedQuestionsOutput - The return type for the generateSuggestedQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSuggestedQuestionsInputSchema = z.object({
  pdfSummary: z.string().describe('The summary of the PDF document.'),
});
export type GenerateSuggestedQuestionsInput = z.infer<
  typeof GenerateSuggestedQuestionsInputSchema
>;

const GenerateSuggestedQuestionsOutputSchema = z.object({
  suggestedQuestions: z
    .array(z.string())
    .describe('An array of suggested questions related to the PDF summary.'),
});
export type GenerateSuggestedQuestionsOutput = z.infer<
  typeof GenerateSuggestedQuestionsOutputSchema
>;

export async function generateSuggestedQuestions(
  input: GenerateSuggestedQuestionsInput
): Promise<GenerateSuggestedQuestionsOutput> {
  return generateSuggestedQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSuggestedQuestionsPrompt',
  input: {schema: GenerateSuggestedQuestionsInputSchema},
  output: {schema: GenerateSuggestedQuestionsOutputSchema},
  prompt: `You are an AI assistant designed to generate suggested questions based on a PDF summary.\n\n  Given the following PDF summary, generate a list of 5 suggested questions that a student might ask to further explore the material.\n\n  PDF Summary: {{{pdfSummary}}}\n\n  Your response should be a JSON array of strings, where each string is a suggested question.\n  Example:\n  [\n    "Explain this in simple words",\n    "Give me 3 key points",\n    "Ask me a quiz",
    "What are the real world applications of this?",
    "Can you explain this like I'm five?"
  ]
  `,
});

const generateSuggestedQuestionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestedQuestionsFlow',
    inputSchema: GenerateSuggestedQuestionsInputSchema,
    outputSchema: GenerateSuggestedQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
