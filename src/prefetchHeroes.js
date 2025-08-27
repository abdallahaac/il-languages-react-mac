// src/prefetchHeroes.js  (single source of truth)
import { HERO_IMAGES } from "./heroManifest";

export function getHeroURL(lang, pageId) {
	const map = HERO_IMAGES[lang] || {};
	return map[pageId] || map.home || "";
}
