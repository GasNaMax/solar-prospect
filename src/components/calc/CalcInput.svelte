<script>
	import { onMount } from "svelte";
	import { setCalcInput } from "./ROIStore";

	export let name = "",
		label = "",
		unit = "",
		value = 0,
		step = 1,
		min = 0,
		max = 10000;

	function setInputWidthClass(value) {
		const len = value.toString().split("").length;
		return `input-w-${len}`;
	}
	let inputWidthClass = "";

	onMount(() => {
		inputWidthClass = setInputWidthClass(value);
	});

	let debounceTimer;

	const debounce = (callback, time) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, time);
	};
</script>

<div class="calc-input">
	<label for={name}>{label}</label>

	<input
		id={name}
		type="number"
		{min}
		{max}
		{step}
		{value}
		class={`${inputWidthClass}`}
		on:change={e => {
			debounce(() => {
				setCalcInput(name, e.target.value);
				setInputWidthClass(e.target.value);
			}, 500);
		}}
	/>
	<div class="unit">
		<p>
			{unit}
		</p>
	</div>
</div>
<br />

<style>
	.calc-input {
		width: 90%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	label {
		color: white;
		font-weight: 700;
		font-size: 1.25rem;
	}
	input {
		width: 12ch;
		text-align: center;
		font-weight: 600;
		outline: none;
		border: none;
		border-radius: 8px;
		padding-block: 0.25rem;
	}
	.input-w-1,
	.input-w-2 {
		width: 5.5ch;
	}
	.input-w-3,
	.input-w-4 {
		width: 7ch;
	}
	.unit {
		position: absolute;
		right: 0;
		transform: translate(105%, -50%);
		top: 50%;
	}
	.unit p {
		padding-left: 0.25rem;
		font-weight: 600;
		font-size: 1.5rem;
		text-shadow: 1px 1px 2px black;
	}
	@media screen and (max-width: 520px) {
		label,
		.unit p {
			font-size: 1rem;
		}
	}
</style>
