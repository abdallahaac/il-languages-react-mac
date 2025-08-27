import React, { useEffect, useState } from "react";
import "./Hero.css";
import heroImage from "../assets/home-img.jpeg";

/* watch <html lang=""> */
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

/* strings with a single H1 (HTML allowed) */
const content = {
	en: {
		heroTitle:
			"Revitalizing Voices: <wbr> Navigating the  <em>Indigenous Languages Act</em>",
		introCardTitle: "Introduction and overview",
		introCardAria: "Navigate to Introduction and overview",
		introCardText:
			"Language is the foundation of a culture. For Indigenous oral societies, words hold knowledge amassed for millennia. A language holds the stories, songs, dances, protocols, family histories and...",
		knowledgeCheck: "Knowledge Check",
		resources: "Resources",
	},
	fr: {
		heroTitle:
			"Revitalisation des voix autochtones : <br> comprendre la <em>Loi sur les langues autochtones</em>",
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

	const go = (id) => onNavigate?.(id);

	return (
		<div
			className="hero-container hero-page"
			style={{ backgroundImage: `url(${heroImage})` }}
		>
			<div className="hero-content-wrapper">
				<div className="hero-text">
					{/* Single H1 only */}
					<h1 dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
				</div>

				<button
					className="introduction-card"
					onClick={() => go("introduction")}
					aria-label={t.introCardAria}
					data-num="1"
				>
					{/* Badge with INNER wrapper for digit nudging */}
					<span className="card-number" aria-hidden="true">
						<span className="card-number__inner">1</span>
					</span>

					<h3>{t.introCardTitle}</h3>
					<p>{t.introCardText}</p>
				</button>
			</div>
		</div>
	);
};

export default Hero;
