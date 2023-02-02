<script>
	import { products } from "./products.js";
	import Product from "./Product.svelte";
</script>

<div class="products-container">
	<div class="products-grid">
		{#each products as product (product.id)}
			<Product {product} />
		{/each}
	</div>
</div>

<style>
	.products-container {
		padding-top: 1rem;
		width: 90%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.products-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 1rem;
	}
	@media screen and (min-width: 1440px) {
		.products-container {
			width: 70%;
		}
	}
	@media screen and (max-width: 768px) {
		.products-container {
			width: 95%;
		}
	}
	@media screen and (max-width: 500px) {
		.products-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
