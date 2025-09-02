// src/pages/fr/Resources.jsx
import React, { useMemo, useState, useEffect } from "react";
import "../resources.css";
import BackToTop from "../../components/BackToTop";
import { getHeroURL } from "../../prefetchHeroes";
import { useHeroSrc } from "../../utils/useHeroSrc";

const Resources = ({ onNavigate }) => {
	const url = getHeroURL("fr", "resources");
	const src = useHeroSrc(url);

	// SCORM handle (safe if not present)
	const scorm = useMemo(
		() => (window.pipwerks ? window.pipwerks.SCORM : null),
		[]
	);

	const t = {
		pageTitle: "Ressources",
		back: "Retour",
		home: "Page d’accueil",
		modalTitle: "Cours terminé",
		modalMsg:
			"Vous avez terminé le cours. Vous pouvez maintenant fermer cette fenêtre ou retourner à la page d’accueil.",
		exit: "Fermer la fenêtre",
		goHome: "Aller à l’accueil",
		cancel: "Annuler",
	};

	const [showExitModal, setShowExitModal] = useState(false);
	const [hasAttemptedQuiz, setHasAttemptedQuiz] = useState(false);

	// Détecter la tentative via SCORM lesson_status
	useEffect(() => {
		try {
			if (scorm && scorm.API?.isFound?.()) {
				const rawStatus = scorm.get("cmi.core.lesson_status") || "";
				const status = String(rawStatus).trim().toLowerCase();
				const attemptedStatuses = new Set(["passed", "failed", "completed"]);
				setHasAttemptedQuiz(attemptedStatuses.has(status));
			} else {
				setHasAttemptedQuiz(false);
			}
		} catch {
			setHasAttemptedQuiz(false);
		}
	}, [scorm]);

	// Bloquer le scroll arrière-plan + Échap pour fermer quand ouvert
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

	const handleHomeClick = () => {
		// ✅ Afficher le modal seulement si le questionnaire a été tenté
		if (hasAttemptedQuiz) setShowExitModal(true);
		else onNavigate?.("home");
	};

	const handleExitWindow = () => {
		try {
			if (scorm && scorm.API?.isFound?.()) {
				// Facultatif : marquer comme complété ici si désiré
				// scorm.set("cmi.core.lesson_status", "completed");
				scorm.save();
			}
		} catch {}
		window.close(); // peut être bloqué
		onNavigate?.("home");
	};

	const handleGoHome = () => {
		setShowExitModal(false);
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
							Décennie des langues autochtones (2022-2032) | UNESCO
						</a>
					</li>
					<li>
						<a
							href="https://www.canada.ca/fr/patrimoine-canadien/campagnes/celebrer-langues-autochtones/decennie-internationale.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Décennie internationale des langues autochtones
						</a>
					</li>
					<li>
						<a
							href="https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-X/2021012/98-200-X2021012-fra.cfm"
							target="_blank"
							rel="noopener noreferrer"
						>
							Les langues autochtones au Canada
						</a>
					</li>
					<li>
						<a
							href="https://parks.canada.ca/culture/autochtones-indigenous/noms-de-lieux-place-names#"
							target="_blank"
							rel="noopener noreferrer"
						>
							Toponymes autochtones
						</a>
					</li>
					<li>
						<a
							href="https://maps.canada.ca/stories/storymap-en.html?lang=fr&appid=acbd8457a3fa46df874351e1179ea237&appidalt=83e6463db5194c33be31f456f2cbd913"
							target="_blank"
							rel="noopener noreferrer"
						>
							Histoires du territoire : Les noms de lieux autochtones au Canada
						</a>
					</li>
					<li>
						<a
							href="https://canadiangeographic.ca/fr/articles/cartographier-les-langues-autochtones-au-canada/"
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
							Langues autochtones – Aperçu canadien
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/dictionnaire-dictionaries-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones – Glossaires, dictionnaires et ressources
							rédactionnelles
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/apprentissage-learning-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones – Ressources d’apprentissage et d’enseignement
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/fr/ressources-resources/autochtones-aboriginals/evenements-events-fra"
							target="_blank"
							rel="noopener noreferrer"
						>
							Langues autochtones – Organisations et événements
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
							href="https://ici.radio-canada.ca/nouvelle/1858223/langues-autochtones-intelligence-artificielle-revitalisation-culture"
							target="_blank"
							rel="noopener noreferrer"
						>
							Comment l’IA et la technologie immersive sont utilisées pour
							revitaliser les langues autochtones | Radio-Canada
						</a>
					</li>
					<li>
						<a
							href="https://www.sshrc-crsh.gc.ca/funding-financement/nfrf-fnfr/stories-histoires/2023/inclusive_artificial_intelligence-intelligence_artificielle_inclusive-fra.aspx"
							target="_blank"
							rel="noopener noreferrer"
						>
							L’IA inclusive : comment les systèmes de connaissances autochtones
							pourraient rendre l’IA plus inclusive
						</a>
					</li>
					<li>
						<a
							href="https://mila.quebec/fr/ia-pour-lhumanite/projets-appliques/premieres-langues-ia-realite"
							target="_blank"
							rel="noopener noreferrer"
						>
							Premières Langues IA Réalité | Mila
						</a>
					</li>
				</ul>
			</section>

			<BackToTop />

			{/* Fil d’Ariane / Navigation */}
			<nav className="breadcrumb" aria-label="Navigation de la page">
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

			{/* Modal de fin de cours */}
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
								onClick={() => setShowExitModal(false)}
								aria-label={t.cancel}
							>
								{t.cancel}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Resources;
