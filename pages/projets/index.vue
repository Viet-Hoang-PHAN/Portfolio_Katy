<template>
	<main id="main" class="projets">
		<ul class="projets__grid">
			<li
				v-for="(projet, index) in projets"
				:key="projet._path"
				class="projet-card"
				:class="{ '--featured': index === 0 }"
			>
				<NuxtLink :to="projet._path">
					<figure class="projet-card__figure">
						<div class="projet-card__image-wrap">
							<img
								v-if="projet.coverImage"
								:src="getImageUrl(projet.coverImage, index)"
								:alt="projet.title"
								class="projet-card__img"
							/>
							<div v-else class="projet-card__placeholder" />
						</div>
						<figcaption class="projet-card__info">
							<span v-if="projet.category" class="projet-card__category">
								{{ projet.category }}
							</span>
							<p class="projet-card__title">{{ projet.title }}</p>
						</figcaption>
					</figure>
				</NuxtLink>
			</li>
		</ul>
	</main>
</template>

<script setup>
import cldDelivery from '~/composables/cldDelivery';

useHead({ title: 'Projets — Instants Eternels' });

const { data: projets } = await useAsyncData('projets', () =>
	queryContent('/projets').sort({ date: -1 }).find()
);

function getImageUrl(url, index) {
	const width = index === 0 ? 'w_1600' : 'w_900';
	return cldDelivery(url, `f_auto,c_scale,${width}`);
}
</script>

<style lang="scss" scoped>
.projets {
	padding-block: $spacing5 $spacing8;
	@include fade-in;
}

.projets__grid {
	list-style: none;
	padding: 0;
	margin: 0;
	columns: 2;
	column-gap: $spacing3;

	@include media(xsm) {
		columns: 1;
	}
}

// Premier projet : pleine largeur, panoramique
.projet-card.--featured {
	column-span: all;
	margin-bottom: $spacing3;

	.projet-card__image-wrap {
		aspect-ratio: 16 / 7;

		img {
			height: 100%;
			object-fit: cover;
		}
	}

	.projet-card__title {
		font-size: $font-size3;
	}
}

.projet-card {
	break-inside: avoid;
	margin-bottom: $spacing3;

	a {
		display: block;

		@include hover {
			.projet-card__image-wrap img {
				transform: scale(1.03);
			}

			.projet-card__title {
				color: $gold;
			}
		}
	}
}

.projet-card__figure {
	margin: 0;
}

.projet-card__image-wrap {
	overflow: hidden;
	background: $cream;

	img {
		display: block;
		width: 100%;
		height: auto;
		transition: transform 400ms ease;
	}
}

.projet-card__placeholder {
	aspect-ratio: 4 / 5;
	background: $cream;
}

.projet-card__info {
	padding: $spacing2 0 $spacing1;
	border-bottom: 1px solid $cream;
}

.projet-card__category {
	display: block;
	font-size: $font-size8;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: $gold;
	margin-bottom: $spacing0;
}

.projet-card__title {
	margin: 0;
	font-family: $font-accent;
	font-size: $font-size5;
	font-weight: normal;
	letter-spacing: 0.05em;
	color: $ink;
	line-height: 1.3;
	transition: color $transition2;
}

</style>
