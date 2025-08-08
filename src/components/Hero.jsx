import React, { useEffect, useState } from "react";
import "./Hero.css";

/* ── helper hook: keep an eye on <html lang=""> ──────────────── */
const useLanguage = () => {
	const [lang, setLang] = useState(
		(document.documentElement.lang || "en").toLowerCase()
	);

	useEffect(() => {
		const obs = new MutationObserver((m) => {
			m.forEach((mu) => {
				if (mu.type === "attributes" && mu.attributeName === "lang") {
					setLang((mu.target.lang || "en").toLowerCase());
				}
			});
		});
		obs.observe(document.documentElement, { attributes: true });
		return () => obs.disconnect();
	}, []);

	return lang;
};

/* ── copy of your bilingual strings ──────────────────────────── */
const content = {
	en: {
		heroTitle: "Revitalizing Voices",
		heroSubtitle: "Navigating the <em>Indigenous Languages Act</em>",
		introCardTitle: "Introduction and overview",
		introCardAria: "Navigate to Introduction and overview",
		introCardText:
			"Language is the foundation of a culture. For Indigenous oral societies, words hold knowledge amassed for millennia. A language holds the stories, songs, dances, protocols, family histories and...",
		knowledgeCheck: "Knowledge Check",
		resources: "Resources",
	},
	fr: {
		heroTitle: "Raviver les voix",
		heroSubtitle: "Naviguer dans la <em>Loi sur les langues autochtones</em>",
		introCardTitle: "Introduction et survol",
		introCardAria: "Naviguer vers Introduction et survol",
		introCardText:
			"La langue est le fondement d’une culture. Pour les sociétés autochtones de tradition orale, les mots préservent le savoir depuis des millénaires. La langue peut également porter des récits, des chants, des danses, des protocoles, des histoires familiales et...",
		knowledgeCheck: "Vérification des connaissances",
		resources: "Ressources",
	},
};

const Hero = ({ onNavigate, lang: langProp }) => {
	const lang = (langProp || useLanguage()).toLowerCase();
	const t = content[lang] || content.en;

	/* ——— local navigation helpers ——— */
	const go = (id) => onNavigate?.(id);

	return (
		<div className="hero-content-wrapper">
			<div className="hero-text">
				<h1>{t.heroTitle}</h1>
				{/* subtitle contains <em> tags, so use dangerouslySetInnerHTML */}
				<h2 dangerouslySetInnerHTML={{ __html: t.heroSubtitle }} />
			</div>

			<button
				className="introduction-card"
				onClick={() => go("introduction")}
				aria-label={t.introCardAria}
			>
				<span className="card-number">1</span>
				<h3>{t.introCardTitle}</h3>
				<p>{t.introCardText}</p>
			</button>

			<div className="action-buttons">
				<button className="action-btn" onClick={() => go("knowledge-check")}>
					{t.knowledgeCheck}
				</button>
				<button className="action-btn" onClick={() => go("resources")}>
					{t.resources}
				</button>
			</div>
		</div>
	);
};

export default Hero;
