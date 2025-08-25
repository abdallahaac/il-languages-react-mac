// src/pages/Results.jsx
import React from "react";
import image from "../assets/results.jpeg"; // EN path
import "./objective.css"; // EN path
import BackToTop from "../components/BackToTop"; // EN path

const Results = ({ onNavigate }) => {
	return (
		<div className="intro-wrapper objective-page">
			{/* Hero */}
			<header className="hero" role="banner">
				<img
					src={image}
					alt="Decorative image with floral elements"
					className="hero-img"
					aria-hidden="true"
				/>
				<h1 className="hero-title">Learning Results</h1>
			</header>

			{/* Content */}
			<section className="objective-content" aria-label="Course content">
				{/* Learning Outcomes */}
				<article
					className="objective-card"
					id="learning-outcomes"
					aria-labelledby="learning-outcomes-title"
				>
					<h2 id="learning-outcomes-title">Learning Outcomes</h2>
					<p>By the end of this course, learners will be able to:</p>
					<ul className="obj-list">
						<li>
							summarize how Indigenous languages are tied to cultural identity,
							governance and intergenerational knowledge
						</li>
						<li>
							identify and describe the core components of the Indigenous
							Languages Act, including its connection to reconciliation
							frameworks such as the United Nations Declaration on the Rights of
							Indigenous Peoples and the Truth and Reconciliation Commission’s
							Calls to Action
						</li>
						<li>
							compare the language revitalization goals and critiques expressed
							by First Nations, Inuit and Métis organizations
						</li>
						<li>
							list key responsibilities of the Department of Canadian Heritage,
							the Office of the Commissioner of Indigenous Languages and other
							federal institutions under the Act
						</li>
						<li>
							propose at least two actions they can take in their role to
							support Indigenous language revitalization in a respectful and
							culturally competent way
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
