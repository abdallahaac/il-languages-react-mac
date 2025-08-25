// KnowledgeActions.jsx
import React, { useEffect, useState } from "react";
import "./Hero.css"; // <- re-use .action-buttons / .action-btn styles
import "./KnowledgeActions.css";

/* watch <html lang=""> just like your Hero */
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

const labels = {
	en: { kc: "Knowledge Check", res: "Resources", aria: "Quick actions" },
	fr: {
		kc: "Vérification des connaissances",
		res: "Ressources",
		aria: "Actions rapides",
	},
};

const KnowledgeActions = ({ onNavigate, lang: langProp }) => {
	const lang = (langProp || useLanguage()).toLowerCase();
	const t = labels[lang] || labels.en;

	const go = (id) => {
		// keep your scroll-to-top behavior on page change
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		onNavigate?.(id);
	};

	return (
		<section className="kr-wrap" aria-label={t.aria}>
			{/* reuse EXACT styles from Hero.css */}
			<div className="action-buttons">
				<button className="action-btn" onClick={() => go("knowledge-check")}>
					{t.kc}
				</button>
				<button className="action-btn" onClick={() => go("resources")}>
					{t.res}
				</button>
			</div>
		</section>
	);
};

export default KnowledgeActions;
