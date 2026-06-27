<template>
	<div id="main-menu">
		<button
			id="mobile-menu__toggle-button"
			:class="{ mobileMenuOpen: mobileMenuActive }"
			:aria-expanded="mobileMenuActive"
			aria-label="Ouvrir le menu"
			@click="toggleMobileMenu()"
		>
			<span aria-hidden="true">&#x2630;</span>
		</button>

		<nav :class="{ mobileMenuOpen: mobileMenuActive }" aria-label="Navigation principale">
			<menu class="main-menu__basic">
				<li v-for="item in nav?.items" :key="item.path">
					<NuxtLink :to="item.path" class="menu-item" prefetch>
						{{ item.label }}
					</NuxtLink>
				</li>
			</menu>
		</nav>
	</div>
</template>

<script setup>
const { data: nav } = await useAsyncData('navigation', () =>
	queryContent('/settings/navigation').findOne()
);

const mobileMenuActive = ref(false);
const route = useRoute();

watch(
	() => route.path,
	() => { mobileMenuActive.value = false }
);

function toggleMobileMenu() {
	mobileMenuActive.value = !mobileMenuActive.value;
}
</script>

<style lang="scss" scoped>
#main-menu {
	@include media(xsm) {
		z-index: 99;
	}
}

nav {
	@include media(xsm) {
		display: none;
	}
}

nav.mobileMenuOpen {
	@include media(xsm) {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		inset: 0;
		background: rgba($off-white, 0.97);
		backdrop-filter: blur(0.4em);
		z-index: 98;
	}
}

.main-menu__basic {
	display: flex;
	align-items: center;
	gap: $spacing5;
	list-style: none;
	margin: 0;
	padding: 0;

	@include media(xsm) {
		flex-direction: column;
		gap: $spacing6;
		text-align: center;
	}
}

.menu-item {
	font-family: $font-main;
	font-size: $font-size8;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $muted;
	transition: color $transition2;
	cursor: pointer;

	&.router-link-active,
	&.router-link-exact-active {
		color: $gold;
	}

	@include hover {
		color: $ink;
	}

	@include media(xsm) {
		font-size: $font-size4;
		letter-spacing: 0.1em;
	}
}

#mobile-menu__toggle-button {
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: $spacing2;
	color: $ink;

	@include media(xsm) {
		position: relative;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $font-size3;
	}

	span {
		display: block;
		line-height: 1;
	}
}

#mobile-menu__toggle-button.mobileMenuOpen {
	position: fixed;
	top: $spacing2;
	right: $spacing2;
}
</style>
