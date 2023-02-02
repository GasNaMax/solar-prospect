<script>
	import { cartState } from "./CartStore";
</script>

<div class="cart-icon-container">
	<img src="/icons/cart.svg" alt="cart" />

	{#if $cartState.count > 0}
		<div class="cart-count"><p>{$cartState.count}</p></div>
	{/if}
</div>

<style>
	.cart-icon-container {
		position: relative;
		max-height: 2rem;
		max-width: 2rem;
	}
	.cart-icon-container img {
		object-fit: contain;
	}
	.cart-count {
		position: absolute;
		top: -3px;
		left: 50%;
		transform: translateX(-50%);

		height: 1.125rem;
		width: 1.125rem;
		background-color: red;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
	}
</style>
