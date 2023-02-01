<script>
	export let href = "",
		className = "",
		text = "",
		isSecondary = false;
</script>

<a {href} class="link-btn {className}" class:secondary={isSecondary}>
	{text}
</a>

<style>
	.link-btn {
		cursor: pointer;
		background: linear-gradient(135deg, var(--yellow2), 30%, var(--orange2));

		opacity: 0.9;

		font-family: var(--font-secondary);
		font-size: 1.5rem;
		line-height: 1.5rem;
		font-weight: 700;
		text-shadow: 1px 1px 3px #161616;

		width: min-content;
		min-height: 40px;
		padding: 0;
		border: none;
		border-radius: 26px;
		box-shadow: 0px 40px 40px 10px rgba(0, 0, 0, 0.378);

		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		margin-right: 1.5rem;

		width: 35%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.link-btn:last-of-type {
		margin-right: 0;
	}
	.link-btn a {
		width: 100%;
		height: 100%;
		padding: 15px 25px;
	}
	.link-btn.secondary {
		background: linear-gradient(135deg, var(--orange2), 40%, var(--red2));
		opacity: 0.9;
	}
	.link-btn:hover {
		scale: 1.1;
		opacity: 1;
		filter: brightness(1.2);
	}
	.link-btn:active {
		scale: 0.9;
	}
</style>
