// src/pages/fr/Resources.jsx
import React, { useState, useEffect } from "react";
import "../resources.css";
import BackToTop from "../../components/BackToTop";
import { getHeroURL } from "../../prefetchHeroes";
import { useHeroSrc } from "../../utils/useHeroSrc";
import { useScorm } from "../../App";

const VISITED_KEY_LOCAL = "ilc:visitedPages";
const clearVisitedLocal = () => {
	try {
		localStorage.removeItem(VISITED_KEY_LOCAL);
	} catch {}
};

const Resources = ({ onNavigate }) => {
	const url = getHeroURL("fr", "resources");
	const src = useHeroSrc(url);
	const { scorm, readSuspend, writeSuspend } = useScorm();

	const t = {
		pageTitle: "Ressources",
		back: "Retour",
		home: "Accueil",
		modalTitle: "Cours terminé",
		modalMsg:
			"Vous avez terminé le cours. Vous pouvez maintenant fermer cette fenêtre ou retourner à l’accueil.",
		exit: "Fermer la fenêtre",
		goHome: "Retour à l’accueil",
		cancel: "Annuler",
		exitHelp:
			"Si cet onglet ne s’est pas fermé automatiquement, veuillez fermer cette fenêtre manuellement.",
	};

	const [showExitModal, setShowExitModal] = useState(false);
	const [exitFailed, setExitFailed] = useState(false);
	const [quizPassed, setQuizPassed] = useState(false);

	// Vérifie l’état de réussite du quiz (suspend_data / SCORM)
	useEffect(() => {
		try {
			const data = readSuspend?.();
			const q = data?.quiz || {};

			const passedByFlag =
				q.passed === true || q.status === "passed" || q.result === "pass";
			const passedByScore =
				typeof q.score === "number" &&
				typeof q.passScore === "number" &&
				q.score >= q.passScore;

			let passed = passedByFlag || passedByScore;

			if (!passed && scorm?.API?.isFound?.()) {
				let s = "";
				if (scorm.version === "1.2") {
					s = (scorm.get("cmi.core.lesson_status") || "").toLowerCase();
				} else {
					const success = (scorm.get("cmi.success_status") || "").toLowerCase();
					const completion = (
						scorm.get("cmi.completion_status") || ""
					).toLowerCase();
					s = `${success} ${completion}`.trim();
				}
				if (s.includes("passed")) passed = true;
			}

			setQuizPassed(!!passed);
		} catch {
			setQuizPassed(false);
		}
	}, [readSuspend, scorm]);

	const clearCourseStorage = () => {
		try {
			const prefixes = ["knowledge-check-v1:", "ilc:"];
			for (let i = localStorage.length - 1; i >= 0; i--) {
				const key = localStorage.key(i);
				if (key && prefixes.some((p) => key.startsWith(p))) {
					localStorage.removeItem(key);
				}
			}
		} catch {}
	};

	// Bloque le scroll d’arrière-plan + Esc pour fermer quand la modale est ouverte
	useEffect(() => {
		if (!showExitModal) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.getElementById("exit-modal-primary")?.focus();
		const onKeyDown = (e) => {
			if (e.key === "Escape") setShowExitModal(false);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [showExitModal]);

	// Accueil : montre la modale seulement si le quiz est réussi; sinon, retourne à l’accueil
	const handleHomeClick = () => {
		setExitFailed(false);
		if (quizPassed) {
			setShowExitModal(true);
		} else {
			onNavigate?.("home");
		}
	};

	// Tentatives de vraie fermeture; si bloqué, message d’aide
	const tryCloseWindow = () => {
		try {
			window.top?.close?.();
		} catch {}
		try {
			window.close();
		} catch {}
		try {
			window.open("", "_self")?.close?.();
		} catch {}
		try {
			window.parent?.postMessage?.({ type: "ILC_EXIT_REQUEST" }, "*");
		} catch {}

		setTimeout(() => setExitFailed(true), 200);
	};

	const handleExitWindow = () => {
		try {
			if (scorm && scorm.API?.isFound?.()) {
				scorm.save(); // commit final
				scorm.quit?.(); // fin de la tentative
			}
		} catch {}

		clearCourseStorage();
		clearVisitedLocal();

		try {
			const data = readSuspend?.();
			writeSuspend?.({ ...data, visited: [], quiz: {} });
		} catch {}

		tryCloseWindow();
	};

	const handleGoHome = () => {
		setShowExitModal(false);
		setExitFailed(false);
		try {
			scorm?.save?.(); // commit, sans quitter
		} catch {}
		onNavigate?.("home");
	};

	return (
		<div className="intro-wrapper resources-page">
			<header className="hero" role="banner">
				<img
					src={src}
					alt=""
					className="hero-img"
					aria-hidden="true"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">{t.pageTitle}</h1>
			</header>

			<section className="resources-content">
				<ul className="res">
					<li>
						<a
							href="https://www.unesco.org/fr/decades/indigenous-languages"
							target="_blank"
							rel="noopener noreferrer"
						>
							Décennie des langues autochtones (2022–2032) | UNESCO
						</a>
					</li>
					<li>
						<a
							href="https://www.canada.ca/fr/patrimoine-canadien/campagnes/celebrons-langues-autochtones/decennie-internationale.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Décennie internationale des langues autochtones — Canada.ca
						</a>
					</li>
					<li>
						<a
							href="https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-X/2021012/98-200-X2021012-fra.cfm"
							target="_blank"
							rel="noopener noreferrer"
						>
							Les langues autochtones au Canada — Statistique Canada
						</a>
					</li>
					<li>
						<a
							href="https://parcs.canada.ca/culture/autochtones-indigenous/noms-de-lieux-place-names"
							target="_blank"
							rel="noopener noreferrer"
						>
							Noms de lieux en langues autochtones — Parcs Canada
						</a>
					</li>
					<li>
						<a
							href="https://maps.canada.ca/stories/storymap-en.html?lang=fr&appid=acbd8457a3fa46df874351e1179ea237&appidalt=83e6463db5194c33be31f456f2cbd913"
							target="_blank"
							rel="noopener noreferrer"
						>
							Histoires du territoire : Noms de lieux autochtones au Canada
						</a>
					</li>
					<li>
						<a
							href="https://canadiangeographic.ca/articles/cartographie-des-langues-autochtones-au-canada/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Cartographier les langues autochtones au Canada | Canadian
							Geographic
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/ressources-resources-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones — Aperçu canadien
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/dictionnaire-dictionaries-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones — Glossaires, dictionnaires et ressources
							rédactionnelles
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/apprentissage-learning-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones — Ressources d’apprentissage et d’enseignement
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/evenements-events-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones — Organismes et événements
						</a>
					</li>
					<li>
						<a
							href="https://www.justice.gc.ca/fra/declaration/histoires-stories/03.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Parler sa langue
						</a>
					</li>
				</ul>

				<h2>Innovation et langues autochtones</h2>
				<ul className="res">
					<li>
						<a
							href="https://ici.radio-canada.ca/espaces-autochtones/1978476/intelligence-artificielle-biais-langues-autochtones-biais"
							target="_blank"
							rel="noopener noreferrer"
						>
							IA et technologies immersives au service des langues autochtones
						</a>
					</li>
					<li>
						<a
							href="https://mila.quebec/fr/initiative-flair"
							target="_blank"
							rel="noopener noreferrer"
						>
							Initiative FLAIR | Mila
						</a>
					</li>
				</ul>
			</section>

			<BackToTop />

			{/* Fil d’Ariane / Navigation */}
			<nav className="breadcrumb" aria-label="Navigation">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("knowledge-check");
					}}
				>
					&laquo;&nbsp;{t.back}
				</button>

				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						handleHomeClick();
					}}
				>
					{t.home}&nbsp;&raquo;
				</button>
			</nav>

			{/* Modale de fin (s’affiche seulement si quizPassed === true) */}
			{showExitModal && (
				<div className="modal-overlay" role="presentation">
					<div
						className="modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="exit-modal-title"
						aria-describedby="exit-modal-desc"
					>
						<h2 id="exit-modal-title" className="modal-title">
							{t.modalTitle}
						</h2>
						<p id="exit-modal-desc" className="modal-desc">
							{t.modalMsg}
						</p>

						<div className="modal-actions">
							<button
								id="exit-modal-primary"
								className="submit-button"
								onClick={handleExitWindow}
							>
								{t.exit}
							</button>
							<button className="btn-ghost" onClick={handleGoHome}>
								{t.goHome}
							</button>
							<button
								className="btn-small"
								onClick={() => {
									setExitFailed(false);
									setShowExitModal(false);
								}}
								aria-label={t.cancel}
							>
								{t.cancel}
							</button>
						</div>

						{exitFailed && (
							<div
								className="exit-fallback"
								role="status"
								style={{ marginTop: "0.75rem" }}
							>
								<p style={{ margin: 0 }}>{t.exitHelp}</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Resources;
