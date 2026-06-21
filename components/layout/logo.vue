<template>
	<NuxtLink id="header__logo" to="/" aria-label="Retour à l'accueil">
		<span class="logo__name">{{ site?.siteName }}</span>
	</NuxtLink>
</template>

<script setup>
const { data: site } = await useAsyncData('site-settings', () =>
	queryContent('/settings/site').findOne()
);
</script>

<style lang="scss" scoped>
#header__logo {
	display: flex;
	align-items: center;
}

.logo__name {
	font-family: $font-art;
	font-size: $font-size2;
	font-weight: normal;
	color: $ink;
	letter-spacing: 0.03em;
	transition: color $transition2;
	white-space: nowrap;

	@include hover {
		color: $gold;
	}

	@include media(xsm) {
		font-size: $font-size3;
	}
}
</style>
