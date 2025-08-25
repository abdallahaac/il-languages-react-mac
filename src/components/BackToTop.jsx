import React, { useState, useEffect } from "react";
import "./BackToTop.css";

const BackToTop = () => {
	// State to track if the button should be visible
	const [isVisible, setIsVisible] = useState(false);
	// State to track the scroll progress as a percentage
	const [scrollPercentage, setScrollPercentage] = useState(0);

	// Effect to add and clean up the scroll event listener
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			// Calculate the maximum scrollable height
			const docHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;

			// Show button only after scrolling down 300px
			setIsVisible(scrollTop > 300);

			// Calculate the scroll percentage
			const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			setScrollPercentage(percentage);
		};

		// Add the event listener when the component mounts
		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener when the component unmounts
		return () => window.removeEventListener("scroll", handleScroll);
	}, []); // Empty dependency array means this effect runs only once

	// Function to smoothly scroll to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// The style for the conic-gradient border.
	// This creates the circular progress effect.
	const progressStyle = {
		background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
                     conic-gradient(#005a9c ${scrollPercentage}%, #e0e0e0 ${scrollPercentage}%)`,
	};

	return (
		<button
			className={`back-to-top-button ${isVisible ? "visible" : ""}`}
			onClick={scrollToTop}
			aria-label="Go to top of page"
			style={progressStyle}
		>
			{/* Simple and clean arrow icon using SVG */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="12" y1="19" x2="12" y2="5" />
				<polyline points="5 12 12 5 19 12" />
			</svg>
		</button>
	);
};

export default BackToTop;
