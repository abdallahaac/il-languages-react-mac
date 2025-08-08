import React from "react";
import "./Footer.css";

const Footer = ({ lang = "en", visitedCount = 0, totalCount = 0 }) => {
	// Translations for the tracker text
	const trackerText = {
		en: `Visited ${visitedCount} of ${totalCount}`,
		fr: `Visité ${visitedCount} sur ${totalCount}`,
	};

	return (
		<footer className="app-footer">
			{/* Left-aligned content */}
			<div className="footer-content-left">
				<div className="feedback-container">
					<div className="feedback-icon">
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
						>
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						</svg>
					</div>
					<a href="#" className="feedback-link">
						Feedback
					</a>
				</div>
			</div>

			{/* Center-aligned content: The Page Tracker */}
			<div className="footer-content-center">
				{/* Only show the tracker if there are pages to track */}
				{totalCount > 0 && (
					<span className="page-tracker">{trackerText[lang]}</span>
				)}
			</div>

			{/* Right-aligned content (placeholder for symmetrical layout) */}
			<div className="footer-content-right"></div>
		</footer>
	);
};

export default Footer;
