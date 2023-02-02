<script>
	import { cartState } from "./CartStore.js";
</script>

{#if $cartState.count > 0}
	<div class="checkout-component">
		<button>Checkout</button>
		<div class="total">
			<p>Total:</p>
			<p>
				{$cartState.totalPrice.toFixed(2)} €
			</p>
		</div>
	</div>
{/if}
