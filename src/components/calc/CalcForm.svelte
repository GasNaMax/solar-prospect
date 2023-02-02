<script>
	import { onMount } from "svelte";
	import { calculateROIInYears, ROICalcState } from "./ROIStore";

	import CalcInput from "./CalcInput.svelte";
	import LinkBtn from "../ui/LinkBtn.svelte";

	const handleSubmit = e => {
		calculateROIInYears();
	};

	onMount(() => {
		calculateROIInYears();
	});
</script>

<form on:submit|preventDefault={handleSubmit}>
	<CalcInput
		name="panelCount"
		label="Number of Panels"
		min={1}
		max={100}
		step={1}
		value={$ROICalcState.panelCount}
	/>
	<CalcInput
		name="panelPrice"
		label="Panel Price"
		unit="€"
		min={1}
		max={10000}
		step={10}
		value={$ROICalcState.panelPrice}
	/>
	<CalcInput
		name="generation"
		label="Generation per Panel"
		unit="kWh/year"
		min={0}
		max={10000}
		step={1000}
		value={$ROICalcState.generation}
	/>

	<CalcInput
		name="elPrice"
		label="Electricity Price"
		unit="€/kWh"
		min={0}
		max={20}
		step={0.1}
		value={$ROICalcState.elPrice}
	/>

	<CalcInput
		name="priceGrowth"
		label="Price Growth"
		unit="%/year"
		min={0}
		max={100}
		step={1}
		value={$ROICalcState.priceGrowth}
	/>

	<LinkBtn href="/shop" text="Buy" />
</form>

<style>
	form {
		margin-left: 10%;
		padding: 1rem;
		width: 50%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
	}
	@media screen and (max-width: 1024px) {
		form {
			margin-left: 5%;
		}
	}
	@media screen and (max-width: 900px) {
		form {
			margin-left: 0;
		}
	}
	@media screen and (max-width: 768px) {
		form {
			margin-left: -5%;
			width: auto;
		}
	}
</style>
