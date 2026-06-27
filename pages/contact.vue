<template>
	<main id="main" class="contact">
		<div class="contact__inner">
			<div class="contact__heading">
				<h1>{{ contact?.title }}</h1>
				<p v-if="contact?.intro" class="contact__intro">{{ contact.intro }}</p>
			</div>

			<form
				v-if="!submitted"
				name="contact"
				method="POST"
				data-netlify="true"
				netlify-honeypot="bot-field"
				@submit.prevent="handleSubmit"
			>
				<input type="hidden" name="form-name" value="contact" />
				<input type="hidden" name="bot-field" />

				<fieldset>
					<div class="input-wrapper">
						<input
							id="nom"
							v-model="form.nom"
							type="text"
							name="nom"
							placeholder="Nom"
							required
						/>
						<label for="nom">Nom</label>
					</div>

					<div class="input-wrapper">
						<input
							id="email"
							v-model="form.email"
							type="email"
							name="email"
							placeholder="Email"
							required
						/>
						<label for="email">Email</label>
					</div>

					<div class="input-wrapper">
						<input
							id="objet"
							v-model="form.objet"
							type="text"
							name="objet"
							placeholder="Objet"
							required
						/>
						<label for="objet">Objet</label>
					</div>

					<div class="input-wrapper input-type-textarea">
						<textarea
							id="message"
							v-model="form.message"
							name="message"
							placeholder="Message"
							rows="5"
							required
						></textarea>
						<label for="message">Message</label>
					</div>
				</fieldset>

				<button type="submit" class="contact__submit" :disabled="sending">
					{{ sending ? 'Envoi…' : 'Envoyer' }}
				</button>

				<p v-if="error" class="contact__error">Une erreur est survenue, veuillez réessayer.</p>
			</form>

			<div v-else class="contact__success">
				<p>Merci pour votre message, je reviendrai vers vous rapidement.</p>
			</div>
		</div>
	</main>
</template>

<script setup>
const { data: contact } = reactive(await useAsyncData('contact', () =>
	queryContent('/pages/contact').findOne()
));

setSeoHead(contact.SEOmetaData);

const form = reactive({ nom: '', email: '', objet: '', message: '' });
const submitted = ref(false);
const sending = ref(false);
const error = ref(false);

async function handleSubmit() {
	sending.value = true;
	error.value = false;

	try {
		await $fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				'form-name': 'contact',
				...form
			}).toString()
		});
		submitted.value = true;
	} catch {
		error.value = true;
	} finally {
		sending.value = false;
	}
}
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
	width: 100%;
	max-width: 32em;
	padding: $spacing6 0;

}

.contact__heading {
	text-align: center;
	margin-bottom: $spacing4;

	h1 {
		margin-top: 0;
		margin-bottom: $spacing2;

		&::before {
			display: none;
		}
	}
}

.contact__intro {
	color: $muted;
	font-size: $font-size6;
	margin: 0;
	line-height: 1.6;
}

fieldset {
	display: flex;
	flex-direction: column;
	gap: $spacing4;
	margin-bottom: $spacing5;
}

.contact__submit {
	display: block;
	width: 100%;
	padding: $spacing3 $spacing5;
	background: transparent;
	border: 1px solid $gold;
	color: $ink;
	font-size: $font-size8;
	letter-spacing: 0.2em;
	text-transform: uppercase;
	cursor: pointer;
	transition: background $transition2, color $transition2;

	@include hover {
		background: $gold;
		color: $off-white;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

.contact__error {
	margin-top: $spacing3;
	color: $red;
	font-size: $font-size8;
	text-align: center;
}

.contact__success {
	text-align: center;
	color: $muted;
	font-size: $font-size6;
	letter-spacing: 0.05em;
}
</style>
