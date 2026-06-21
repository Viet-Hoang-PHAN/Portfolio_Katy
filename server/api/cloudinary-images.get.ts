export default defineEventHandler(async (event) => {
	const { folder } = getQuery(event) as { folder?: string };

	console.log('[cloudinary-images] folder:', folder);

	if (!folder) return [];

	const config = useRuntimeConfig();
	const cloudName = 'dvslwsa0d';
	const apiKey = '166261252296815';
	const apiSecret = config.cloudinaryApiSecret;

	console.log('[cloudinary-images] apiSecret set:', !!apiSecret);

	const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;

	try {
		const data = await $fetch<{
			resources: Array<{ secure_url: string; public_id: string }>
		}>(url, {
			query: {
				prefix: `${folder}/`,
				max_results: 100
			},
			headers: {
				Authorization: `Basic ${credentials}`
			}
		});

		console.log('[cloudinary-images] found:', data.resources?.length ?? 0, 'images');

		return data.resources
			.sort((a, b) => a.public_id.localeCompare(b.public_id))
			.map(r => r.secure_url);
	} catch (err: any) {
		console.error('[cloudinary-images] error:', err?.message ?? err);
		return [];
	}
});
