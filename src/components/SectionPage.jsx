// ============================================================================
// SectionPage.jsx
//
// A reusable component that renders an individual section of the course. It
// displays a hero banner with the section title, followed by the section
// content. The hero uses a background image passed in via props and overlays
// the title on top of a subtle dark gradient to ensure readability.
//
// Props:
//   section: An object containing id, title, heroImage, and content (array of
//            strings).
//   onNavigate: Function to call when navigation is triggered from within the
//               section (e.g. clicking a nav item in the header). Passed
//               through to Header via App.
//
// This component relies on SectionPage.css for styling.
// ============================================================================

import React from "react";
import "./SectionPage.css";

const SectionPage = ({ section }) => {
	if (!section) {
		return null;
	}

	const { title, heroImage, content } = section;

	return (
		<main className="section-page">
			<header
				className="section-hero"
				style={{ backgroundImage: `url(${heroImage})` }}
			>
				<div className="section-hero-overlay">
					<h1 className="section-title">{title}</h1>
				</div>
			</header>
			<article className="section-content">
				{content.map((paragraph, idx) => (
					<p key={idx}>{paragraph}</p>
				))}
			</article>
		</main>
	);
};

export default SectionPage;
