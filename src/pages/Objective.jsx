import React from "react";
import "./objective.css"; // EN path
import BackToTop from "../components/BackToTop";

import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";

const Objective = ({ onNavigate }) => {
	// Resolve bundled hero URL from the manifest
	const url = getHeroURL("en", "objective-en");

	// Use the custom hook for cached/preloaded hero src
	const src = useHeroSrc(url);

	return (
		<div className="intro-wrapper objective-page">
			{/* Hero */}
			<header className="hero" role="banner">
				<img
					className="hero-img"
					src={src}
					alt=""
					aria-hidden="true"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
					onError={() => {
						// If a blob URL fails, fall back to the original
						if (src !== url) setSrc(url);
					}}
				/>
				<h1 className="hero-title">Learning Objectives</h1>
			</header>

			{/* Content */}
			<section className="objective-content" aria-label="Course content">
				{/* Meta */}
				<div className="objective-meta" aria-label="Key information">
					<span className="meta-chip" aria-label="Anticipated completion time">
						Duration: 120 minutes
					</span>
				</div>

				{/* About this Course */}
				<article
					className="objective-card"
					id="about"
					aria-labelledby="about-title"
				>
					<h2 id="about-title">About this Course</h2>
					<p>
						This course is designed to deepen public servants’ understanding of
						the significance of Indigenous languages in Canada and their role in
						cultural identity, governance and reconciliation. It provides a
						foundational overview of the Indigenous Languages Act, explores
						distinctions-based perspectives of First Nations, Inuit and Métis
						Peoples, and highlights the responsibilities of federal institutions
						in supporting Indigenous-led language revitalization efforts.
						Through reflection and practical guidance, participants will be
						better equipped to respectfully support Indigenous languages within
						their roles in the public service.
					</p>
				</article>

				{/* Learning Objectives */}
				<article
					className="objective-card"
					id="learning-objectives"
					aria-labelledby="learning-objectives-title"
				>
					<h2 id="learning-objectives-title">Learning Objectives</h2>
					<ul className="obj-list">
						<li>
							Describe the cultural, historical and legal significance of
							Indigenous languages in Canada
						</li>
						<li>
							Explain the purpose and key elements of the Indigenous Languages
							Act and related legal frameworks
						</li>
						<li>
							Recognize the diverse perspectives of First Nations, Inuit and
							Métis Peoples on language revitalization
						</li>
						<li>
							Identify the roles of federal institutions in supporting
							Indigenous language initiatives
						</li>
						<li>
							Apply practical, culturally informed approaches to supporting
							Indigenous languages in the public service
						</li>
					</ul>
				</article>

				<BackToTop />

				{/* Breadcrumb / Navigation */}
				<nav className="breadcrumb" aria-label="Page navigation">
					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("introduction");
						}}
					>
						&laquo;&nbsp;Back
					</button>
					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("voices-en");
						}}
					>
						Next&nbsp;&raquo;
					</button>
				</nav>
			</section>
		</div>
	);
};

export default Objective;
