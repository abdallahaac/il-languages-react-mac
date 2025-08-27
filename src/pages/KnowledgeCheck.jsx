import React, { useState, useMemo } from "react";
import "./KnowledgeCheck.css";
import image from "../assets/check.png";
import BackToTop from "../components/BackToTop";
import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";

const KnowledgeCheck = ({ onNavigate, visitedPages, lang = "en" }) => {
	const url = getHeroURL(lang, "knowledge-check");
	const src = useHeroSrc(url);

	const scorm = useMemo(
		() => (window.pipwerks ? window.pipwerks.SCORM : null),
		[]
	);

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
		if (!visitedPages || typeof visitedPages.has !== "function") {
			return false;
		}
		return requiredPages.every((id) => visitedPages.has(id));
	}, [visitedPages, requiredPages]);

	const lockedText = {
		en: {
			title: "Quiz Locked",
			message:
				"Please review all the material before attempting the knowledge check.",
			button: "Back to Content",
		},
		fr: {
			title: "Questionnaire Verrouillé",
			message:
				"Veuillez consulter tout le matériel des cinq premières sections avant de répondre au questionnaire.",
			button: "Retour au Contenu",
		},
	};
	const currentText = lockedText[lang] || lockedText.en;

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
					{ text: "d) All the above", value: "d", correct: true },
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
					{ text: "d) All are correct", value: "d", correct: true },
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

	const [answers, setAnswers] = useState({});
	const [showFeedback, setShowFeedback] = useState(false);
	const [score, setScore] = useState(0);
	const [feedback, setFeedback] = useState({});

	const handleAnswerChange = (questionId, value) => {
		setAnswers({ ...answers, [questionId]: value });
	};

	const handleSubmit = () => {
		let correctAnswers = 0;
		const newFeedback = {};
		questions.forEach((q) => {
			const correctOption = q.options.find((opt) => opt.correct);
			if (answers[q.id] === correctOption.value) {
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
		if (scorm && scorm.API.isFound()) {
			scorm.set("cmi.core.score.raw", finalScore.toFixed(0));
			scorm.set("cmi.core.score.min", "0");
			scorm.set("cmi.core.score.max", "100");
			scorm.set(
				"cmi.core.lesson_status",
				finalScore === 100 ? "passed" : "failed"
			);
			scorm.save();
		}
	};

	const handleTryAgain = () => {
		setAnswers({});
		setShowFeedback(false);
		setScore(0);
		setFeedback({});
	};

	if (!canAccessQuiz) {
		return (
			<div className="intro-wrapper knowledge-check-page">
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
					<h1 className="hero-title">{currentText.title}</h1>
				</header>

				<main className="quiz-container locked-quiz">
					<p>{currentText.message}</p>
					<button
						className="back-button"
						onClick={() => onNavigate?.("introduction")}
					>
						&laquo;&nbsp;{currentText.button}
					</button>
				</main>
			</div>
		);
	}

	return (
		<div className="intro-wrapper knowledge-check-page">
			<header className="hero" role="banner">
				<img src={image} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">Knowledge Check</h1>
			</header>
			<main className="quiz-container">
				<form id="quiz-form" onSubmit={(e) => e.preventDefault()}>
					{questions.map((q) => (
						<fieldset key={q.id} className="quiz-question">
							<legend
								className="question-text"
								dangerouslySetInnerHTML={{ __html: q.text }}
							/>
							<div className="options">
								{q.options.map((opt) => (
									<label key={opt.value} htmlFor={`${q.id}-${opt.value}`}>
										<input
											type="radio"
											id={`${q.id}-${opt.value}`}
											name={q.id}
											value={opt.value}
											checked={answers[q.id] === opt.value}
											onChange={() => handleAnswerChange(q.id, opt.value)}
											disabled={showFeedback}
										/>
										<span className="custom-radio"></span>
										<span dangerouslySetInnerHTML={{ __html: opt.text }} />
									</label>
								))}
							</div>
							{showFeedback && (
								<div className={`feedback ${feedback[q.id]}`}>
									{feedback[q.id] === "correct" ? (
										<p>
											<strong>Correct!</strong>{" "}
											<span dangerouslySetInnerHTML={{ __html: q.feedback }} />
										</p>
									) : (
										<p>
											<strong>Incorrect.</strong> The correct answer is:{" "}
											<span
												dangerouslySetInnerHTML={{
													__html: q.options.find((o) => o.correct).text,
												}}
											/>
										</p>
									)}
								</div>
							)}
						</fieldset>
					))}
					<div className="quiz-controls">
						{!showFeedback ? (
							<button
								type="button"
								className="submit-button"
								onClick={handleSubmit}
							>
								Submit Answers
							</button>
						) : (
							<button
								type="button"
								id="try-again-btn"
								onClick={handleTryAgain}
								disabled={score === 100}
							>
								Try Again
							</button>
						)}
					</div>
				</form>
				{showFeedback && (
					<div
						id="quiz-results"
						className={score === 100 ? "passed" : "failed"}
					>
						<h2>Your Final Score: {score.toFixed(0)}%</h2>
						<p>
							{score === 100
								? "Congratulations, you passed!"
								: "Please review your answers and try again."}
						</p>
					</div>
				)}
			</main>
			<BackToTop />
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("public-service")}>
					&laquo;&nbsp;Back
				</button>
				<button onClick={() => onNavigate?.("resources")}>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default KnowledgeCheck;
