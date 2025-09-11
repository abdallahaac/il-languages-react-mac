// src/pages/fr/KnowledgeCheck_fr.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import "../KnowledgeCheck.css";
import BackToTop from "../../components/BackToTop";
import { getHeroURL } from "../../prefetchHeroes";
import { useHeroSrc } from "../../utils/useHeroSrc";

/* ===== SINGLE SOURCE OF TRUTH ===== */
const STORAGE_KEY = (lang) => `knowledge-check-v1:${lang}`;
const SPINNER_H = 220; // keep in sync with .grade-inline min-height

// Longer aesthetic grading delay: ~320ms/question, clamped 1100–2500ms
const MIN_GRADE_DELAY = 1100;
const MAX_GRADE_DELAY = 2500;
const getGradeDelayMs = (count) => {
	const perQuestion = 320;
	const est = perQuestion * count;
	return Math.max(MIN_GRADE_DELAY, Math.min(MAX_GRADE_DELAY, est));
};
/* ================================== */

const KnowledgeCheck_fr = ({ onNavigate, visitedPages, lang = "fr" }) => {
	const url = getHeroURL(lang, "knowledge-check");
	const src = useHeroSrc(url);

	const scorm = useMemo(
		() => (window.pipwerks ? window.pipwerks.SCORM : null),
		[]
	);

	// pages required to unlock (match EN)
	const requiredPages = useMemo(
		() => [
			"introduction",
			"foundational-documents",
			"indigenous-languages-act",
			"revitalization-efforts",
			"public-service",
		],
		[]
	);

	const canAccessQuiz = useMemo(() => {
		if (!visitedPages || typeof visitedPages.has !== "function") return false;
		return requiredPages.every((id) => visitedPages.has(id));
	}, [visitedPages, requiredPages]);

	// i18n strings
	const t = {
		title: "Questionnaire verrouillé",
		message:
			"Veuillez consulter tout le contenu avant de répondre au questionnaire.",
		button: "Retour au contenu",
		remaining: (n) =>
			n === 1 ? "1 question restante." : `${n} questions restantes.`,
		allAnswered: "Toutes les questions sont répondues. Vous pouvez soumettre.",
		correct: "Correct",
		calculating: "Calcul du score…",
		completedTitle: "Section terminée",
		completedMsg:
			"Vous avez réussi et terminé cette section. Vous pouvez passer à la section suivante.",
		viewResults: "Afficher les résultats",
		hideResults: "Masquer les résultats",
		reviewAndFix: "Revoir et corriger",
		resubmit: "Renvoyer",
		retryHelper: "",
		retryClearedNote:
			"Vos réponses erronées ont été réinitialisées. Essayez de nouveau.",
		finalScoreLabel: "Votre score final",
		continueMsg:
			"Vous pouvez passer à la section suivante. Vous pouvez aussi réessayer le questionnaire si vous visez un score parfait.",
		mustReach80:
			"Veuillez revoir vos réponses et renvoyer jusqu’à atteindre au moins 80 % pour continuer.",
		incorrectShort: "Incorrect. Réessayez.",
	};

	/* ---- Questions ---- */
	const questions = useMemo(
		() => [
			{
				id: "q1",
				text: "1. Combien de langues autochtones sont parlées au Canada ?",
				options: [
					{ text: "a) Plus de 70", value: "a", correct: true },
					{ text: "b) Moins de 50", value: "b" },
					{ text: "c) Moins de 30", value: "c" },
				],
				feedback: "Plus de 70 langues autochtones sont parlées au Canada.",
			},
			{
				id: "q2",
				text: "2. Les langues autochtones sont en danger en raison de :",
				options: [
					{ text: "a) les pensionnats", value: "a" },
					{ text: "b) la <em>Loi sur les Indiens</em>", value: "b" },
					{ text: "c) la rafle des années 60", value: "c" },
					{
						text: "d) Toutes les réponses ci-dessus",
						value: "d",
						correct: true,
					},
				],
				feedback:
					"Toutes les réponses ci-dessus contribuent au risque auquel sont confrontées les langues autochtones.",
			},
			{
				id: "q3",
				text: "3. Quelles langues autochtones sont les plus parlées au Canada ?",
				options: [
					{ text: "a) Innu et Déné", value: "a" },
					{ text: "b) Cri et Inuktitut", value: "b", correct: true },
					{ text: "c) Ojibwé et Haïda", value: "c" },
					{ text: "d) Michif et Mohawk", value: "d" },
				],
				feedback:
					"Les langues autochtones les plus parlées au Canada sont le cri et l’inuktitut.",
			},
			{
				id: "q4",
				text: "4. Quand la<em> Loi sur les langues autochtones</em> a-t-elle reçu la sanction royale ?",
				options: [
					{ text: "a) Décembre 2015", value: "a" },
					{ text: "b) Juin 2019", value: "b", correct: true },
					{ text: "c) Juin 2021", value: "c" },
					{ text: "d) Juin 2023", value: "d" },
				],
				feedback: "La bonne réponse est juin 2019.",
			},
			{
				id: "q5",
				text: "5. Qui a été mandaté pour appliquer entièrement la Loi comme moyen de préserver, de promouvoir et de revitaliser les langues autochtones au Canada ?",
				options: [
					{
						text: "a) Le ou la commissaire aux langues autochtones",
						value: "a",
					},
					{
						text: "b) Relations Couronne-Autochtones et Affaires du Nord Canada",
						value: "b",
					},
					{
						text: "c) Le ou la ministre du Patrimoine canadien",
						value: "c",
						correct: true,
					},
					{ text: "d) Services aux Autochtones Canada", value: "d" },
				],
				feedback:
					"Le ou la ministre du Patrimoine canadien est responsable de l’application intégrale.",
			},
			{
				id: "q6",
				text: "6. Parmi les énoncés suivants, lesquels sont des mécanismes prévus dans la<em> Loi sur les langues autochtones</em> ?",
				options: [
					{
						text: "a) Établir des mesures de financement durable et à long terme pour les langues autochtones",
						value: "a",
					},
					{
						text: "b) Soutenir la réappropriation, la revitalisation, le renforcement et le maintien des langues autochtones au Canada",
						value: "b",
					},
					{
						text: "c) Établir un Bureau du commissaire aux langues autochtones",
						value: "c",
					},
					{ text: "d) Toutes ces réponses", value: "d", correct: true },
				],
				feedback: "Toutes les options énumérées sont prévues dans la Loi.",
			},
			{
				id: "q7",
				text: "7. Le Bureau du commissaire aux langues autochtones (BCLA) a le mandat :",
				options: [
					{
						text: "a) de contribuer à la promotion des langues autochtones",
						value: "a",
					},
					{
						text: "b) de soutenir les peuples autochtones dans leurs efforts visant à se réapproprier les langues autochtones, à les revitaliser, à les maintenir et à les renforcer",
						value: "b",
					},
					{
						text: "c) de faciliter le règlement des différends et d’examiner les plaintes dans la mesure prévue par la<em> Loi sur les langues autochtones</em>",
						value: "c",
					},
					{ text: "d) Toutes ces réponses", value: "d", correct: true },
				],
				feedback: "Ces éléments font partie du mandat du BCLA.",
			},
			{
				id: "q8",
				text: "8. Comment les fonctionnaires peuvent-ils et elles appuyer les objectifs de la<em> Loi sur les langues autochtones</em> ?",
				options: [
					{
						text: "a) En encourageant la promotion des langues autochtones",
						value: "a",
					},
					{
						text: "b) En offrant des services en langues autochtones lorsque c’est pertinent",
						value: "b",
					},
					{
						text: "c) En faisant traduire les documents importants en langues autochtones",
						value: "c",
					},
					{
						text: "d) En fournissant des services d’interprétation dans une langue autochtone",
						value: "d",
					},
					{
						text: "e) Toutes les réponses ci-dessus",
						value: "e",
						correct: true,
					},
				],
				feedback: "Toutes ces actions peuvent appuyer les objectifs de la Loi.",
			},
		],
		[]
	);

	/* ---- State ---- */
	const [answers, setAnswers] = useState({});
	const [showFeedback, setShowFeedback] = useState(false);
	const [score, setScore] = useState(0);
	const [feedback, setFeedback] = useState({});
	const [remainingCount, setRemainingCount] = useState(questions.length);
	const [isGrading, setIsGrading] = useState(false);
	const [viewResults, setViewResults] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	const [attempts, setAttempts] = useState(0);
	const [retryToast, setRetryToast] = useState("");

	const containerRef = useRef(null);
	const questionRefs = useRef({});

	/* ---- Hydrate from localStorage once ---- */
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY(lang));
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed && typeof parsed === "object") {
					setAnswers(parsed.answers || {});
					setFeedback(parsed.feedback || {});
					setShowFeedback(!!parsed.showFeedback);
					setScore(Number(parsed.score || 0));
					setViewResults(!!parsed.viewResults);
					setAttempts(Number(parsed.attempts || 0));
				}
			}
		} catch {}
		// clear any leftover inline height styles from a previous visit
		requestAnimationFrame(() => {
			if (containerRef.current) {
				containerRef.current.style.height = "";
				containerRef.current.style.overflow = "";
			}
		});
		setHydrated(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* ---- Persist whenever things change ---- */
	useEffect(() => {
		if (!hydrated) return;
		const state = {
			answers,
			feedback,
			showFeedback,
			score,
			viewResults,
			attempts,
			savedAt: Date.now(),
		};
		try {
			localStorage.setItem(STORAGE_KEY(lang), JSON.stringify(state));
		} catch {}
	}, [
		answers,
		feedback,
		showFeedback,
		score,
		viewResults,
		attempts,
		lang,
		hydrated,
	]);

	/* ---- Derived ---- */
	useEffect(() => {
		const unanswered = questions.filter((q) => !answers[q.id]).length;
		setRemainingCount(unanswered);
	}, [answers, questions]);

	const allAnswered = remainingCount === 0;
	const canSubmitInitially = allAnswered && !showFeedback && !isGrading;

	/* ---- Handlers ---- */
	const handleAnswerChange = (questionId, value) => {
		// Prevent changing correct answers once feedback is shown
		if (showFeedback && feedback[questionId] === "correct") return;
		setAnswers((prev) => ({ ...prev, [questionId]: value }));
	};

	const grade = () => {
		let correctAnswers = 0;
		const newFeedback = {};
		questions.forEach((q) => {
			const correctOption = q.options.find((opt) => opt.correct);
			if (answers[q.id] === correctOption?.value) {
				correctAnswers++;
				newFeedback[q.id] = "correct";
			} else {
				newFeedback[q.id] = "incorrect";
			}
		});
		const finalScore = (correctAnswers / questions.length) * 100;
		setScore(finalScore);
		setFeedback(newFeedback);
		setShowFeedback(true);
		setAttempts((n) => n + 1);

		/* NEW: lightweight flags for non-SCORM detection on the Resources page */
		try {
			localStorage.setItem("ilc:quizAttempted", "1");
			if (finalScore >= 80) localStorage.setItem("ilc:quizPassed", "1");
		} catch {}

		// If 100%, show the completed panel by default (viewResults=false)
		if (finalScore === 100) {
			setViewResults(false);
		}

		if (scorm && scorm.API?.isFound?.()) {
			scorm.set("cmi.core.score.raw", finalScore.toFixed(0));
			scorm.set("cmi.core.score.min", "0");
			scorm.set("cmi.core.score.max", "100");
			scorm.set(
				"cmi.core.lesson_status",
				finalScore >= 80 ? "passed" : "failed"
			);
			scorm.save();
		}

		const firstIncorrect = questions.find(
			(q) => newFeedback[q.id] === "incorrect"
		);
		if (firstIncorrect && questionRefs.current[firstIncorrect.id]) {
			setTimeout(() => {
				questionRefs.current[firstIncorrect.id].focus();
			}, 0);
		}
	};

	// Animate the quiz container height to a specific value
	const animateContainerHeight = (toPx) => {
		const el = containerRef.current;
		if (!el) return;
		const startH = el.offsetHeight;
		el.style.height = `${startH}px`;
		el.style.overflow = "hidden";
		// force reflow
		// eslint-disable-next-line no-unused-expressions
		el.offsetHeight;
		el.style.transition = "height 260ms ease";
		el.style.height = `${toPx}px`;

		const onEnd = (e) => {
			if (e.propertyName !== "height") return;
			el.style.transition = "";
			el.removeEventListener("transitionend", onEnd);
		};
		el.addEventListener("transitionend", onEnd);
	};

	// After grading, expand back to auto height matching new content
	const expandToContent = () => {
		const el = containerRef.current;
		if (!el) return;
		requestAnimationFrame(() => {
			const target = el.scrollHeight;
			el.style.transition = "height 260ms ease";
			el.style.height = `${target}px`;
			const onEnd = (e) => {
				if (e.propertyName !== "height") return;
				el.style.transition = "";
				el.style.height = ""; // back to auto
				el.style.overflow = "";
				el.removeEventListener("transitionend", onEnd);
			};
			el.addEventListener("transitionend", onEnd);
		});
	};

	const handleSubmit = () => {
		if (!allAnswered) {
			const firstUnanswered = questions.find((q) => !answers[q.id]);
			if (firstUnanswered && questionRefs.current[firstUnanswered.id]) {
				questionRefs.current[firstUnanswered.id].focus();
			}
			return;
		}

		// ensure spinner is visible without scrolling by the user
		containerRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});

		// fade content + animate height down to spinner height
		setIsGrading(true);
		animateContainerHeight(SPINNER_H);

		const delay = getGradeDelayMs(questions.length);
		setTimeout(() => {
			grade();
			setIsGrading(false);
			expandToContent();
		}, delay);
	};

	// Reset only incorrect answers, keep correct ones locked
	const resetIncorrect = () => {
		setAnswers((prev) => {
			const next = { ...prev };
			questions.forEach((q) => {
				if (feedback[q.id] === "incorrect") {
					delete next[q.id]; // clear selection so learner doit réfléchir à nouveau
				}
			});
			return next;
		});
		setRetryToast(t.retryClearedNote);
		setTimeout(() => setRetryToast(""), 2200);
	};

	// show only incorrect questions once feedback is visible (unless viewing results at 100%)
	const visibleQuestions = useMemo(() => {
		if (!showFeedback) return questions;
		if (score === 100 && viewResults) return questions; // show all after 100% when user asks
		if (score === 100 && !viewResults) return []; // hide all when completed and not viewing
		return questions.filter((q) => feedback[q.id] !== "correct");
	}, [questions, showFeedback, feedback, score, viewResults]);

	// helper to know if a given question is locked (correct+feedback shown)
	const isLockedCorrect = (qid) => showFeedback && feedback[qid] === "correct";

	/* -------- early render gate to prevent “fresh” flash -------- */
	if (!hydrated) {
		return (
			<div className="intro-wrapper knowledge-check-page">
				<header className="hero" role="banner">
					<img src={src} alt="" className="hero-img" aria-hidden="true" />
					<h1 className="hero-title">Vérification des connaissances</h1>
				</header>
				<main ref={containerRef} className="quiz-container">
					<div className="grade-inline" role="status" aria-live="polite">
						<div className="spinner" aria-hidden="true"></div>
						<div className="spinner-text">Chargement…</div>
					</div>
				</main>
			</div>
		);
	}

	/* -------- locked gate ---------- */
	if (!canAccessQuiz) {
		return (
			<div className="intro-wrapper knowledge-check-page">
				<header className="hero" role="banner">
					<img src={src} alt="" className="hero-img" aria-hidden="true" />
					<h1 className="hero-title">{t.title}</h1>
				</header>
				<main className="quiz-container locked-quiz">
					<p>{t.message}</p>
					<button
						className="back-button"
						onClick={() => onNavigate?.("introduction")}
					>
						&laquo;&nbsp;{t.button}
					</button>
				</main>
			</div>
		);
	}

	const showCompletedPanel = showFeedback && score === 100 && !viewResults;

	/* -------- quiz ---------- */
	return (
		<div className="intro-wrapper knowledge-check-page">
			<header className="hero" role="banner">
				<img src={src} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Vérification des connaissances</h1>
			</header>

			<main
				ref={containerRef}
				className="quiz-container"
				aria-busy={isGrading ? "true" : "false"}
			>
				{/* QUIZ CONTENT — fades out while grading */}
				<div
					className={`quiz-content ${isGrading ? "fade-out" : "fade-in"}`}
					aria-hidden={isGrading ? "true" : "false"}
				>
					{/* Completed view (replaces quiz at 100%) */}
					{showCompletedPanel && (
						<div className="completed-panel">
							<h2>{t.completedTitle}</h2>
							<p>{t.completedMsg}</p>
							<div className="completed-actions">
								<button
									type="button"
									className="submit-button"
									onClick={() => setViewResults(true)}
								>
									{t.viewResults}
								</button>
							</div>
						</div>
					)}

					{/* Quiz form (hidden when 100% complete unless viewing results) */}
					{!showCompletedPanel && (
						<form id="quiz-form" onSubmit={(e) => e.preventDefault()}>
							{visibleQuestions.map((q) => (
								<fieldset
									key={q.id}
									className={`quiz-question ${
										!answers[q.id] && !showFeedback ? "unanswered" : ""
									} ${isLockedCorrect(q.id) ? "locked-correct" : ""}`}
									ref={(el) => (questionRefs.current[q.id] = el)}
									tabIndex={-1}
									aria-describedby={
										isLockedCorrect(q.id) ? `${q.id}-locked-note` : undefined
									}
								>
									<legend
										className="question-text"
										dangerouslySetInnerHTML={{ __html: q.text }}
									/>
									<div className="options">
										{q.options.map((opt) => {
											const inputId = `${q.id}-${opt.value}`;
											const isQuestionLocked = isLockedCorrect(q.id);
											const isSelected = answers[q.id] === opt.value;
											const lockThisLabel = isQuestionLocked && isSelected;

											return (
												<label
													key={opt.value}
													htmlFor={inputId}
													className={lockThisLabel ? "option-locked" : ""}
													aria-disabled={lockThisLabel ? "true" : undefined}
													title={
														lockThisLabel
															? `${t.correct} — verrouillée`
															: undefined
													}
												>
													<input
														type="radio"
														id={inputId}
														name={q.id}
														value={opt.value}
														checked={isSelected}
														onChange={() => handleAnswerChange(q.id, opt.value)}
														required
													/>
													<span className="custom-radio"></span>
													<span
														dangerouslySetInnerHTML={{ __html: opt.text }}
													/>
												</label>
											);
										})}
									</div>

									{isLockedCorrect(q.id) && (
										<div id={`${q.id}-locked-note`} className="locked-note">
											✓ {t.correct} — réponse verrouillée.
										</div>
									)}

									{showFeedback && (
										<div className={`feedback ${feedback[q.id]}`}>
											{feedback[q.id] === "correct" ? (
												<p>
													<strong>Correct&nbsp;!</strong>{" "}
													<span
														dangerouslySetInnerHTML={{ __html: q.feedback }}
													/>
												</p>
											) : (
												// 🔒 Ne plus révéler la bonne réponse ici
												<p>
													<strong>{t.incorrectShort}</strong>{" "}
													<span className="retry-hint">{t.retryHelper}</span>
												</p>
											)}
										</div>
									)}
								</fieldset>
							))}

							{/* Controls */}
							<div className="quiz-controls">
								{!showFeedback ? (
									<>
										<div
											className="submit-helper"
											role="status"
											aria-live="polite"
											style={{ marginTop: "0.5rem" }}
										>
											{allAnswered
												? t.allAnswered
												: t.remaining(remainingCount)}
										</div>
										<button
											type="button"
											className="submit-button"
											onClick={handleSubmit}
											disabled={!canSubmitInitially}
											aria-disabled={!canSubmitInitially}
											title={
												!canSubmitInitially
													? t.remaining(remainingCount)
													: undefined
											}
										>
											Soumettre les réponses
										</button>
									</>
								) : (
									<>
										{score < 100 && (
											<div className="retry-row">
												<button
													type="button"
													className="submit-button"
													onClick={handleSubmit}
													disabled={isGrading}
													title="Renvoyer vos réponses"
													style={{ marginLeft: "0.5rem" }}
												>
													{isGrading ? t.calculating : t.resubmit}
												</button>
											</div>
										)}
										{score === 100 && viewResults && (
											<button
												type="button"
												className="submit-button"
												onClick={() => setViewResults(false)}
											>
												{t.hideResults}
											</button>
										)}
										{retryToast && (
											<div className="toast" role="status" aria-live="polite">
												{retryToast}
											</div>
										)}
									</>
								)}
							</div>
						</form>
					)}

					{/* Results panel */}
					{showFeedback && score >= 0 && !showCompletedPanel && (
						<div
							id="quiz-results"
							className={score >= 80 ? "passed" : "failed"}
						>
							<h2>
								{t.finalScoreLabel}&nbsp;: {score.toFixed(0)}%
							</h2>
							{score >= 80 ? (
								score === 100 ? (
									<p>Vous pouvez passer à la section suivante.</p>
								) : (
									<p>{t.continueMsg}</p>
								)
							) : (
								<p>{t.mustReach80}</p>
							)}
						</div>
					)}
				</div>

				{/* INLINE SPINNER — replaces content while grading (no overlay) */}
				{isGrading && (
					<div className="grade-inline" role="status" aria-live="polite">
						<div className="spinner" aria-hidden="true"></div>
						<div className="spinner-text">{t.calculating}</div>
					</div>
				)}
			</main>

			<BackToTop />
			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("results-fr");
					}}
				>
					&laquo;&nbsp;Retour
				</button>
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("resources");
					}}
				>
					Suivant&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default KnowledgeCheck_fr;
