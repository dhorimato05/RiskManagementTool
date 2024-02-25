<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { browser } from '$app/environment';
	import type { ActionData, PageData } from './$types';

	export let data: SuperValidated<Infer<FormSchema>>;

	const futures = [
		{
			label: 'NQ',
			value: 'NQ'
		},
		{
			label: 'MNQ',
			value: 'MNQ'
		},
		{
			label: 'ES',
			value: 'ES'
		},
		{
			label: 'MES',
			value: 'MES'
		}
	];

	const form = superForm(data, {
		validators: zodClient(formSchema),
		resetForm: true
	});

	const { form: formData, enhance } = form;

	$: selectedFuture = $formData.future
		? {
				label: $formData.future,
				value: $formData.future
			}
		: undefined;
</script>

<div class="mb-5 flex w-full justify-center">
	<Card.Root class="w-1/1 p-5 shadow-md">
		<Card.Header>
			<Card.Title>Risk Management Tool</Card.Title>
			<Card.Description
				>Please select your future ticker, risk amount, and desired stop loss.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<Form.Field {form} name="future">
					<Form.Control let:attrs>
						<Form.Label>Future</Form.Label>
						<Select.Root
							selected={selectedFuture}
							onSelectedChange={(v) => {
								v && ($formData.future = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select a Future" />
							</Select.Trigger>
							<Select.Content>
								{#each futures as future}
									<Select.Item value={future.value}>{future.label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.future} name={attrs.name} />
					</Form.Control>
					<Form.Description>This is your future.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="riskAmount">
					<Form.Control let:attrs>
						<Form.Label>Risk Amount</Form.Label>
						<Input {...attrs} type="number" bind:value={$formData.riskAmount} />
					</Form.Control>
					<Form.Description>This is your risk amount.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="stopLoss">
					<Form.Control let:attrs>
						<Form.Label>Stop Loss</Form.Label>
						<Input {...attrs} type="number" bind:value={$formData.stopLoss} />
					</Form.Control>
					<Form.Description>This is your stop loss.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Submit</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
