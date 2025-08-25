import React from "react";
import image from "../../assets/objective.jpeg"; // Path unchanged
import "../objective.css"; // ✅ Updated stylesheet
import BackToTop from "../../components/BackToTop";

const Objective = ({ onNavigate }) => {
	return (
		<div className="intro-wrapper objective-page">
			{/* Hero */}
			<header className="hero" role="banner">
				<img
					src={image}
					alt="Image décorative avec des éléments floraux"
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">Objectifs d’apprentissage</h1>
			</header>

			{/* Content */}
			<section className="objective-content" aria-label="Contenu du cours">
				{/* Meta */}
				<div className="objective-meta" aria-label="Informations clés">
					<span className="meta-chip" aria-label="Durée du cours">
						Durée : 120 minutes
					</span>
				</div>

				{/* À propos du cours */}
				<article
					className="objective-card"
					id="a-propos"
					aria-labelledby="a-propos-title"
				>
					<h2 id="a-propos-title">À propos du cours</h2>
					<p>
						Ce cours, destiné aux fonctionnaires, vise à approfondir leur
						compréhension de l’importance des langues autochtones au Canada,
						ainsi que le rôle qu’elles jouent dans l’identité culturelle, la
						gouvernance et la réconciliation. On y explique les concepts
						fondamentaux de la Loi sur les langues autochtones, les perspectives
						des membres des Premières Nations, des Inuits et des Métis, ainsi
						que la responsabilité des institutions fédérales de soutenir les
						efforts de revitalisation des langues lancés par les Autochtones.
						Grâce à des séances de réflexion et à un guide pratique, les
						participants seront mieux outillés pour promouvoir les langues
						autochtones dans leur travail à la fonction publique.
					</p>
				</article>

				{/* Objectifs d’apprentissage */}
				<article
					className="objective-card"
					id="objectifs-apprentissage"
					aria-labelledby="obj-appr-title"
				>
					<h2 id="obj-appr-title">Objectifs d’apprentissage</h2>
					<ul className="obj-list">
						<li>
							définir l’importance culturelle, historique et juridique des
							langues autochtones au Canada;
						</li>
						<li>
							expliquer le but et les éléments essentiels de la Loi sur les
							langues autochtones et des cadres juridiques qui s’y rattachent;
						</li>
						<li>
							considérer les différentes perspectives des membres des Premières
							Nations, des Inuits et des Métis sur la revitalisation des
							langues;
						</li>
						<li>
							cibler les rôles que les institutions fédérales doivent jouer pour
							encourager les mesures de promotion des langues autochtones;
						</li>
						<li>
							adopter des méthodes concrètes et adaptées culturellement pour
							favoriser la présence des langues autochtones dans la fonction
							publique.
						</li>
					</ul>
				</article>

				{/* Nouvelle page Web – Description */}

				<BackToTop />

				{/* Breadcrumb / Navigation */}
				<nav className="breadcrumb" aria-label="Navigation de la page">
					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("introduction");
						}}
					>
						&laquo;&nbsp;Retour
					</button>

					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("voices-fr");
						}}
					>
						Suivant&nbsp;&raquo;
					</button>
				</nav>
			</section>
		</div>
	);
};

export default Objective;
