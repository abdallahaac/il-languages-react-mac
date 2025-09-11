// src/pages/fr/Languages.jsx  (FR)
import React, { useEffect, useMemo, useState } from "react";
import "../IntroductionPage.css";
import BackToTop from "../../components/BackToTop";
import {
	loadHighcharts,
	ensureModule,
	HC_URLS,
} from "../../utils/highchartsLoader";

import { getHeroURL } from "../../prefetchHeroes";
import { useHeroSrc } from "../../utils/useHeroSrc"; // ✅ use the hook

const Languages = ({ onNavigate }) => {
	const url = getHeroURL("fr", "languages-fr");
	const src = useHeroSrc(url);
	const [open, setOpen] = useState(false);

	/* ───────── données du nuage de mots (inchangées) ───────── */
	const wordCloudData = useMemo(
		() => [
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
		],
		[]
	);

	/* ───────── Highcharts (keeps your behavior; adds modules for a11y) ───────── */
	useEffect(() => {
		let chart;

		(async () => {
			const Highcharts = await loadHighcharts({ useStock: false });

			// Modules recommandés : exporting → export-data → accessibility
			await ensureModule(HC_URLS.exporting, (hc) => !!hc?.Exporting);
			await ensureModule(
				HC_URLS.exportData,
				(hc) => !!hc.Chart?.prototype.getTable
			);
			await ensureModule(HC_URLS.accessibility, (hc) => !!hc?.Accessibility);

			// Module wordcloud
			await ensureModule(
				"https://code.highcharts.com/modules/wordcloud.js",
				(hc) => !!hc?.seriesTypes?.wordcloud
			);

			// (Optionnel) libellés FR pour le menu d’exportation
			Highcharts.setOptions({
				lang: {
					viewData: "Voir le tableau des données",
					downloadCSV: "Télécharger CSV",
					downloadXLS: "Télécharger Excel",
				},
			});

			chart = Highcharts.chart("indigenous-wordcloud", {
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

		return () => chart && chart.destroy();
	}, [wordCloudData]); // eslint-disable-line react-hooks/exhaustive-deps

	/* ───────── données triées pour le tableau accordéon ───────── */
	const sorted = useMemo(
		() => [...wordCloudData].sort((a, b) => b.weight - a.weight),
		[wordCloudData]
	);

	/* ───────── rendu (contenu inchangé + accordéon ajouté) ───────── */
	return (
		<div className="intro-wrapper">
			{/* ███ hero ███ */}
			<header className="hero" role="banner">
				<img
					src={src}
					alt=""
					className="hero-img"
					aria-hidden="true"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">Les langues autochtones au Canada</h1>
			</header>
			{/* ███ contexte élargi ███ */}
			<section className="context">
				<h2>Les langues autochtones au Canada</h2>

				<p>
					Son Excellence la très honorable Mary Simon est inuite, ce qui en fait
					la première gouverneure générale autochtone du Canada. Mary Simon est
					née à Kangiqsualujjuaq, au Nunavik (Québec). Elle a affirmé
					publiquement que c’est lorsqu’elle s’exprime en inuktitut, sa langue
					maternelle, qu’elle se sent le plus à l’aise. En 2022, à l’occasion du
					lancement de la Décennie internationale des langues autochtones
					proclamée par les Nations Unies, Son Excellence a fait une allocution
					sur l’importance des langues autochtones. Elle a souligné qu’il n’y
					avait pas de meilleure façon de préserver les langues autochtones que
					de les parler, ajoutant que les langues constituent une partie
					importante de l’identité autochtone et sont essentielles à la survie
					des peuples autochtones. Selon elle, nous devons utiliser tous les
					outils dont nous disposons pour protéger les langues autochtones, car
					plusieurs se sont perdues en raison des pensionnats, de la
					colonisation et des politiques d’assimilation.
				</p>

				<p className="dis">
					Les langues autochtones sont au cœur de l’identité des peuples
					autochtones : les langues des Premières Nations, du peuple inuit et
					des communautés métisses transmettent des visions du monde et
					inspirent les valeurs, les relations avec le territoire et les
					systèmes juridiques autochtones. L’histoire de la colonisation au
					Canada, de même que les lois et les politiques du gouvernement du
					Canada ont profondément nui aux langues autochtones. En raison des
					politiques d’assimilation restrictives, plusieurs langues autochtones
					ont disparu ou sont en voie de disparaître au Canada. Toutefois,
					plusieurs communautés autochtones travaillent activement à la
					revitalisation de leur langue et honorent les aîné·es et gardien·nes
					du savoir pour que leur langue reste vivante.
				</p>

				<div className="gina-img">
					<div className="">
						<h3 className="gina">Langues autochtones : tracer la voie</h3>

						<p>
							Lisez{" "}
							<a
								className="link-source"
								id="bigger"
								href="https://www.noslangues-ourlanguages.gc.ca/fr/blogue-blog/tracer-la-voie-the-road-ahead-fra"
								target="_blank"
								rel="noopener noreferrer"
							>
								la perspective de Gina Wilson{" "}
							</a>{" "}
							sur l'importance des langues autochtones au Canada.
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
						70 langues autochtones distinctes sont parlées actuellement au
						Canada par les membres des Premières Nations, du peuple inuit des
						communautés métisses
					</a>
					. On peut regrouper ces langues en 12 familles : les langues
					algonquiennes, inuites, athabascanes, sioux, salishennes, tsimshians,
					wakashanes et iroquoiennes, ainsi que le michif, le tlingit, le
					kutenai et le haïda. En 2021, environ 237 420 Autochtones au Canada
					ont déclaré{" "}
					<a
						href="https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/Definition-fra.cfm?ID=pop054"
						className="link-source"
						target="_blank"
						rel="noopener noreferrer"
					>
						connaître assez bien une langue autochtone pour pouvoir soutenir une
						conversation
					</a>
					. Malheureusement, le nombre d’Autochtones qui indiquent une langue
					autochtone comme première langue apprise à la maison durant l’enfance
					ne cesse de baisser.
				</p>

				<p>
					Selon l’Atlas des langues en danger dans le monde de l’Organisation
					des Nations Unies pour l’éducation, la science et la culture (UNESCO),
					les langues autochtones dans le monde entier sont menacées de
					disparition et sont classées comme étant vulnérables, en danger,
					sérieusement en danger ou en situation critique. Au Canada, les trois
					quarts des langues autochtones sont en danger, et aucune n’est sûre.
				</p>
				<p>
					La Commission de vérité et réconciliation du Canada a elle aussi
					constaté que les langues autochtones sont aujourd’hui fragilisées par
					les séquelles intergénérationnelles du génocide culturel et les
					politiques colonialistes discriminatoires du passé. Les pensionnats
					autochtones, notamment, visaient à éradiquer les cultures et les
					langues autochtones en retirant de force les enfants de leur famille
					et en interdisant tout usage de leur langue, sous peine de punition et
					d’humiliation.
				</p>

				<h3>Diversité des langues autochtones</h3>
				<p>
					Le tableau suivant fournit des informations sur le nombre de personnes
					autochtones qui pouvaient parler une langue autochtone en 2021, y
					compris le pourcentage de changement par rapport à 2016.
				</p>

				<ol className="graph-ol">
					<li>
						<strong>Survoler les langues :</strong> Déplacez votre curseur sur
						une langue.
					</li>
					<li>
						<strong>Voir les détails de la langue :</strong> Une infobulle
						apparaît, indiquant le nombre de locuteurs et l'évolution en
						pourcentage entre 2016 et 2021.
					</li>
					<li>
						<strong>Télécharger les données :</strong> Utilisez le menu
						d'exportation pour télécharger les statistiques en format CSV ou
						Excel.
					</li>
					<li>
						<strong>Visualiser le tableau des données :</strong> Cliquez sur
						“Voir les données” dans le menu d'exportation pour afficher le
						tableau complet.
					</li>
				</ol>
			</section>

			{/* ███ nuage de mots ███ */}
			<figure
				className="wordcloud"
				aria-label="Nuage de mots des langues autochtones"
			>
				<div id="indigenous-wordcloud" />
				<figcaption>
					Nombre de personnes autochtones capables de parler une langue
					autochtone en 2021 et pourcentage de changement par rapport à 2016.
				</figcaption>
			</figure>

			{/* Accordéon accessible pour le tableau des données (ajouté) */}
			<section className="chart-accordion" aria-labelledby="wc-acc-title-fr">
				<h3 id="wc-acc-title-fr" className="visually-hidden">
					Tableau des données
				</h3>
				<button
					className="acc-button"
					aria-expanded={open}
					aria-controls="wc-data-table-fr"
					onClick={() => setOpen((v) => !v)}
				>
					{open
						? "Masquer le tableau des données"
						: "Voir le tableau des données"}
					<span className="acc-icon" aria-hidden="true">
						{open ? "−" : "+"}
					</span>
				</button>

				<div
					id="wc-data-table-fr"
					className="acc-panel"
					hidden={!open}
					role="region"
					aria-label="Tableau des données pour le nuage de mots des langues autochtones"
				>
					<table className="wc-table" lang="fr">
						<caption className="sr-only">
							Langues autochtones (triées par locuteurs, 2021) et changement
							depuis 2016
						</caption>
						<thead>
							<tr>
								<th scope="col">Langue / Groupe</th>
								<th scope="col">Locuteurs (2021)</th>
								<th scope="col">Changement (2016–2021)</th>
							</tr>
						</thead>
						<tbody>
							{sorted.map((d) => (
								<tr key={d.category}>
									<th scope="row">{d.category}</th>
									<td data-type="number">{d.weight.toLocaleString("fr-CA")}</td>
									<td data-type="number">
										{d.percentage > 0
											? `+${d.percentage}%`
											: `${d.percentage}%`}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<BackToTop />

			{/* ███ fil d'Ariane ███ */}
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

			{/* Couleurs WCAG-AA pour l’accordéon & le tableau (styles locaux) */}
			<style>{`
        .visually-hidden, .sr-only {
          position: absolute !important; height:1px; width:1px; overflow:hidden;
          clip: rect(1px,1px,1px,1px); white-space: nowrap; border:0; padding:0; margin:-1px;
        }
        .chart-accordion { margin: 1.25rem 0 2rem; }
        .acc-button {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 1rem;
          border-radius: 12px;
          border: 2px solid #0F172A;        /* contraste élevé */
          background: #FFFFFF;              /* blanc */
          color: #0B1220;                   /* texte sombre */
          font-weight: 700;
          cursor: pointer;
        }
        .acc-button:hover { background: #F1F5F9; }     /* slate-100 */
        .acc-button:focus-visible {
          outline: 3px solid #2563EB;                 /* bleu-600 */
          outline-offset: 2px;
        }
        .acc-icon { font-size: 1.25rem; line-height: 1; }
        .acc-panel { padding: 0.75rem 0.25rem; }

        .wc-table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          border: 1.5px solid #0F172A;                /* bordure contrastée */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }
        .wc-table thead th {
          background: #111827;                        /* gris-900 */
          color: #FFFFFF;                             /* texte blanc */
          font-weight: 800;
          padding: 0.7rem 0.8rem;
          text-align: left;
        }
        .wc-table th[scope="row"], .wc-table td {
          padding: 0.65rem 0.8rem;
          border-bottom: 1px solid #CBD5E1;           /* slate-300 */
        }
        .wc-table tbody tr:nth-child(odd) td,
        .wc-table tbody tr:nth-child(odd) th[scope="row"] {
          background: #F8FAFC;                        /* slate-50 */
        }
        .wc-table td[data-type="number"] { text-align: right; }
      `}</style>
		</div>
	);
};

export default Languages;
