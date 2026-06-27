<template>
	<main id="main" class="home">
		<div class="hero" :style="{ backgroundImage: `url(${heroImageUrl})` }">
			<div class="hero__overlay" />
			<div class="hero__content">
				<h1 class="hero__title">{{ home.heroTitle }}</h1>
				<p class="hero__subtitle">{{ home.heroSubtitle }}</p>
				<NuxtLink class="hero__cta" to="/projets">{{ home.heroCtaText }}</NuxtLink>
			</div>
			<span class="hero__brand">{{ home.heroTitle }}</span>
		</div>
	</main>
</template>

<script setup>

const { data: home } = reactive(await useAsyncData("home", () =>
	queryContent("/pages/home").findOne())
);

setSeoHead(home.SEOmetaData);

const heroImageUrl = computed(() => {
	if (process.client && window.innerWidth < 768) {
		return cldDelivery(home.heroImage, 'f_auto,q_auto,c_fill,w_768');
	}
	return cldDelivery(home.heroImage, 'f_auto,q_auto,c_fill,w_1920');
});

</script>

<style lang="scss" scoped>
.hero {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	@include fade-in;
}

.hero__overlay {
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.35);
}

.hero__content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: $spacing3;
	text-align: center;
	padding: $spacing6;

	@include media(xsm) {
		padding: $spacing4 $spacing3;
		gap: $spacing2;
	}
}

.hero__title {
	color: $white;
	font-family: $font-accent;
	font-size: $font-size1;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	font-weight: 400;
	margin: 0;
	width: max-content;
	max-width: 100%;

	@include media(xsm) {
		font-size: clamp(1.6rem, 8vw, $font-size2);
		letter-spacing: 0.08em;
		width: auto;

		&::before {
			display: none;
		}
	}
}

.hero__subtitle {
	color: $white;
	font-family: $font-main;
	font-size: $font-size6;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	margin: 0;
	max-width: 100%;

	@include media(xsm) {
		font-size: $font-size7;
		letter-spacing: 0.1em;
	}
}

.hero__cta {
	margin-top: $spacing4;
	padding: $spacing2 $spacing6;
	border: 1px solid $white;
	color: $white;
	font-family: $font-main;
	font-size: $font-size8;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	transition: background $transition1, color $transition1;

	@include media(xsm) {
		margin-top: $spacing3;
		padding: $spacing2 $spacing4;
		letter-spacing: 0.15em;
	}

	&:hover {
		background: $white;
		color: $ink;
	}
}

.hero__brand {
	position: absolute;
	bottom: $spacing5;
	left: 50%;
	transform: translateX(-50%);
	color: $white;
	font-family: $font-main;
	font-size: $font-size8;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	z-index: 1;
	white-space: nowrap;

	@include media(xsm) {
		display: none;
	}
}
</style>
