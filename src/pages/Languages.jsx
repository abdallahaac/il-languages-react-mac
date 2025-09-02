// src/pages/Languages.jsx  (EN)
import React, { useState, useEffect, useMemo } from "react";
import "./IntroductionPage.css";
import BackToTop from "../components/BackToTop";
import { getHeroURL } from "../prefetchHeroes";
// If you already use these, keep them; otherwise you can simplify to just getHeroURL:
import { preloadImage, getCachedOrUrl } from "../utils/imagePreloader";
import {
	loadHighcharts,
	ensureModule,
	HC_URLS,
} from "../utils/highchartsLoader";

const Languages = ({ onNavigate }) => {
	const url = getHeroURL("en", "languages-en");
	const [src, setSrc] = useState(getCachedOrUrl ? getCachedOrUrl(url) : url);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		let cancelled = false;
		if (!url || !preloadImage) return;
		preloadImage(url).then((objectURL) => {
			if (!cancelled) setSrc(objectURL || url);
		});
		return () => {
			cancelled = true;
		};
	}, [url]);

	/* ───────── word-cloud data (unchanged) ───────── */
	const wordCloudData = useMemo(
		() => [
			{ category: "Cree languages", weight: 86475, percentage: -6.1 },
			{ category: "Inuktitut", weight: 40320, percentage: 1.4 },
			{ category: "Ojibwe languages", weight: 25440, percentage: -5.4 },
			{ category: "Oji-Cree", weight: 15210, percentage: -1.1 },
			{ category: "Innu Aimun", weight: 11605, percentage: -0.4 },
			{ category: "Dene", weight: 11375, percentage: -10.9 },
			{ category: "Mi’kmaq", weight: 9000, percentage: 8.0 },
			{ category: "Atikamekw", weight: 6740, percentage: 2.2 },
			{ category: "Siksiká’powahsin", weight: 6585, percentage: 19.1 },
			{ category: "Slavey-Hare languages", weight: 2215, percentage: -20.3 },
			{ category: "Tlicho ", weight: 2115, percentage: -10.0 },
			{ category: "Anicinabemowin ", weight: 1925, percentage: -21.1 },
			{ category: "Michif", weight: 1845, percentage: 57.7 },
			{ category: "Dakelh ", weight: 1530, percentage: -25.9 },
			{ category: "Dakota", weight: 1505, percentage: 0.7 },
			{ category: "Kanien’kéha", weight: 1435, percentage: 11.7 },
			{ category: "Halkomelem", weight: 1335, percentage: 29.6 },
			{ category: "Gitxsan ", weight: 1110, percentage: -14.0 },
			{ category: "Nisga’a", weight: 1080, percentage: 4.3 },
			{ category: "Secwepemctsin ", weight: 1050, percentage: -12.9 },
			{ category: "Stoney", weight: 915, percentage: 14.4 },
			{ category: "Tsilhqot’in ", weight: 855, percentage: -15.3 },
			{ category: "Wolastoqewi ", weight: 790, percentage: 6.8 },
			{ category: "Kwak’wala ", weight: 760, percentage: 29.9 },
			{ category: "Inuinnaqtun", weight: 750, percentage: -43.2 },
			{ category: "Syilx ", weight: 665, percentage: -18.4 },
			{ category: "Nuu-chah-nulth ", weight: 665, percentage: 25.5 },
			{ category: "St’at’imcets", weight: 580, percentage: -24.7 },
			{ category: "Ntlakapamux ", weight: 470, percentage: 11.9 },
			{ category: "Tsimshian", weight: 445, percentage: 7.2 },
			{ category: "Inuvialuktun", weight: 350, percentage: -45.3 },
			{ category: "Assiniboine", weight: 350, percentage: 0.0 },
			{ category: "Sḵwx̱wú7mesh", weight: 345, percentage: 23.2 },
			{ category: "Heiltsuk", weight: 325, percentage: 160.0 },
			{ category: "Haisla", weight: 285, percentage: 62.9 },
			{ category: "Straits", weight: 280, percentage: -21.1 },
			{ category: "Gwich’in", weight: 275, percentage: -22.5 },
			{ category: "Dane-zaa ", weight: 270, percentage: -18.2 },
			{ category: "Tutchone languages", weight: 255, percentage: -36.3 },
			{ category: "Wetsuwet’en-Babine", weight: 240, percentage: 17.1 },
			{ category: "Tahltan", weight: 235, percentage: -9.6 },
			{ category: "Kaska ", weight: 225, percentage: -36.6 },
			{ category: "Xaayda Kil", weight: 220, percentage: -51.1 },
			{ category: "Gayogo̱hó", weight: 220, percentage: 76.0 },
			{ category: "Ktunaxa ", weight: 210, percentage: 23.5 },
			{ category: "Oneida", weight: 200, percentage: 14.3 },
			{ category: "Tsuu T’ina ", weight: 175, percentage: 66.7 },
			{ category: "Tse’khene ", weight: 135, percentage: -25.0 },
			{ category: "Tlingit", weight: 120, percentage: -52.9 },
		],
		[]
	);

	/* ───────── Highcharts (modules + no unstyled table) ───────── */
	useEffect(() => {
		let chart;

		(async () => {
			const Highcharts = await loadHighcharts({ useStock: false });

			// Recommended modules: exporting → export-data → accessibility
			await ensureModule(HC_URLS.exporting, (hc) => !!hc?.Exporting);
			await ensureModule(
				HC_URLS.exportData,
				(hc) => !!hc.Chart?.prototype.getTable
			);
			await ensureModule(HC_URLS.accessibility, (hc) => !!hc?.Accessibility);

			// Feature module: wordcloud
			await ensureModule(
				"https://code.highcharts.com/modules/wordcloud.js",
				(hc) => !!hc?.seriesTypes?.wordcloud
			);

			// Localized export menu labels (EN)
			Highcharts.setOptions({
				lang: {
					viewData: "View data table",
					downloadCSV: "Download CSV",
					downloadXLS: "Download Excel",
					printChart: "Print chart",
					contextButtonTitle: "Chart menu",
				},
			});

			chart = Highcharts.chart("indigenous-wordcloud", {
				chart: { type: "wordcloud", height: 400 },
				title: { text: null },
				series: [
					{
						type: "wordcloud",
						name: "Speakers",
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
						"<b>{point.name}</b><br/>Speakers: {point.weight}<br/>Change: {point.percentage}%",
				},
				exporting: {
					enabled: true,
					showTable: false, // ❌ remove Highcharts' unstyled table
				},
				accessibility: {
					point: {
						valueDescriptionFormat:
							"{index}. {point.name}, {point.weight} speakers, change {point.percentage}%.",
					},
					keyboardNavigation: { order: ["series", "chartMenu"] },
				},
				credits: { enabled: false },
			});
		})();

		return () => chart && chart.destroy();
	}, [wordCloudData]);

	/* ───────── derived table data for accordion ───────── */
	const sorted = useMemo(
		() => [...wordCloudData].sort((a, b) => b.weight - a.weight),
		[wordCloudData]
	);

	/* ───────── render (same structure as FR) ───────── */
	return (
		<div className="intro-wrapper intro-page">
			{/* ███ hero ███ */}
			<header className="hero" role="banner">
				<img src={src} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Indigenous Languages in Canada</h1>
			</header>

			{/* ███ extended context ███ */}
			<section className="context">
				<h2>Indigenous Languages in Canada</h2>

				<p>
					Her Excellency the Right Honourable Mary Simon is Inuk, making her
					Canada’s first Indigenous governor general. Mary Simon was born in
					Kangiqsualujjuaq, Nunavik (Quebec). She has publicly stated that she
					feels most comfortable when she is expressing herself in Inuktitut,
					her first language. In 2022, Her Excellency spoke at the launch of the
					United Nations International Decade of Indigenous Languages about the
					importance of Indigenous languages. Simon spoke of how there is no
					better way to preserve Indigenous languages than to speak them. She
					added that languages are an important part of Indigenous identity and
					key to Indigenous Peoples’ survival, and we must use every tool to
					protect Indigenous languages, because many have been lost due to
					residential schools, colonization and assimilation.
				</p>

				<p className="dis">
					Indigenous languages are central to the identity of Indigenous
					Peoples: First Nations, Inuit, and Métis. Language conveys worldview
					and informs values, relationships with the land and Indigenous legal
					orders. The history of colonization in Canada, and the laws and
					policies of the Government of Canada, have had a profoundly
					detrimental impact on Indigenous languages. As a result of restrictive
					assimilationist policies, many Indigenous languages in Canada have
					disappeared or are disappearing. However, several Indigenous
					communities are now actively working to revitalize their languages and
					honour their Elders and Knowledge Keepers for keeping their language
					alive.
				</p>

				<div className="gina-img">
					<div className="">
						<a
							className="link-source"
							id="bigger"
							href="https://www.noslangues-ourlanguages.gc.ca/en/blogue-blog/tracer-la-voie-the-road-ahead-eng"
							target="_blank"
							rel="noopener noreferrer"
						></a>
						<h3 className="gina">
							<a
								href=""
								className="link-source"
								target="_blank"
								rel="noopener noreferrer"
							>
								Indigenous languages: The road ahead
							</a>
						</h3>
						<p>
							Read Gina Wilson's perspective on the importance of Indigenous
							languages in Canada.
						</p>
					</div>
					<img
						className="gina"
						src="https://www.canada.ca/content/dam/pch/images/government/diversity-inclusion-public-service/knowledge-circle/gina-wilson1-bil.png"
						alt="Portrait of Gina Wilson"
					/>
				</div>

				<br />

				<p>
					According to Statistics Canada, there are currently more than{" "}
					<a
						href="https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-X/2021012/98-200-X2021012-eng.cfm"
						target="_blank"
						className="link-source"
						rel="noopener noreferrer"
					>
						70 unique Indigenous languages spoken by First Nations, Inuit and
						Métis in Canada
					</a>
					. These languages can be divided into 12 language families: Algonquian
					languages, Inuit languages, Athabaskan languages, Siouan languages,
					Salish languages, Tsimshian languages, Wakashan languages, Iroquoian
					languages, Michif, Tlingit, Kutenai and Haida. In 2021, approximately
					237,420 Indigenous people in Canada reported that they could{" "}
					<a
						href="https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/Definition-eng.cfm?ID=pop054"
						className="link-source"
						target="_blank"
						rel="noopener noreferrer"
					>
						speak an Indigenous language well enough to conduct a conversation
					</a>
					. Regrettably, the number of Indigenous people reporting an Indigenous
					language as the language they first learned at home in childhood
					continues to decline.
				</p>

				<p>
					According to the United Nations Educational, Scientific and Cultural
					Organization's (UNESCO) “Atlas of the World's Languages in Danger,”
					Indigenous languages around the world are facing the threat of
					extinction, falling into various categories like vulnerable,
					definitely endangered, severely endangered, or critically endangered.
					In Canada, three quarters of Indigenous languages are in a state of
					endangerment, and none of them are safe.
				</p>
				<p>
					As indicated by the findings of the Truth and Reconciliation
					Commission of Canada, these languages are at risk due to the
					historical and intergenerational impacts of cultural genocide and
					discriminatory colonial policies. Notably, residential schools played
					a significant role in attempting to eradicate Indigenous cultures and
					languages by forcibly separating Indigenous children from their
					families and suppressing the use of Indigenous languages through
					punishment and shaming.
				</p>

				<h3>Diversity of Indigenous Languages</h3>
				<p>
					The following chart provides information on the number of Indigenous
					people who could speak an Indigenous language in 2021, including the
					percentage change from 2016.
				</p>

				<ol className="graph-ol">
					<li>
						<strong>Hover over the languages:</strong> Move your cursor over any
						language.
					</li>
					<li>
						<strong>View language details:</strong> A tooltip will appear
						showing the number of speakers and the percentage change from 2016
						to 2021.
					</li>
					<li>
						<strong>Download data:</strong> Use the export menu to download the
						statistics as CSV or Excel.
					</li>
					<li>
						<strong>View data table:</strong> Use the button below to open a
						styled table of all languages and statistics.
					</li>
				</ol>
			</section>

			{/* ███ word-cloud + caption (match FR) ███ */}
			<figure
				className="wordcloud"
				aria-label="Word-cloud of Indigenous languages"
			>
				<div id="indigenous-wordcloud" />
				<figcaption>
					Number of Indigenous people able to speak an Indigenous language in
					2021 and percentage change from 2016.
				</figcaption>
			</figure>

			{/* Accessible accordion for data table (styled, like FR) */}
			<section className="chart-accordion" aria-labelledby="wc-acc-title-en">
				<h3 id="wc-acc-title-en" className="visually-hidden">
					Data table
				</h3>
				<button
					className="acc-button"
					aria-expanded={open}
					aria-controls="wc-data-table-en"
					onClick={() => setOpen((v) => !v)}
				>
					{open ? "Hide data table" : "View data table"}
					<span className="acc-icon" aria-hidden="true">
						{open ? "−" : "+"}
					</span>
				</button>

				<div
					id="wc-data-table-en"
					className="acc-panel"
					hidden={!open}
					role="region"
					aria-label="Data table for Indigenous languages word-cloud"
				>
					<table className="wc-table">
						<caption className="sr-only">
							Indigenous languages (sorted by speakers, 2021) with percentage
							change from 2016
						</caption>
						<thead>
							<tr>
								<th scope="col">Language / Group</th>
								<th scope="col">Speakers (2021)</th>
								<th scope="col">Change (2016–2021)</th>
							</tr>
						</thead>
						<tbody>
							{sorted.map((d) => (
								<tr key={d.category}>
									<th scope="row">{d.category}</th>
									<td data-type="number">{d.weight.toLocaleString("en-CA")}</td>
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

			{/* ███ breadcrumbs ███ */}
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("home")}>&laquo;&nbsp;Back</button>
				<button onClick={() => onNavigate?.("foundational-documents")}>
					Next&nbsp;&raquo;
				</button>
			</nav>

			{/* WCAG-AA accessible colors for accordion & table */}
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
          border: 2px solid #0F172A;        /* high contrast */
          background: #FFFFFF;
          color: #0B1220;                   /* near-black */
          font-weight: 700;
          cursor: pointer;
        }
        .acc-button:hover { background: #F1F5F9; }
        .acc-button:focus-visible {
          outline: 3px solid #2563EB;
          outline-offset: 2px;
        }
        .acc-icon { font-size: 1.25rem; line-height: 1; }
        .acc-panel { padding: 0.75rem 0.25rem; }

        .wc-table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          border: 1.5px solid #0F172A;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }
        .wc-table thead th {
          background: #111827;  /* dark header */
          color: #FFFFFF;
          font-weight: 800;
          padding: 0.7rem 0.8rem;
          text-align: left;
        }
        .wc-table th[scope="row"], .wc-table td {
          padding: 0.65rem 0.8rem;
          border-bottom: 1px solid #CBD5E1;
        }
        .wc-table tbody tr:nth-child(odd) td,
        .wc-table tbody tr:nth-child(odd) th[scope="row"] {
          background: #F8FAFC;
        }
        .wc-table td[data-type="number"] { text-align: right; }
      `}</style>
		</div>
	);
};

export default Languages;
