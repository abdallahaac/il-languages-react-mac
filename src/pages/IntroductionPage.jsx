import React from "react";
import "./IntroductionPage.css";
import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";
import BackToTop from "../components/BackToTop";

const IntroductionPage = ({ onNavigate }) => {
	// Resolve the bundled hero URL from your manifest
	const url = getHeroURL("en", "introduction");

	// Use the custom hook for cached/preloaded hero src
	const src = useHeroSrc(url);

	return (
		<div className="intro-wrapper intro-page">
			{/* ███ hero ███ */}
			<header className="hero" role="banner">
				<img
					className="hero-img"
					src={src}
					alt="Learning Objectives"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">Introduction and Overview</h1>
			</header>

			{/* ███ narrative ███ */}
			<article className="narrative">
				<p>
					<span className="dropcap" lang="en">
						L
					</span>
					anguage is the foundation of a culture. For Indigenous oral societies,
					words hold knowledge amassed for millennia. A language holds the
					stories, songs, dances, protocols, family histories and connections.
					Languages also often hold the community’s customary laws that were
					eroded by the policies of the Indian Act.
				</p>
				<p>
					As many communities move towards a return to self-government, this
					loss of laws and systems of governance means some communities don’t
					have that knowledge to draw upon. When a language dies, so does the
					link to the cultural and historical past. Without that crucial
					connection to their linguistic and cultural history, people lose their
					sense of identity and belonging.
				</p>
				<footer className="source">
					Source: Why Is It Important to Protect and Revitalize Indigenous
					Languages?{" "}
					<a
						className="link-source"
						href="https://www.ictinc.ca/blog/why-is-it-important-to-protect-revitalize-indigenous-languages"
						target="_blank"
						rel="noopener noreferrer"
					>
						https://www.ictinc.ca/blog/why-is-it-important-to-protect-revitalize-indigenous-languages
					</a>
					<br />
					<span>
						Reproduced with the permission of Indigenous Corporate Training Inc.{" "}
					</span>
					<a
						className="link-source"
						href="https://www.ictinc.ca/"
						target="_blank"
						rel="noopener noreferrer"
					>
						www.ictinc.ca
					</a>
				</footer>
			</article>

			<BackToTop />

			{/* ███ breadcrumbs ███ */}
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("home")}>&laquo;&nbsp;Back</button>
				<button onClick={() => onNavigate?.("objective-en")}>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default IntroductionPage;
