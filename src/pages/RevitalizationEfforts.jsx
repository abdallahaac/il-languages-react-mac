import React, { useState } from "react";
import "./IntroductionPage.css"; // For shared
import "./RevitalizationEfforts.css"; // For page-specific styles
import inuk from "../assets/inuk.svg";

import image from "../assets/efforts.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faInfinity } from "@fortawesome/free-solid-svg-icons";
import BackToTop from "../components/BackToTop";

import { getHeroURL } from "../prefetchHeroes";

const RevitalizationEfforts = ({ onNavigate }) => {
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
					Efforts to Revitalize Indigenous Languages
				</h1>
			</header>
			<br />
			<br />
			<br />
			<section className="acknowledge">
				<p>
					<span className="dropcap">T</span>he Department of Canadian Heritage
					(PCH) is the lead department responsible for administering the
					Indigenous Languages and Cultures Program. The program’s objectives
					are to support the efforts of Indigenous Peoples to reclaim,
					revitalize, maintain and strengthen Indigenous languages and cultures,
					and to strengthen Indigenous cultural identities and participation in
					Canadian society. The Indigenous Languages and Cultures Program is
					comprised of the following:
				</p>
				<ul className="program-list">
					<li>
						<strong>Indigenous Languages Component:</strong> Project funding for
						community-driven activities for First Nations, Inuit, and Métis
						language projects.
					</li>
					<li>
						<strong>Territorial Languages Agreements:</strong> Support
						territorial governments in the delivery of services in Indigenous
						languages.
					</li>
				</ul>
			</section>

			<section className="acknowledge reactions-section">
				<h2>
					Reactions to the <em>Indigenous Languages Act</em>
				</h2>
				<p>
					The Assembly of First Nations (AFN), Inuit Tapiriit Kanatami (ITK),
					and Métis National Council (MNC) all participated in the
					co-development of the <em>Indigenous Languages Act</em> along with the
					Department of Canadian Heritage.
				</p>
				<p className="select-instruction">
					Click on each section to learn more.
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
								First Nations{" "}
								<span>
									<FontAwesomeIcon icon={faFeather} />
								</span>
							</h4>
							<p>
								In remarks made prior to the passing of the legislation, former
								Assembly of First Nations (AFN) National Chief Perry Bellegarde
								welcomed the bill as a way to protect, promote and revitalize
								First Nations’ languages. The AFN participated in the
								co-development of the <em>Indigenous Languages Act</em> to
								ensure that First Nations’ perspectives and priorities would be
								included in the legislation.
							</p>
							<p>
								The AFN maintains that the full implementation of the{" "}
								<em>Indigenous Languages Act</em> is required to ensure the
								reclamation, revitalization, maintenance, and strengthening of
								Indigenous languages and their recognition as a vital factor for
								Indigenous cultural continuity, identity, and
								self-determination.
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
								Inuit
								<span>
									<img loading="lazy" src={inuk} alt="inuk symbol" />
								</span>
							</h4>
							<p>
								When Bill C-91: An Act Respecting Indigenous Languages was
								tabled in Parliament in February 2019, several Inuit
								organizations raised concerns about the legislation. Inuit
								Tapiriit Kanatami (ITK) expressed disappointment over the lack
								of Inuit-specific content. In response, ITK submitted a
								discussion paper to the House of Commons Standing Committee
								outlining Inuit interests in the legislation.
							</p>
							<p>
								ITK is composed of four regional organizations, including
								Nunavut Tunngavik Inc., which also expressed concerns about Bill
								C-91 and how it bypassed the use of Inuktut in the delivery of
								federal programs and services in Inuit Nunangat. On June 21,
								2019, when the <em>Indigenous Languages Act</em> received Royal
								Assent, Inuit continued to express their concerns. Nunavut
								Tunngavik Inc. called the Act “symbolic” in nature and said
								access to public services, such as health care or justice, in
								Indigenous languages was not addressed, despite their having
								made their position on suggested amendments clear.
							</p>
							<p>
								Inuit Tapiriit Kanatami welcomed the acknowledgement of some of
								their recommendations but also expressed disappointment that not
								all of their considerations were put forth.
							</p>
							<blockquote className="quote">
								<em>
									"Despite being characterized as a reconciliation and
									co-development initiative, the Government of Canada engaged
									Inuit in bad faith throughout this legislative initiative. The
									absence of any Inuit-specific content suggests this bill is
									yet another legislative initiative developed behind closed
									doors by a colonial system and then imposed on Inuit.”
								</em>
								<cite>– Natan Obed, President of Inuit Tapiriit Kanatami</cite>
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
								Métis Nation{" "}
								<span>
									<FontAwesomeIcon icon={faInfinity} />
								</span>
							</h4>
							<p>
								In addition to English and French, some Métis Nation citizens
								speak a number of First Nations languages as well as their own
								unique national language, Michif.
							</p>
							<p>
								The Métis National Council (MNC) advocates for the advancements
								of Métis interests at the national level on behalf of its
								governing members.
							</p>
							<p>
								On the day the legislation was announced in the House of Commons
								in February 2019, then-MNC President Clément Chartier spoke
								positively about the bill. Former MNC Minister of Heritage,
								Culture and Families, Clara Morin Dal Col, also saw the bill as
								a giant first step in Canada's support for the Métis’
								longstanding struggle to preserve, revitalize and promote the
								use of their own unique national language, Michif. In 2021, the
								MNC welcomed the appointment of Georgina Liberty, one of the
								directors of the newly created Office of the Commissioner of
								Indigenous Languages, as it was important to have a citizen with
								direct experience of Michif and understanding of Métis cultural
								needs.
							</p>
						</div>
					</div>
				</div>
			</section>

			<BackToTop />
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("indigenous-languages-act")}>
					&laquo;&nbsp;Back
				</button>
				<button onClick={() => onNavigate?.("public-service")}>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default RevitalizationEfforts;
