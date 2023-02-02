<script>
	import CartProduct from "./CartProduct.svelte";
	import { cartState } from "./CartStore";
</script>

<div class="cart">
	{#if $cartState.products.length === 0}
		<h4>Your Cart Is Empty</h4>
	{:else}
		{#each $cartState.products as product (product.data.id)}
			<CartProduct {product} />
		{/each}
	{/if}
</div>
