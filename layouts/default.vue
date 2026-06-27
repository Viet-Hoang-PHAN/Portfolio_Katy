<template>
	<div class="layout-wrapper" :class="{'--firstVisitAnimation': firstVisit }">
		<LayoutHeader />
		<div class="page-wrapper default">
			<slot />
		</div>
		<LayoutFooter />
		<button
			v-show="showBackToTop"
			class="back-to-top"
			aria-label="Haut de page"
			@click="scrollToTop"
		>↑</button>
	</div>
</template>

<script setup>

const route = useRoute();
const firstVisit = useState("firstVisit", () => route.path === '/' ? true : false);

watch( () => route.fullPath,
	() => {
		firstVisit.value = false
	}
)

const showBackToTop = ref(false);

onMounted(() => {
	window.addEventListener('scroll', () => {
		showBackToTop.value = window.scrollY > 300;
	});
});

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style lang="scss" scoped>
.back-to-top {
	position: fixed;
	bottom: $spacing5;
	right: $spacing5;
	z-index: 50;
	width: 2.8rem;
	height: 2.8rem;
	background: $off-white;
	border: 1px solid $gold;
	color: $gold;
	font-size: $font-size5;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 400ms linear, color 400ms linear;

	@include hover {
		background: $gold;
		color: $off-white;
	}

	@include media(xsm) {
		bottom: $spacing4;
		right: $spacing3;
	}
}
</style>