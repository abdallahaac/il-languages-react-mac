// src/utils/useHeroSrc.js
import { useEffect, useState } from "react";
import { getCachedOrUrl, preloadImage } from "./imagePreloader";

export function useHeroSrc(url) {
	const [src, setSrc] = useState(() => getCachedOrUrl(url));
	useEffect(() => {
		let cancelled = false;
		const cached = getCachedOrUrl(url);
		if (cached !== src) setSrc(cached); // sync immediately
		preloadImage(url).then((obj) => {
			if (!cancelled) setSrc(obj || url);
		});
		return () => {
			cancelled = true;
		};
	}, [url]); // eslint-disable-line
	return src;
}
