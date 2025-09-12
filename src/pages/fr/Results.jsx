// src/pages/Results.jsx
import React from "react";
import "../../assets/results.jpeg"; // path unchanged if needed
import "../objective.css";
import BackToTop from "../../components/BackToTop";

import { getHeroURL } from "../../prefetchHeroes";
import { useHeroSrc } from "../../utils/useHeroSrc";

const Results = ({ onNavigate }) => {
	const url = getHeroURL("fr", "results-fr");
	const src = useHeroSrc(url);

	return (
		<div className="intro-wrapper objective-page">
			{/* Hero */}
			<header className="hero" role="banner">
				<img
					src={src}
					alt="Image décorative avec des éléments floraux"
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
				<article
					className="objective-card"
					id="resultats-apprentissage"
					aria-labelledby="res-appr-title"
				>
					<h2 id="res-appr-title">Résultats d’apprentissage</h2>
					<p>Après avoir suivi ce cours, vous pouvez maintenant&nbsp;:</p>
					<ul className="obj-list">
						<li>
							résumer les liens intrinsèques qui rattachent les langues
							autochtones à l’identité culturelle, à la gouvernance et au savoir
							intergénérationnel;
						</li>
						<li>
							reconnaître et définir les éléments clés de la Loi sur les langues
							autochtones et établir des liens avec d’autres cadres de
							réconciliation, comme la Déclaration des Nations Unies sur les
							droits des peuples autochtones et les appels à l’action de la
							Commission de vérité et réconciliation du Canada;
						</li>
						<li>
							comparer les objectifs de revitalisation des langues aux critiques
							des organisations des Premières Nations, des Inuits et des Métis;
						</li>
						<li>
							énumérer les principales responsabilités du ministère du
							Patrimoine canadien, du Bureau du commissaire aux langues
							autochtones et des autres institutions fédérales prévues par la
							<em> Loi sur les langues autochtones</em>;
						</li>
						<li>
							proposer au moins deux moyens respectueux et culturellement
							adaptés pour encourager la revitalisation des langues autochtones.
						</li>
					</ul>
				</article>

				<BackToTop />

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
