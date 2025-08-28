import React from "react";
import image from "../../assets/results.jpeg"; // Path unchanged
import "../objective.css"; // ✅ Updated stylesheet
import BackToTop from "../../components/BackToTop";
import { getHeroURL } from "../../prefetchHeroes";

import { useHeroSrc } from "../../utils/useHeroSrc";

const Results = ({ onNavigate }) => {
	const url = getHeroURL("en", "results-en");
	const src = useHeroSrc(url); // <-- use hook for cached/pinned src
	return (
		<div className="intro-wrapper objective-page">
			{/* Hero */}
			<header className="hero" role="banner">
				<img
					src={src}
					alt="Decorative image with floral elements"
					className="hero-img"
					aria-hidden="true"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">Résultats d’apprentissage</h1>
			</header>

			{/* Content */}
			<section className="objective-content" aria-label="Contenu du cours">
				{/* Résultats d’apprentissage */}
				<article
					className="objective-card"
					id="resultats-apprentissage"
					aria-labelledby="res-appr-title"
				>
					<h2 id="res-appr-title">Résultats d’apprentissage</h2>
					<ul className="obj-list">
						<li>
							résumer les liens intrinsèques qui rattachent les langues
							autochtones à l’identité culturelle, à la gouvernance et au savoir
							intergénérationnel;
						</li>
						<li>
							reconnaître et définir les éléments clés de la Loi sur les langues
							autochtones et d’établir des liens avec les autres cadres de
							réconciliation comme la Déclaration des Nations Unies sur les
							droits de peuples autochtones et les appels à l’action de la
							Commission de vérité et réconciliation du Canada;
						</li>
						<li>
							comparer les objectifs de revitalisation des langues aux critiques
							exprimées par les organisations des Premières Nations, des Inuits
							et des Métis;
						</li>
						<li>
							lister les principales responsabilités du ministère du Patrimoine
							canadien, du Bureau du commissaire aux langues autochtones et des
							autres institutions fédérales aux termes de la Loi sur les langues
							autochtones;
						</li>
						<li>
							proposer au moins deux moyens respectueux et adaptés
							culturellement qui visent à encourager la revitalisation des
							langues autochtones.
						</li>
					</ul>
				</article>

				<BackToTop />

				{/* Breadcrumb / Navigation */}
				<nav className="breadcrumb" aria-label="Navigation de la page">
					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("public-service");
						}}
					>
						&laquo;&nbsp;Retour
					</button>

					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("knowledge-check");
						}}
					>
						Suivant&nbsp;&raquo;
					</button>
				</nav>
			</section>
		</div>
	);
};

export default Results;
