import React, { useState, useEffect } from "react";
import "../IntroductionPage.css";

import image from "../../assets/image.png";
import BackToTop from "../../components/BackToTop";

import { getHeroURL } from "../../prefetchHeroes";
// ✅ added for preloading/swap
import { preloadImage, getCachedOrUrl } from "../../utils/imagePreloader";

//
const IntroductionPage = ({ onNavigate }) => {
	/* ───────── état ───────── */

	// ✅ image-only changes start
	const url = getHeroURL("en", "introduction");
	const [src, setSrc] = useState(getCachedOrUrl(url));

	useEffect(() => {
		let cancelled = false;
		if (!url) return;
		preloadImage(url).then((objectURL) => {
			if (!cancelled) setSrc(objectURL || url);
		});
		return () => {
			cancelled = true;
		};
	}, [url]);
	/* ───────── rendu ───────── */
	return (
		<div className="intro-wrapper">
			{/* ███ hero ███ */}
			<header className="hero" role="banner">
				<img
					className="hero-img"
					src={src}
					alt="Learning Objectives"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">Introduction et survol</h1>
			</header>

			{/* ███ narration ███ */}
			<article className="narrative">
				<p>
					<span className="dropcap">L</span>a langue est le fondement d’une
					culture. Pour les sociétés autochtones de tradition orale, les mots
					préservent le savoir depuis des millénaires. La langue peut également
					porter des récits, des chants, des danses, des protocoles, des
					histoires familiales et des relations. Les langues sont souvent
					détentrices des droits coutumiers d’une communauté qui ont été érodés
					par les politiques de la <em>Loi sur les Indiens</em>.
				</p>
				<p>
					Alors que plusieurs communautés font un retour à l’autodétermination,
					la perte de ces lois et systèmes de gouvernance signifie que certaines
					communautés n’ont pas les connaissances nécessaires pour rebâtir leurs
					lois passées. Quand une langue meurt, les liens au passé culturel et
					historique meurent aussi. Sans ce lien crucial à leur histoire
					linguistique et culturelle, les gens perdent leur identité et leur
					sentiment d’appartenance.” [Traduction]
				</p>
				<footer className="source">
					Source: Why Is It Important to Protect and Revitalize Indigenous
					Languages? (Pourquoi est-ce important de protéger et de revitaliser
					les langues autochtones?)
					<a
						className="link-source"
						href="https://www.ictinc.ca/blog/why-is-it-important-to-protect-revitalize-indigenous-languages"
						target="_blank"
						rel="noopener noreferrer"
					>
						{" "}
						https://www.ictinc.ca/blog/why-is-it-important-to-protect-revitalize-indigenous-languages
					</a>
					<br />
					<span>
						{" "}
						Reproduit avec l’autorisation de Indigenous Corporate Training inc.{" "}
					</span>
					<a
						className="link-source"
						href="https://www.ictinc.ca/"
						target="_blank"
						rel="noopener noreferrer"
					>
						www.ictinc.ca
					</a>{" "}
					(en anglais seulement)
				</footer>
			</article>

			<BackToTop />
			{/* ███ fil d'Ariane ███ */}
			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button onClick={() => onNavigate?.("home")}>
					&laquo;&nbsp;Précédent
				</button>
				<button onClick={() => onNavigate?.("objective-fr")}>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default IntroductionPage;
