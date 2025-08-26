import React from "react";
import image from "../assets/resource.png";

import "./resources.css";
import BackToTop from "../components/BackToTop";

const Resources = ({ onNavigate }) => {
	return (
		<div className="intro-wrapper resources-page">
			<header className="hero" role="banner">
				<img
					src={image}
					alt="Decorative image with floral elements"
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">Resources</h1>
			</header>

			<section className="resources-content">
				<ul className="res">
					<li>
						<a
							href="https://www.unesco.org/en/decades/indigenous-languages"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous Languages Decade (2022-2032) | UNESCO
						</a>
					</li>
					<li>
						<a
							href="https://www.canada.ca/en/canadian-heritage/campaigns/celebrate-indigenous-languages/international-decade.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							International Decade of Indigenous Languages
						</a>
					</li>
					<li>
						<a
							href="https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-X/2021012/98-200-X2021012-eng.cfm"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages across Canada
						</a>
					</li>
					<li>
						<a
							href="https://parks.canada.ca/culture/autochtones-indigenous/noms-de-lieux-place-names#"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous place names
						</a>
					</li>
					<li>
						<a
							href="https://maps.canada.ca/stories/storymap-en.html?lang=en&appid=acbd8457a3fa46df874351e1179ea237&appidalt=83e6463db5194c33be31f456f2cbd913"
							target="_blank"
							rel="noopener noreferrer"
						>
							Stories from the Land: Indigenous Place Names in Canada
						</a>
					</li>
					<li>
						<a
							href="https://canadiangeographic.ca/articles/mapping-indigenous-languages-in-canada/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Mapping Indigenous languages in Canada | Canadian Geographic
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/ressources-resources-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages – Canadian overview
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/dictionnaire-dictionaries-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages – Glossaries, dictionaries and writing
							resources
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/apprentissage-learning-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages – Learning and teaching resources
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/evenements-events-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages – Organizations and events
						</a>
					</li>
					<li>
						<a
							href="https://www.justice.gc.ca/eng/declaration/stories-histoires/03.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Speaking your language
						</a>
					</li>
				</ul>

				<h2>Innovation and Indigenous languages</h2>
				<ul className="res">
					<li>
						<a
							href="https://www.cbc.ca/news/canada/british-columbia/bc-indigenous-language-preservation-ai-1.6332285"
							target="_blank"
							rel="noopener noreferrer"
						>
							How AI and immersive technology are being used to revitalize
							Indigenous languages | CBC News
						</a>
					</li>
					<li>
						<a
							href="https://www.sshrc-crsh.gc.ca/funding-financement/nfrf-fnfr/stories-histoires/2023/inclusive_artificial_intelligence-intelligence_artificielle_inclusive-eng.aspx"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous-Led AI: How Indigenous Knowledge Systems Could Push AI
							to be More Inclusive
						</a>
					</li>
					<li>
						<a
							href="https://mila.quebec/en/ai4humanity/applied-projects/first-languages-ai-reality"
							target="_blank"
							rel="noopener noreferrer"
						>
							First Languages AI Reality | Mila
						</a>
					</li>
				</ul>
			</section>
			<BackToTop />
			{/* Breadcrumb / Navigation */}
			<nav className="breadcrumb" aria-label="Navigation ">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("knowledge-check");
					}}
				>
					&laquo;&nbsp;Back
				</button>

				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("home");
					}}
				>
					Home&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default Resources;
