<template>
	<main id="main" class="projet">

		<div v-if="projet?.coverImage" class="projet__cover">
			<MediaRespImage :url="projet.coverImage" :lightbox="true" objectFit="cover" />
		</div>

		<div class="projet__header">
			<span v-if="projet?.category" class="projet__category">{{ projet.category }}</span>
			<h1>{{ projet?.title }}</h1>
			<time v-if="projet?.date" class="projet__date">{{ formatDate(projet.date) }}</time>
		</div>

		<div v-if="projet?.description" class="projet__description">
			<p>{{ projet.description }}</p>
		</div>

		<div v-if="projet?.content" class="projet__content">
			<MDC :value="projet.content" />
		</div>

		<ul v-if="projet?.images?.length" class="projet__gallery">
			<li v-for="(item, i) in projet.images" :key="i" class="projet__gallery-item">
				<MediaRespImage :url="item.image" :lightbox="true" objectFit="cover" />
				<p v-if="item.caption" class="projet__caption">{{ item.caption }}</p>
			</li>
		</ul>

		<nav class="projet__nav">
			<NuxtLink to="/projets" class="projet__back">← Tous les projets</NuxtLink>
		</nav>

	</main>
</template>

<script setup>
const route = useRoute();

const { data: projet } = reactive(await useAsyncData(`projet-${route.params.slug}`, () =>
	queryContent('/projets/' + route.params.slug).findOne()
));

if (projet?.SEOmetaData) {
	setSeoHead(projet.SEOmetaData);
}

function formatDate(date) {
	return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
}
</script>

<style lang="scss" scoped>
.projet {
	max-width: 64em;
	margin-inline: auto;

	@include fade-in;
}

.projet__cover {
	width: 100vw;
	margin-left: calc(-1 * $spacing6);
	aspect-ratio: 16 / 9;
	overflow: hidden;
	margin-bottom: $spacing6;

	@include media(xsm) {
		margin-left: calc(-1 * $spacing3);
		aspect-ratio: 4 / 3;
	}
}

.projet__header {
	margin-bottom: $spacing5;

	h1 {
		margin-top: $spacing1;
		margin-bottom: $spacing1;
	}
}

.projet__category {
	display: inline-block;
	font-size: $font-size8;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold;
}

.projet__date {
	display: block;
	font-size: $font-size8;
	letter-spacing: 0.08em;
	color: $muted;
}

.projet__description {
	max-width: 48em;
	margin-bottom: $spacing6;
	border-left: 2px solid $gold;
	padding-left: $spacing4;

	p {
		font-size: $font-size5;
		color: $dark-grey;
		margin: 0;
		line-height: 1.6;
	}
}

.projet__content {
	max-width: 48em;
	margin-bottom: $spacing7;
}

.projet__gallery {
	list-style: none;
	padding: 0;
	margin: $spacing7 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: $spacing2;

	@include media(xsm) {
		grid-template-columns: 1fr;
	}
}

.projet__gallery-item {
	aspect-ratio: 4 / 3;
	overflow: hidden;
	position: relative;
}

.projet__caption {
	margin: $spacing1 0 0;
	font-size: $font-size8;
	color: $muted;
	font-style: italic;
}

.projet__nav {
	margin-top: $spacing7;
	padding-top: $spacing4;
	border-top: 1px solid $cream;
}

.projet__back {
	font-size: $font-size8;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: $muted;
	transition: color $transition2;

	@include hover {
		color: $gold;
	}
}
</style>
