// src/utils/imagePreloader.js

// Maps:
// - blobUrlCache: originalURL -> blob: URL (current session, for <img src>)
// - inflight: originalURL -> Promise (de-dupe concurrent preloadImage calls)
// - decodedImgCache: originalURL -> HTMLImageElement (pins decoded bitmap in memory)
const blobUrlCache = new Map();
const inflight = new Map();
const decodedImgCache = new Map();

const CACHE_NAME = "img-preload-v1";

async function openCache() {
	if (!("caches" in window)) return null;
	try {
		return await caches.open(CACHE_NAME);
	} catch {
		return null;
	}
}

/**
 * Preload a single image URL.
 * - Uses Cache Storage first (if available), falls back to network.
 * - Creates a blob URL and decodes it.
 * - Stores a strong reference to the decoded <img> to keep the bitmap alive (no flicker).
 * - Returns the blob URL to use as <img src>.
 */
export async function preloadImage(url) {
	if (!url) return url;
	if (blobUrlCache.has(url)) return blobUrlCache.get(url);
	if (inflight.has(url)) return inflight.get(url);

	const p = (async () => {
		const cache = await openCache();
		try {
			// 1) Try Cache Storage
			let res = cache ? await cache.match(url) : null;

			// 2) Network fetch if not cached (let HTTP cache work; no "no-cache")
			if (!res) {
				res = await fetch(url, { credentials: "same-origin" });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				if (cache) {
					try {
						await cache.put(url, res.clone());
					} catch {}
				}
			}

			// 3) Make a blob URL for this session
			const blob = await res.blob();
			const objectURL = URL.createObjectURL(blob);

			// 4) Decode & PIN bitmap in memory
			const img = new Image();
			img.decoding = "sync";
			img.fetchpriority = "high";
			img.src = objectURL;
			if (img.decode) {
				try {
					await img.decode();
				} catch {}
			}

			decodedImgCache.set(url, img); // strong ref keeps decoded pixels around
			blobUrlCache.set(url, objectURL);
			return objectURL;
		} catch (e) {
			console.error("[preloader] failed:", url, e);
			// Fall back to original URL (will still benefit from HTTP/Cache Storage)
			return url;
		} finally {
			inflight.delete(url);
		}
	})();

	inflight.set(url, p);
	return p;
}

/**
 * Return a blob URL if we have one, else the original.
 * Use this for initial <img src> to avoid a visible swap.
 */
export function getCachedOrUrl(url) {
	return blobUrlCache.get(url) || url;
}

/**
 * Fastest: fire all preloads at once (inherits decode+pin from preloadImage)
 */
export async function preloadAll(urls) {
	const list = Array.from(new Set(urls)).filter(Boolean);
	await Promise.allSettled(list.map(preloadImage));
}

/**
 * Optional: batched preloading (kept for backward compatibility).
 * For "as fast as possible": { batchSize: Infinity, delay: 0 }
 */
export async function preloadImagesInBatches(
	urls,
	{ batchSize = 4, delay = 120 } = {}
) {
	const list = Array.from(new Set(urls)).filter(Boolean);
	while (list.length) {
		const batch = list.splice(0, batchSize);
		await Promise.allSettled(batch.map(preloadImage));

		// Wait between batches (skip if delay <= 0)
		if (delay > 0) {
			await new Promise((r) => {
				if ("requestIdleCallback" in window) {
					requestIdleCallback(() => r(), { timeout: delay });
				} else {
					setTimeout(r, delay);
				}
			});
		}
	}
}

/**
 * Cleanup (if ever needed). Frees memory and revokes blob URLs.
 */
export function clearInMemoryBlobs() {
	for (const [, blobURL] of blobUrlCache) URL.revokeObjectURL(blobURL);
	blobUrlCache.clear();
	decodedImgCache.clear();
}
