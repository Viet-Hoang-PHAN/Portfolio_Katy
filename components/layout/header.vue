<template>
	<header id="header">
		<LayoutLogo />
		<NavigationMainMenu />
	</header>
</template>

<style lang="scss" scoped>
#header {
	position: relative;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	padding: $spacing4 $spacing6;
	gap: $spacing6;

	&::after {
		position: absolute;
		content: "";
		width: 100%;
		height: 1px;
		bottom: 0;
		left: 0;
		background: linear-gradient(90deg, $gold 0%, $gold-light 50%, transparent 100%);
		opacity: 0.5;
	}

	@include media(xsm) {
		padding: $spacing3 $spacing3;
		gap: $spacing3;
	}
}

#main-menu {
	justify-self: end;
}
</style>
