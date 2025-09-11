// src/pages/Results.jsx
import React from "react";
import "./objective.css";
import BackToTop from "../components/BackToTop";

import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";

const Results = ({ onNavigate }) => {
	const url = getHeroURL("en", "results-en");
	const src = useHeroSrc(url);

	return (
		<div className="intro-wrapper objective-page">
			{/* Hero */}
			<header className="hero" role="banner">
				<img
					src={src}
					alt="Decorative image with floral elements"
					className="hero-img"
					aria-hidden="true"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">Learning Outcomes</h1>
			</header>

			{/* Content */}
			<section className="objective-content" aria-label="Course content">
				<article
					className="objective-card"
					id="learning-outcomes"
					aria-labelledby="learning-outcomes-title"
				>
					<h2 id="learning-outcomes-title">Learning Outcomes</h2>
					<p>After completing this course, you are now able to:</p>
					<ul className="obj-list">
						<li>
							Summarize the intrinsic links between Indigenous languages,
							cultural identity, governance, and intergenerational knowledge;
						</li>
						<li>
							Recognize and define the key elements of the Indigenous Languages
							Act and connect them with other reconciliation frameworks, such as
							the United Nations Declaration on the Rights of Indigenous Peoples
							and the Calls to Action of the Truth and Reconciliation Commission
							of Canada;
						</li>
						<li>
							Compare the objectives of language revitalization with the
							critiques expressed by First Nations, Inuit, and Métis
							organizations;
						</li>
						<li>
							List the main responsibilities of the Department of Canadian
							Heritage, the Office of the Commissioner of Indigenous Languages,
							and other federal institutions as set out in the Indigenous
							Languages Act;
						</li>
						<li>
							Propose at least two respectful and culturally appropriate ways to
							support the revitalization of Indigenous languages.
						</li>
					</ul>
				</article>

				<BackToTop />

				<nav className="breadcrumb" aria-label="Page navigation">
					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("public-service");
						}}
					>
						&laquo;&nbsp;Back
					</button>
					<button
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							onNavigate?.("knowledge-check");
						}}
					>
						Next&nbsp;&raquo;
					</button>
				</nav>
			</section>
		</div>
	);
};

export default Results;
