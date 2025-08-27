// Lightweight image preloader with decode() + batching + idle scheduling.

export function preloadImage(src) {
	if (!src) return Promise.resolve();
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.decoding = "async"; // decode off main thread when possible
		img.loading = "eager"; // hint: fetch now
		img.onload = async () => {
			try {
				if (img.decode) await img.decode(); // ensure decoded before first paint
			} catch (_) {
				// ignore decode errors; the image is still cached
			}
			resolve(src);
		};
		img.onerror = reject;
		img.src = src;
	});
}

export async function preloadImagesInBatches(
	urls,
	{ batchSize = 4, delay = 120 } = {}
) {
	const list = Array.from(new Set(urls)).filter(Boolean); // de-dupe & clean
	while (list.length) {
		const batch = list.splice(0, batchSize);
		await Promise.allSettled(batch.map(preloadImage));

		// yield between batches so we don't hog the network/CPU
		await new Promise((r) => {
			if ("requestIdleCallback" in window) {
				requestIdleCallback(() => r(), { timeout: 500 });
			} else {
				setTimeout(r, delay);
			}
		});
	}
}
