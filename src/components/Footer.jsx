import React from "react";
import "./Footer.css";

const Footer = ({ lang = "en", visitedCount = 0, totalCount = 0 }) => {
	// Translations for the tracker text
	const trackerText = {
		en: `Visited ${visitedCount} of ${totalCount}`,
		fr: `Visité ${visitedCount} sur ${totalCount}`,
	};

	// Feedback link text
	const linkText = {
		en: "Feedback",
		fr: "Rétroaction",
	};

	return (
		<footer className="app-footer">
			{/* Left: Feedback (desktop); becomes row 2 on mobile */}
			<div className="footer-content-left">
				<div className="feedback-container">
					<div className="feedback-icon" aria-hidden="true">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							role="img"
							aria-label="Feedback"
						>
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						</svg>
					</div>

					<a
						href="https://airtable.com/appiWB5orohCHzA35/shrfyFm9N7HuQBhe8"
						target="_blank"
						rel="noopener noreferrer"
						className="feedback-link"
					>
						{linkText[lang]}
					</a>
				</div>
			</div>

			{/* Center: Page tracker (desktop); becomes row 1 on mobile */}
			<div className="footer-content-center">
				{totalCount > 0 && (
					<span className="page-tracker" aria-live="polite">
						{trackerText[lang]}
					</span>
				)}
			</div>

			{/* Right spacer for balance on desktop */}
			<div className="footer-content-right" />
		</footer>
	);
};

export default Footer;
