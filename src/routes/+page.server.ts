import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ cookies }) => {
	const contracts = cookies.get('contracts');
	return {
		form: await superValidate(zod(formSchema)),
		contracts
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		const future = await form.data.future;
		const risk = await Number(form.data.riskAmount);
		const stop = await Number(form.data.stopLoss);
		const nqPoint = 20;
		const mnqPoint = 2;
		const esPoint = 50;
		const mesPoint = 5;
		let numContracts = 0;

		console.log(future, risk, stop);
		if (!form.valid) {
			console.log('Error');
			return fail(400, {
				form
			});
		}

		if (future == 'NQ') {
			numContracts = risk / nqPoint / stop;
			event.cookies.set('contracts', String(numContracts), {
				path: '/'
			});
		} else if (future == 'MNQ') {
			numContracts = risk / mnqPoint / stop;
			event.cookies.set('contracts', String(numContracts), {
				path: '/'
			});
		} else if (future == 'ES') {
			numContracts = risk / esPoint / stop;
			event.cookies.set('contracts', String(numContracts), {
				path: '/'
			});
		} else {
			numContracts = risk / mesPoint / stop;
			event.cookies.set('contracts', String(numContracts), {
				path: '/'
			});
		}

		console.log(numContracts);

		return {
			form,
			success: true
		};
	}
};
