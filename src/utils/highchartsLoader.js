// src/utils/highchartsLoader.js
// Loads Highcharts (or Highstock) exactly once across your SPA,
// and provides helpers to load specific Highcharts modules once.

export const HC_URLS = {
	core: "https://code.highcharts.com/highcharts.js",
	stock: "https://code.highcharts.com/stock/highstock.js",
	exporting: "https://code.highcharts.com/modules/exporting.js",
	exportData: "https://code.highcharts.com/modules/export-data.js",
	accessibility: "https://code.highcharts.com/modules/accessibility.js",
	// Optional: keeps exports client-side (no server): uncomment to use
	// offlineExporting: "https://code.highcharts.com/modules/offline-exporting.js",
};

export function loadHighcharts({ useStock = false } = {}) {
	if (typeof window === "undefined") return Promise.resolve(null);

	// Already available?
	if (window.Highcharts && (!useStock || window.Highcharts.StockChart)) {
		return Promise.resolve(window.Highcharts);
	}

	// Singleton promise so it only loads once app-wide
	if (window.__hcPromise) return window.__hcPromise;

	window.__hcPromise = new Promise((resolve, reject) => {
		const add = (src) =>
			new Promise((res, rej) => {
				if ([...document.scripts].some((s) => s.src === src)) return res();
				const el = document.createElement("script");
				el.src = src;
				el.async = true;
				el.onload = res;
				el.onerror = () => rej(new Error(`Failed to load ${src}`));
				document.head.appendChild(el);
			});

		const core = useStock ? HC_URLS.stock : HC_URLS.core;

		(async () => {
			if (!window.Highcharts) await add(core);
			resolve(window.Highcharts);
		})().catch(reject);
	});

	return window.__hcPromise;
}

export function ensureModule(modUrl, testFn) {
	if (typeof window === "undefined") return Promise.resolve();

	// If the module is already active, done
	if (window.Highcharts && testFn(window.Highcharts)) return Promise.resolve();

	// Singleton per-module
	window.__hcMods = window.__hcMods || {};
	if (window.__hcMods[modUrl]) return window.__hcMods[modUrl];

	window.__hcMods[modUrl] = new Promise((resolve, reject) => {
		// If a <script> tag already exists, just wait for it to finish
		if ([...document.scripts].some((s) => s.src === modUrl)) {
			const check = () => {
				if (testFn(window.Highcharts)) return resolve();
				requestAnimationFrame(check);
			};
			return check();
		}

		const el = document.createElement("script");
		el.src = modUrl;
		el.async = true;
		el.onload = () => resolve();
		el.onerror = () => reject(new Error(`Failed to load ${modUrl}`));
		document.head.appendChild(el);
	});

	return window.__hcMods[modUrl];
}
