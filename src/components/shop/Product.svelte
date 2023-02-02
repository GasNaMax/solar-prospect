<script>
	import { addToCart } from "./CartStore";

	export let product = {};

	const handleAddToCart = e => {
		e.stopPropagation();
		addToCart(product);
	};
</script>

<div class="product-container">
	<div class="product-image">
		<img src={product?.imageUrl} alt={product?.name} />
	</div>
	<a href="/shop/{product?.id}" class="product-name">
		{product?.name}
	</a>
	<!-- <div class="product-description">
		<p>{product?.description}</p>
	</div> -->
	<div class="product-actions">
		<div class="product-price">
			<p>{product?.price}€</p>
		</div>
		<div class="add-to-cart-container">
			<button class="link-btn" on:click={handleAddToCart}>Add to cart</button>
		</div>
	</div>
</div>

<style>
	.product-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 0.5rem;
	}
	.product-image {
		width: 100%;
		aspect-ratio: 1;
		position: relative;
	}
	.product-image img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	.product-actions {
		margin-top: auto;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
