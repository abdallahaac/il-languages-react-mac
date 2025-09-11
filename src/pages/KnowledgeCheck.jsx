// src/pages/KnowledgeCheck.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import "./KnowledgeCheck.css";
import BackToTop from "../components/BackToTop";
import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";

/* ===== SINGLE SOURCE OF TRUTH (module-scope) ===== */
const STORAGE_KEY = (lang) => `knowledge-check-v1:${lang}`;
const SPINNER_H = 220;

// Longer aesthetic grading delay: ~320ms/question, clamped 1100–2500ms
const MIN_GRADE_DELAY = 1100;
const MAX_GRADE_DELAY = 2500;
const getGradeDelayMs = (count) => {
	const perQuestion = 320;
	const est = perQuestion * count;
	return Math.max(MIN_GRADE_DELAY, Math.min(MAX_GRADE_DELAY, est));
};
/* ================================================ */

const KnowledgeCheck = ({ onNavigate, visitedPages, lang = "en" }) => {
	const url = getHeroURL(lang, "knowledge-check");
	const src = useHeroSrc(url);

	const scorm = useMemo(
		() => (window.pipwerks ? window.pipwerks.SCORM : null),
		[]
	);

	// Define the pages required to unlock the quiz
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

	const lockedText = {
		en: {
			title: "Quiz Locked",
			message:
				"Please review all the material before attempting the knowledge check.",
			button: "Back to Content",
			remaining: (n) =>
				n === 1 ? "1 question remaining." : `${n} questions remaining.`,
			allAnswered: "All questions are answered. You can submit now.",
			correct: "Correct",
			calculating: "Calculating grade…",
			completedTitle: "Section complete",
			completedMsg:
				"You’ve passed and completed this section. You can proceed to the next section.",
			viewResults: "View past results",
			hideResults: "Hide results",
			resubmit: "Resubmit",
			finalScoreLabel: "Your Final Score",
			continueMsg:
				"You may proceed to the next section. Optionally, you can retry the quiz if you’d like to aim for a perfect score.",
			mustReach80:
				"Please review your answers and resubmit until you reach at least 80% to proceed.",
			incorrectShort: "Incorrect. Try again.",
			retryHelper: "",
			retryClearedNote: "Incorrect answers were cleared. Please try again.",
		},
	};
	const t = lockedText[lang] || lockedText.en;

	const questions = useMemo(
		() => [
			{
				id: "q1",
				text: "1. How many Indigenous languages are spoken in Canada?",
				options: [
					{ text: "a) More than 70", value: "a", correct: true },
					{ text: "b) Less than 50", value: "b" },
					{ text: "c) Less than 30", value: "c" },
				],
				feedback: "More than 70 Indigenous languages are spoken in Canada.",
			},
			{
				id: "q2",
				text: "2. Indigenous languages are at risk due to:",
				options: [
					{ text: "a) residential schools", value: "a" },
					{ text: "b) the <em>Indian Act</em>", value: "b" },
					{ text: "c) the 60s scoop", value: "c" },
					{ text: "d) All of the above", value: "d", correct: true },
				],
				feedback:
					"All of the above contribute to the risk faced by Indigenous languages.",
			},
			{
				id: "q3",
				text: "3. Which Indigenous languages are most widely spoken in Canada?",
				options: [
					{ text: "a) Innu and Dene", value: "a" },
					{ text: "b) Cree and Inuktitut", value: "b", correct: true },
					{ text: "c) Ojibway and Haida", value: "c" },
					{ text: "d) Michif and Mohawk", value: "d" },
				],
				feedback:
					"The most widely spoken Indigenous languages in Canada are Cree and Inuktitut.",
			},
			{
				id: "q4",
				text: "4. When did the <em>Indigenous Languages Act</em> receive Royal Assent?",
				options: [
					{ text: "a) December 2015", value: "a" },
					{ text: "b) June 2019", value: "b", correct: true },
					{ text: "c) June 2021", value: "c" },
					{ text: "d) June 2023", value: "d" },
				],
				feedback: "The correct answer is June 2019.",
			},
			{
				id: "q5",
				text: "5. Who has been mandated to fully implement the Act as a means to preserve, promote and revitalize Indigenous languages in Canada?",
				options: [
					{ text: "a) Commissioner of Indigenous Languages", value: "a" },
					{
						text: "b) Crown-Indigenous Relations and Northern Affairs Canada",
						value: "b",
					},
					{
						text: "c) Minister of Canadian Heritage",
						value: "c",
						correct: true,
					},
					{ text: "d) Indigenous Services Canada", value: "d" },
				],
				feedback: "The correct answer is the Minister of Canadian Heritage.",
			},
			{
				id: "q6",
				text: "6. Which of the following mechanisms in the <em>Indigenous Languages Act</em> are correct?",
				options: [
					{
						text: "a) Establish measures for the provision of long-term, sustainable funding for Indigenous languages",
						value: "a",
					},
					{
						text: "b) Support the reclamation, revitalization, strengthening and maintenance of Indigenous languages in Canada",
						value: "b",
					},
					{
						text: "c) Establish an Office of the Commissioner of Indigenous Languages",
						value: "c",
					},
					{ text: "d) All of the above", value: "d", correct: true },
				],
				feedback:
					"All options listed are correct mechanisms in the <em>Indigenous Languages Act</em>.",
			},
			{
				id: "q7",
				text: "7. The Office of the Commissioner of Indigenous Languages (OCIL) has a mandate to:",
				options: [
					{ text: "a) Help promote Indigenous languages", value: "a" },
					{
						text: "b) Support the efforts of Indigenous Peoples to reclaim, revitalize, maintain and strengthen their languages",
						value: "b",
					},
					{
						text: "c) Facilitate the resolution of disputes and review complaints to the extent provided by the <em>Indigenous Languages Act</em>",
						value: "c",
					},
					{ text: "d) All the above", value: "d", correct: true },
				],
				feedback:
					"All the options listed are part of the mandate of the Office of the Commissioner of Indigenous Languages.",
			},
			{
				id: "q8",
				text: "8. How can public service employees support the objectives of the <em>Indigenous Languages Act</em>?",
				options: [
					{
						text: "a) Encourage the promotion of Indigenous languages",
						value: "a",
					},
					{
						text: "b) Offer services in Indigenous languages as appropriate",
						value: "b",
					},
					{
						text: "c) Translate key documents into Indigenous languages",
						value: "c",
					},
					{
						text: "d) Provide interpretation services in an Indigenous language",
						value: "d",
					},
					{ text: "e) All of the above", value: "e", correct: true },
				],
				feedback:
					"All of the options listed are ways public service employees can support the objectives of the <em>Indigenous Languages Act</em>.",
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
	const [viewResults, setViewResults] = useState(false); // used when 100%
	const [hydrated, setHydrated] = useState(false); // initial render gate
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
		if (!hydrated) return; // avoid saving default empty state before hydration
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

		/* NEW: lightweight flags for non-SCORM contexts (Resources page) */
		try {
			localStorage.setItem("ilc:quizAttempted", "1");
			if (finalScore >= 80) localStorage.setItem("ilc:quizPassed", "1");
		} catch {}

		if (finalScore === 100) setViewResults(false);

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

		// focus first incorrect after grading
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

	// Optional helper mirroring FR (clear only incorrect)
	const resetIncorrect = () => {
		setAnswers((prev) => {
			const next = { ...prev };
			questions.forEach((q) => {
				if (feedback[q.id] === "incorrect") {
					delete next[q.id];
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

	if (!hydrated) {
		// Simple hydrated gate so we don't flash an empty quiz before loading saved state
		return (
			<div className="intro-wrapper knowledge-check-page">
				<header className="hero" role="banner">
					<img src={src} alt="" className="hero-img" aria-hidden="true" />
					<h1 className="hero-title">Knowledge Check</h1>
				</header>
				<main ref={containerRef} className="quiz-container">
					<div className="grade-inline" role="status" aria-live="polite">
						<div className="spinner" aria-hidden="true"></div>
						<div className="spinner-text">Loading…</div>
					</div>
				</main>
			</div>
		);
	}

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

	return (
		<div className="intro-wrapper knowledge-check-page">
			<header className="hero" role="banner">
				<img src={src} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Knowledge Check</h1>
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
														lockThisLabel ? `${t.correct} — locked` : undefined
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
											✓ {t.correct} — this answer is locked.
										</div>
									)}

									{showFeedback && (
										<div className={`feedback ${feedback[q.id]}`}>
											{feedback[q.id] === "correct" ? (
												<p>
													<strong>Correct!</strong>{" "}
													<span
														dangerouslySetInnerHTML={{ __html: q.feedback }}
													/>
												</p>
											) : (
												// 🔒 Do not reveal the correct answer
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
											Submit Answers
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
													title="Re-grade your updated answers"
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
								{t.finalScoreLabel}: {score.toFixed(0)}%
							</h2>
							{score >= 80 ? (
								score === 100 ? (
									<p>You may proceed to the next section.</p>
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
			<nav className="breadcrumb" aria-label="Page navigation">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("results-en");
					}}
				>
					&laquo;&nbsp;Back
				</button>
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("resources");
					}}
				>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default KnowledgeCheck;
