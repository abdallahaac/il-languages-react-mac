// src/utils/highchartsLoader.js
// Loads Highcharts (or Highstock) exactly once across your SPA.
// Also exposes a helper to load a specific Highcharts module once.

export function loadHighcharts({ useStock = false } = {}) {
	if (typeof window === "undefined") return Promise.resolve(null);

	// If already available, return it
	if (window.Highcharts && (!useStock || window.Highcharts.StockChart)) {
		return Promise.resolve(window.Highcharts);
	}

	// Singleton promise so it only loads once app-wide
	if (window.__hcPromise) return window.__hcPromise;

	window.__hcPromise = new Promise((resolve, reject) => {
		const add = (src) =>
			new Promise((res, rej) => {
				// Don’t add a duplicate <script>
				if ([...document.scripts].some((s) => s.src === src)) return res();
				const el = document.createElement("script");
				el.src = src;
				el.async = true;
				el.onload = res;
				el.onerror = () => rej(new Error(`Failed to load ${src}`));
				document.head.appendChild(el);
			});

		const core = useStock
			? "https://code.highcharts.com/stock/highstock.js"
			: "https://code.highcharts.com/highcharts.js";

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
