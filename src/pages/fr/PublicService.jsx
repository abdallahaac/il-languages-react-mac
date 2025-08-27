import React, { useState } from "react";
import "../IntroductionPage.css"; // For shared styles
import "../PublicService.css"; // For page-specific styles
import image from "../../assets/what.png";
import BackToTop from "../../components/BackToTop";

import { getHeroURL } from "../../prefetchHeroes";

const PublicService_fr = ({ onNavigate }) => {
	// State for the sign language accordion
	const [openSignLanguage, setOpenSignLanguage] = useState(null);
	// State for the video transcript
	const [showTranscript, setShowTranscript] = useState(false);

	// Handler for the sign language accordion
	const handleSignLanguageToggle = (sectionId) => {
		setOpenSignLanguage((prev) => (prev === sectionId ? null : sectionId));
	};

	return (
		<div className="intro-wrapper public-service-page">
			<header className="hero" role="banner">
				<img
					loading="lazy"
					src={image}
					alt=""
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">
					Ce que signifie la Loi pour les fonctionnaires
				</h1>
			</header>

			<section className="acknowledge">
				<h2>Rôle de toutes les organisations fédérales</h2>
				<h3>Services en langues autochtones</h3>
				<p>
					<span className="dropcap">L</span>’un des éléments clés de la Loi
					concerne la manière dont les fonctionnaires donnent accès aux services
					dans les langues autochtones. Les organisations fédérales peuvent
					désormais offrir des services dans une langue autochtone si elles en
					ont la capacité et s’il y a une demande pour de tels services. Cette
					approche discrétionnaire à l’offre de services est différente de celle
					applicable aux langues officielles (le français et l’anglais), qui
					sont exigées par la loi. La <em>Loi sur les langues autochtones</em>{" "}
					ne garantit pas les services en langue autochtone comme la Loi sur les
					langues officielles garantit les services en français et en anglais.
				</p>

				<h3>Bureau du commissaire aux langues autochtones</h3>
				<p>
					Suite à l’adoption de la Loi, le Bureau du commissaire aux langues
					autochtones a été créée. En juin 2021, Ronald E. Ignace est devenu le
					premier commissaire aux langues autochtones, aux côtés de deux
					directrices et d’un directeur : Georgina Liberty, Joan Greyeyes et
					Robert Watt.
				</p>

				<h3>Traduction et interprétation</h3>
				<p>
					La Loi accorde également aux organisations fédérales un pouvoir
					discrétionnaire pour ce qui est de fournir des services
					d’interprétation et de traduction en langue autochtone pour les
					activités et les documents sous leur gouverne.
				</p>

				<blockquote className="quote indigenous-lang">
					<em>
						"Le7 pyin te sitq̓t te swumécwilcstem re qweqwelténs re xwexwéyt te
						qelmúcw wel me7 yews. Ta7 me7 scú7tsems re snecwentém re
						qweqweltén-kt re sts̓eléwt.s ne swet.s k smenmenúl̓ecws ne7élye ne
						tmicw-kt. Tikwemtús me7 sucwentwécwmentem re qweqweltén-kt”
					</em>
				</blockquote>
				<blockquote className="quote">
					<em>
						« Nous célébrons ce jour où nous donnons un nouveau souffle à toutes
						nos langues autochtones pour l’avenir. Nos langues ne seront plus
						dans l’ombre des autres langues ici, sur notre territoire. Puissions
						nous toujours rendre hommage à nos langues autochtones. »
					</em>
					<cite>
						– Ronald E. Ignace, commissaire aux langues autochtones, locuteur du
						secwepemctsin, la langue des Shuswap [ˈʃuːʃwɑːp], Première Nation
						résidant en Colombie-Britannique
					</cite>
				</blockquote>
				<p>
					Le BCLA est une organisation indépendante du gouvernement fédéral. Son
					objectif général est de contribuer à la promotion des langues
					autochtones et d’appuyer les efforts des peuples autochtones pour se
					réapproprier, revitaliser, renforcer et maintenir leurs langues. Créé
					pour répondre à l’appel à l’action 15 de la Commission de vérité et
					réconciliation, le BCLA a pour mandat de faire ce qui suit :
				</p>
				<ul>
					<li>contribuer à la promotion des langues autochtones</li>
					<li>
						soutenir les peuples autochtones dans leurs efforts visant à se
						réapproprier les langues autochtones et à les revitaliser, les
						maintenir et les renforcer
					</li>
					<li>
						faciliter le règlement de différends et examiner les plaintes, dans
						la mesure prévue par la <em>Loi sur les langues autochtones</em>
					</li>
					<li>
						promouvoir la sensibilisation du public à la richesse et à la
						diversité des langues autochtones
					</li>
					<li>
						appuyer des projets novateurs et l’utilisation de nouvelles
						technologies dans le cadre de l’enseignement et de la revitalisation
						des langues autochtones
					</li>
				</ul>
				<p>
					Les autres responsabilités et fonctions du BCLA comprennent entre
					autres les suivantes :
				</p>
				<ul>
					<li>
						la production d’un rapport annuel portant notamment sur l’usage et
						la vitalité des langues autochtones, les besoins des groupes et des
						organisations autochtones, la suffisance du financement et
						l’application de la Loi.{" "}
						<a
							id="link"
							target="_blank"
							rel="noopener noreferrer"
							href="https://commissionforindigenouslanguages.ca/fr/a-propos-de-nous/rapports"
						>
							Rapports annuels du Bureau du commissaire aux langues autochtones
							(commissionforindigenouslanguages.ca)
						</a>
					</li>
					<li>
						le soutien à l’innovation et à la recherche, et l’utilisation de
						nouvelles technologies en lien avec les langues autochtones
					</li>
					<li>
						l’offre de services adaptés culturellement, dont la médiation, pour
						faciliter la résolution des différends et l’examen des plaintes
					</li>
					<li>
						l’organisation d’activités de mobilisation et de sensibilisation
					</li>
				</ul>
				<p>
					Le BCLA est en lien avec un nombre croissant de ministères et
					organismes fédéraux afin de connaître les mesures qu’ils prennent pour
					mettre en œuvre la Loi. Il inclut ces renseignements dans son rapport
					annuel.
				</p>
				<p>
					(Lien GC){" "}
					<a
						href="https://www.canada.ca/fr/services/culture/identite-canadienne-societe/langues/autochtones/commissaire.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Bureau du commissaire aux langues autochtones – Canada.ca
					</a>
				</p>
			</section>

			<section className="acknowledge">
				<h2>Façons dont les fonctionnaires peuvent appuyer la Loi</h2>
				<p>
					Voici quelques moyens qui permettent aux employés de la fonction
					publique de soutenir les objectifs de la{" "}
					<em>Loi sur les langues autochtones</em> :
				</p>
				<div className="ways-grid">
					<div className="way-item">
						<h3>1) Promotion des langues autochtones</h3>
						<p>
							Réfléchissez à la façon dont vous pourriez encourager la promotion
							des langues autochtones dans votre secteur d’activité.
						</p>
					</div>
					<div className="way-item">
						<h3>2) Accès aux services en langues autochtones</h3>
						<p>
							Pensez aux façons d’offrir des services dans les langues
							autochtones, en temps et lieu opportuns. Réfléchissez aux types de
							services pour lesquels les langues autochtones pourraient être
							offertes.
						</p>
					</div>
					<div className="way-item">
						<h3>3) Traduction de documents en langues autochtones</h3>
						<p>
							Tout document relevant d’une organisation fédérale peut être
							traduit dans une langue autochtone. Pensez à votre travail et
							demandez-vous si certains documents importants auraient avantage à
							être traduits dans des langues autochtones. Plusieurs
							organisations fédérales ont déjà pris l’initiative de le faire. Le
							secteur des communications de votre organisation pourrait aussi
							être en mesure de cibler les éléments d’information destinés à la
							population qui pourraient être traduits en langue autochtone.
						</p>
						<p>Voici quelques bons exemples à cet égard :</p>
						<ul className="best-practices-list">
							<li>
								Justice Canada a traduit la Déclaration des Nations Unies sur
								les droits des peuples autochtones. Visitez la page{" "}
								<a
									href="https://www.justice.gc.ca/fra/declaration/lire-read.html"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Consultez la Déclaration des Nations Unies dans son intégralité"
								>
									Consultez la Déclaration
								</a>
								.
							</li>
							<li>
								Ressources naturelles Canada a créé une{" "}
								<a
									href="https://www.canada.ca/fr/ressources-naturelles-canada/nouvelles/2019/06/une-carte-interactive-met-a-lhonneur-les-noms-de-lieux-autochtones-au-canada.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									carte interactive qui met à l’honneur les noms de lieux
									autochtones au Canada
								</a>{" "}
								et les{" "}
								<a
									href="https://ressources-naturelles.canada.ca/donnees-sur-les-noms-de-lieux-autochtones/24318"
									target="_blank"
									rel="noopener noreferrer"
								>
									Données sur les noms de lieux autochtones
								</a>
								.
							</li>
							<li>
								Parcs Canada a traduit sa charte en plusieurs langues
								autochtones. Visitez la{" "}
								<a
									href="https://parcs.canada.ca/agence-agency/mandat-mandate/charte-charter"
									target="_blank"
									rel="noopener noreferrer"
								>
									Charte de Parcs Canada
								</a>
								.
							</li>
						</ul>
					</div>
					<div className="way-item">
						<h3>4) Interprétation en langues autochtones</h3>
						<p>
							Les organismes fédéraux peuvent fournir des services
							d’interprétation dans une langue autochtone. Réfléchissez aux
							façons de faciliter l’usage d’une langue autochtone dans le cadre
							des activités, des programmes et de la prestation de services de
							votre organisation. Par exemple, si votre organisation tient une
							conférence et invite des aîné·es autochtones qui souhaitent
							s’exprimer dans leur langue, ce peut être une occasion de recourir
							à des services d’interprétation.
						</p>
					</div>
					<div className="way-item">
						<h3>5) Acquisition de compétences culturelles</h3>
						<p>
							La compétence culturelle fait partie intégrante du processus pour
							apprendre à travailler avec les peuples autochtones. Les
							fonctionnaires devraient avoir conscience du respect à accorder
							aux langues autochtones. Comme mentionné, il y a une longue
							histoire de négligence et d’éradication intentionnelle des langues
							autochtones. Il faut garder en tête que les Autochtones et les
							fonctionnaires autochtones ne savent pas tous et toutes parler ou
							écrire leur langue et que les niveaux de maîtrise varient
							beaucoup.
						</p>
					</div>
					<div className="way-item">
						<h3>6) Utilisation des langues des signes autochtones</h3>
						<p>
							Pensez aux façons de soutenir et de promouvoir l’usage des langues
							autochtones au travail, y compris par les langues des signes
							autochtones. Les responsables de l’embauche devraient savoir que
							les personnes autochtones sourdes ou malentendantes peuvent avoir
							besoin de mesures ou d’accommodements particuliers. Comprendre
							qu’il y a plusieurs langues des signes autochtones constitue la
							première étape. C’est un geste de réconciliation important qui
							aide les personnes autochtones à conserver le lien avec leur
							patrimoine.
						</p>
					</div>
				</div>
			</section>

			<section className="acknowledge sign-language-section">
				<h2>Langues des signes autochtones</h2>
				<p className="select-instruction">
					Cliquez sur chaque section pour en savoir plus.
				</p>
				<div className="sign-language-accordion">
					<div className="sign-language-item">
						<button
							className="sign-language-button"
							aria-expanded={openSignLanguage === "pisl"}
							onClick={() => handleSignLanguageToggle("pisl")}
						>
							La langue des signes des Autochtones des Plaines
						</button>
						<div
							className={`sign-language-panel ${
								openSignLanguage === "pisl" ? "visible" : ""
							}`}
						>
							<p>
								La langue des signes des Autochtones des Plaines (LSAP) est la
								langue des signes autochtone la plus étudiée. Il y a aussi la
								langue des signes oneida que sont en train d’élaborer les
								membres de la communauté des Oneidas, située sur le territoire
								iroquois dans le Sud-Ouest de l’Ontario. Cette langue des signes
								autochtone suit les règles de la LSAP et les sons de la langue
								oneida.
							</p>
						</div>
					</div>
					<div className="sign-language-item">
						<button
							className="sign-language-button"
							aria-expanded={openSignLanguage === "iur"}
							onClick={() => handleSignLanguageToggle("iur")}
						>
							Inuit Uukturausingit
						</button>
						<div
							className={`sign-language-panel ${
								openSignLanguage === "iur" ? "visible" : ""
							}`}
						>
							<p>
								La langue des signes inuite, aussi connue sous le nom d’Inuit
								Uukturausingit (IUR), est utilisée depuis longtemps par les
								Inuit·es, particulièrement au Nunavut, comme outil de
								communication des personnes inuites sourdes et de leur famille.
								L’Inuit Uukturausingit est nécessaire pour l’inclusion des
								personnes sourdes, et des efforts sont en cours pour préserver
								la langue des signes inuite.
							</p>
						</div>
					</div>
					<div className="sign-language-item">
						<button
							className="sign-language-button"
							aria-expanded={openSignLanguage === "msl"}
							onClick={() => handleSignLanguageToggle("msl")}
						>
							La langue des signes michif
						</button>
						<div
							className={`sign-language-panel ${
								openSignLanguage === "msl" ? "visible" : ""
							}`}
						>
							<p>
								Le michif est parlé uniquement par les membres de la Nation
								métisse et se décline en plusieurs dialectes et langues des
								signes. Toutefois, il existe peu de connaissances sur la langue
								des signes michif. Cela peut être dû au fait que les langues des
								signes autochtones font partie des formes de communication les
								plus en danger de disparition au Canada. Peu de linguistes leur
								ont donné la même attention qu’aux langues autochtones parlées.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="acknowledge video-section">
				<h2>Vidéo sur la langue des signes avec Paula et Colleen</h2>
				<p>
					Cette vidéo présente un exemple de la diversité des langues
					autochtones parlées au Canada. Écoutez d’abord Colleen Charlette,
					débutante dans l’apprentissage de la langue crie, prononcer des mots
					en langue des Cris des Plaines. Ensuite, regardez Paula MacDonald, qui
					s’exprime en langue des signes, signer le mot correspondant en langue
					des signes des Plaines, créant ainsi une expérience unique et
					instructive. Les deux femmes sont fières d’être Autochtones. Nous
					espérons que vous aimerez la vidéo et que vous utiliserez au quotidien
					certains des mots que vous y apprendrez.
				</p>
				<div className="video-container">
					<iframe
						title="Vidéo sur la langue des signes autochtone"
						width="560"
						height="315"
						src="https://media.csps-efpc.gc.ca/V/Video?v=1072267&node=5722944&a=48737408&preload=false"
						frameBorder="1"
						allowFullScreen
					></iframe>
					<button
						className="transcript-toggle-btn"
						onClick={() => setShowTranscript(!showTranscript)}
						aria-expanded={showTranscript}
					>
						{showTranscript
							? "Masquer la transcription"
							: "Afficher la transcription"}
					</button>
					{showTranscript && (
						<div className="transcript-content">
							<p>Je m’appelle Colleen. Je suis Cree.</p>
							<p>
								[0:01 – 0:04 Un texte apparaît à l'écran : Colleen Charlette]
							</p>
							<p>Bonjour, je m’appelle Paula (mon nom en signes).</p>
							<p>[0:07 – 0:10 Un texte apparaît à l'écran : Paula Macdonald]</p>
							<p>
								[0:14 – 0:24 Un texte apparaît à l'écran : tânisi. Bonjour,
								comment allez-vous ?]
							</p>
							<p>tânisi</p>
							<p>
								[0:24 – 0:36 Un texte apparaît à l'écran : namôya nânitaw. Je
								vais bien]
							</p>
							<p>namôya nânitaw</p>
							<p>
								[0:37 – 0:51 Un texte apparaît à l'écran : âstam. Venez ici]
							</p>
							<p>âstam</p>
							<p>[0:52 – 1:03 Un texte apparaît à l'écran : api. S'asseoir]</p>
							<p>api</p>
							<p>
								[1:03 – 1:15 Un texte apparaît à l'écran : miywâsin. Superbe]
							</p>
							<p>miywâsin</p>
							<p>[1:16 – 1:26 Un texte apparaît à l'écran : âha. Oui]</p>
							<p>âha</p>
							<p>[1:27 – 1:38 Un texte apparaît à l'écran : namôya. Non]</p>
							<p>namôya</p>
							<p>
								[1:39 – 1:51 Un texte apparaît à l'écran : kinanâskomitin.
								Merci]
							</p>
							<p>kinanâskomitin</p>
							<p>
								[1:52 – 2:04 Un texte apparaît à l'écran : mwêstas. À plus tard]
							</p>
							<p>mwêstas</p>
							<p>
								[2:05 – 2:15 Le logo de l'EFPC apparaît à l'écran. Un texte
								apparaît à l'écran : canada.ca/ecole. Le logo du gouvernement du
								Canada apparaît à l'écran.]
							</p>
						</div>
					)}
				</div>
				<p className="art">
					Article:{" "}
					<a
						href="https://ici.radio-canada.ca/nouvelle/1308461/langage-autochtones-premieres-nations-ouest-oneida-inuit-plaines"
						target="_blank"
						rel="noopener noreferrer"
					>
						Faire revivre les langues des signes autochtones | La Décennie
						internationale des langues autochtones | Radio-Canada
					</a>
				</p>
			</section>
			<BackToTop />

			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("revitalization-efforts");
					}}
				>
					&laquo;&nbsp;Retour
				</button>

				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("results-fr");
					}}
				>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default PublicService_fr;
