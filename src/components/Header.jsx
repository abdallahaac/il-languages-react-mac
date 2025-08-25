import React, { useState, useEffect, useRef } from "react";
import { useScorm } from "../App";
import "./Header.css";
import logo from "../assets/logo.svg";

/* ——— follow <html lang=""> live ——— */
const useLanguage = () => {
	const [lang, setLang] = useState(
		(document.documentElement.lang || "en").toLowerCase()
	);
	useEffect(() => {
		const obs = new MutationObserver((m) => {
			m.forEach((mu) => {
				if (mu.type === "attributes" && mu.attributeName === "lang") {
					setLang((mu.target.lang || "en").toLowerCase());
				}
			});
		});
		obs.observe(document.documentElement, { attributes: true });
		return () => obs.disconnect();
	}, []);
	return lang;
};

const Header = ({ onNavigate, currentPage, lang: langProp }) => {
	const lang = (langProp || useLanguage()).toLowerCase();
	const isFR = lang === "fr";

	const [scrolled, setScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { learnerName } = useScorm();
	const firstLinkRef = useRef(null);

	// External feedback link
	const feedbackUrl =
		"https://airtable.com/appiWB5orohCHzA35/shrfyFm9N7HuQBhe8";

	// ---------------- NAV LINKS ----------------
	const navLinksEN = [
		{ label: "Home", id: "home" },
		{ label: "Introduction and overview", id: "introduction" },
		{ label: "Learning Objectives", id: "objective-en" },
		{ label: "Foundational Documents", id: "foundational-documents" },
		{ label: "Indigenous Languages Act", id: "indigenous-languages-act" },
		{
			label: "Efforts to revitalize Indigenous languages",
			id: "revitalization-efforts",
		},
		{ label: "What this means for the public service", id: "public-service" },
		{ label: "Knowledge Check", id: "knowledge-check" },
		{ label: "Resources", id: "resources" },
		{ label: "Feedback", id: "feedback", url: feedbackUrl, isExternal: true },
	];

	// FR pages (includes your new sections)
	const navLinksFR = [
		{ label: "Accueil", id: "home" },
		{ label: "Introduction et aperçu", id: "introduction" },
		{ label: "Objectifs d’apprentissage", id: "objective-fr" },
		{ label: "Voix Autochtones", id: "voices-fr" },
		{ label: "Survol des langues autochtones", id: "languages-fr" },
		{ label: "Résultats d’apprentissage", id: "results-fr" },
		{ label: "Documents fondamentaux", id: "foundational-documents" },
		{
			label: "<em>Loi sur les langues autochtones</em>",
			id: "indigenous-languages-act",
		},
		{
			label: "Efforts pour revitaliser les langues autochtones",
			id: "revitalization-efforts",
		},
		{ label: "Implications pour la fonction publique", id: "public-service" },
		{ label: "Vérification des connaissances", id: "knowledge-check" },
		{ label: "Ressources", id: "resources" },
		{
			label: "Rétroaction",
			id: "feedback",
			url: feedbackUrl,
			isExternal: true,
		},
	];

	const navLinks = isFR ? navLinksFR : navLinksEN;

	// ----- header shadow on scroll + BODY SCROLL LOCK when menu open -----
	const scrollYRef = useRef(0);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", onScroll);

		if (isMenuOpen) {
			// lock the page (iOS-friendly)
			scrollYRef.current = window.scrollY || window.pageYOffset || 0;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollYRef.current}px`;
			document.body.style.left = "0";
			document.body.style.right = "0";
			document.body.style.width = "100%";
			document.body.style.overflow = "hidden";
		} else {
			// restore page scroll position
			const y = -parseInt(document.body.style.top || "0", 10) || 0;
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.left = "";
			document.body.style.right = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
			window.scrollTo(0, y);
		}

		return () => {
			window.removeEventListener("scroll", onScroll);
			// cleanup if unmounted while open
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.left = "";
			document.body.style.right = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	// focus first link when menu opens; Esc closes
	useEffect(() => {
		if (!isMenuOpen) return;
		const t = setTimeout(() => {
			const firstLink =
				firstLinkRef.current ||
				document.querySelector("#app-nav .fullscreen-nav-links a");
			if (firstLink) firstLink.focus();
		}, 50);

		const onKey = (e) => {
			if (e.key === "Escape") setIsMenuOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			clearTimeout(t);
			window.removeEventListener("keydown", onKey);
		};
	}, [isMenuOpen]);

	// navigation click
	const handleNavClick = (id, e) => {
		e.preventDefault();
		if (!id) return;
		if (id === "feedback") return; // external link handled by <a>
		setIsMenuOpen(false);
		onNavigate?.(id);
	};

	return (
		<>
			<header className={`main-header ${scrolled ? "scrolled" : ""}`}>
				<a href="#main-content" className="skip-link">
					{isFR ? "Aller au contenu principal" : "Skip to main content"}
				</a>

				<div className="header-content">
					<div className="header-left">
						<a
							href="#"
							className="logo-link"
							onClick={(e) => {
								e.preventDefault();
								onNavigate?.("home");
							}}
						>
							<img
								src={logo}
								alt={
									isFR
										? "Logo Apprentissage autochtone"
										: "Indigenous Learning Logo"
								}
								className="header-logo"
							/>
							<span>
								{isFR
									? "Apprentissage sur les réalités autochtones"
									: "Indigenous Learning"}
							</span>
						</a>
					</div>

					<div className="welcome-message">
						{isFR ? `Bienvenue, ${learnerName} !` : `Welcome, ${learnerName}!`}
					</div>

					<div className="header-right">
						<button
							className="burger-button burger-menu"
							onClick={() => setIsMenuOpen(true)}
							aria-label={isFR ? "Ouvrir le menu" : "Open navigation menu"}
							aria-expanded={isMenuOpen}
							aria-controls="app-nav"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
						</button>
					</div>
				</div>
			</header>

			<nav
				id="app-nav"
				className={`fullscreen-nav ${isMenuOpen ? "open" : ""}`}
				aria-hidden={!isMenuOpen}
				role="dialog"
				aria-modal="true"
				aria-label={isFR ? "Menu de navigation" : "Navigation menu"}
			>
				<div className="fullscreen-nav-panel">
					<div className="fullscreen-nav-header">
						<button
							className="close-menu"
							onClick={() => setIsMenuOpen(false)}
							aria-label={isFR ? "Fermer le menu" : "Close navigation menu"}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>

					<div className="fullscreen-nav-links" role="menu">
						{navLinks.map(({ label, id, url, isExternal }, idx) => {
							if (isExternal && url) {
								return (
									<a
										key={id}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										role="menuitem"
										dangerouslySetInnerHTML={{ __html: label }}
									/>
								);
							}
							return (
								<a
									key={id}
									href="#"
									role="menuitem"
									ref={idx === 0 ? firstLinkRef : undefined}
									onClick={(e) => handleNavClick(id, e)}
									className={currentPage === id ? "active" : ""}
									dangerouslySetInnerHTML={{ __html: label }}
								/>
							);
						})}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
