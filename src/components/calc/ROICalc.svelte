<script>
	import CalcForm from "./CalcForm.svelte";
	import CalcResults from "./CalcResults.svelte";
</script>

<div class="calc-container">
	<CalcForm />

	<CalcResults />
</div>

<style>
	.calc-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		overflow: hidden;
	}
	@media screen and (max-width: 768px) {
		.calc-container {
			flex-direction: column;
		}
	}
</style>
