<template>
	<main id="main" class="projets">
		<ul class="projets__grid">
			<li v-for="projet in projets" :key="projet._path" class="projet-card">
				<NuxtLink :to="projet._path">
					<div class="projet-card__image">
						<MediaRespImage
							v-if="projet.coverImage"
							:url="projet.coverImage"
							:lightbox="false"
							objectFit="cover"
						/>
						<div v-else class="projet-card__placeholder" />
					</div>
					<div class="projet-card__overlay">
						<span v-if="projet.category" class="projet-card__category">
							{{ projet.category }}
						</span>
						<p class="projet-card__title">{{ projet.title }}</p>
					</div>
				</NuxtLink>
			</li>
		</ul>
	</main>
</template>

<script setup>
useHead({ title: 'Projets — Instants Eternels' });

const { data: projets } = await useAsyncData('projets', () =>
	queryContent('/projets').sort({ date: -1 }).find()
);
</script>

<style lang="scss" scoped>
.projets {
	padding-block: $spacing6;

	@include fade-in;
}

.projets__grid {
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: $spacing2;

	@include media(sm) {
		grid-template-columns: repeat(2, 1fr);
	}

	@include media(xsm) {
		grid-template-columns: 1fr;
	}
}

.projet-card {
	position: relative;
	overflow: hidden;

	a {
		display: block;
		position: relative;
		aspect-ratio: 3 / 4;
		overflow: hidden;
	}
}

.projet-card__image {
	position: absolute;
	inset: 0;
	transition: transform $transition4;

	.projet-card a:hover & {
		transform: scale(1.03);
	}
}

.projet-card__placeholder {
	width: 100%;
	height: 100%;
	background: $cream;
}

.projet-card__overlay {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: $spacing4;
	background: linear-gradient(to top, rgba($ink, 0.65) 0%, transparent 55%);
	opacity: 0;
	transition: opacity $transition3;

	.projet-card a:hover & {
		opacity: 1;
	}

	@include media(xsm) {
		opacity: 1;
	}
}

.projet-card__category {
	display: block;
	font-size: $font-size8;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold-light;
	margin-bottom: $spacing0;
}

.projet-card__title {
	margin: 0;
	font-family: $font-accent;
	font-size: $font-size5;
	font-weight: normal;
	letter-spacing: 0.05em;
	color: $white;
	line-height: 1.3;
}
</style>
