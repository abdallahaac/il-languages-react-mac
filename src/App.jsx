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

import KnowledgeActions from "./components/KnowledgeActions";
import TourModal from "./components/TourModal"; // <- guided tour

// 🔥 Preloader helpers
import { preloadImagesInBatches, preloadImage } from "./utils/imagePreloader";
import { HERO_IMAGES } from "./heroManifest";

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

// Parse helper: handles "Last, First [Middle]" and "First [Middle] Last"
function parseScormName(raw = "") {
	const s = String(raw).trim();
	if (!s) return { firstName: "", lastName: "" };

	// Common SCORM 1.2 format "Last, First Middle"
	if (s.includes(",")) {
		const [last, rest = ""] = s.split(",");
		const [first = ""] = rest.trim().split(/\s+/);
		return { firstName: first, lastName: last.trim() };
	}

	// Fallback "First [Middle] Last"
	const parts = s.split(/\s+/).filter(Boolean);
	if (parts.length === 1) return { firstName: parts[0], lastName: "" };
	return { firstName: parts[0], lastName: parts[parts.length - 1] };
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
			// Support 1.2 and 2004
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

			// 🔎 console logs
			console.log(`[SCORM] raw learner name: "${rawName}"`);
			console.log(`first name: ${f} , last name: ${l}`);

			// Set status using appropriate model
			if (scorm.version === "1.2") {
				console.log("[SCORM] Setting cmi.core.lesson_status = incomplete");
				scorm.set("cmi.core.lesson_status", "incomplete");
			} else {
				console.log("[SCORM] Setting cmi.completion_status = incomplete");
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
		}),
		[lmsConnected, learnerName, firstName, lastName, displayName, scorm]
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
	const [showTour, setShowTour] = useState(false); // <- tour state
	const lang = useLanguage();
	const { scorm, lmsConnected } = useScorm();

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

	// Load all visited IDs (keep across languages)
	useEffect(() => {
		if (!lmsConnected || !scorm) return;
		const suspendData = scorm.get("cmi.suspend_data");
		if (typeof suspendData === "string" && suspendData.length > 0) {
			const loaded = suspendData.split(",").filter(Boolean);
			setVisitedPages(new Set(loaded));
		}
	}, [lmsConnected, scorm]);

	// 🔥 Gather hero URLs for the current language
	const heroUrlsToPreload = useMemo(() => {
		// Prefer sections' own hero field if present
		const fromSections = sections
			.filter((s) => (s.lang === "both" || s.lang === lang) && s.hero)
			.map((s) => s.hero);

		if (fromSections.length) return Array.from(new Set(fromSections));

		// Fallback to manual manifest if no hero fields on sections
		const map = HERO_IMAGES[lang] || {};
		return Array.from(new Set(Object.values(map)));
	}, [lang]);

	// 🔥 Preload all hero images for this language (idle + batched)
	useEffect(() => {
		if (!heroUrlsToPreload.length) return;
		let cancelled = false;
		const run = () => {
			if (cancelled) return;
			preloadImagesInBatches(heroUrlsToPreload, { batchSize: 4, delay: 120 });
		};
		if ("requestIdleCallback" in window) {
			const id = requestIdleCallback(run, { timeout: 1000 });
			return () => {
				cancelled = true;
				try {
					cancelIdleCallback(id);
				} catch {}
			};
		} else {
			const t = setTimeout(run, 100);
			return () => {
				cancelled = true;
				clearTimeout(t);
			};
		}
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

	// Navigation: always record non-home visits + scroll-to-top
	const handleNavigate = (id) => {
		const newPageId = !id || id === "home" ? "home" : id;
		setCurrentPage(newPageId);

		// scroll page to top on navigation
		const reduce =
			typeof window !== "undefined" &&
			window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });

		if (newPageId !== "home") {
			setVisitedPages((prev) => {
				if (prev.has(newPageId)) return prev;
				const next = new Set(prev);
				next.add(newPageId);
				return next;
			});
		}
	};

	// Save ALL visited IDs (don’t lose cross-language progress)
	useEffect(() => {
		if (!lmsConnected || !scorm || !scorm.isActive) return;
		if (visitedPages.size === 0 && !scorm.get("cmi.suspend_data")) return;

		const toSave = [...visitedPages].join(",");
		scorm.set("cmi.suspend_data", toSave);

		// Completion is per-language (based on current filtered total)
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
	}, [visitedPages, visitedTrackableCount, lmsConnected, scorm, totalPages]);

	// Show the tour once (on first visit to home)
	useEffect(() => {
		if (currentPage !== "home") return;
		const seen = localStorage.getItem("tourSeen");
		if (!seen) setShowTour(true);
	}, [currentPage]);

	const closeTour = () => {
		localStorage.setItem("tourSeen", "1");
		setShowTour(false);
	};

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
	const StaticPage = Pages[currentPage];

	// Guided tour steps (EN/FR). Requires:
	//  - .burger-button  on the header menu button
	//  - .fullscreen-nav-links inside the open menu
	//  - .close-menu     on the “X” button
	//  - .content-navigation-container for the sections grid
	const steps =
		lang === "fr"
			? [
					{
						target: null,
						title: "Bienvenue",
						body: "Cette courte visite vous montre comment naviguer: utilisez le menu burger et les contrôles intégrés (pas les boutons du navigateur).",
						scrollToTarget: false,
					},
					{
						target: ".burger-button",
						title: "Menu principal",
						body: "Voici le menu burger. Cliquez pour ouvrir les pages. Nous allons l’ouvrir pour vous à l’étape suivante.",
					},
					{
						target: ".fullscreen-nav-links",
						title: "Toutes les pages",
						body: "Voici la liste des pages accessibles via le menu. Vous pouvez tout parcourir depuis l’interface.",
						onEnter: () => {
							document.querySelector(".burger-button")?.click();
						},
						recalcDelay: 300, // wait for menu animation
					},
					{
						target: null,
						title: "Fermer le menu",
						body: "Le menu se ferme simplement avec le bouton de fermeture (X). Nous allons le fermer maintenant.",
						onEnter: () => {
							const btn = document.querySelector(".close-menu");
							if (btn) btn.click();
						},
						recalcDelay: 250,
					},
					{
						target: ".content-navigation-container",
						title: "Sections du cours",
						body: "Vous pouvez aussi naviguer par ces cartes de sections. Cliquez pour ouvrir une section.",
					},
			  ]
			: [
					{
						target: null,
						title: "Welcome",
						body: "A quick tour: use the burger menu and in-app controls to navigate (no browser back/forward needed).",
						scrollToTarget: false,
					},
					{
						target: ".burger-button",
						title: "Main menu",
						body: "This is the burger menu. Click it to open navigation. We’ll open it for you next.",
					},
					{
						target: ".fullscreen-nav-links",
						title: "All pages",
						body: "These are the pages you can jump to from the menu.",
						onEnter: () => {
							document.querySelector(".burger-button")?.click();
						},
						recalcDelay: 300,
					},
					{
						target: null,
						title: "Close the menu",
						body: "The menu closes with the X button. We’ll close it now.",
						onEnter: () => {
							document.querySelector(".close-menu")?.click();
						},
						recalcDelay: 250,
					},
					{
						target: ".content-navigation-container",
						title: "Course sections",
						body: "You can also navigate via these section cards on the page.",
					},
			  ];

	return (
		<div className="app-wrapper">
			<Header
				onNavigate={handleNavigate}
				currentPage={currentPage}
				lang={lang}
				onPrefetch={preloadPageHero} // ⭐ prefetch on menu hover/focus
			/>
			<main id="main-content" className="main-content">
				{currentPage === "home" ? (
					<>
						<div className="hero-section">
							<Hero onNavigate={handleNavigate} />
						</div>
						<div className="navigation-section">
							<ContentNavigation
								onNavigate={handleNavigate}
								onPrefetch={preloadPageHero} // ⭐ optional: prefetch on grid hover/focus
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
				visitedCount={visitedTrackableCount}
				totalCount={totalPages}
			/>

			{/* Guided Tour */}
			{/* <TourModal steps={steps} isOpen={showTour} onClose={closeTour} /> */}
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
