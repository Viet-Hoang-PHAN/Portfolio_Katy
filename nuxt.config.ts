// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "fr",
			},
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			title: "Instants Eternels",
		},
	},
	modules: ["@nuxt/content"],
	content: {
		markdown: {
			// stop the markdownParser from turning headings into anchor tags
			// Alternatively have a read on markdown render options via the Content module at https://content.nuxt.com/get-started/configuration#markdown
			anchorLinks: false
		}
	},
	runtimeConfig: {
		public: {
			// set your cloudinary env url (used to built responsive assets links)
			cloudinaryEnvUrl: 'https://res.cloudinary.com/dvslwsa0d',
		}
	},
	css: [
		"@/assets/scss/normalize.css",
		"@/assets/scss/fonts.scss",
		"@/assets/scss/main.scss",
		"@/assets/scss/type.scss",
		"@/assets/scss/forms.scss",
		"@/assets/scss/cards.scss",
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/scss/mixins.scss"; @import "@/assets/scss/variables.scss";',
				},
			},
		},
	},
	experimental: {
		componentIslands: true,
	},
});
