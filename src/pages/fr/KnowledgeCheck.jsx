import React, { useState, useMemo } from "react";
import "../KnowledgeCheck.css"; // Using the same stylesheet as the English version
import image from "../../assets/check.png";
import BackToTop from "../../components/BackToTop";

// Updated to accept visitedPages and lang props
const KnowledgeCheck_fr = ({ onNavigate, visitedPages, lang = "fr" }) => {
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

	// Check if the user has visited all required pages
	const canAccessQuiz = useMemo(() => {
		if (!visitedPages || typeof visitedPages.has !== "function") {
			return false;
		}
		return requiredPages.every((id) => visitedPages.has(id));
	}, [visitedPages, requiredPages]);

	// Translations for the locked message
	const lockedText = {
		en: {
			title: "Quiz Locked",
			message:
				"Please review all the material  before attempting the knowledge check.",
			button: "Back to Content",
		},
		fr: {
			title: "Questionnaire Verrouillé",
			message:
				"Veuillez consulter tout le contenu avant de répondre au questionnaire.",
			button: "Retour au Contenu",
		},
	};
	const currentText = lockedText[lang] || lockedText.fr;

	// The rest of your existing state and functions
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
					"La bonne réponse est le ou la ministre du Patrimoine canadien.",
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
				feedback:
					"Toutes les options énumérées sont des mécanismes prévus dans la<em> Loi sur les langues autochtones</em>.",
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
				feedback:
					"Toutes les options énumérées font partie du mandat du Bureau du commissaire aux langues autochtones.",
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
				feedback:
					"Toutes les options énumérées sont des façons dont les fonctionnaires peuvent appuyer les objectifs de la<em> Loi sur les langues autochtones</em>.",
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

	// Conditionally render the locked message if prerequisites are not met
	if (!canAccessQuiz) {
		return (
			<div className="intro-wrapper knowledge-check-page">
				<header className="hero" role="banner">
					<img
						loading="lazy"
						src={image}
						alt=""
						className="hero-img"
						aria-hidden="true"
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

	// Render the quiz if it's accessible
	return (
		<div className="intro-wrapper knowledge-check-page">
			<header className="hero" role="banner">
				<img
					loading="lazy"
					src={image}
					alt=""
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">Vérification des connaissances</h1>
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
											<strong>Correct !</strong>{" "}
											<span dangerouslySetInnerHTML={{ __html: q.feedback }} />
										</p>
									) : (
										<p>
											<strong>Incorrect.</strong> La bonne réponse est :{" "}
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
								Soumettre les réponses
							</button>
						) : (
							<button
								type="button"
								id="try-again-btn"
								onClick={handleTryAgain}
								disabled={score === 100}
							>
								Réessayer
							</button>
						)}
					</div>
				</form>

				{showFeedback && (
					<div
						id="quiz-results"
						className={score === 100 ? "passed" : "failed"}
					>
						<h2>Votre score final : {score.toFixed(0)}%</h2>
						<p>
							{score === 100
								? "Félicitations, vous avez réussi !"
								: "Veuillez revoir vos réponses et réessayer."}
						</p>
					</div>
				)}
			</main>

			<BackToTop />
			<nav className="breadcrumb" aria-label="Navigation de la page">
				<button
					onClick={() => {
						window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
						onNavigate?.("public-service");
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
