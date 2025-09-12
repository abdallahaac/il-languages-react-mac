// src/App.jsx
import React, {
	useState,
	useEffect,
	createContext,
	useContext,
	useMemo,
	useRef,
	useCallback,
} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ContentNavigation from "./components/ContentNavigation";
import SectionPage from "./components/SectionPage";
import Footer from "./components/Footer";
import sections from "./pages/sectionData";
import "./App.css";
import "./typography.css";
import HeadPreloads from "./meta/HeadPreloads";
// --- English & French Page Imports ---
import IntroductionPage_EN from "./pages/IntroductionPage";
import FoundationalDocuments_EN from "./pages/FoundationalDocuments";
import IndigenousLanguagesAct_EN from "./pages/IndigenousLanguagesAct";
import RevitalizationEfforts_EN from "./pages/RevitalizationEfforts";
import PublicService_EN from "./pages/PublicService";
import KnowledgeCheck_EN from "./pages/KnowledgeCheck";
import Resources_EN from "./pages/Resources";
import Objective_EN from "./pages/Objective.jsx";
import Voices_EN from "./pages/Voices.jsx";
import Languages_EN from "./pages/Languages.jsx";
import Results_EN from "./pages/Results.jsx";

import IntroductionPage_FR from "./pages/fr/IntroductionPage";
import FoundationalDocuments_FR from "./pages/fr/FoundationalDocuments";
import IndigenousLanguagesAct_FR from "./pages/fr/IndigenousLanguagesAct";
import RevitalizationEfforts_FR from "./pages/fr/RevitalizationEfforts";
import PublicService_FR from "./pages/fr/PublicService";
import KnowledgeCheck_FR from "./pages/fr/KnowledgeCheck";
import Resources_FR from "./pages/fr/Resources";
import Objective_FR from "./pages/fr/Objective.jsx";
import Voices_FR from "./pages/fr/Voices.jsx";
import Languages_FR from "./pages/fr/languages.jsx";
import Results_FR from "./pages/fr/Results.jsx";
import { preloadAll } from "./utils/imagePreloader";

import KnowledgeActions from "./components/KnowledgeActions";
// import TourModal from "./components/TourModal"; // <- guided tour (optional)

// 🔥 Preloader helpers
import { preloadImagesInBatches, preloadImage } from "./utils/imagePreloader";
import { HERO_IMAGES } from "./heroManifest";

/* ──────────────────────────────────────────────────────────────
   useLanguage Hook
   ────────────────────────────────────────────────────────────── */
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
   SCORM context & provider (+ suspend_data helpers)
   ────────────────────────────────────────────────────────────── */
const ScormContext = createContext(null);
export const useScorm = () => useContext(ScormContext);

// Parse helper: handles "Last, First [Middle]" and "First [Middle] Last"
function parseScormName(raw = "") {
	const s = String(raw).trim();
	if (!s) return { firstName: "", lastName: "" };
	if (s.includes(",")) {
		const [last, rest = ""] = s.split(",");
		const [first = ""] = rest.trim().split(/\s+/);
		return { firstName: first, lastName: last.trim() };
	}
	const parts = s.split(/\s+/).filter(Boolean);
	if (parts.length === 1) return { firstName: parts[0], lastName: "" };
	return { firstName: parts[0], lastName: parts[parts.length - 1] };
}

// safe JSON
function safeParseJSON(s) {
	try {
		return JSON.parse(String(s || "{}"));
	} catch {
		return {};
	}
}
function safeStringifyJSON(obj) {
	try {
		return JSON.stringify(obj);
	} catch {
		return "{}";
	}
}

const ScormProvider = ({ children }) => {
	const [lmsConnected, setLmsConnected] = useState(false);
	const [learnerName, setLearnerName] = useState("Learner"); // raw from LMS
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [displayName, setDisplayName] = useState("Learner"); // First Last
	const scormInitialized = useRef(false);

	const scorm = useMemo(
		() => (window.pipwerks ? window.pipwerks.SCORM : null),
		[]
	);

	// ── suspend_data helpers exposed via context ─────────────────
	const readSuspend = useMemo(() => {
		return () => {
			if (!scorm || !scorm.API?.isFound?.()) return null;
			const raw = scorm.get("cmi.suspend_data") || "";
			const parsed = safeParseJSON(raw);
			return {
				visited: Array.isArray(parsed.visited) ? parsed.visited : [],
				quiz: typeof parsed.quiz === "object" && parsed.quiz ? parsed.quiz : {},
			};
		};
	}, [scorm]);

	const writeSuspend = useMemo(() => {
		return (patch) => {
			if (!scorm || !scorm.API?.isFound?.()) return false;
			const current = readSuspend?.() || { visited: [], quiz: {} };
			const next = {
				visited: Array.isArray(patch?.visited)
					? patch.visited
					: current.visited,
				quiz: { ...(current.quiz || {}), ...(patch?.quiz || {}) },
			};
			scorm.set("cmi.suspend_data", safeStringifyJSON(next));
			scorm.save?.();
			return true;
		};
	}, [scorm, readSuspend]);

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
			const nameKey =
				scorm.version === "1.2" ? "cmi.core.student_name" : "cmi.learner_name";

			const rawName = scorm.get(nameKey) || "";
			setLearnerName(rawName);

			const { firstName: f, lastName: l } = parseScormName(rawName);
			setFirstName(f);
			setLastName(l);
			setDisplayName(
				([f, l].filter(Boolean).join(" ") || rawName || "Learner").trim()
			);

			// set incomplete at launch
			if (scorm.version === "1.2") {
				scorm.set("cmi.core.lesson_status", "incomplete");
			} else {
				scorm.set("cmi.completion_status", "incomplete");
			}
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
			learnerName, // raw
			firstName,
			lastName,
			displayName, // First Last
			scorm,
			readSuspend,
			writeSuspend,
		}),
		[
			lmsConnected,
			learnerName,
			firstName,
			lastName,
			displayName,
			scorm,
			readSuspend,
			writeSuspend,
		]
	);

	return (
		<ScormContext.Provider value={contextValue}>
			{children}
		</ScormContext.Provider>
	);
};

/* ──────────────────────────────────────────────────────────────
   “Not Found / Language Restricted” page
   ────────────────────────────────────────────────────────────── */
const NotFound = ({ onNavigate, lang = "en", badId = "" }) => {
	const msg =
		lang === "fr"
			? "Page introuvable ou non disponible dans cette langue."
			: "Page not found or not available in this language.";
	const label = lang === "fr" ? "Retour à l’accueil" : "Back to home";

	return (
		<div className="intro-wrapper">
			<header className="hero" role="banner">
				<h1 className="hero-title">404</h1>
			</header>
			<main className="quiz-container">
				<p style={{ marginBottom: "1rem" }}>
					{msg} {badId ? <em>({badId})</em> : null}
				</p>
				<button className="back-button" onClick={() => onNavigate?.("home")}>
					&laquo;&nbsp;{label}
				</button>
			</main>
		</div>
	);
};

/* ──────────────────────────────────────────────────────────────
   Main application
   ────────────────────────────────────────────────────────────── */
function App() {
	// current page (hash-first; fallback to localStorage)
	const [currentPage, setCurrentPage] = useState("home");
	const [badHash, setBadHash] = useState(""); // for 404 display
	const [visitedPages, setVisitedPages] = useState(() => {
		try {
			const raw = localStorage.getItem("ilc:visited");
			if (raw) {
				const arr = JSON.parse(raw);
				if (Array.isArray(arr)) return new Set(arr);
			}
		} catch {}
		return new Set();
	});
	const [hydrated, setHydrated] = useState(false);

	const lang = useLanguage();
	const { scorm, lmsConnected, readSuspend, writeSuspend } = useScorm();

	// 🚫 Prevent browser back navigation from leaving the course (keeps user in the SCO)
	useEffect(() => {
		const handlePopState = () => {
			window.history.pushState(null, document.title, window.location.href);
		};
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	// Helpers: language gating & section lookup
	const getSection = useCallback((id) => sections.find((s) => s.id === id), []);
	const isAllowedForLang = useCallback(
		(sec) => (!sec ? false : sec.lang === "both" || sec.lang === lang),
		[lang]
	);

	// Hash router: apply the current hash to state (with language guard)
	const applyHashRoute = useCallback(() => {
		const raw = (window.location.hash || "").replace(/^#/, "").trim();
		const id = raw || "home";

		if (id === "home") {
			setBadHash("");
			setCurrentPage("home");
			try {
				localStorage.setItem("ilc:lastPage", "home");
			} catch {}
			return;
		}

		const sec = getSection(id);
		if (sec && isAllowedForLang(sec)) {
			setBadHash("");
			setCurrentPage(id);
			try {
				localStorage.setItem("ilc:lastPage", id);
			} catch {}
		} else {
			// 404 / language restricted
			setBadHash(id);
			setCurrentPage("__404__");
			try {
				localStorage.setItem("ilc:lastPage", "home");
			} catch {}
		}
	}, [getSection, isAllowedForLang]);

	// Initial hydration: merge SCORM suspend_data, then route from hash (or lastPage)
	useEffect(() => {
		try {
			const data = readSuspend?.();
			if (data && Array.isArray(data.visited) && data.visited.length) {
				setVisitedPages((prev) => {
					const next = new Set(prev);
					data.visited.forEach((id) => next.add(id));
					return next;
				});
			}
		} catch {}
		// prefer hash if present
		const hasHash = (window.location.hash || "").length > 1;
		if (hasHash) {
			applyHashRoute();
		} else {
			// fallback to lastPage
			try {
				const last = localStorage.getItem("ilc:lastPage") || "home";
				window.location.hash = last === "home" ? "" : `#${last}`;
			} catch {
				window.location.hash = "";
			}
			applyHashRoute();
		}
		setHydrated(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lmsConnected]);

	// Listen to hash changes (manual URL edits / back-forward within hash history)
	useEffect(() => {
		const onHash = () => applyHashRoute();
		window.addEventListener("hashchange", onHash);
		return () => window.removeEventListener("hashchange", onHash);
	}, [applyHashRoute]);

	// Trackable pages for CURRENT language (plus shared "both")
	const trackablePages = useMemo(
		() =>
			sections
				.filter((s) => s.lang === "both" || s.lang === lang)
				.map((s) => s.id),
		[lang]
	);

	const totalPages = trackablePages.length;

	// Intersection for display/completion
	const visitedTrackableCount = useMemo(
		() => [...visitedPages].filter((id) => trackablePages.includes(id)).length,
		[visitedPages, trackablePages]
	);

	// If current page becomes invalid after a language switch, show 404
	useEffect(() => {
		if (currentPage === "__404__") return;
		if (currentPage === "home") return;
		const sec = getSection(currentPage);
		if (!sec || !isAllowedForLang(sec)) {
			setBadHash(currentPage);
			setCurrentPage("__404__");
		}
	}, [lang, currentPage, getSection, isAllowedForLang]);

	// 🔥 Preload heroes for current language
	const heroUrlsToPreload = useMemo(() => {
		const fromSections = sections
			.filter((s) => (s.lang === "both" || s.lang === lang) && s.hero)
			.map((s) => s.hero);
		if (fromSections.length) return Array.from(new Set(fromSections));
		const map = HERO_IMAGES[lang] || {};
		return Array.from(new Set(Object.values(map)));
	}, [lang]);

	useEffect(() => {
		if (!heroUrlsToPreload.length) return;
		preloadAll(heroUrlsToPreload);
	}, [heroUrlsToPreload]);

	// Optional: warm a specific page on hover/focus
	const preloadPageHero = useCallback(
		(pageId) => {
			const sec = sections.find((s) => s.id === pageId);
			if (sec?.hero) return preloadImage(sec.hero);
			const src = (HERO_IMAGES[lang] || {})[pageId];
			if (src) return preloadImage(src);
		},
		[lang]
	);

	// Navigation: update hash (source of truth), record visits (non-home)
	const handleNavigate = (id) => {
		const newPageId = !id || id === "home" ? "home" : id;

		// set hash (this will call applyHashRoute via hashchange handler)
		if (newPageId === "home") {
			window.location.hash = "";
		} else {
			window.location.hash = `#${newPageId}`;
		}

		// record visited only for valid pages (applyHashRoute sets currentPage)
		if (newPageId !== "home") {
			setVisitedPages((prev) => {
				if (prev.has(newPageId)) return prev;
				const next = new Set(prev);
				next.add(newPageId);
				return next;
			});
		}

		// scroll page to top on navigation
		const reduce =
			typeof window !== "undefined" &&
			window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
	};

	// Persist visited to localStorage + SCORM suspend_data
	useEffect(() => {
		try {
			localStorage.setItem("ilc:visited", JSON.stringify([...visitedPages]));
		} catch {}
		try {
			writeSuspend?.({ visited: [...visitedPages] });
		} catch {}
	}, [visitedPages, writeSuspend]);

	// Save completion to SCORM
	useEffect(() => {
		if (!lmsConnected || !scorm || !scorm.isActive) return;
		if (scorm.version === "1.2") {
			scorm.set(
				"cmi.core.lesson_status",
				visitedTrackableCount >= totalPages ? "completed" : "incomplete"
			);
		} else {
			scorm.set(
				"cmi.completion_status",
				visitedTrackableCount >= totalPages ? "completed" : "incomplete"
			);
		}
		scorm.save();
	}, [visitedTrackableCount, lmsConnected, scorm, totalPages]);

	// (Optional) Guided tour
	// const [showTour, setShowTour] = useState(false);
	// useEffect(() => {
	//   if (currentPage !== "home") return;
	//   const seen = localStorage.getItem("tourSeen");
	//   if (!seen) setShowTour(true);
	// }, [currentPage]);
	// const closeTour = () => {
	//   localStorage.setItem("tourSeen", "1");
	//   setShowTour(false);
	// };

	const currentSection = sections.find((s) => s.id === currentPage);

	const Pages_EN = {
		introduction: IntroductionPage_EN,
		"objective-en": Objective_EN,
		"voices-en": Voices_EN,
		"languages-en": Languages_EN,
		"results-en": Results_EN,
		"foundational-documents": FoundationalDocuments_EN,
		"indigenous-languages-act": IndigenousLanguagesAct_EN,
		"revitalization-efforts": RevitalizationEfforts_EN,
		"public-service": PublicService_EN,
		"knowledge-check": KnowledgeCheck_EN,
		resources: Resources_EN,
	};

	const Pages_FR = {
		introduction: IntroductionPage_FR,
		"objective-fr": Objective_FR,
		"voices-fr": Voices_FR,
		"languages-fr": Languages_FR,
		"results-fr": Results_FR,
		"foundational-documents": FoundationalDocuments_FR,
		"indigenous-languages-act": IndigenousLanguagesAct_FR,
		"revitalization-efforts": RevitalizationEfforts_FR,
		"public-service": PublicService_FR,
		"knowledge-check": KnowledgeCheck_FR,
		resources: Resources_FR,
	};

	const Pages = lang === "fr" ? Pages_FR : Pages_EN;
	const StaticPage = currentPage !== "__404__" ? Pages[currentPage] : null;

	return (
		<div className="app-wrapper">
			<Header
				onNavigate={handleNavigate}
				currentPage={currentPage === "__404__" ? "home" : currentPage}
				lang={lang}
				onPrefetch={preloadPageHero}
			/>
			<main id="main-content" className="main-content">
				{currentPage === "__404__" ? (
					<NotFound onNavigate={handleNavigate} lang={lang} badId={badHash} />
				) : currentPage === "home" ? (
					<>
						<div className="hero-section">
							<Hero onNavigate={handleNavigate} />
						</div>
						<div className="navigation-section">
							<ContentNavigation
								onNavigate={handleNavigate}
								onPrefetch={preloadPageHero}
							/>
							<KnowledgeActions onNavigate={handleNavigate} />
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
				visitedCount={hydrated ? visitedTrackableCount : 0}
				totalCount={totalPages}
			/>

			{/* Guided Tour (optional) */}
			{/* <TourModal steps={steps} isOpen={showTour} onClose={closeTour} /> */}
		</div>
	);
}

/* ──────────────────────────────────────────────────────────────
   Export wrapped in the SCORM provider
   ────────────────────────────────────────────────────────────── */
export default function ScormEnabledApp() {
	return (
		<ScormProvider>
			<App />
		</ScormProvider>
	);
}
