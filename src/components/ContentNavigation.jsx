import React from "react";
import "./ContentNavigation.css";

/* ——— helper: current <html lang=""> ——— */
const useLanguage = () => (document.documentElement.lang || "en").toLowerCase();

/* ——— one card ——— */
const NavCard = ({
	number,
	titleHTML, // string that may include <em>
	id,
	onNavigate,
	isFR,
}) => {
	// strip any HTML for the aria-label
	const plain = titleHTML.replace(/<[^>]+>/g, "");

	return (
		<button
			className="nav-card"
			onClick={() => onNavigate?.(id)}
			aria-label={(isFR ? "Aller à " : "Navigate to ") + plain}
		>
			<span className="nav-card-number">{number}</span>
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
					titleHTML: "Documents fondamentaux",
					id: "foundational-documents",
				},
				{
					number: 3,
					// — highlight —
					titleHTML: "<em>Loi sur les langues autochtones</em>",
					id: "indigenous-languages-act",
				},
				{
					number: 4,
					titleHTML: "Efforts pour revitaliser les langues autochtones",
					id: "revitalization-efforts",
				},
				{
					number: 5,
					titleHTML: "Ce que signifie la Loi pour les fonctionnaires",
					id: "public-service",
				},
		  ]
		: [
				{
					number: 2,
					titleHTML: "Foundational Documents",
					id: "foundational-documents",
				},
				{
					number: 3,
					// — highlight —
					titleHTML: "<em>Indigenous Languages Act</em>",
					id: "indigenous-languages-act",
				},
				{
					number: 4,
					titleHTML: "Efforts to revitalize Indigenous languages",
					id: "revitalization-efforts",
				},
				{
					number: 5,
					titleHTML: "What this means for the public service",
					id: "public-service",
				},
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
