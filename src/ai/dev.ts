import { config } from 'dotenv';
config();

import '@/ai/flows/suggested-questions.ts';
import '@/ai/flows/answer-questions-about-pdf.ts';
import '@/ai/flows/summarize-pdf.ts';