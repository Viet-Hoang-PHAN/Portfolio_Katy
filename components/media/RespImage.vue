<template>
	<div class="responsive-image" @[clickEvent]="openLightbox">
		<img :key="props.url" :src="imageUrl" :class="{ '__has-lightbox': props.lightbox }" width="800" height="600"
			:alt="imageUrl" />
	</div>
	<dialog v-if="props.lightbox" ref="dialogEl" @click.self="closeLightbox">
		<button class="lightbox-close" @click="closeLightbox">✕</button>
		<img :key="props.url" :src="imageUrlFull" />
	</dialog>
</template>

<script setup>

import cldDelivery from '~/composables/cldDelivery';

// NOTES
// This is a respsonvive image component via changing cloudinary transform parameters. And includes a single image instance lightbox function when enabled in props 

const props = defineProps({ 
	url: String, 
	lightbox: Boolean, 
	objectFit: String, 
	color: String 
});


// Preset Cloudinary imaga size transformation
const respSize = ref("w_1920")

// Change image transformation to 1920 or 1024
// NOTE: adding more variables will lead to more transformations! Keep your transformations per month in check ;)
onMounted(() => {
	if (process.client) {
		window.innerWidth < 1024 ? respSize.value = "w_1024" : respSize.value = "w_1920"
	}
})

// Build absolute url
const imageUrl = computed(() => {
	return cldDelivery(props.url, 'f_auto,c_scale,' + respSize.value)
})

// set object fit in css
const objectFit = props.objectFit ? props.objectFit : "contain";

const dialogEl = ref(null);

const clickEvent = computed(() => props.lightbox ? "click" : null);

const imageUrlFull = computed(() => cldDelivery(props.url, 'f_auto,c_scale,w_2400'));

function openLightbox() {
	dialogEl.value?.showModal();
	document.body.style.overflow = 'hidden';
}
function closeLightbox() {
	dialogEl.value?.close();
	document.body.style.overflow = '';
}


// colors from SCSS!
import variables from '~/assets/scss/variables.module.scss';

// use baseColor from assets/scss/variables unless provided otherwise via props
const baseColor = variables.baseColor;
const accentColor = computed(() => {
	let r = props.color ? props.color : baseColor;
	return r
})
</script>


<style lang="scss" scoped>
.responsive-image {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: v-bind('objectFit');
		transition: transform 400ms linear;
	}

	@include hover {
		img.__has-lightbox {
			transform: scale(1.03);
		}

		&::after {
			opacity: 1;
		}
	}

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid $gold;
		opacity: 0;
		transition: opacity $transition2;
		pointer-events: none;
	}
}

img.__has-lightbox {
	cursor: pointer;
}

dialog[open] {
	position: fixed;
	z-index: 100;
	inset: 0;
	width: 100vw;
	height: 100vh;
	max-width: 100vw;
	max-height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba($black, 0.95);
	border: none;
	padding: $spacing4;
	box-sizing: border-box;

	&::backdrop {
		background: rgba($black, 0.9);
	}

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		display: block;
	}
}

.lightbox-close {
	position: fixed;
	top: $spacing3;
	right: $spacing3;
	background: none;
	border: none;
	color: $base-color;
	font-size: $font-size3;
	cursor: pointer;
	line-height: 1;
	padding: $spacing1;
	opacity: 0.7;
	transition: opacity $transition2;

	&:hover {
		opacity: 1;
	}
}

</style>
