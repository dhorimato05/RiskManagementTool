<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import Form from './Form.svelte';
	export let data: PageData;

	const futuresTable = [
		{
			futureTicker: 'NQ',
			pointValue: '$20'
		},
		{
			futureTicker: 'MNQ',
			pointValue: '$2'
		},
		{
			futureTicker: 'ES',
			pointValue: '$50'
		},
		{
			futureTicker: 'MES',
			pointValue: '$5'
		}
	];
</script>

<div class="flex w-full flex-col items-center justify-center">
	<h1
		class="2xs:text-sm mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-lg lg:text-5xl"
	>
		Position Size Calculator
	</h1>

	<div
		class="sm:max-w-1/4 2xs:flex 2xs:flex-col 2xs:items-center mb-10 flex w-1/4 justify-between gap-5 sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-row"
	>
		<div>
			<Card.Root class="2xs:w-[200px] pb-4">
				<Table.Root>
					<Table.Caption>$ per point for each future ticker.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Future Ticker</Table.Head>
							<Table.Head>Point Value</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each futuresTable as future}
							<Table.Row>
								<Table.Cell class="font-medium">{future.futureTicker}</Table.Cell>
								<Table.Cell class="font-medium">{future.pointValue}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Root>
		</div>
		<div>
			<Form data={data.form} />
		</div>
	</div>
	<div>
		<h1
			class="2xs:text-sm 2xs:text-center 2xs:justify-center mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl"
		>
			Number of Contracts: {data.contracts}
		</h1>
	</div>
</div>
