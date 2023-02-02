import { writable } from "svelte/store";

export const cartState = writable({
	count: 0,
	totalPrice: 0,
	products: [], // arr of objs {data: product, count:1}
});

export function addToCart(product, count = 1) {
	cartState.update(s => {
		const { hasProductIndex, foundProduct } = findProductInCart(
			s.products,
			product
		);
		let newProducts = [...s.products];

		if (hasProductIndex < 0) {
			newProducts.push({ data: product, count });
		} else {
			const newProduct = {
				data: foundProduct.data,
				count: foundProduct.count + count,
			};
			newProducts.splice(hasProductIndex, 1, newProduct);
		}

		return {
			...s,
			count: s.count + count,
			totalPrice: s.totalPrice + product.price * count,
			products: [...newProducts],
		};
	});
}

export function removeFromCart(product) {
	cartState.update(s => {
		const { hasProductIndex, foundProduct } = findProductInCart(
			s.products,
			product
		);

		if (foundProduct === null) return { ...s };

		let newProducts = [...s.products];

		if (foundProduct.count === 1) {
			newProducts.splice(hasProductIndex, 1);
			return {
				...s,
				count: s.count - 1,
				totalPrice: s.totalPrice - product.price,
				products: [...newProducts],
			};
		}

		const newProduct = {
			data: foundProduct.data,
			count: foundProduct.count - 1,
		};

		newProducts.splice(hasProductIndex, 1, newProduct);

		return {
			...s,
			count: s.count - 1,
			totalPrice: s.totalPrice - product.price,
			products: [...newProducts],
		};
	});
}

export function setCountInCart(product, count) {
	cartState.update(s => {
		const { hasProductIndex, foundProduct } = findProductInCart(
			s.products,
			product
		);

		if (foundProduct === null || foundProduct.count === count) return { ...s };

		let newProducts = [...s.products];

		const newProduct = {
			data: foundProduct.data,
			count: count,
		};

		newProducts.splice(hasProductIndex, 1, newProduct);

		const countChange = count - foundProduct.count;
		const priceChange = foundProduct.data.price * countChange;

		return {
			...s,
			count: s.count + countChange,
			totalPrice: s.totalPrice + priceChange,
			products: [...newProducts],
		};
	});
}

function findProductInCart(products, product) {
	const hasProductIndex = products.findIndex(p => p.data.id === product.id);
	const foundProduct = hasProductIndex < 0 ? null : products[hasProductIndex];
	return { hasProductIndex, foundProduct };
}
