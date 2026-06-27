const fs = require('fs');
const path = require('path');

module.exports = {
  onSuccess: async ({ utils }) => {
    const cloudName = 'dvslwsa0d';
    const apiKey = '166261252296815';
    const apiSecret = process.env.NUXT_CLOUDINARY_API_SECRET;

    if (!apiSecret) {
      console.log('[cloudinary] NUXT_CLOUDINARY_API_SECRET manquant, skip.');
      return;
    }

    const projetsDir = path.join(process.cwd(), 'content', 'projets');
    const files = fs.readdirSync(projetsDir).filter(f => f.endsWith('.md'));

    const folders = files
      .map(file => {
        const content = fs.readFileSync(path.join(projetsDir, file), 'utf-8');
        const match = content.match(/cloudinaryFolder:\s*["']?([^"'\n]+)["']?/);
        return match ? match[1].trim() : null;
      })
      .filter(Boolean);

    if (!folders.length) return;

    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    for (const folder of folders) {
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodeURIComponent(folder)}`,
          {
            method: 'POST',
            headers: { Authorization: `Basic ${credentials}` }
          }
        );

        if (res.ok) {
          console.log(`[cloudinary] Dossier créé : ${folder}`);
        } else if (res.status === 409) {
          console.log(`[cloudinary] Dossier déjà existant : ${folder}`);
        } else {
          console.warn(`[cloudinary] Erreur pour "${folder}" : ${res.status}`);
        }
      } catch (err) {
        console.warn(`[cloudinary] Échec pour "${folder}" :`, err.message);
      }
    }
  }
};
