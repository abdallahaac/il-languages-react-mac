import React, { useState, useEffect } from "react";
import "./IntroductionPage.css";
/* ───────── audio imports ───────── */
import clip1 from "../assets/audio/en/Ojibwe En Tanya King.wav";
import clip2 from "../assets/audio/en/Inuktitut En Lauralee.wav";
import clip3 from "../assets/audio/en/Alison En Mitchif.wav";
import clip4 from "../assets/audio/en/Xaayda Kil.wav"; // Haida
import clip5 from "../assets/audio/en/Innu En Pam Dough.mp3";
import clip6 from "../assets/audio/en/Bedford Institute of Oceanography 7.wav"; // Mi’kmaq
import clip7 from "../assets/audio/en/Colleen En Recording 14.wav"; // Plains Cree

import image from "../assets/language.jpeg";

import BackToTop from "../components/BackToTop";

// This new component renders your SVG and handles click events on the hexagons.

// ... The rest of the IntroductionPage component remains unchanged
const Languages = ({ onNavigate }) => {
	/* ───────── word‑cloud data (same) ───────── */
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
	];

	/* ───────── Highcharts loader (same) ───────── */
	useEffect(() => {
		let chart;
		const render = () => {
			if (!window.Highcharts) return;
			const Highcharts = window.Highcharts;
			if (!Highcharts.seriesTypes.wordcloud && window.HighchartsWordcloud)
				window.HighchartsWordcloud(Highcharts);

			chart = Highcharts.chart("indigenous-wordcloud", {
				chart: { type: "wordcloud", height: 400 },
				title: { text: null },
				series: [
					{
						type: "wordcloud",
						name: "Speakers",
						data: wordCloudData.map((d) => ({
							name: d.category, // <— here
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
			});
		};

		const load = (u) =>
			new Promise((r) => {
				const s = document.createElement("script");
				s.src = u;
				s.onload = r;
				document.head.appendChild(s);
			});

		(async () => {
			if (!window.Highcharts)
				await load("https://code.highcharts.com/highcharts.js");
			if (!window.Highcharts?.seriesTypes.wordcloud)
				await load("https://code.highcharts.com/modules/wordcloud.js");
			render();
		})();

		return () => chart && chart.destroy();
	}, []);

	/* ───────── helpers ───────── */

	/* ───────── render ───────── */
	return (
		<div className="intro-wrapper intro-page">
			{/* ███ hero ███ */}
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

			{/* ███ narrative ███ */}

			{/* ███ acknowledgements ███ */}

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
					alive.{" "}
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
							<a href="" className="link-source" target="_blank">
								{" "}
								Indigenous languages: The road ahead
							</a>
						</h3>
						<p>
							Read Gina Wilson's perspective on the importance of Indigenous
							languages in Canada
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
					percentage change from 201
				</p>

				<ol className="graph-ol">
					<li>
						<strong>Hover over the languages:</strong> Move your cursor over any
						language.
					</li>
					<li>
						<strong>View language details:</strong> A tooltip will appear
						showing the number of speakers and the percentage change from 2016
						to 2021.
					</li>
					<li>
						<strong>Download data:</strong> Use the export menu to download the
						statistics as CSV or Excel.
					</li>
					<li>
						<strong>View data table:</strong> Click “View Data” in the export
						menu to see the full table.
					</li>
				</ol>
			</section>

			{/* ███ word‑cloud ███ */}
			<figure
				className="wordcloud"
				aria-label="Word‑cloud of Indigenous languages"
			>
				<div id="indigenous-wordcloud" />
				<figcaption>
					Number of Indigenous people able to speak an Indigenous language
					in 2021 and percentage change from 2016.
				</figcaption>
			</figure>

			<BackToTop />

			{/* ███ breadcrumbs ███ */}
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("home")}>&laquo;&nbsp;Back</button>
				<button onClick={() => onNavigate?.("foundational-documents")}>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default Languages;
