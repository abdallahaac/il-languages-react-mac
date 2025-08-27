import React, { useState } from "react";
import "../IntroductionPage.css"; // For shared
import "../RevitalizationEfforts.css"; // For page-specific styles
import inuk from "../../assets/inuk.svg";

import image from "../../assets/efforts.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faInfinity } from "@fortawesome/free-solid-svg-icons";
import BackToTop from "../../components/BackToTop";

const RevitalizationEfforts_fr = ({ onNavigate }) => {
	const [openSections, setOpenSections] = useState(new Set());

	const handleToggle = (sectionId) => {
		setOpenSections((prevOpen) => {
			const newOpen = new Set(prevOpen);
			if (newOpen.has(sectionId)) {
				newOpen.delete(sectionId);
			} else {
				newOpen.add(sectionId);
			}
			return newOpen;
		});
	};

	return (
		<div className="intro-wrapper revitalization-efforts-page">
			<header className="hero" role="banner">
				<img
					loading="lazy"
					src={image}
					alt=""
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">
					Efforts pour revitaliser <br /> les langues autochtones
				</h1>
			</header>
			<br />
			<br />
			<br />
			<section className="acknowledge">
				<p>
					<span className="dropcap">L</span>e ministère du Patrimoine canadien
					est le principal ministère responsable de l’administration du
					Programme des langues et cultures autochtones. Ce programme a comme
					objectifs de soutenir les efforts des peuples autochtones pour se
					réapproprier, revitaliser, maintenir et renforcer les langues et les
					cultures autochtones et de renforcer les identités culturelles
					autochtones et la participation à la société canadienne. Le Programme
					des langues et cultures autochtones comprend les initiatives qui
					suivent.
				</p>
				<ul className="program-list">
					<li>
						<strong>Volet relatif aux langues autochtones :</strong> financement
						de projets issus des communautés et destinés aux membres des
						Premières Nations, du peuple inuit et de la Nation métisse.
					</li>
					<li>
						<strong>Ententes linguistiques territoriales :</strong> soutien aux
						gouvernements territoriaux pour la prestation de services en langues
						autochtones.
					</li>
				</ul>
			</section>

			<section className="acknowledge reactions-section">
				<h2>
					Les réactions à la <em>Loi sur les langues autochtones</em>
				</h2>
				<p>
					L’Assemblée des Premières Nations, l’Inuit Tapiriit Kanatami et le
					Ralliement national des Métis ont tous collaboré à l’élaboration de la{" "}
					<em>Loi sur les langues autochtones</em>, aux côtés du ministère du
					Patrimoine canadien.
				</p>
				<p className="select-instruction">
					Cliquez sur chaque section pour en savoir plus.
				</p>

				<div className="reactions-accordion">
					{/* First Nations Section */}
					<div className="accordion-item">
						<div
							className={`icon-button ${
								openSections.has("first-nations") ? "is-open" : ""
							}`}
							role="button"
							tabIndex="0"
							aria-label="Toggle First Nations section"
							aria-expanded={openSections.has("first-nations")}
							onClick={() => handleToggle("first-nations")}
							onKeyDown={(e) =>
								(e.key === "Enter" || e.key === " ") &&
								handleToggle("first-nations")
							}
						>
							<FontAwesomeIcon icon={faFeather} size="4x" />
						</div>
						<div
							className={`info-panel ${
								openSections.has("first-nations") ? "visible" : ""
							}`}
						>
							<h4>
								Premières Nations{" "}
								<span>
									<FontAwesomeIcon icon={faFeather} />
								</span>
							</h4>
							<p>
								Dans ses commentaires formulés avant l’adoption de la Loi,
								l’ancien chef de l’Assemblée des Premières Nations (APN), Perry
								Bellegarde, a accueilli le projet de loi comme une manière de
								protéger, de promouvoir et de revitaliser les langues
								autochtones. L’APN a participé à l’élaboration de la{" "}
								<em>Loi sur les langues autochtones</em> pour s’assurer que les
								perspectives et priorités des Premières Nations y soient
								intégrées.
							</p>
							<p>
								L’APN soutient qu’il faut mettre en œuvre la{" "}
								<em>Loi sur les langues autochtones</em> dans son ensemble pour
								mettre en valeur, revitaliser, maintenir et renforcer les
								langues autochtones et les reconnaître comme un facteur
								déterminant de l’identité, de la continuité culturelle et de
								l’autodétermination des peuples autochtones.
							</p>
						</div>
					</div>

					{/* Inuit Section */}
					<div className="accordion-item">
						<div
							className={`icon-button ${
								openSections.has("inuit") ? "is-open" : ""
							}`}
							role="button"
							tabIndex="0"
							aria-label="Toggle Inuit section"
							aria-expanded={openSections.has("inuit")}
							onClick={() => handleToggle("inuit")}
							onKeyDown={(e) =>
								(e.key === "Enter" || e.key === " ") && handleToggle("inuit")
							}
						>
							<img loading="lazy" src={inuk} alt="inuk symbol" />
						</div>
						<div
							className={`info-panel ${
								openSections.has("inuit") ? "visible" : ""
							}`}
						>
							<h4>
								Peuple Inuit
								<span>
									<img loading="lazy" src={inuk} alt="inuk symbol" />
								</span>
							</h4>
							<p>
								Lorsque le projet de loi C-91 : Loi concernant les langues
								autochtones a été déposé au parlement en février 2019, plusieurs
								organisations inuites ont émis des réserves. L’Inuit Tapiriit
								Kanatami (ITK) a exprimé sa déception concernant le manque de
								contenu spécifiquement inuit. En réponse, l’organisme a déposé
								un document au Comité permanent du Patrimoine Canadien de la
								Chambre des communes décrivant les intérêts inuits dans la loi.
							</p>
							<p>
								L’ITK est composé de quatre organisations régionales, dont la
								Nunavut Tunngavik inc. (NTI), qui a également exprimé des
								inquiétudes concernant le projet de loi C-91, plus précisément
								sur le fait qu’il ne mentionne pas l’usage de l’inuktitut dans
								la prestation des programmes et services fédéraux dans la région
								de l’Inuit Nunangat. Le 21 juin 2019, quand la
								<em> Loi sur les langues autochtones</em> a reçu la sanction
								royale, les Inuit·es ont continué de soulever des
								préoccupations. La NTI a qualifié la Loi de « symbolique » et a
								souligné que l’accès aux services publics, tels que les soins de
								santé et la justice, en langues autochtones n’avait pas été
								intégré, bien que l’organisation ait clairement exprimé sa
								position concernant les amendements suggérés.
							</p>
							<p>
								L’ITK a accueilli favorablement la reconnaissance de certaines
								de ses recommandations, mais s’est aussi dit déçu que les
								réflexions n’aient pas toutes été prises en compte
							</p>
							<blockquote className="quote">
								<em>
									« Bien que l’initiative ait été qualifiée de moyen de
									réconciliation et de collaboration, le gouvernement du Canada
									a fait preuve de mauvaise foi durant l’élaboration de la loi.
									L’absence de contenu spécifique au peuple inuit suggère que ce
									projet de loi est une autre initiative législative développée
									à huis clos par un système colonial, puis imposée au peuple
									inuit. »  [Traduction]
								</em>
								<cite>
									– Natan Obed, président de l’Inuit Tapiriit Kanatami
								</cite>
							</blockquote>
						</div>
					</div>

					{/* Métis Section */}
					<div className="accordion-item">
						<div
							className={`icon-button ${
								openSections.has("metis") ? "is-open" : ""
							}`}
							role="button"
							tabIndex="0"
							aria-label="Toggle Métis section"
							aria-expanded={openSections.has("metis")}
							onClick={() => handleToggle("metis")}
							onKeyDown={(e) =>
								(e.key === "Enter" || e.key === " ") && handleToggle("metis")
							}
						>
							<FontAwesomeIcon icon={faInfinity} size="3x" />
						</div>
						<div
							className={`info-panel ${
								openSections.has("metis") ? "visible" : ""
							}`}
						>
							<h4>
								Nation métisse{" "}
								<span>
									<FontAwesomeIcon icon={faInfinity} />
								</span>
							</h4>
							<p>
								Outre l’anglais et le français, certains membres de la Nation
								métisse parlent plusieurs langues des Premières Nations ainsi
								que leur propre langue nationale, le michif.
							</p>
							<p>
								Le Ralliement national des Métis (RNM) défend l’avancement des
								intérêts de la Nation métisse au niveau national au nom de ses
								organisations membres.
							</p>
							<p>
								Le jour de l’annonce du projet de loi à la Chambre des communes
								en février 2019, le président du RNM, Clément Chartier, s’est
								dit favorable au projet de loi. L’ancienne ministre du
								Patrimoine, de la Culture et des Familles du RNM, Clara Morin
								Dal Col, a aussi vu le projet comme un pas de géant du Canada
								pour soutenir la longue lutte de la Nation métisse pour
								préserver, revitaliser et promouvoir l’usage de sa langue
								nationale propre, le michif. En 2021, le RNM a accueilli
								favorablement la nomination de Georgina Liberty à l’un des
								postes de directrice du Bureau du commissaire aux langues
								autochtones nouvellement créé, car il était important qu’il y
								ait à ce poste une personne ayant une expérience directe du
								michif et comprenant les besoins culturels de la Nation métisse.
							</p>
						</div>
					</div>
				</div>
			</section>
			<BackToTop />
			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("indigenous-languages-act");
					}}
				>
					&laquo;&nbsp;Retour
				</button>

				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("public-service");
					}}
				>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default RevitalizationEfforts_fr;
