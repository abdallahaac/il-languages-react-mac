import React from "react";
import { Helmet } from "react-helmet-async";
import { HERO_IMAGES } from "../heroManifest";

export default function HeadPreloads({ lang }) {
	const list = Array.from(
		new Set(Object.values(HERO_IMAGES[lang] || {}))
	).filter(Boolean);

	return (
		<Helmet>
			{list.map((href) => (
				<link key={href} rel="preload" as="image" href={href} />
			))}
		</Helmet>
	);
}
