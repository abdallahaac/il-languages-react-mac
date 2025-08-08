import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	useMemo,
	useRef,
} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ContentNavigation from "./components/ContentNavigation";
import SectionPage from "./components/SectionPage";
import Footer from "./components/Footer";
import sections from "./pages/sectionData";
import "./App.css";

// --- English & French Page Imports ---
import IntroductionPage_EN from "./pages/IntroductionPage";
import FoundationalDocuments_EN from "./pages/FoundationalDocuments";
import IndigenousLanguagesAct_EN from "./pages/IndigenousLanguagesAct";
import RevitalizationEfforts_EN from "./pages/RevitalizationEfforts";
import PublicService_EN from "./pages/PublicService";
import KnowledgeCheck_EN from "./pages/KnowledgeCheck";
import Resources_EN from "./pages/Resources";

import IntroductionPage_FR from "./pages/fr/IntroductionPage";
import FoundationalDocuments_FR from "./pages/fr/FoundationalDocuments";
import IndigenousLanguagesAct_FR from "./pages/fr/IndigenousLanguagesAct";
import RevitalizationEfforts_FR from "./pages/fr/RevitalizationEfforts";
import PublicService_FR from "./pages/fr/PublicService";
import KnowledgeCheck_FR from "./pages/fr/KnowledgeCheck";
import Resources_FR from "./pages/fr/Resources";

// --- useLanguage Hook ---
const useLanguage = () => {
	const [lang, setLang] = useState("en");
	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "lang"
				) {
					setLang(mutation.target.lang || "en");
				}
			});
		});
		observer.observe(document.documentElement, { attributes: true });
		setLang(document.documentElement.lang || "en");
		return () => observer.disconnect();
	}, []);
	return lang;
};

/* ──────────────────────────────────────────────────────────────
   1.  SCORM context & provider
   ────────────────────────────────────────────────────────────── */
const ScormContext = createContext(null);
export const useScorm = () => useContext(ScormContext);

const ScormProvider = ({ children }) => {
	const [lmsConnected, setLmsConnected] = useState(false);
	const [learnerName, setLearnerName] = useState("Learner");
	const scormInitialized = useRef(false);

	const scorm = useMemo(
		() => (window.pipwerks ? window.pipwerks.SCORM : null),
		[]
	);

	useEffect(() => {
		if (scormInitialized.current || !scorm) return;
		scormInitialized.current = true;
		if (!scorm.API.isFound()) {
			console.error("SCORM API not found.");
			return;
		}
		const connected = scorm.init();
		setLmsConnected(connected);
		if (connected) {
			const name = scorm.get("cmi.core.student_name");
			if (name) setLearnerName(name);
			scorm.set("cmi.core.lesson_status", "incomplete");
			scorm.save();
		}
		const unload = () => scorm.isActive && scorm.quit();
		window.addEventListener("beforeunload", unload);
		return () => {
			window.removeEventListener("beforeunload", unload);
			unload();
		};
	}, [scorm]);

	const contextValue = useMemo(
		() => ({
			lmsConnected,
			learnerName,
			scorm,
		}),
		[lmsConnected, learnerName, scorm]
	);

	return (
		<ScormContext.Provider value={contextValue}>
			{children}
		</ScormContext.Provider>
	);
};

/* ──────────────────────────────────────────────────────────────
   2.  Main application
   ────────────────────────────────────────────────────────────── */
function App() {
	const [currentPage, setCurrentPage] = useState("home");
	const [visitedPages, setVisitedPages] = useState(new Set());
	const lang = useLanguage();
	const { scorm, lmsConnected } = useScorm();

	const trackablePages = useMemo(() => sections.map((s) => s.id), []);
	const totalPages = trackablePages.length;

	useEffect(() => {
		if (lmsConnected) {
			const suspendData = scorm.get("cmi.suspend_data");
			if (
				suspendData &&
				typeof suspendData === "string" &&
				suspendData.length > 0
			) {
				const loadedPages = new Set(suspendData.split(","));
				setVisitedPages(loadedPages);
			}
		}
	}, [lmsConnected, scorm]);

	const handleNavigate = (id) => {
		const newPageId = !id || id === "home" ? "home" : id;
		setCurrentPage(newPageId);

		if (trackablePages.includes(newPageId) && !visitedPages.has(newPageId)) {
			setVisitedPages((prevVisited) => new Set(prevVisited).add(newPageId));
		}
	};

	useEffect(() => {
		if (lmsConnected && scorm.isActive) {
			if (visitedPages.size === 0 && !scorm.get("cmi.suspend_data")) return;

			const visitedPagesString = Array.from(visitedPages).join(",");
			scorm.set("cmi.suspend_data", visitedPagesString);

			if (visitedPages.size >= totalPages) {
				scorm.set("cmi.core.lesson_status", "completed");
			} else {
				scorm.set("cmi.core.lesson_status", "incomplete");
			}
			scorm.save();
		}
	}, [visitedPages, lmsConnected, scorm, totalPages]);

	const currentSection = sections.find((s) => s.id === currentPage);

	const Pages_EN = {
		introduction: IntroductionPage_EN,
		"foundational-documents": FoundationalDocuments_EN,
		"indigenous-languages-act": IndigenousLanguagesAct_EN,
		"revitalization-efforts": RevitalizationEfforts_EN,
		"public-service": PublicService_EN,
		"knowledge-check": KnowledgeCheck_EN,
		resources: Resources_EN,
	};
	const Pages_FR = {
		introduction: IntroductionPage_FR,
		"foundational-documents": FoundationalDocuments_FR,
		"indigenous-languages-act": IndigenousLanguagesAct_FR,
		"revitalization-efforts": RevitalizationEfforts_FR,
		"public-service": PublicService_FR,
		"knowledge-check": KnowledgeCheck_FR,
		resources: Resources_FR,
	};
	const Pages = lang === "fr" ? Pages_FR : Pages_EN;
	const StaticPage = Pages[currentPage];

	return (
		<div className="app-wrapper">
			<Header onNavigate={handleNavigate} currentPage={currentPage} />
			<main id="main-content" className="main-content">
				{currentPage === "home" ? (
					<>
						<div className="hero-section">
							<Hero onNavigate={handleNavigate} />
						</div>
						<div className="navigation-section">
							<ContentNavigation onNavigate={handleNavigate} />
						</div>
					</>
				) : StaticPage ? (
					<StaticPage
						onNavigate={handleNavigate}
						visitedPages={visitedPages}
						lang={lang}
					/>
				) : (
					<SectionPage section={currentSection} />
				)}
			</main>
			<Footer
				lang={lang}
				visitedCount={visitedPages.size}
				totalCount={totalPages}
			/>
		</div>
	);
}

/* ──────────────────────────────────────────────────────────────
   3.  Export wrapped in the SCORM provider
   ────────────────────────────────────────────────────────────── */
export default function ScormEnabledApp() {
	return (
		<ScormProvider>
			<App />
		</ScormProvider>
	);
}
