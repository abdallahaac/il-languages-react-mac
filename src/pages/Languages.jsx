import React, { useEffect, useState } from "react";
import "./IntroductionPage.css";
import image from "../assets/language.jpeg";
import BackToTop from "../components/BackToTop";

import { getHeroURL } from "../prefetchHeroes";

import { loadHighcharts, ensureModule } from "../utils/highchartsLoader";

const Languages = ({ onNavigate }) => {
	/* ───────── state (reserved for future) ───────── */
	const [activeClipId] = useState(null);
	const [transcriptOpen] = useState({});
	const [visitedClips] = useState(new Set());

	/* ───────── word-cloud data ───────── */
	const wordCloudData = [
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
		{ category: "Tutchone languages", weight: 255, percentage: -36.3 },
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
			const Highcharts = await loadHighcharts({ useStock: false });

			await ensureModule(
				"https://code.highcharts.com/modules/wordcloud.js",
				(hc) => !!hc?.seriesTypes?.wordcloud
			);

			chart = Highcharts.chart("indigenous-wordcloud-en", {
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
				accessibility: {
					point: {
						valueDescriptionFormat:
							"{index}. {point.name}, {point.weight} speakers, change {point.percentage}%.",
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

	/* ───────── render ───────── */
	return (
		<div className="intro-wrapper intro-page">
			<header className="hero" role="banner">
				<img
					loading="lazy"
					src={image}
					alt=""
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">Indigenous Languages in Canada</h1>
			</header>

			<section className="context">
				<h2>Indigenous Languages in Canada</h2>

				<p>
					Her Excellency the Right Honourable Mary Simon is Inuk, making her
					Canada’s first Indigenous governor general… (narrative content
					preserved)
				</p>

				<p className="dis">
					Indigenous languages are central to the identity of Indigenous
					Peoples…
				</p>

				<div className="gina-img">
					<div>
						<h3 className="gina">
							<a
								href="https://www.noslangues-ourlanguages.gc.ca/en/blogue-blog/tracer-la-voie-the-road-ahead-eng"
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
						loading="lazy"
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
						70 unique Indigenous languages spoken
					</a>{" "}
					by First Nations, Inuit and Métis in Canada…
				</p>

				<p>
					According to UNESCO’s “Atlas of the World's Languages in Danger,”
					Indigenous languages around the world are facing the threat of
					extinction…
				</p>
				<p>
					As indicated by the findings of the Truth and Reconciliation
					Commission of Canada, these languages are at risk due to the
					historical and intergenerational impacts of cultural genocide…
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
						<strong>View language details:</strong> Tooltip shows speakers and
						2016→2021 change.
					</li>
					<li>
						<strong>Download data:</strong> Export CSV/Excel from the menu.
					</li>
					<li>
						<strong>View data table:</strong> Use “View Data” in the export
						menu.
					</li>
				</ol>
			</section>

			<figure
				className="wordcloud"
				aria-label="Word-cloud of Indigenous languages"
			>
				<div id="indigenous-wordcloud-en" />
				<figcaption>
					Number of Indigenous people able to speak an Indigenous language in
					2021 and percentage change from 2016.
				</figcaption>
			</figure>

			<BackToTop />

			<nav className="breadcrumb" aria-label="Page navigation">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("home");
					}}
				>
					&laquo;&nbsp;Back
				</button>
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("foundational-documents");
					}}
				>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default Languages;
