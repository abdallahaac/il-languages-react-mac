// src/components/HeadPreloads.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { HERO_IMAGES } from "../heroManifest";

/**
 * Injects <link rel="preload" as="image"> for all hero images
 * of the current language (EN or FR). Preload > Prefetch.
 */
export default function HeadPreloads({ lang = "en" }) {
	const urls = Array.from(
		new Set(Object.values(HERO_IMAGES[lang] || {}))
	).filter(Boolean);

	// NOTE: If you later add AVIF/WEBP, add extra <link> here for those URLs too.
	return (
		<Helmet>
			{urls.map((href) => (
				<link key={href} rel="preload" as="image" href={href} />
			))}
		</Helmet>
	);
}
