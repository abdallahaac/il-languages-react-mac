import React, { useEffect, useState } from "react";
import { getHeroURL } from "../prefetchHeroes";
import { preloadImage, getCachedOrUrl } from "../utils/imagePreloader";

export default function PageHero({ lang = "en", pageId, title }) {
	const fileUrl = getHeroURL(lang, pageId);
	const [src, setSrc] = useState(getCachedOrUrl(fileUrl));

	useEffect(() => {
		let cancelled = false;
		if (!fileUrl) return;
		preloadImage(fileUrl).then((objectURL) => {
			if (!cancelled) setSrc(objectURL || fileUrl);
		});
		return () => {
			cancelled = true;
		};
	}, [fileUrl]);

	return (
		<header className="hero" role="banner">
			<img
				className="hero-img"
				src={src}
				alt=""
				fetchPriority="high"
				decoding="sync"
				loading="eager"
			/>
			{title ? <h1 className="hero-title">{title}</h1> : null}
		</header>
	);
}
