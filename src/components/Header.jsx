import React, { useState, useEffect } from "react";
import { useScorm } from "../App";
import "./Header.css";
import logo from "../assets/logo.svg";

/* ——— tiny helper to follow <html lang=""> live ——— */
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

	/* ——— nav labels by language ——— */
	const navLinks = isFR
		? [
				{ label: "Accueil", id: "home" },
				{ label: "Introduction et aperçu", id: "introduction" },
				{ label: "Documents fondamentaux", id: "foundational-documents" },
				{
					label: "<em>Loi sur les langues autochtones</em>",
					id: "indigenous-languages-act",
				},
				{
					label: "Efforts pour revitaliser les langues autochtones",
					id: "revitalization-efforts",
				},
				{
					label: "Implications pour la fonction publique",
					id: "public-service",
				},
				{ label: "Vérification des connaissances", id: "knowledge-check" },
				{ label: "Ressources", id: "resources" },
				{ label: "Rétroaction", id: "feedback" },
		  ]
		: [
				{ label: "Home", id: "home" },
				{ label: "Introduction and overview", id: "introduction" },
				{ label: "Foundational Documents", id: "foundational-documents" },
				{ label: "Indigenous Languages Act", id: "indigenous-languages-act" },
				{
					label: "Efforts to revitalize Indigenous languages",
					id: "revitalization-efforts",
				},
				{
					label: "What this means for the public service",
					id: "public-service",
				},
				{ label: "Knowledge Check", id: "knowledge-check" },
				{ label: "Resources", id: "resources" },
				{ label: "Feedback", id: "feedback" },
		  ];

	/* ——— scroll / menu effects ——— */
	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
		return () => {
			window.removeEventListener("scroll", handleScroll);
			document.body.style.overflow = "auto";
		};
	}, [isMenuOpen]);

	/* ——— navigation click ——— */
	const handleNavClick = (id, e) => {
		e.preventDefault();
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
								{isFR ? "Apprentissage autochtone" : "Indigenous Learning"}
							</span>
						</a>
					</div>

					<div className="welcome-message">
						{isFR ? `Bienvenue, ${learnerName} !` : `Welcome, ${learnerName}!`}
					</div>

					<div className="header-right">
						<button
							className="burger-menu"
							onClick={() => setIsMenuOpen(true)}
							aria-label={isFR ? "Ouvrir le menu" : "Open navigation menu"}
							aria-expanded={isMenuOpen}
						>
							{/* burger icon */}
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

			{/* ——— Full-screen menu ——— */}
			<nav
				className={`fullscreen-nav ${isMenuOpen ? "open" : ""}`}
				aria-hidden={!isMenuOpen}
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

					<div className="fullscreen-nav-links">
						{navLinks.map(({ label, id }) => (
							<a
								key={id}
								href="#"
								onClick={(e) => handleNavClick(id, e)}
								className={
									currentPage === id ||
									(id === "home" && currentPage === "home")
										? "active"
										: ""
								}
								// render HTML so <em> is parsed
								dangerouslySetInnerHTML={{ __html: label }}
							/>
						))}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
