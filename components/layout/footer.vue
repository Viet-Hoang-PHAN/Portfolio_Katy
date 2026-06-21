<template>
	<footer>
		<p class="footer__credit">
			&copy; {{ new Date().getFullYear() }} {{ site?.siteName }}
		</p>
	</footer>
</template>

<script setup>
const { data: site } = await useAsyncData('site-settings', () =>
	queryContent('/settings/site').findOne()
);
</script>

<style lang="scss" scoped>
footer {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $spacing4 $spacing6;
	border-top: 1px solid $cream;
}

.footer__credit {
	margin: 0;
	font-size: $font-size8;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: $muted;
}
</style>
