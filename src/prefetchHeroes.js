// prefetchHeroes.js
import { HERO_IMAGES } from "./heroManifest";

// cache key -> 'done' | 'error' | Promise<boolean>
const cache = new Map();

export function getHeroURL(lang, pageId) {
	const url = HERO_IMAGES?.[lang]?.[pageId];
	if (!url) {
		console.warn(`[hero] no hero defined for: ${lang}/${pageId}`);
		return null;
	}
	return url;
}

/**
 * Prefetch an image and NEVER reject.
 * Logs clear success/failure and caches the result.
 */
export async function prefetchHero(lang, pageId) {
	const key = `${lang}:${pageId}`;
	const cached = cache.get(key);

	if (cached === "done") return true;
	if (cached && typeof cached.then === "function") return cached; // share inflight

	const url = getHeroURL(lang, pageId);
	if (!url) return false;

	const p = new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			cache.set(key, "done");
			console.debug(`[hero] prefetched: ${lang}/${pageId} -> ${url}`);
			resolve(true);
		};
		img.onerror = (ev) => {
			cache.set(key, "error");
			console.error(`[hero] prefetch FAILED: ${lang}/${pageId} -> ${url}`, ev);
			resolve(false);
		};
		img.src = url;

		// decode() sometimes rejects while the image still completes later.
		if (img.decode) {
			img.decode().catch((e) => {
				// ignore; onload will finalize success anyway
				console.debug("[hero] decode() deferred/unsupported; continuing", e);
			});
		}
	});

	cache.set(key, p);
	return p;
}

/** Optional: hint the browser too */
export function hintHero(lang, pageId) {
	const url = getHeroURL(lang, pageId);
	if (!url) return;
	const link = document.createElement("link");
	link.rel = "prefetch";
	link.as = "image";
	link.href = url;
	document.head.appendChild(link);
}
