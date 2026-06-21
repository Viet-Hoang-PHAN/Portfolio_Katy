<template>
	<main id="main" class="about">
		<div v-if="about?.photo" class="about__photo">
			<MediaRespImage :url="about.photo" :lightbox="false" objectFit="cover" />
		</div>
		<div class="about__content">
			<MDC :value="about?.content" />
		</div>
	</main>
</template>

<script setup>
const { data: about } = reactive(await useAsyncData('about', () =>
	queryContent('/pages/about').findOne()
));

setSeoHead(about.SEOmetaData);
</script>

<style lang="scss" scoped>
.about {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: $spacing7;
	align-items: start;
	max-width: 72em;
	margin-inline: auto;

	@include media(xsm, sm) {
		grid-template-columns: 1fr;
		gap: $spacing5;
	}

	@include fade-in;
}

.about__photo {
	position: sticky;
	top: $spacing6;
	aspect-ratio: 3 / 4;
	overflow: hidden;

	@include media(xsm, sm) {
		position: static;
		aspect-ratio: 4 / 3;
		max-height: 24em;
	}
}

.about__content {
	:deep(h1),
	:deep(h2) {
		margin-top: 0;
	}

	:deep(p) {
		color: $dark-grey;
	}
}
</style>
