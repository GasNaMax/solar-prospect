<script>
	import { removeFromCart } from "./CartStore";

	export let product = {};
</script>

<div class="cart-product">
	<h3>{product.data.name}</h3>
	<div class="cart-product-count">
		<p>
			{product.count}
		</p>
	</div>
	<button on:click={() => removeFromCart(product.data)}>-</button>
</div>

<style>
	.cart-product {
		display: flex;
	}

	.cart-product h3 {
	}
</style>
