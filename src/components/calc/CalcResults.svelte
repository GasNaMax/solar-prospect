<script>
	import CalcResult from "./CalcResult.svelte";
	import { ROIResultState } from "./ROIStore";
</script>

<div class="calc-results">
	<div class="results-column">
		<CalcResult
			name="cost"
			label="Total Cost:"
			value={$ROIResultState.cost}
			unit="€"
		/>
		<CalcResult
			name="areaNeeded"
			label="Area Needed:"
			value={$ROIResultState.areaNeeded}
			unit="m^2"
		/>
		<CalcResult
			name="yearlyProfit"
			label="Yearly Profit:"
			value={`${$ROIResultState.yearlyProfit.min} - ${$ROIResultState.yearlyProfit.max}`}
			unit="€"
		/>
		<CalcResult
			name="roi"
			label="ROI:"
			value={$ROIResultState.roiInYears}
			unit="years"
		/>
	</div>
	<div class="results-column">
		<CalcResult
			name="yearlyProfitRoi"
			label="After ROI:"
			value={$ROIResultState.yearlyProfit.afterRoi}
			unit="€ / year"
		/>
		<CalcResult
			name="totalPower"
			label="Power Generated After ROI:"
			value={`${$ROIResultState.generatedPower.min} - ${$ROIResultState.generatedPower.max}`}
			unit="MWh"
		/>
		<CalcResult
			name="totalValue"
			label="Profit After ROI:"
			value={`${$ROIResultState.generatedValue.min} - ${$ROIResultState.generatedValue.max}`}
			unit="€"
		/>
	</div>
</div>

<style>
	.calc-results {
		width: 45%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.results-column {
		width: 37%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0.5rem;
		margin-right: 0.75rem;
		border-radius: 0.5rem;
		background: linear-gradient(315deg, #1d1d1dab, 50%, #3131313b);
	}
	@media screen and (max-width: 768px) {
		.calc-results,
		.results-column {
			width: auto;
		}
	}
</style>
