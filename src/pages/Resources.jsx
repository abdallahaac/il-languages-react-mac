// src/pages/en/Resources.jsx
import React, { useState, useEffect } from "react";
import "./resources.css";
import BackToTop from "../components/BackToTop";
import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";
import { useScorm } from "../App";

const VISITED_KEY_LOCAL = "ilc:visitedPages";
const clearVisitedLocal = () => {
	try {
		localStorage.removeItem(VISITED_KEY_LOCAL);
	} catch {}
};

const Resources = ({ onNavigate }) => {
	const url = getHeroURL("en", "resources");
	const src = useHeroSrc(url);
	const { scorm, readSuspend, writeSuspend } = useScorm();

	const t = {
		pageTitle: "Resources",
		back: "Back",
		home: "Home",
		modalTitle: "Course Complete",
		modalMsg:
			"You have completed the course. You may now close this window or return to the home page.",
		exit: "Exit window",
		goHome: "Go to Home",
		cancel: "Cancel",
		exitHelp:
			"If this tab didn’t close automatically, please close this window manually.",
	};

	const [showExitModal, setShowExitModal] = useState(false);
	const [exitFailed, setExitFailed] = useState(false);
	const [quizPassed, setQuizPassed] = useState(false);

	// Determine quiz completion
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
				if (scorm.version === "1.2") {
					const s = (scorm.get("cmi.core.lesson_status") || "").toLowerCase();
					if (s.includes("passed")) passed = true;
				} else {
					const success = (scorm.get("cmi.success_status") || "").toLowerCase();
					const completion = (
						scorm.get("cmi.completion_status") || ""
					).toLowerCase();
					if (success.includes("passed")) passed = true;
				}
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

	// Lock background scroll when modal open + Esc to close
	useEffect(() => {
		if (!showExitModal) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.getElementById("exit-modal-primary")?.focus();
		const onKeyDown = (e) => e.key === "Escape" && setShowExitModal(false);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [showExitModal]);

	// Home: show modal only if passed; otherwise just go home
	const handleHomeClick = () => {
		setExitFailed(false);
		if (quizPassed) setShowExitModal(true);
		else onNavigate?.("home");
	};

	// Try to actually close window; if blocked, show hint
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
				scorm.save(); // final commit
				scorm.quit?.(); // end attempt
			}
		} catch {}

		// Optional: clear storages and suspend_data
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
			scorm?.save?.(); // commit but don't quit
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
							href="https://www.unesco.org/en/decades/indigenous-languages"
							target="_blank"
							rel="noopener noreferrer"
						>
							International Decade of Indigenous Languages (2022–2032) | UNESCO
						</a>
					</li>
					<li>
						<a
							href="https://www.canada.ca/en/canadian-heritage/campaigns/celebrate-indigenous-languages/international-decade.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							International Decade of Indigenous Languages — Canada.ca
						</a>
					</li>
					<li>
						<a
							href="https://www12.statcan.gc.ca/census-recensement/2021/as-sa/98-200-X/2021012/98-200-X2021012-eng.cfm"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages in Canada — Statistics Canada
						</a>
					</li>
					<li>
						<a
							href="https://parks.canada.ca/culture/autochtones-indigenous/noms-de-lieux-place-names"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous place names — Parks Canada
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
							Indigenous languages — Canadian overview
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/dictionnaire-dictionaries-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages — Glossaries, dictionaries and writing
							resources
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/apprentissage-learning-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages — Learning and teaching resources
						</a>
					</li>
					<li>
						<a
							href="https://www.noslangues-ourlanguages.gc.ca/en/ressources-resources/autochtones-aboriginals/evenements-events-eng"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous languages — Organizations and events
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
							href="https://mila.quebec/en/ai4humanity/applied-projects/flair-initiative"
							target="_blank"
							rel="noopener noreferrer"
						>
							FLAIR Initiative | Mila
						</a>
					</li>
				</ul>
			</section>

			<BackToTop />

			{/* Breadcrumb / Navigation */}
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

			{/* Completion Modal (only when quizPassed === true) */}
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
