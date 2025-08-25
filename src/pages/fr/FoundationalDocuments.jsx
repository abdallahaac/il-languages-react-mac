import React, { useState } from "react";
import "../IntroductionPage.css";
import "../FoundationalDocuments.css";
import image from "../../assets/foundation.jpeg";
import BackToTop from "../../components/BackToTop";

// A reusable FlipCard component
const FlipCard = ({
	id,
	cardId, // New prop for the unique ID
	frontContent,
	backContent,
	isFlipped,
	onFlip,
	customHeight,
}) => {
	// Apply custom height if provided
	const style = customHeight ? { minHeight: customHeight } : {};

	return (
		<div
			id={cardId} // Use the new prop as the HTML id
			className="flip-card"
			style={style}
			role="button"
			tabIndex="0"
			aria-pressed={isFlipped}
			onClick={() => onFlip(id)}
			onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onFlip(id)}
		>
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<span
						className="card-text"
						dangerouslySetInnerHTML={{ __html: frontContent }}
					/>
					<svg
						className="card-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M9 18l6-6-6-6" />
					</svg>
				</div>
				<div className="flip-card-back">
					<div dangerouslySetInnerHTML={{ __html: backContent }} />
					<svg
						className="card-icon card-icon-back"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</div>
			</div>
		</div>
	);
};

const FoundationalDocuments = ({ onNavigate }) => {
	// State for the first set of cards (Action Plan)
	const [flippedCards, setFlippedCards] = useState(new Set());
	const handleFlip = (cardId) => {
		setFlippedCards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};
	const cardData = [
		{
			id: 1,
			cardId: "action-plan-91",
			front: "Plan d'action 91",
			back: "Travailler avec les gouvernements autochtones, d’autres organes directeurs autochtones et diverses organisations autochtones pour examiner et étudier les modifications proposées pour renforcer la Loi sur les langues autochtones dans le cadre du processus d’examen indépendant. (Patrimoine canadien).",
		},
		{
			id: 2,
			cardId: "action-plan-92",
			front: "Plan d'action 92",
			back: "Continuer à mettre en place des mesures visant à faciliter la fourniture d’un financement adéquat, durable et à long terme pour la récupération, la revitalisation, le maintien et le renforcement des langues autochtones grâce à la mise en œuvre continue de la Loi sur les langues autochtones. (Patrimoine canadien).",
		},
		{
			id: 3,
			cardId: "action-plan-93",
			front: "Action Plan item 93",
			back: "Advance access to federal services in Indigenous languages; including translation of key departmental documentation. (Canadian Heritage).",
		},
		{
			id: 4,
			cardId: "action-plan-11",
			front: "Action Plan item 93",
			back: "Favoriser l’accès aux services fédéraux dans les langues autochtones, y compris la traduction de la documentation ministérielle essentielle. (Patrimoine canadien).",
		},
	];

	// State for the second set of cards (TRC Calls to Action)
	const [flippedTrcCards, setFlippedTrcCards] = useState(new Set());
	const handleTrcFlip = (cardId) => {
		setFlippedTrcCards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};
	const trcCardData = [
		{
			id: 1,
			cardId: "trc-13",
			front: "Appel à l'action 13",
			back: "Collaborer avec les gouvernements autochtones, d’autres organes autochtones de gouvernance et divers organismes autochtones pour examiner et envisager des amendements visant à renforcer la Loi sur les langues autochtones conformément au processus d'examen indépendant. (Patrimoine canadien).",
		},
		{
			id: 2,
			cardId: "trc-14",
			front: "Appel à l'action 14",
			back: `
					<div class="trc14-content">
					<p>Nous demandons au gouvernement fédéral d’adopter une <em>Loi sur les langues autochtones</em> qui incorpore les principes suivants&nbsp;:</p>
					<ol>
						<li>Les langues autochtones représentent une composante fondamentale et valorisée de la culture et de la société canadiennes, et il y a urgence de les préserver.</li>
						<li>Les droits linguistiques autochtones sont renforcés par les traités.</li>
						<li>Le gouvernement fédéral a la responsabilité de fournir des fonds suffisants pour la revitalisation et la préservation des langues autochtones.</li>
						<li>Ce sont les peuples et les collectivités autochtones qui sont les mieux à même de gérer la préservation, la revitalisation et le renforcement des langues et des cultures autochtones.</li>
						<li>Le financement accordé pour les besoins des initiatives liées aux langues autochtones doit refléter la diversité de ces langues.</li>
					</ol>
					</div>
				`,
			height: "420px",
		},

		{
			id: 3,
			cardId: "trc-15",
			front: "Appel à l'action 15",
			back: "Nous demandons au gouvernement fédéral de nommer, à la suite de consultations avec les groupes autochtones, un commissaire aux langues autochtones. Plus précisément, nous demandons que ce commissaire soit chargé de contribuer à la promotion des langues autochtones et de présenter des comptes rendus sur l’efficacité du financement fédéral destiné aux initiatives liées aux langues autochtones.",
		},
	];

	// State and data for the third set of cards (Calls for Justice)
	const [flippedCfjCards, setFlippedCfjCards] = useState(new Set());
	const handleCfjFlip = (cardId) => {
		setFlippedCfjCards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};
	const cfjCardData = [
		{
			id: 1,
			cardId: "cfj-2-1",
			front: "Appel à la Justice 2.1",
			back: "Nous demandons à tous les gouvernements de reconnaître les droits des peuples autochtones à leurs cultures et à leurs langues comme des droits inhérents, protégés constitutionnellement en vertu de l'article 35 de la Constitution.",
		},
		{
			id: 2,
			cardId: "cfj-2-2",
			front: "Appel à la Justice 2.2",
			back: `

<span style:"padding:10px; margin-top:10px">Nous demandons à tous les gouvernements de reconnaître les langues autochtones comme langues officielles, avec le même statut, la même reconnaissance et la même protection que le français et l'anglais. Cela inclut les directives suivantes :</span>
<ol style="font-size:18px"><li>Les gouvernements fédéraux, provinciaux et territoriaux doivent légiférer pour que les langues autochtones soient reconnues comme langues officielles dans leurs territoires respectifs.</li><li>Tous les gouvernements doivent fournir des fonds aux peuples autochtones pour soutenir les efforts de revitalisation et de restauration des cultures et langues autochtones.</li></ol>
</div>
            `,
		},
		{
			id: 3,
			cardId: "cfj-2-3",
			front: "Appel à la Justice 2.3",
			back: "Nous demandons à tous les gouvernements de veiller à ce que toutes les femmes, les filles et les personnes 2ELGBTQIA+ autochtones aient un accès libre, sûr, permanent et concret à leurs cultures et à leurs langues afin de rétablir et de revitaliser leur identité culturelle. Tous les membres des communautés autochtones, des jeunes enfants aux Aînés, ont droit à cet accès. Les programmes et services permettant cet accès ne doivent pas être exclusivement liés à des institutions gérées par le gouvernement. De plus, tous les gouvernements doivent garantir aux enfants autochtones le droit de conserver leur langue autochtone et d'être éduqués dans celle-ci, en leur assurant l'accès à des programmes d'immersion de la maternelle à l'enseignement postsecondaire.",
		},
	];

	// State and data for the fourth set of cards (Calls for Justice - Inuit)
	const [flippedCfjICards, setFlippedCfjICards] = useState(new Set());
	const handleCfjIFlip = (cardId) => {
		setFlippedCfjICards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};
	const cfjICardData = [
		{
			id: 1,
			cardId: "cfjI-16-2",
			front: "Appel à la justice pour les Inuits 16.2",
			back: "Nous demandons à tous les gouvernements de créer des lois et des services pour assurer la protection et la revitalisation de la culture et de la langue inuites. Tous les Inuits, y compris ceux qui vivent à l’extérieur de l’Inuit Nunangat, doivent avoir un accès équitable aux programmes culturels et linguistiques. Il est essentiel que des Aînés participent à l’élaboration et à l’exécution de ces programmes.",
		},
	];

	return (
		<div className="intro-wrapper foundational-documents-page">
			<header className="hero" role="banner">
				<img src={image} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Documents Fondamentaux</h1>
			</header>

			<section className="acknowledge">
				<h2>La Décennie internationale des langues autochtones</h2>
				<p>
					<span className="dropcap">S</span>elon l’Instance permanente sur les
					questions autochtones de l’ONU, les systèmes complexes de
					connaissances que constituent les langues autochtones sont au centre
					de l’identité des peuples autochtones. Afin d’attirer l’attention sur
					l’érosion désastreuse des langues autochtones et sur l’impérieuse
					nécessité de les promouvoir, l’Assemblée générale des Nations Unies a
					proclamé la période allant de 2022 à 2032 Décennie internationale des
					langues autochtones.
				</p>
				<p>Renseignements supplémentaires :</p>
				<ul>
					<li>
						<a
							href="https://www.unesco.org/fr/decades/indigenous-languages"
							target="_blank"
							rel="noopener noreferrer"
						>
							Décennie internationale des langues autochtones (2022-2032) |
							UNESCO
						</a>
					</li>
					<li>
						<a
							href="https://www.canada.ca/fr/patrimoine-canadien/campagnes/celebrons-langues-autochtones/decennie-internationale.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Décennie internationale des langues autochtones – Patrimoine
							canadien
						</a>
					</li>
					<li>
						<a
							href="https://ici.radio-canada.ca/nouvelle/1441265/decennie-langues-autochtones-organisation-nations-unies-perry-bellegarde"
							target="_blank"
							rel="noopener noreferrer"
						>
							L’ONU déclare la décennie internationale des langues autochtones
							dès 2022 (Radio-Canada)
						</a>
					</li>
					<li>
						<a
							href="https://commissionforindigenouslanguages.ca/fr/declaration-conjointe-ccunesco"
							target="_blank"
							rel="noopener noreferrer"
						>
							Le Bureau du commissaire aux langues autochtones et la Commission
							canadienne pour l’UNESCO établissent un partenariat visant à
							promouvoir les langues autochtones
						</a>
					</li>
				</ul>
			</section>

			<section className="acknowledge">
				<h2>
					La Déclaration des Nations Unies sur les droits des peuples
					autochtones et les langues autochtones
				</h2>
				<p>
					La Déclaration des Nations Unies sur les droits des peuples
					autochtones est un instrument international exhaustif sur les droits
					de la personne qui énonce une multitude de droits collectifs
					politiques, économiques, sociaux, culturels et environnementaux des
					peuples autochtones du monde entier, y compris celui de revitaliser
					leurs langues. L’article 13 de la Déclaration traite notamment des
					langues autochtones. Lisez la{" "}
					<a
						href="https://www.un.org/esa/socdev/unpfii/documents/DRIPS_fr.pdf"
						className="underline-purple"
						target="_blank"
						rel="noopener noreferrer"
					>
						déclaration complète
					</a>{" "}
					pour en savoir plus.
				</p>
				<p>Renseignements supplémentaires :</p>
				<ul>
					<li>
						<a
							href="https://www.justice.gc.ca/fra/declaration/quoi-what.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Justice Canada : La Déclaration des Nations Unies expliquée
							(justice.gc.ca)
						</a>
					</li>
					<li>
						<a
							href="https://www.justice.gc.ca/fra/declaration/legislation.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Justice Canada : À propos de la Loi (justice.gc.ca)
						</a>
					</li>
				</ul>
			</section>

			<section className="instructions" aria-labelledby="instr-heading">
				<h3 id="instr-heading">
					Le Plan d’action de la Loi sur la Déclaration des Nations Unies sur
					les droits des peuples autochtones
				</h3>
				<p>
					Le{" "}
					<a
						href="https://www.justice.gc.ca/fra/declaration/pa-ap/ah/index.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Plan d’action 2023-2028
					</a>{" "}
					de la Loi sur la Déclaration des Nations Unies sur les droits des
					peuples autochtones est le fruit de deux années de travail mené en
					consultation et en collaboration avec des membres des Premières
					Nations, du peuple inuit et de la Nation métisse de partout au Canada.
					Il fournit une feuille de route énonçant les mesures que le Canada
					doit prendre, en partenariat avec les peuples autochtones, pour mettre
					en œuvre les principes et les droits énoncés dans la Déclaration des
					Nations Unies et faire progresser de façon concrète la réconciliation.
				</p>
				<p>
					Le plan d’action énonce des{" "}
					<a
						href="https://www.justice.gc.ca/fra/declaration/pa-ap/ah/p2.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						priorités partagées
					</a>{" "}
					par les peuples autochtones conformément à la{" "}
					<em>Loi sur les langues autochtones</em>, y compris des modifications
					éventuelles à la Loi et l’amélioration de l’accès aux services
					fédéraux dans les langues autochtones.
				</p>
				<p className="select-instruction">
					Sélectionnez chaque élément pour en savoir plus.
				</p>
			</section>

			<section className="card-grid">
				{cardData.map((card) => (
					<FlipCard
						key={card.id}
						id={card.id}
						cardId={card.cardId}
						frontContent={card.front}
						backContent={card.back}
						isFlipped={flippedCards.has(card.id)}
						onFlip={handleFlip}
						customHeight={card.height}
					/>
				))}
			</section>

			<section>
				<h2>
					Les appels à l’action de la Commission de vérité et réconciliation du
					Canada
				</h2>
				<p>
					La Commission de vérité et réconciliation du Canada (CVR) a été mise
					en place entre autres pour documenter l’histoire et les séquelles des
					pensionnats. Son rapport final a été publié en décembre 2015 et
					comprend 94 appels à l’action sur divers aspects. Les appels à
					l’action 13 à 15, qui concernent particulièrement la langue et la
					culture, se lisent comme suit :
				</p>
				<p className="select-instruction">
					Sélectionnez chaque élément pour en savoir plus.
				</p>
			</section>

			{/* --- TRC Calls to Action --- */}
			<section className="card-grid trc-card-grid">
				{/* top-left: TRC 13 */}
				<FlipCard
					key={trcCardData[0].id}
					id={trcCardData[0].id}
					cardId={trcCardData[0].cardId}
					frontContent={trcCardData[0].front}
					backContent={trcCardData[0].back}
					isFlipped={flippedTrcCards.has(trcCardData[0].id)}
					onFlip={handleTrcFlip}
					customHeight={trcCardData[0].height}
				/>

				{/* top-right: TRC 15 */}
				<FlipCard
					key={trcCardData[2].id}
					id={trcCardData[2].id}
					cardId={trcCardData[2].cardId}
					frontContent={trcCardData[2].front}
					backContent={trcCardData[2].back}
					isFlipped={flippedTrcCards.has(trcCardData[2].id)}
					onFlip={handleTrcFlip}
					customHeight={trcCardData[2].height}
				/>

				{/* bottom full-width: TRC 14 */}
				<FlipCard
					key={trcCardData[1].id}
					id={trcCardData[1].id}
					cardId={trcCardData[1].cardId}
					frontContent={trcCardData[1].front}
					backContent={trcCardData[1].back}
					isFlipped={flippedTrcCards.has(trcCardData[1].id)}
					onFlip={handleTrcFlip}
					customHeight={trcCardData[1].height}
				/>
			</section>

			<p style={{ width: "100%", display: "block" }}>
				<em>La Loi sur les langues autochtones</em> ayant reçu la sanction
				royale, le gouvernement a répondu aux appels à l’action 13 et 14. Il a
				donné suite à l’appel à l’action 15 en créant le Bureau du commissaire
				aux langues autochtones.
			</p>

			<section>
				<h2>
					Le rapport final de l’Enquête nationale sur les femmes et les filles
					autochtones disparues et assassinées
				</h2>
				<p>
					En 2016, en vue de répondre aux appels à l’action des familles, des
					communautés et des organisations autochtones, ainsi que
					d’organisations non gouvernementales et d’organismes internationaux,
					le gouvernement du Canada a lancé l’Enquête nationale sur les femmes
					et les filles autochtones disparues et assassinées. La commission
					chargée de l’enquête, entièrement indépendante, était formée de quatre
					commissaires de diverses régions du pays et a suivi un processus
					juridique non lié aux gouvernements fédéral, provinciaux et
					territoriaux, aux sociétés d’État et aux gouvernements autochtones.
				</p>
				<p>
					Les commissaires avaient reçu le mandat de formuler des
					recommandations, et celles-ci ont été présentées sous forme d’appels à
					la justice. Ces derniers ne sont pas optionnels, c’est-à-dire qu’ils
					constituent des obligations légales. Les appels à la justice découlent
					de lois nationales et internationales sur les droits de la personne et
					des peuples autochtones, dont la Charte canadienne des droits et
					libertés, la Constitution canadienne et l’honneur de la Couronne.
					Ainsi, le Canada a l’obligation légale de mettre en œuvre en totalité
					ces appels à la justice et de veiller à ce que les femmes, les filles
					et les personnes 2ELGBTQIA+ autochtones vivent dans la dignité. Le 3
					juin 2019, le rapport final officiel de l’Enquête nationale sur les
					femmes et les filles autochtones disparues et assassinées a été
					présenté au gouvernement fédéral lors d’une cérémonie de clôture.
				</p>
				<p>
					Les appels à la justice suivants font référence aux langues
					autochtones :
				</p>
			</section>

			<section className="card-grid cfj-card-grid">
				<div className="card-row">
					<FlipCard
						key={cfjCardData[0].id}
						id={cfjCardData[0].id}
						cardId={cfjCardData[0].cardId}
						frontContent={cfjCardData[0].front}
						backContent={cfjCardData[0].back}
						isFlipped={flippedCfjCards.has(cfjCardData[0].id)}
						onFlip={handleCfjFlip}
						customHeight={cfjCardData[0].height}
					/>
					<FlipCard
						key={cfjCardData[1].id}
						id={cfjCardData[1].id}
						cardId={cfjCardData[1].cardId}
						frontContent={cfjCardData[1].front}
						backContent={cfjCardData[1].back}
						isFlipped={flippedCfjCards.has(cfjCardData[1].id)}
						onFlip={handleCfjFlip}
						customHeight={cfjCardData[1].height}
					/>
				</div>
				<FlipCard
					key={cfjCardData[2].id}
					id={cfjCardData[2].id}
					cardId={cfjCardData[2].cardId}
					frontContent={cfjCardData[2].front}
					backContent={cfjCardData[2].back}
					isFlipped={flippedCfjCards.has(cfjCardData[2].id)}
					onFlip={handleCfjFlip}
					customHeight={cfjCardData[2].height}
				/>
			</section>

			<section>
				<h2>Les appels à la justice pour les Inuits</h2>
				<p>
					Les témoignages livrés par les Aînés, les experts et les témoins
					inuits ainsi que par les organismes qui représentent les Inuits, tout
					comme les rapports et les résultats de recherches disponibles ont
					montré que les Inuits ont des expériences particulières et distinctes
					de l’oppression et de la violence coloniale. De plus, des témoins ont
					soulevé des sujets de préoccupation et des champs d’intervention
					prioritaires pour les femmes, les filles et les personnes 2ELGBTQIA+
					inuites qui appellent des recommandations distinctes.
				</p>
				<p>
					Les appels à la justice suivants font référence aux langues
					autochtones :
				</p>
				<p className="select-instruction">
					Sélectionnez chaque élément pour en savoir plus.
				</p>
			</section>

			<section className="card-grid cfj-card-grid">
				{cfjICardData.map((card) => (
					<FlipCard
						key={card.id}
						id={card.id}
						cardId={card.cardId}
						frontContent={card.front}
						backContent={card.back}
						isFlipped={flippedCfjICards.has(card.id)}
						onFlip={handleCfjIFlip}
						customHeight={card.height}
					/>
				))}
			</section>
			<BackToTop />
			{/* ███ fil d'Ariane ███ */}
			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("languages-fr");
					}}
				>
					&laquo;&nbsp;Retour
				</button>

				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("indigenous-languages-act");
					}}
				>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default FoundationalDocuments;
