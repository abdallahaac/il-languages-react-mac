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

import image from "../assets/image.png";

// This new component renders your SVG and handles click events on the hexagons.

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
						e
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
				<text className="cls-6" transform="translate(768.07 31.53)">
					<tspan x="0" y="0">
						P
					</tspan>
					<tspan className="cls-4" x="22.07" y="0">
						l
					</tspan>
					<tspan x="32.51" y="0">
						ai
					</tspan>
					<tspan className="cls-10" x="60.23" y="0">
						n
					</tspan>
					<tspan x="80.49" y="0">
						s{" "}
					</tspan>
					<tspan className="cls-11" x="102.6" y="0">
						C
					</tspan>
					<tspan x="127.58" y="0">
						r
					</tspan>
					<tspan className="cls-8" x="142.23" y="0">
						e
					</tspan>
					<tspan x="159.08" y="0">
						e
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

// ... The rest of the IntroductionPage component remains unchanged
const IntroductionPage = ({ onNavigate }) => {
	/* ───────── state ───────── */
	const [activeClipId, setActiveClipId] = useState(null);
	const [transcriptOpen, setTranscriptOpen] = useState({});
	const [visitedClips, setVisitedClips] = useState(new Set()); // New state for tracking visited clips

	/* ───────── audio data (same) ───────── */
	const clips = [
		{
			id: 1,
			label: "Ojibwe",
			src: clip1,
			transcript: `Aaniin-Boozhoo (Hello/Greetings)

Minogiizhep (Good morning!)

Miigwetch (Thank you!)

Nimiigwechiwendam (I am grateful.)

Anishinaabe Inaadiziwin (Anishinaabe culture)

Gidanimikaagoom (Season’s Greetings!)

Tanya Indizhnikaazh (Tanya, is my name.)

Aanish na? (How are you?)

Minogiizhigad (Have a good day.)
`,
		},
		{
			id: 2,
			label: "Inuktitut",
			src: clip2,
			transcript: `ᐅᓪᓛᑯᑦ - Ullaakut (Good morning!)

ᐅᓐᓄᓴᒃᑯᑦ - Unnusakkut (Good afternoon!)

ᑐᖕᖓᓱᒋᑦ - tunngasugit (Welcome!)

ᓇᑯᕐᒦᒃ - nakurmiik (Thank you!)

ᓴᐱᖅᑕᐃᓕᓂᖅ - sapirtailiniq (Courage)

ᖃᓄᐃᙱ - qanuinngi (Good)

ᓗᐊᕋᓖ-ᖒᖓ Lauralee-nguunga (My name is Lauralee.)

ᖃᓄᐃᑉᐱᑦ - qanuippit? (How are you?)

ᐅᓪᓗᖃᑦᑎᐊᕆᑦ - Ullaqattiarit (Have a good day.)`,
		},
		{
			id: 3,
			label: "Michif",
			src: clip3,
			transcript: `Boon Mataen (Good morning!)

Bonn Apray Mijii (Good afternoon!)

Taanshi (Hello.)

Taanshi Kiiya? (Hi, how are you?)

Enn Bonn Zhoornii Ayaa (Have a good day.)

Bonn Ouvraazh (Good job!)

Alison Dishinikaashoon (My name is Alison.)

Maarsii (Thank you!)

Ki Wiichihiitonaan (We take care of each other.)

`,
		},
		{
			id: 4,
			label: "Haida",
			src: clip4,
			transcript: `Sing.Gaay ‘laa (Good morning!)

Sintajiigid ‘laa (Good afternoon!)

Haawa (Thank you!)

Gina ‘waadluxan gud ad kwaagid (Everything depends on everything else.)

‘laa Gudsdll ga (Very well.)

K’uul Gaada han.nuu dii Kiiga ga (My name is...)

Gassing.uu dang Giidang (How are you?)

Sin ‘laa hla daaga ga (Have a good day.)


`,
		},
		{
			id: 5,
			label: "Innu",
			src: clip5,
			transcript: `Tshipushukatinau (I greet you all.)

Tshinashkumitinau (Thank you all.)

Tshinashkumitin (Thank you!)

Ashineun (Pride)

Tshikatshiun (You are good at it. / You did it well.)

Pam Nitashinikatakun (My name is Pam)


`,
		},
		{
			id: 6,
			label: "Mi’kmaq",
			src: clip6,
			transcript: `Kwe', wli eksitpu'k (Hello! / Hi, Good morning!)

Wela'lin (Thank you!)

Melkitai (I am brave.)

Weltek (Nice)

Ni’n teliusi (My name is...)

Me’ tal-wuleyn (How are you?)

kelu'kwes na'kwekm (Have a good day.)
`,
		},
		{
			id: 7,
			label: "Plains Cree",
			src: clip7,
			transcript: `Tânisi (Hello.)

Tânisi, Kiyawâw (How is everyone?)

Colleen Nitisiyihkâson (My name is Colleen.)

Takahki (Amazing)

Sôhkahtwâk (Be Resilient)

Kinanâskomitinâwâw (Thank you, everyone.)

Miyo-Kîsikanisik (Have a nice day!)`,
		},
	];
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
	const toggleTranscript = (id) =>
		setTranscriptOpen((p) => ({ ...p, [id]: !p[id] }));

	const handleHexClick = (id) => {
		setActiveClipId(id);
		// Add the clicked ID to the visited set
		setVisitedClips((prevVisited) => {
			const newVisited = new Set(prevVisited);
			newVisited.add(id);
			return newVisited;
		});
	};
	const remainingClips = clips.length - visitedClips.size;

	/* ───────── render ───────── */
	return (
		<div className="intro-wrapper intro-page">
			{/* ███ hero ███ */}
			<header className="hero" role="banner">
				<img src={image} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Introduction and overview</h1>
			</header>

			{/* ███ narrative ███ */}
			<article className="narrative">
				<p>
					<span className="dropcap">L</span>anguage is the foundation of a
					culture. For Indigenous oral societies, words hold knowledge amassed
					for millennia. A language holds the stories, songs, dances, protocols,
					family histories and connections. Languages also often hold the
					community’s customary laws that were eroded by the policies of the
					Indian Act.
				</p>
				<p>
					As many communities move towards a return to self‑government, this
					loss of laws and systems of governance means some communities don’t
					have that knowledge to draw upon. When a language dies, so does the
					link to the cultural and historical past. Without that crucial
					connection to their linguistic and cultural history, people lose their
					sense of identity and belonging.
				</p>
				<footer className="source">
					Source: Why Is It Important to Protect and Revitalize Indigenous
					Languages?{" "}
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
						Reproduced with the permission of Indigenous Corporate Training Inc.{" "}
					</span>
					<a
						className="link-source"
						href="https://www.ictinc.ca/"
						target="_blank"
					>
						www.ictinc.ca
					</a>
				</footer>
			</article>

			{/* ███ acknowledgements ███ */}
			<section className="acknowledge">
				<h2>Indigenous Voices</h2>
				<p>
					The following recordings feature the voices of Indigenous public
					service employees from across the country who have generously shared
					their time and language skills with us. Through these clips, you will
					gain a deeper appreciation of the rich linguistic heritage and
					cultural diversity that enriches our nation.
				</p>
			</section>
			<section className="acknowledge">
				<h2>Acknowledgement</h2>
				<p>
					A heartfelt thank you to the Indigenous public service employees who
					dedicated their time to this project, allowing us the privilege of
					hearing and appreciating the richness of their languages in these
					audio recordings.
				</p>
			</section>

			{/* ███ instructions ███ */}
			<section className="instructions" aria-labelledby="instr-heading">
				<h3 id="instr-heading">
					Instructions for navigating numbered interactions with audio clips
				</h3>
				<ol className="graph-ol">
					<li>
						<strong> Identify the icon: </strong>Locate the numbered icons on
						the screen. These icons are interactive and will trigger an audio
						clip when clicked.
					</li>
					<li>
						<strong> Click on an icon: </strong>Select a numbered icon by
						clicking on it. This action will play the associated audio clip
					</li>
					<li>
						<strong>Listen to the audio:</strong> After clicking, an audio clip
						will automatically play. Ensure your device's volume is turned up
						and speakers or headphones are properly connected
					</li>
					<li>
						<strong> Proceed to the next icon:</strong> Once you've listened to
						the audio, click on the next numbered icon to continue through the
						interaction.
					</li>
					<li>
						<strong> Complete the interaction:</strong> Continue clicking on all
						numbered icons until you have completed the entire interaction.
					</li>
				</ol>
			</section>

			{/* ███ audio interaction ███ */}
			{/* ███ audio interaction ███ */}
			<section className="audio-block" aria-labelledby="audio-heading">
				<h3 id="audio-heading" className="sr-only">
					Audio clip interaction
				</h3>

				<div className="audio-buttons">
					<AudioInteractionSVG
						activeClipId={activeClipId}
						onHexClick={handleHexClick}
						clips={clips}
						visitedClips={visitedClips}
					/>
				</div>

				{/* New progress message */}
				<div className="audio-progress" role="status" aria-live="polite">
					{visitedClips.size > 0 && (
						<p>
							{remainingClips > 0
								? `Visited ${visitedClips.size} of ${clips.length} audio clips. `
								: " Excellent! You've explored all the audio clips."}
						</p>
					)}
				</div>

				{activeClipId && (
					<div className="audio-player">
						<audio
							src={clips.find((c) => c.id === activeClipId)?.src || ""}
							controls
							autoPlay
							aria-describedby={`transcript-${activeClipId}`}
						>
							Your browser does not support the audio element.
						</audio>

						<button
							className="transcript-toggle"
							onClick={() => toggleTranscript(activeClipId)}
							aria-expanded={!!transcriptOpen[activeClipId]}
							aria-controls={`transcript-${activeClipId}`}
						>
							{transcriptOpen[activeClipId]
								? "Hide transcript"
								: "Show transcript"}
						</button>

						{transcriptOpen[activeClipId] && (
							<pre
								id={`transcript-${activeClipId}`}
								className="transcript"
								tabIndex={0}
							>
								{clips.find((c) => c.id === activeClipId)?.transcript}
							</pre>
						)}
					</div>
				)}
			</section>

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

export default IntroductionPage;
