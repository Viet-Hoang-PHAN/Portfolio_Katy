const ALLOWED_FOLDERS = ['JO NICO', 'ANISSA', 'DORINE ET KEVIN', 'JUSTINE FOULON', 'SO CINDY'];

export default defineEventHandler(async (event) => {
	const { folder } = getQuery(event) as { folder?: string };

	if (!folder || !ALLOWED_FOLDERS.includes(folder)) return [];

	const config = useRuntimeConfig();
	const cloudName = 'dvslwsa0d';
	const apiKey = '166261252296815';
	const apiSecret = config.cloudinaryApiSecret;

	const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

	try {
		const data = await $fetch<{
			resources: Array<{ secure_url: string; public_id: string }>
		}>(url, {
			method: 'POST',
			body: {
				expression: `asset_folder:"${folder}"`,
				max_results: 100,
				sort_by: [{ created_at: 'asc' }]
			},
			headers: {
				Authorization: `Basic ${credentials}`
			}
		});

		return data.resources.map(r => r.secure_url);
	} catch (err: any) {
		console.error('[cloudinary-images] error:', err?.message ?? err);
		return [];
	}
});
