<template>
	<main id="main" class="contact">
		<div class="contact__inner">
			<h1>{{ contact?.title }}</h1>

			<p v-if="contact?.intro" class="contact__intro">
				{{ contact.intro }}
			</p>

			<a
				v-if="contact?.email"
				:href="`mailto:${contact.email}`"
				class="contact__email"
			>
				{{ contact.email }}
			</a>

			<ul v-if="contact?.socialLinks?.length" class="contact__social">
				<li v-for="link in contact.socialLinks" :key="link.url">
					<a :href="link.url" target="_blank" rel="noopener noreferrer">
						{{ link.label }}
					</a>
				</li>
			</ul>
		</div>
	</main>
</template>

<script setup>
const { data: contact } = reactive(await useAsyncData('contact', () =>
	queryContent('/pages/contact').findOne()
));

setSeoHead(contact.SEOmetaData);
</script>

<style lang="scss" scoped>
.contact {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;

	@include fade-in;
}

.contact__inner {
	text-align: center;
	max-width: 32em;

	h1 {
		margin-top: 0;

		&::before {
			display: none;
		}
	}
}

.contact__intro {
	color: $muted;
	font-size: $font-size6;
	margin-bottom: $spacing6;
}

.contact__email {
	display: inline-block;
	font-size: $font-size5;
	letter-spacing: 0.05em;
	color: $ink;
	border-bottom: 1px solid $gold;
	padding-bottom: 0.1em;
	transition: color $transition2, border-color $transition2;
	margin-bottom: $spacing6;

	@include hover {
		color: $gold;
	}
}

.contact__social {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: center;
	gap: $spacing5;
	flex-wrap: wrap;

	li a {
		font-size: $font-size8;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: $muted;
		transition: color $transition2;

		@include hover {
			color: $gold;
		}
	}
}
</style>
