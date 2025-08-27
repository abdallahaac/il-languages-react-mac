import React, { useState, useEffect } from "react";
import "../IntroductionPage.css";

/* ───────── Importations des fichiers audio (français) ───────── */
import clip1 from "../../assets/audio/fr/Ojibwe Fr Tanya King.mp3";
import clip2 from "../../assets/audio/fr/Inuktitut Fr Lauralee.wav";
import clip3 from "../../assets/audio/fr/Alison Fr Mitchif.wav";
import clip4 from "../../assets/audio/fr/Xaayda Fr Audio 2_01.wav";
import clip5 from "../../assets/audio/fr/Innu Fr Pam Dough.wav";
import clip6 from "../../assets/audio/fr/Inuktitut Fr Lauralee.wav";
import clip7 from "../../assets/audio/fr/Colleen Fr Plains Cree.wav";

import image from "../../assets/language.jpeg";
import BackToTop from "../../components/BackToTop";

// This component renders the SVG and now indicates which clips have been visited.
const AudioInteractionSVG = ({
	activeClipId,
	onHexClick,
	clips,
	visitedClips,
}) => {
	const createHexagon = (clip) => {
		const isVisited = visitedClips.has(clip.id);
		return (
			<g
				key={clip.id}
				className={`hex-interactive-group ${isVisited ? "is-visited" : ""}`}
				onClick={() => onHexClick(clip.id)}
				onKeyDown={(e) =>
					(e.key === "Enter" || e.key === " ") && onHexClick(clip.id)
				}
				role="button"
				tabIndex="0"
				aria-label={`Play audio clip for ${clip.label}`}
				aria-pressed={activeClipId === clip.id}
			>
				<title>{`Play ${clip.label} clip`}</title>
				<polygon className="cls-26" points={clip.points} />
				<text
					className="cls-20"
					transform={clip.transform}
					aria-hidden="true"
					style={{ pointerEvents: "none" }}
				>
					<tspan x="0" y="0">
						{clip.id}
					</tspan>
				</text>
			</g>
		);
	};

	const hexagonData = [
		{
			id: 1,
			points:
				"101.93 159.9 101.93 119.11 66.6 98.71 31.27 119.11 31.27 159.9 66.6 180.3 101.93 159.9",
			transform: "translate(49.95 153.23)",
		},
		{
			id: 2,
			points:
				"241.93 239.9 241.93 199.11 206.6 178.71 171.27 199.11 171.27 239.9 206.6 260.3 241.93 239.9",
			transform: "translate(190.37 239.25)",
		},
		{
			id: 3,
			points:
				"379.93 161.9 379.93 121.11 344.6 100.71 309.27 121.11 309.27 161.9 344.6 182.3 379.93 161.9",
			transform: "translate(328.31 155.87)",
		},
		{
			id: 4,
			points:
				"512.93 241.9 512.93 201.11 477.6 180.71 442.27 201.11 442.27 241.9 477.6 262.3 512.93 241.9",
			transform: "translate(457.22 237.25)",
		},
		{
			id: 5,
			points:
				"652.93 161.9 652.93 121.11 617.6 100.71 582.27 121.11 582.27 161.9 617.6 182.3 652.93 161.9",
			transform: "translate(599.46 155.23)",
		},
		{
			id: 6,
			points:
				"788.93 241.9 788.93 201.11 753.6 180.71 718.27 201.11 718.27 241.9 753.6 262.3 788.93 241.9",
			transform: "translate(736.52 237.25)",
		},
		{
			id: 7,
			points:
				"923.93 161.9 923.93 121.11 888.6 100.71 853.27 121.11 853.27 161.9 888.6 182.3 923.93 161.9",
			transform: "translate(872.43 158.97)",
		},
	];

	return (
		<svg
			id="Audio_SVG"
			data-name="Audio SVG"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 957.06 359.47"
			role="group" // Use role="group" for a collection of interactive elements
			aria-labelledby="svg-title svg-desc"
		>
			<title id="svg-title">Indigenous Language Audio Clips</title>
			<desc id="svg-desc">
				An interactive graphic with seven buttons. Each button is labeled with
				an Indigenous language and plays an audio clip when selected.
			</desc>

			{/* Group decorative elements and hide them from assistive technologies */}
			<g aria-hidden="true">
				<text className="cls-7" transform="translate(6.44 29.7)">
					<tspan className="cls-19" x="0" y="0">
						O
					</tspan>
					<tspan x="28.12" y="0">
						ji
					</tspan>
					<tspan className="cls-18" x="48.35" y="0">
						b
					</tspan>
					<tspan className="cls-27" x="67.5" y="0">
						w
					</tspan>
					<tspan x="92.27" y="0">
						é
					</tspan>
				</text>
				<text className="cls-6" transform="translate(138.62 346.4)">
					<tspan className="cls-24" x="0" y="0">
						I
					</tspan>
					<tspan className="cls-10" x="12.92" y="0">
						n
					</tspan>
					<tspan className="cls-27" x="33.19" y="0">
						u
					</tspan>
					<tspan className="cls-23" x="53.21" y="0">
						k
					</tspan>
					<tspan className="cls-12" x="71.96" y="0">
						t
					</tspan>
					<tspan className="cls-17" x="83.88" y="0">
						i
					</tspan>
					<tspan className="cls-9" x="94.18" y="0">
						t
					</tspan>
					<tspan className="cls-1" x="105.84" y="0">
						u
					</tspan>
					<tspan className="cls-21" x="125.32" y="0">
						t
					</tspan>
				</text>
				<text className="cls-7" transform="translate(291.5 29.7)">
					<tspan className="cls-15" x="0" y="0">
						M
					</tspan>
					<tspan className="cls-28" x="31.79" y="0">
						i
					</tspan>
					<tspan x="42.23" y="0">
						chif
					</tspan>
				</text>
				<text className="cls-6" transform="translate(432.22 346.4)">
					<tspan className="cls-13" x="0" y="0">
						H
					</tspan>
					<tspan x="28.04" y="0">
						a
					</tspan>
					<tspan className="cls-14" x="45.14" y="0">
						ï
					</tspan>
					<tspan className="cls-3" x="55.98" y="0">
						d
					</tspan>
					<tspan x="76.14" y="0">
						a
					</tspan>
				</text>
				<text className="cls-6" transform="translate(572.59 29.7)">
					<tspan className="cls-24" x="0" y="0">
						I
					</tspan>
					<tspan x="12.92" y="0">
						n
					</tspan>
					<tspan className="cls-10" x="33.41" y="0">
						n
					</tspan>
					<tspan x="53.67" y="0">
						u
					</tspan>
				</text>
				<text className="cls-6" transform="translate(682.47 346.4)">
					<tspan className="cls-13" x="0" y="0">
						M
					</tspan>
					<tspan className="cls-5" x="31.79" y="0">
						i
					</tspan>
					<tspan className="cls-16" x="42.41" y="0">
						’
					</tspan>
					<tspan className="cls-22" x="52.23" y="0">
						k
					</tspan>
					<tspan className="cls-17" x="71.06" y="0">
						m
					</tspan>
					<tspan x="100.73" y="0">
						aq
					</tspan>
				</text>
				<text className="cls-7" transform="translate(728.07 31.53)">
					<tspan x="0" y="0">
						C
					</tspan>
					<tspan className="cls-4" x="24.07" y="0">
						r
					</tspan>
					<tspan x="39.51" y="0">
						i
					</tspan>
					<tspan className="cls-10" x="60.23" y="0">
						d
					</tspan>
					<tspan x="80.49" y="0">
						e{" "}
					</tspan>
					<tspan className="cls-11" x="95.6" y="0">
						s
					</tspan>
					<tspan x="117.58" y="0">
						P
					</tspan>
					<tspan className="cls-8" x="140.23" y="0">
						l
					</tspan>
					<tspan x="150.08" y="0">
						a
					</tspan>
					<tspan x="167.08" y="0">
						i
					</tspan>
					<tspan x="178.08" y="0">
						n
					</tspan>
					<tspan x="195.08" y="0">
						e
					</tspan>
					<tspan x="210.08" y="0">
						s
					</tspan>
				</text>
				<polyline
					className="cls-25"
					points="833.18 187.93 889.63 218.63 955.06 181.12 955.06 100.95 887.35 62.15 820.75 99.93 821.86 257.38 753.35 297.93 684.67 258.87 682.92 104.69 614.97 62.15 546.63 102.74 545.65 260.02 478.64 299.22 409.85 259.17 409.82 102.49 340.25 62.15 273.75 101.98 272.84 259.12 204.84 299.16 138.28 260.27 138.28 100.95 70.5 61.38 2.06 101.28 2 180.69 70.37 221.29 129.18 185.81"
				/>
				<polyline
					className="cls-25"
					points="150.03 172.95 206.6 141.51 261.09 172.95"
				/>
				<polyline
					className="cls-25"
					points="286.62 187.25 343.05 219.51 402.03 185.98"
				/>
				<polyline
					className="cls-25"
					points="425.01 172.44 479.64 141.51 537.6 174.23"
				/>
				<polyline
					className="cls-25"
					points="561.35 188.78 615.73 219.51 683.78 180.71"
				/>
				<polyline
					className="cls-25"
					points="698.45 170.91 753.6 139.93 809.77 172.61"
				/>
			</g>

			{/* Render the interactive hexagons */}
			{hexagonData.map((hex) =>
				createHexagon(
					clips.find((clip) => clip.id === hex.id)
						? { ...hex, label: clips.find((clip) => clip.id === hex.id).label }
						: hex
				)
			)}
		</svg>
	);
};

const Languages = ({ onNavigate }) => {
	/* ───────── état ───────── */
	const [activeClipId, setActiveClipId] = useState(null);
	const [transcriptOpen, setTranscriptOpen] = useState({});
	const [visitedClips, setVisitedClips] = useState(new Set());

	/* ───────── données audio ───────── */
	const clips = [
		{
			id: 1,
			label: "Ojibwe",
			src: clip1,
			transcript: `Aaniin-Boozhoo (Bonjour/Salutations.)\n\nMinogiizhep (Bon matin.)\n\nMiigwetch (Merci.)\n\nNimiigwechiwendam (Je suis reconnaissante.)\n\nAnishinaabe Inaadiziwin (Culture anishinaabe.)\n\nGidanimikaagoom (Joyeuses fêtes.)\n\nIndizhnikaazh (Je m’appelle Tanya.)\n\nAanish na? (Comment vas-tu/Comment allez-vous?)\n\nMinogiizhigad (Bonne journée.)`,
		},
		{
			id: 2,
			label: "Inuktitut",
			src: clip2,
			transcript: `ᐅᓪᓛᑯᑦ - Ullaakut (Bonjour.)\n\nᐅᓐᓄᓴᒃᑯᑦ - Unnusakkut (Bon après-midi.)\n\nᑐᖕᖓᓱᒋᑦ - tunngasugit (Bienvenue.)\n\nᓇᑯᕐᒦᒃ - nakurmiik (Merci)\n\nᓴᐱᖅᑕᐃᓕᓂᖅ - sapirtailiniq (Courage)\n\nᖃᓄᐃᙱ - qanuinngi (Bien)\n\nᓗᐊᕋᓖ-ᖒᖓ Lauralee-nguunga (Je m’appelle Lauralee.)\n\nᖃᓄᐃᑉᐱᑦ - qanuippit? (Comment ça va?)\n\nᐅᓪᓗᖃᑦᑎᐊᕆᑦ - Ullaqattiarit (Bonne journée.)`,
		},
		{
			id: 3,
			label: "Michif",
			src: clip3,
			transcript: `Boon mataen (Bonjour.)\n\nBonn apray mijii (Bon après-midi.)\n\nTaanshi (Salut.)\n\nTaanshi kiiya? (Salut, comment vas-tu?)\n\nEnn bonn zhoornii ayaa (Bonne journée.)\n\nBonn ouvraazh (Beau travail.)\n\nAlison dishinikaashoon (Mon nom est Alison.)\n\nMaarsii (Merci.)\n\nKi wiichihiitonaan (Nous prenons soin les uns des autres.)`,
		},
		{
			id: 4,
			label: "Haida",
			src: clip4,
			transcript: `Sing.Gaay ‘laa (Bonjour!)\n\nSintajiigid ‘laa (Bon après-midi!)\n\nHaawa (Merci!)\n\nGina ‘waadluxan gud ad kwaagid (Tout dépend de tout / Tout dépend du reste.)\n\n‘laa Gudsdll ga (Très bien.)\n\nK’uul Gaada han.nuu dii Kiiga ga (Je m’appelle...)\n\nGassing.uu dang Giidang (Comment ça va?)\n\nSin ‘laa hla daaga ga (Bonne journée.)`,
		},
		{
			id: 5,
			label: "Innu",
			src: clip5,
			transcript: `Tshipushukatinau (Je vous salue tous.)\n\nTshinashkumitinau (Merci à tous.) / Tshinashkumitin (Merci.)\n\nAshineun (Fierté.)\n\nTshikatshiun (Tu es doué(e) pour cela / tu l’as bien fait.)\n\nNitashinikatakun (Je m’appelle Pam.)`,
		},
		{
			id: 6,
			label: "Mi’kmaq",
			src: clip6,
			transcript: `Kwe', wli eksitpu'k (Bonjour.)\n\nWela'lin (Merci.)\n\nMelkitai (Je suis brave.)\n\nWeltek (C’est bien!)\n\nNi’n teliusi (Je m’appelle)\n\nMe’ tal-wuleyn (Comment allez-vous?)\n\nkelu'kwes na'kwekm (Passez une belle journée.)`,
		},
		{
			id: 7,
			label: "Cri des Plaines",
			src: clip7,
			transcript: `Tânisi Salut-allo (Bonjour)\n\nTansay gayah wow (Comment va tout le monde?)\n\nColleen nit see kasun (Mon nom est Colleen.)\n\nTah kah kay (Extraordinaire)\n\nSew kah twok (Sois résilient - Sois résiliente.)\n\nKi na na skomiten nah wow (Merci à tous et à toutes.)\n\nMiyo key see gan sick (Bonne journée.)`,
		},
	];

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

	/* ───────── chargeur Highcharts ───────── */
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

	/* ───────── fonctions d'assistance ───────── */
	const toggleTranscript = (id) =>
		setTranscriptOpen((p) => ({ ...p, [id]: !p[id] }));

	const handleHexClick = (id) => {
		setActiveClipId(id);
		setVisitedClips((prevVisited) => {
			const newVisited = new Set(prevVisited);
			newVisited.add(id);
			return newVisited;
		});
	};
	const remainingClips = clips.length - visitedClips.size;

	/* ───────── rendu ───────── */
	return (
		<div className="intro-wrapper">
			{/* ███ hero ███ */}
			<header className="hero" role="banner">
				<img
					loading="lazy"
					src={image}
					alt=""
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">Les langues autochtones au Canada</h1>
			</header>

			{/* ███ contexte élargi ███ */}
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
					autochtones : les langues des Premières Nations, du peuple inuit et de
					la Nation métisse transmettent des visions du monde et inspirent les
					valeurs, les relations avec le territoire et les systèmes juridiques
					autochtones. L’histoire de la colonisation au Canada, de même que les
					lois et les politiques du gouvernement du Canada ont profondément nui
					aux langues autochtones. En raison des politiques d’assimilation
					restrictives, plusieurs langues autochtones ont disparu ou sont en
					voie de disparaître au Canada. Toutefois, plusieurs communautés
					autochtones travaillent activement à la revitalisation de leur langue
					et honorent les aîné·es et gardien·nes du savoir pour que leur langue
					reste vivante.
				</p>
				<div className="gina-img">
					<div className="">
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
						loading="lazy"
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
						Canada par les membres des Premières Nations, du peuple inuit et de
						la Nation métisse
					</a>
					. On peut regrouper ces langes en 12 familles : les langues
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
		</div>
	);
};

export default Languages;
