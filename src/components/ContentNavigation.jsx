// ContentNavigation.jsx (updated)
import React from "react";
import "./ContentNavigation.css";

/* ——— helper: current <html lang=""> ——— */
const useLanguage = () => (document.documentElement.lang || "en").toLowerCase();

/* ——— one card ——— */
const NavCard = ({ number, titleHTML, id, onNavigate, isFR }) => {
	// strip any HTML for the aria-label
	const plain = titleHTML.replace(/<[^>]+>/g, "");

	return (
		<button
			className="nav-card"
			onClick={() => onNavigate?.(id)}
			aria-label={(isFR ? "Aller à " : "Navigate to ") + plain}
		>
			{/* outer circle */}
			<span className="nav-card-number" aria-hidden="true">
				{/* inner element you can move independently */}
				<span className="nav-card-number__inner">{number}</span>
			</span>

			{/* render HTML so <em> shows */}
			<p
				className="nav-card-title"
				dangerouslySetInnerHTML={{ __html: titleHTML }}
			/>
		</button>
	);
};

const ContentNavigation = ({ onNavigate, lang: langProp }) => {
	const lang = (langProp || useLanguage()).toLowerCase();
	const isFR = lang === "fr";

	const navItems = isFR
		? [
				{
					number: 2,
					titleHTML: "Objectifs d’apprentissage",
					id: "objective-fr",
				},
				{ number: 3, titleHTML: "Voix autochtones", id: "voices-fr" },
				{
					number: 4,
					titleHTML: "Les langues <br>autochtones au Canada",
					id: "languages-fr",
				},
				{
					number: 5,
					titleHTML: "Documents fondamentaux",
					id: "foundational-documents",
				},
				{
					number: 6,
					titleHTML: "<em>Loi sur les langues autochtones</em>",
					id: "indigenous-languages-act",
				},
				{
					number: 7,
					titleHTML: "Efforts pour<br> revitaliser les langues autochtones",
					id: "revitalization-efforts",
				},
				{
					number: 8,
					titleHTML: "Ce que signifie la Loi pour les fonctionnaires",
					id: "public-service",
				},
				{ number: 9, titleHTML: "Résultats d’apprentissage", id: "results-fr" },
		  ]
		: [
				{ number: 2, titleHTML: "Learning Objectives", id: "objective-en" },
				{ number: 3, titleHTML: "Indigenous Voices", id: "voices-en" },
				{
					number: 4,
					titleHTML: "Overview of Indigenous Languages",
					id: "languages-en",
				},
				{
					number: 5,
					titleHTML: "Foundational Documents",
					id: "foundational-documents",
				},
				{
					number: 6,
					titleHTML: "<em>Indigenous Languages Act</em>",
					id: "indigenous-languages-act",
				},
				{
					number: 7,
					titleHTML: "Efforts to Revitalize Indigenous Languages",
					id: "revitalization-efforts",
				},
				{
					number: 8,
					titleHTML: "What This Means for the Public Service",
					id: "public-service",
				},
				{ number: 9, titleHTML: "Learning Results", id: "results-en" },
		  ];

	return (
		<section
			className="content-navigation-container"
			aria-label={isFR ? "Sections du cours" : "Course Sections"}
		>
			<div className="content-navigation-grid">
				{navItems.map((item) => (
					<NavCard
						key={item.number}
						{...item}
						onNavigate={onNavigate}
						isFR={isFR}
					/>
				))}
			</div>
		</section>
	);
};

export default ContentNavigation;
