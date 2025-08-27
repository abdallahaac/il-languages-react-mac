import React, { useEffect, useState } from "react";
import "../IntroductionPage.css";
import image from "../../assets/language.jpeg";
import BackToTop from "../../components/BackToTop";

import { getHeroURL } from "../../prefetchHeroes";

import { loadHighcharts, ensureModule } from "../../utils/highchartsLoader";

const Languages = ({ onNavigate }) => {
	/* ───────── état (kept for parity if you expand later) ───────── */
	const [activeClipId] = useState(null);
	const [transcriptOpen] = useState({});
	const [visitedClips] = useState(new Set());

	/* ───────── données du nuage de mots ───────── */
	const wordCloudData = [
		{ category: "Langues cries", weight: 86475, percentage: -6.1 },
		{ category: "Inuktitut", weight: 40320, percentage: 1.4 },
		{ category: "Langues ojibwées", weight: 25440, percentage: -5.4 },
		{ category: "Oji-cri", weight: 15210, percentage: -1.1 },
		{ category: "Innu-aimun", weight: 11605, percentage: -0.4 },
		{ category: "Déné", weight: 11375, percentage: -10.9 },
		{ category: "Mi’kmaq", weight: 9000, percentage: 8.0 },
		{ category: "Atikamekw", weight: 6740, percentage: 2.2 },
		{
			category: "Siksiká’powahsin (Pied-noir)",
			weight: 6585,
			percentage: 19.1,
		},
		{ category: "Langues esclaves-lièvres", weight: 2215, percentage: -20.3 },
		{ category: "Tlicho", weight: 2115, percentage: -10.0 },
		{ category: "Anicinabemowin", weight: 1925, percentage: -21.1 },
		{ category: "Michif", weight: 1845, percentage: 57.7 },
		{ category: "Dakelh", weight: 1530, percentage: -25.9 },
		{ category: "Dakota", weight: 1505, percentage: 0.7 },
		{ category: "Kanien’kéha", weight: 1435, percentage: 11.7 },
		{ category: "Halkomelem", weight: 1335, percentage: 29.6 },
		{ category: "Gitxsan", weight: 1110, percentage: -14.0 },
		{ category: "Nisga’a", weight: 1080, percentage: 4.3 },
		{ category: "Secwepemctsin", weight: 1050, percentage: -12.9 },
		{ category: "Stoney", weight: 915, percentage: 14.4 },
		{ category: "Tsilhqot’in", weight: 855, percentage: -15.3 },
		{ category: "Wolastoqewi", weight: 790, percentage: 6.8 },
		{ category: "Kwak’wala", weight: 760, percentage: 29.9 },
		{ category: "Inuinnaqtun", weight: 750, percentage: -43.2 },
		{ category: "Syilx", weight: 665, percentage: -18.4 },
		{ category: "Nuu-chah-nulth", weight: 665, percentage: 25.5 },
		{ category: "St’at’imcets", weight: 580, percentage: -24.7 },
		{ category: "Ntlakapamux", weight: 470, percentage: 11.9 },
		{ category: "Tsimshian", weight: 445, percentage: 7.2 },
		{ category: "Inuvialuktun", weight: 350, percentage: -45.3 },
		{ category: "Assiniboine", weight: 350, percentage: 0.0 },
		{ category: "Sḵwx̱wú7mesh", weight: 345, percentage: 23.2 },
		{ category: "Heiltsuk", weight: 325, percentage: 160.0 },
		{ category: "Haisla", weight: 285, percentage: 62.9 },
		{ category: "Straits", weight: 280, percentage: -21.1 },
		{ category: "Gwich’in", weight: 275, percentage: -22.5 },
		{ category: "Dane-zaa", weight: 270, percentage: -18.2 },
		{ category: "Langues tutchones", weight: 255, percentage: -36.3 },
		{ category: "Wetsuwet’en-Babine", weight: 240, percentage: 17.1 },
		{ category: "Tahltan", weight: 235, percentage: -9.6 },
		{ category: "Kaska", weight: 225, percentage: -36.6 },
		{ category: "Xaayda Kil", weight: 220, percentage: -51.1 },
		{ category: "Gayogo̱hó", weight: 220, percentage: 76.0 },
		{ category: "Ktunaxa", weight: 210, percentage: 23.5 },
		{ category: "Oneida", weight: 200, percentage: 14.3 },
		{ category: "Tsuu T’ina", weight: 175, percentage: 66.7 },
		{ category: "Tse’khene", weight: 135, percentage: -25.0 },
		{ category: "Tlingit", weight: 120, percentage: -52.9 },
	];

	/* ───────── Highcharts (one-time) ───────── */
	useEffect(() => {
		let chart;

		(async () => {
			// If any page in your SPA uses Stock charts, set useStock: true and
			// remove all other highcharts.js loads site-wide.
			const Highcharts = await loadHighcharts({ useStock: false });

			// Load the wordcloud module only if missing
			await ensureModule(
				"https://code.highcharts.com/modules/wordcloud.js",
				(hc) => !!hc?.seriesTypes?.wordcloud
			);

			chart = Highcharts.chart("indigenous-wordcloud-fr", {
				chart: { type: "wordcloud", height: 400 },
				title: { text: null },
				series: [
					{
						type: "wordcloud",
						name: "Locuteurs",
						data: wordCloudData.map((d) => ({
							name: d.category,
							weight: d.weight,
							percentage: d.percentage,
						})),
						minFontSize: 10,
						maxFontSize: 44,
					},
				],
				tooltip: {
					pointFormat:
						"<b>{point.name}</b><br/>Locuteurs: {point.weight}<br/>Changement: {point.percentage}%",
				},
				accessibility: {
					point: {
						valueDescriptionFormat:
							"{index}. {point.name}, {point.weight} locuteurs, changement de {point.percentage}%.",
					},
				},
				exporting: { enabled: true },
				credits: { enabled: false },
			});
		})();

		return () => {
			if (chart) chart.destroy();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/* ───────── rendu ───────── */
	return (
		<div className="intro-wrapper">
			<header className="hero" role="banner">
				<img src={image} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Les langues autochtones au Canada</h1>
			</header>

			<section className="context">
				<h2>Les langues autochtones au Canada</h2>

				<p>
					Son Excellence la très honorable Mary Simon est Inuite, ce qui en fait
					la première gouverneure générale autochtone du Canada. Mary Simon est
					née à Kangiqsualujjuaq, au Nunavik (Québec). Elle a affirmé
					publiquement que c’est lorsqu’elle s’exprime en inuktitut, sa langue
					maternelle, qu’elle se sent le plus à l’aise. En 2022, à l’occasion du
					lancement de la Décennie internationale des langues autochtones
					proclamée par les Nations Unies, Son Excellence a fait une allocution
					sur l’importance des langues autochtones…
				</p>

				<p className="dis">
					Les langues autochtones sont au cœur de l’identité des peuples
					autochtones : les langues des Premières Nations, du peuple inuit et de
					la Nation métisse transmettent des visions du monde…
				</p>

				<div className="gina-img">
					<div>
						<a
							className="link-source"
							id="bigger"
							href="https://www.noslangues-ourlanguages.gc.ca/fr/blogue-blog/tracer-la-voie-the-road-ahead-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							<h3 className="gina">Langues autochtones : tracer la voie</h3>
						</a>
						<p>
							Lisez la perspective de Gina Wilson sur l'importance des langues
							autochtones au Canada.
						</p>
					</div>
					<img
						className="gina"
						src="https://www.canada.ca/content/dam/pch/images/government/diversity-inclusion-public-service/knowledge-circle/gina-wilson1-bil.png"
						alt="Portrait de Gina Wilson"
					/>
				</div>

				<br />

				<p>
					Selon Statistique Canada, plus de{" "}
					<a
						href="https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-X/2021012/98-200-x2021012-fra.cfm"
						target="_blank"
						className="link-source"
						rel="noopener noreferrer"
					>
						70 langues autochtones distinctes sont parlées
					</a>{" "}
					actuellement au Canada…
				</p>

				<p>
					Selon l’Atlas des langues en danger dans le monde de l’UNESCO, les
					langues autochtones dans le monde entier sont menacées de disparition…
				</p>
				<p>
					La Commission de vérité et réconciliation du Canada a elle aussi
					constaté que les langues autochtones sont aujourd’hui fragilisées…
				</p>

				<h3>Diversité des langues autochtones</h3>
				<p>
					Le tableau suivant fournit des informations sur le nombre de personnes
					autochtones qui pouvaient parler une langue autochtone en 2021…
				</p>

				<ol className="graph-ol">
					<li>
						<strong>Survoler les langues :</strong> Déplacez votre curseur sur
						une langue.
					</li>
					<li>
						<strong>Voir les détails :</strong> Infobulle avec locuteurs et
						évolution (2016→2021).
					</li>
					<li>
						<strong>Télécharger les données :</strong> Menu d’export CSV/Excel.
					</li>
					<li>
						<strong>Voir le tableau :</strong> “Voir les données” dans le menu
						d’exportation.
					</li>
				</ol>
			</section>

			<figure
				className="wordcloud"
				aria-label="Nuage de mots des langues autochtones"
			>
				<div id="indigenous-wordcloud-fr" />
				<figcaption>
					Nombre de personnes autochtones capables de parler une langue
					autochtone en 2021 et pourcentage de changement par rapport à 2016.
				</figcaption>
			</figure>

			<BackToTop />

			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("voices-fr");
					}}
				>
					&laquo;&nbsp;Retour
				</button>
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("foundational-documents");
					}}
				>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default Languages;
