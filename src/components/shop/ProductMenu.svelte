<script>
	import { addToCart } from "./CartStore";

	export let product = {};
	let count = 1;

	const handleAddToCart = () => {
		addToCart(product, count);
	};
</script>

<div class="product-menu">
	<div class="count-input">
		<label for="buy-count">Count:</label>
		<input
			id="buy-count"
			type="number"
			min="1"
			max="20"
			step="1"
			bind:value={count}
		/>
	</div>
	<button on:click={handleAddToCart}>Add {count} To Cart</button>
</div>

<style>
	.product-menu {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.count-input {
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
		width: auto;
		text-align: center;
		font-weight: 600;
		outline: none;
		border: none;
		border-radius: 8px;
		padding-block: 0.25rem;
	}
</style>
