<script>
	export let name = "",
		label = "",
		value = "",
		unit = "";
</script>

<label for={name}>{label}</label>
<p id={name}>{value} {unit}</p>

<style>
	label {
		font-size: 1.25rem;
		color: var(--col-light);
		opacity: 0.75;
		text-shadow: 1px 1px 2px black;
	}
	p {
		font-size: 1.5rem;
		text-shadow: 1px 1px 2px black;
	}
	@media screen and (max-width: 520px) {
		label {
			font-size: 1rem;
		}
		p {
			font-size: 1.125rem;
		}
	}
</style>
