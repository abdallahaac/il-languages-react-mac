import React, { useState, useEffect } from "react";
import "../IndigenousLanguagesAct.css";
import image from "../../assets/ila.png";
import BackToTop from "../../components/BackToTop";

import { getHeroURL } from "../../prefetchHeroes";

// Custom hook to get the current language from the <html> tag
const useLanguage = () => {
	const [lang, setLang] = useState("en"); // Default to English

	useEffect(() => {
		// Observer to watch for changes on the lang attribute of the html element
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "lang"
				) {
					setLang(mutation.target.lang);
				}
			});
		});

		// Start observing
		observer.observe(document.documentElement, {
			attributes: true,
		});

		// Set initial language
		setLang(document.documentElement.lang || "en");

		// Cleanup observer on component unmount
		return () => observer.disconnect();
	}, []);

	return lang;
};

// --- Content Objects ---

const content_en = {
	title: "Indigenous Languages Act",
	sections: [
		{
			type: "main",
			content: `On June 21, 2019, the <em>Indigenous Languages Act</em> received Royal Assent, with the overall purpose of supporting the efforts of Indigenous Peoples to reclaim, revitalize, maintain and strengthen Indigenous languages. The Act responds to Calls to Action 13, 14 and 15 of the Truth and Reconciliation Commission of Canada, and was developed with First Nations, Inuit, and Métis following extensive engagement and collaborative development work. The Indigenous Languages Act recognizes and supports all Indigenous languages in Canada and key elements are:`,
			list: [
				"Support and promote the use of Indigenous languages, including Indigenous sign languages.",
				"Support the efforts of Indigenous peoples to reclaim, revitalize, maintain, and strengthen Indigenous languages.",
				"Establish a framework to facilitate the effective exercise of the rights of Indigenous peoples that relate to Indigenous languages, including through agreements or arrangements referred to in sections 8 and 9.",
				"Establish measures to facilitate the provision of adequate, sustainable, and long-term funding for the reclamation, revitalization, maintenance, and strengthening of Indigenous languages.",
				"Facilitate cooperation with provincial and territorial governments, Indigenous governments and other Indigenous governing bodies, Indigenous organizations, and other entities in a manner consistent with the rights of Indigenous peoples and the powers and jurisdictions of Indigenous governing bodies and of the provinces and territories.",
				"Facilitate meaningful opportunities for Indigenous governments, other Indigenous governing bodies, and Indigenous organizations to collaborate in policy development related to the implementation of this Act.",
				"Enable federal institutions to provide access to services in Indigenous languages where capacity and demand exist.",
			],
		},
		{
			heading: "Preamble and purpose of the Indigenous Languages Act",
			paragraphs: [
				"Preambles to legislation help explain the general objectives of a law. In the case of the <em>Indigenous Languages Act</em>, the preamble mentions the important objective of reclaiming, revitalizing, maintaining and strengthening Indigenous languages. This objective is linked to reconciliation between the Government of Canada and Indigenous Peoples, which includes consideration of the TRC Calls to Action and the UN Declaration.",
				"The preamble also acknowledges that the history of discrimination in Canada has contributed to the decline of Indigenous languages and that there is an urgent need to support their revitalization. One key aspect of the preamble mentions that it is Indigenous Peoples who are best positioned to revitalize Indigenous languages, while underscoring the important role played by the Government of Canada in supporting and promoting this and other objectives of the Act.",
			],
		},
		{
			heading: "Section 35 of the Constitution Act, 1982",
			paragraphs: [
				`The Constitution is the <a href="https://www.justice.gc.ca/eng/csj-sjc/rfc-dlc/ccrf-ccdl/check/art521.html" target="_blank">supreme law</a> of Canada. <a href="https://laws-lois.justice.gc.ca/eng/const/page-12.html#h-55" target="_blank">Section 35 of the Constitution Act, 1982</a>, affirms “aboriginal and treaty rights” and defines “Aboriginal peoples of Canada” as including First Nations, Inuit, and Métis. The <em>Indigenous Languages Act</em> recognizes rights related to Indigenous languages as being part of the aboriginal and treaty rights recognized and affirmed in the Constitution. The <em>Indigenous Languages Act</em> is the first legislation to recognize this; however, unlike English and French, Indigenous languages are not recognized as official languages of Canada.`,
			],
		},
		{
			heading: "Department of Canadian Heritage Roles and Responsibilities",
			paragraphs: [
				"The Minister of Canadian Heritage has been mandated to fully implement the Act as a means to preserve, promote and revitalize Indigenous languages in Canada, with long-term predictable and adequate funding to do so.",
				`<a href="https://www.canada.ca/en/services/culture/canadian-identity-society/languages/indigenous.htmll" target="_blank" rel="noopener noreferrer" class="underline-purple">GC Link: Indigenous languages – Canada.ca</a>`,
			],
		},
	],
};

const content_fr = {
	title: "Loi sur les langues autochtones",
	sections: [
		{
			type: "main",
			content: `Le 21 juin 2019, la <a href="https://laws-lois.justice.gc.ca/fra/lois/i-7.85/page-1.html" target="_blank"><em>Loi sur les langues autochtones</em></a> a reçu la sanction royale. Son objectif général est de soutenir les efforts des peuples autochtones pour se réapproprier, revitaliser, maintenir et renforcer les langues autochtones. La Loi répond aux appels à l'action 13, 14 et 15 de la Commission de vérité et réconciliation du Canada et a été élaborée avec les Premières Nations, les Inuits et les Métis à la suite d'un engagement approfondi et d'un travail de développement collaboratif. La Loi sur les langues autochtones reconnaît et soutient toutes les langues autochtones au Canada et ses éléments clés sont :`,
			list: [
				"Soutenir et promouvoir l'utilisation des langues autochtones, y compris les langues des signes autochtones.",
				"Soutenir les efforts des peuples autochtones pour se réapproprier, revitaliser, maintenir et renforcer les langues autochtones.",
				"Établir un cadre pour faciliter l'exercice efficace des droits des peuples autochtones relatifs aux langues autochtones, y compris par le biais d'accords ou d'arrangements visés aux articles 8 et 9.",
				"Établir des mesures pour faciliter l'octroi d'un financement adéquat, durable et à long terme pour la réappropriation, la revitalisation, le maintien et le renforcement des langues autochtones.",
				"Faciliter la coopération avec les gouvernements provinciaux et territoriaux, les gouvernements autochtones et autres organes directeurs autochtones, les organisations autochtones et d'autres entités d'une manière compatible avec les droits des peuples autochtones et les pouvoirs et compétences des organes directeurs autochtones et des provinces et territoires.",
				"Faciliter des occasions significatives pour les gouvernements autochtones, les autres organes directeurs autochtones et les organisations autochtones de collaborer à l'élaboration de politiques liées à la mise en œuvre de cette loi.",
				"Permettre aux institutions fédérales de fournir un accès aux services en langues autochtones là où la capacité et la demande existent.",
			],
		},
		{
			heading: "Préambule et objet de la Loi sur les langues autochtones",
			paragraphs: [
				"Les préambules des lois aident à expliquer les objectifs généraux d'une loi. Dans le cas de la <em>Loi sur les langues autochtones</em>, le préambule mentionne l'objectif important de se réapproprier, de revitaliser, de maintenir et de renforcer les langues autochtones. Cet objectif est lié à la réconciliation entre le gouvernement du Canada et les peuples autochtones, qui comprend la prise en compte des appels à l'action de la CVR et de la Déclaration des Nations Unies.",
				"Le préambule reconnaît également que l'histoire de la discrimination au Canada a contribué au déclin des langues autochtones et qu'il est urgent de soutenir leur revitalisation. Un aspect clé du préambule mentionne que ce sont les peuples autochtones qui sont les mieux placés pour revitaliser les langues autochtones, tout en soulignant le rôle important joué par le gouvernement du Canada pour soutenir et promouvoir cet objectif et d'autres objectifs de la Loi.",
			],
		},
		{
			heading: "Article 35 de la Loi constitutionnelle de 1982",
			paragraphs: [
				`La Constitution est la <a href="https://www.justice.gc.ca/fra/sjc-csj/dlc-rfc/ccdl-ccrf/check/art521.html" target="_blank">loi suprême</a> du Canada. L'<a href="https://laws-lois.justice.gc.ca/fra/const/page-12.html#h-55" target="_blank">article 35 de la Loi constitutionnelle de 1982</a> affirme les « droits ancestraux et issus de traités » et définit les « peuples autochtones du Canada » comme incluant les Premières Nations, les Inuits et les Métis. La <em>Loi sur les langues autochtones</em> reconnaît que les droits relatifs aux langues autochtones font partie des droits ancestraux et issus de traités reconnus et confirmés dans la Constitution. La <em>Loi sur les langues autochtones</em> est la première loi à le reconnaître; cependant, contrairement à l'anglais et au français, les langues autochtones ne sont pas reconnues comme langues officielles du Canada.`,
			],
		},
		{
			heading: "Rôles et responsabilités du ministère du Patrimoine canadien",
			paragraphs: [
				"Le ministre du Patrimoine canadien a été chargé de mettre pleinement en œuvre la Loi comme moyen de préserver, de promouvoir et de revitaliser les langues autochtones au Canada, avec un financement prévisible, adéquat et à long terme pour ce faire.",
				`<a href="https://www.canada.ca/fr/services/culture/identite-canadienne-societe/langues/autochtones.html" target="_blank" rel="noopener noreferrer" class="underline-purple">Lien GC : Langues autochtones – Canada.ca</a>`,
			],
		},
	],
};

const IndigenousLanguagesAct = ({ onNavigate }) => {
	const lang = useLanguage();
	const content = lang === "fr" ? content_fr : content_en;

	return (
		<div className="intro-wrapper ila-page">
			<header className="hero" role="banner">
				<img
					src={image}
					alt="Decorative image related to the Indigenous Languages Act"
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">
					<em dangerouslySetInnerHTML={{ __html: content.title }} />
				</h1>
			</header>

			{content.sections.map((section, index) => (
				<section key={index} className="acknowledge">
					{section.heading && (
						<h2 dangerouslySetInnerHTML={{ __html: section.heading }} />
					)}

					{section.type === "main" && (
						<p>
							<span className="dropcap">{section.content.charAt(0)}</span>
							<span
								dangerouslySetInnerHTML={{
									__html: section.content.substring(1),
								}}
							/>
						</p>
					)}

					{section.paragraphs &&
						section.paragraphs.map((p, pIndex) => (
							<p key={pIndex} dangerouslySetInnerHTML={{ __html: p }} />
						))}

					{section.list && (
						<ul>
							{section.list.map((item, lIndex) => (
								<li key={lIndex} dangerouslySetInnerHTML={{ __html: item }} />
							))}
						</ul>
					)}
				</section>
			))}
			<BackToTop />
			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("foundational-documents");
					}}
				>
					&laquo;&nbsp;Retour
				</button>

				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("revitalization-efforts");
					}}
				>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default IndigenousLanguagesAct;
