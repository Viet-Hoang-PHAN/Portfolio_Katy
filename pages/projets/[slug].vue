<template>
	<main id="main" class="projet">

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

		<ul v-if="galleryImages?.length" class="projet__gallery">
			<li v-for="(imageUrl, i) in galleryImages" :key="i" class="projet__gallery-item">
				<MediaRespImage :url="imageUrl" :lightbox="true" objectFit="contain" />
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

const { data: galleryImages } = await useFetch('/api/cloudinary-images', {
	key: `gallery-${route.params.slug}`,
	query: { folder: projet?.cloudinaryFolder ?? '' },
	server: false,
	default: () => []
});

function formatDate(date) {
	return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
}
</script>

<style lang="scss" scoped>
.projet {
	max-width: unset;
	padding: $spacing3;

	@include fade-in;
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
	padding: 0 $spacing1;
	margin: $spacing7 0;
	column-width: 200px;
	column-count: 6;
	column-gap: $spacing2;
}

.projet__gallery-item {
	break-inside: avoid;
	margin-bottom: $spacing2;

	:deep(img) {
		height: auto;
		display: block;
	}
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
