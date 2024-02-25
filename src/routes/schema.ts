import { z } from 'zod';

export const formSchema = z.object({
	future: z.string({ required_error: 'Please select a Future' }).default('NQ'),
	riskAmount: z
		.string({ required_error: 'Please enter a risk amount' })
		.min(1, 'Risk Amount must be at least $1'),
	stopLoss: z
		.string({ required_error: 'Please enter a stop loss.' })
		.min(1, 'Stop loss must be a minimum of 1 point.')
});

export type FormSchema = typeof formSchema;
