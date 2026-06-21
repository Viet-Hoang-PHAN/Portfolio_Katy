export default defineEventHandler(async (event) => {
	const { folder } = getQuery(event) as { folder?: string };

	if (!folder) return [];

	const config = useRuntimeConfig();
	const cloudName = 'dvslwsa0d';
	const apiKey = '166261252296815';
	const credentials = Buffer.from(`${apiKey}:${config.cloudinaryApiSecret}`).toString('base64');

	try {
		const data = await $fetch<{
			resources: Array<{ secure_url: string; public_id: string }>
		}>(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`, {
			query: {
				prefix: `${folder}/`,
				max_results: 100,
				type: 'upload'
			},
			headers: {
				Authorization: `Basic ${credentials}`
			}
		});

		return data.resources
			.sort((a, b) => a.public_id.localeCompare(b.public_id))
			.map(r => r.secure_url);
	} catch {
		return [];
	}
});
