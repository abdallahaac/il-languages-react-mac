import React, { useState } from "react";
import "./IntroductionPage.css";
import "./FoundationalDocuments.css";
import image from "../assets/foundation.jpeg";
import BackToTop from "../components/BackToTop";

import { getHeroURL } from "../prefetchHeroes";
import { useHeroSrc } from "../utils/useHeroSrc";

// A reusable FlipCard component
const FlipCard = ({
	id,
	cardId, // New prop for the unique ID
	frontContent,
	backContent,
	isFlipped,
	onFlip,
	customHeight, // keep prop for compatibility (not used because height is uniform via CSS)
}) => {
	// Apply custom height if provided (kept for compatibility; uniform height is handled in CSS)
	const style = customHeight ? { minHeight: customHeight } : {};

	return (
		<div
			id={cardId} // Use the new prop as the HTML id
			className="flip-card"
			style={style}
			role="button"
			tabIndex="0"
			aria-pressed={isFlipped}
			onClick={() => onFlip(id)}
			onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onFlip(id)}
		>
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<span
						className="card-text"
						dangerouslySetInnerHTML={{ __html: frontContent }}
					/>
					<svg
						className="card-icon"
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
						<path d="M9 18l6-6-6-6" />
					</svg>
				</div>
				<div className="flip-card-back">
					<div dangerouslySetInnerHTML={{ __html: backContent }} />
					<svg
						className="card-icon card-icon-back"
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
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</div>
			</div>
		</div>
	);
};

const FoundationalDocuments = ({ onNavigate }) => {
	// State for the first set of cards (Action Plan)
	const [flippedCards, setFlippedCards] = useState(new Set());
	const url = getHeroURL("en", "foundational-documents");
	const src = useHeroSrc(url);

	const handleFlip = (cardId) => {
		setFlippedCards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};

	const cardData = [
		{
			id: 1,
			cardId: "action-plan-91",
			front: "Action Plan item 91",
			back: "Work with Indigenous governments, other Indigenous governing bodies and a variety of Indigenous organizations to review and consider proposed amendments to strengthen the <em>Indigenous Languages Act</em> pursuant to the independent review process. (Canadian Heritage).",
		},
		{
			id: 2,
			cardId: "action-plan-92",
			front: "Action Plan item 92",
			back: "Continue establishing measures to facilitate the provision of adequate, sustainable and long-term funding for the reclamation, revitalization, maintenance and strengthening of Indigenous languages through ongoing implementation of the <em>Indigenous Languages Act</em>. (Canadian Heritage).",
		},
		{
			id: 3,
			cardId: "action-plan-93",
			front: "Action Plan item 93",
			back: "Advance access to federal services in Indigenous languages; including translation of key departmental documentation. (Canadian Heritage).",
		},
		{
			id: 4,
			cardId: "action-plan-11",
			front: "Action Plan item 11",
			back: "Pursue co-development of regulations with Inuit Treaty Organizations under the <em>Indigenous Languages Act</em> that provide for the provision of Inuktut language federal services in Inuit Nunangat, beginning with Nunavut. (Canadian Heritage)",
		},
	];

	// State for the second set of cards (TRC Calls to Action)
	const [flippedTrcCards, setFlippedTrcCards] = useState(new Set());
	const handleTrcFlip = (cardId) => {
		setFlippedTrcCards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};

	const trcCardData = [
		{
			id: 1,
			cardId: "trc-13",
			front: "Call to Action 13",
			back: "Work with Indigenous governments, other Indigenous governing bodies and a variety of Indigenous organizations to review and consider proposed amendments to strengthen the <em>Indigenous Languages Act</em> pursuant to the independent review process. (Canadian Heritage).",
		},
		{
			id: 2,
			cardId: "trc-14",
			front: "Call to Action 15",
			back: `		We call upon the federal government to appoint, in consultation with Aboriginal groups, an Aboriginal Languages Commissioner. The commissioner should help promote Aboriginal languages and report on the adequacy of federal funding of Aboriginal-languages initiatives.`,
			height: "420px",
		},
		{
			id: 3,
			cardId: "trc-15",
			front: "Call to Action 14",
			back: `
	
			<p>We call upon the federal government to enact an Aboriginal Languages Act that incorporates the following principles:</p><ul><li style="font-size:18px">Aboriginal languages are a fundamental and valued element of Canadian culture and society, and there is an urgency to preserve them.</li><li style="font-size:18px">Aboriginal language rights are reinforced by the Treaties.</li><li style="font-size:18px">The federal government has a responsibility to provide sufficient funds for Aboriginal-language revitalization and preservation.</li><li style="font-size:18px">The preservation, revitalization, and strengthening of Aboriginal languages and cultures are best managed by Aboriginal people and communities.</li><li style="font-size:18px">Funding for Aboriginal language initiatives must reflect the diversity of Aboriginal languages.</li></ul>
			
			`,
		},
	];

	// State and data for the third set of cards (Calls for Justice)
	const [flippedCfjCards, setFlippedCfjCards] = useState(new Set());
	const handleCfjFlip = (cardId) => {
		setFlippedCfjCards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};

	const cfjCardData = [
		{
			id: 1,
			cardId: "cfj-2-1",
			front: "Call for Justice 2.1",
			back: "We call upon all governments to acknowledge, recognize, and protect the rights of Indigenous Peoples to their cultures and languages as inherent rights, and constitutionally protected as such under section 35 of the Constitution.",
		},
		{
			id: 2,
			cardId: "cfj-2-2",
			front: "Call for Justice 2.2",
			back: `
We call upon all governments to recognize Indigenous languages as official languages, with the same status, recognition, and protection provided to French and English. This includes the directives that:
<ol style="font-size:18px">
<li style="font-size:18px">Federal, provincial, and territorial governments must legislate Indigenous languages in the respective territory as official languages</li>
<li style="font-size:18px">All governments must make funds available to Indigenous Peoples to support the work required to revitalize and restore Indigenous cultures and languages. </li>
</ol>
</div>
            `,
		},
		{
			id: 3,
			cardId: "cfj-2-3",
			front: "Call for Justice 2.3",
			back: "We call upon all governments to ensure that all Indigenous women, girls, and 2SLGBTQIA+ people are provided with safe, no-barrier, permanent, and meaningful access to their cultures and languages in order to restore, reclaim, and revitalize their cultures and identities. These are rights held by all segments of Indigenous communities, from young children to Elders. The programs and services that provide such access should not be tied exclusively to government-run cultural or educational institutions. All governments must further ensure that the rights of Indigenous children to retain and be educated in their Indigenous language are upheld and protected. All governments must ensure access to immersion programs for children from preschool into post-secondary education.",
		},
	];

	// START: Added for Inuit-specific Calls for Justice
	// State and data for the fourth set of cards (Calls for Justice - Inuit)
	const [flippedCfjICards, setFlippedCfjICards] = useState(new Set());
	const handleCfjIFlip = (cardId) => {
		setFlippedCfjICards((prevFlipped) => {
			const newFlipped = new Set(prevFlipped);
			if (newFlipped.has(cardId)) {
				newFlipped.delete(cardId);
			} else {
				newFlipped.add(cardId);
			}
			return newFlipped;
		});
	};

	const cfjICardData = [
		{
			id: 1,
			cardId: "cfjI-16-2",
			front: "Calls for Justice for Inuit 16.2",
			back: "We call upon all governments to create laws and services to ensure the protection and revitalization of Inuit culture and language. All Inuit, including those living outside Inuit Nunangat, must have equitable access to culture and language programs. It is essential that Elders are included in the development and delivery of these programs.",
		},
	];
	// END: Added for Inuit-specific Calls for Justice

	return (
		<div className="intro-wrapper foundational-documents-page">
			<header className="hero" role="banner">
				<img
					src={src}
					alt=""
					className="hero-img"
					aria-hidden="true"
					loading="eager"
					fetchpriority="high"
					decoding="sync"
				/>
				<h1 className="hero-title">Foundational Documents</h1>
			</header>

			<section className="acknowledge">
				<h2>International Decade of Indigenous Languages</h2>
				<p>
					<span className="dropcap">A</span>ccording to the United Nations
					Permanent Forum on Indigenous Issues, Indigenous languages are complex
					systems of knowledge and central to the identity of Indigenous
					Peoples. To draw attention to the critical loss of Indigenous
					languages and the urgent need to promote Indigenous languages, the
					United Nations General Assembly has designated 2022 to 2032 the
					International Decade of Indigenous Languages.
				</p>
				<p>For additional information:</p>
				<ul>
					<li>
						<a
							href="https://www.unesco.org/en/decades/indigenous-languages"
							target="_blank"
							rel="noopener noreferrer"
						>
							Indigenous Languages Decade (2022-2032) | UNESCO
						</a>
					</li>
					<li>
						<a
							href="https://www.canada.ca/en/canadian-heritage/campaigns/indigenous-languages/decade.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Canadian Heritage website: International Decade of Indigenous
							Languages
						</a>
					</li>
					<li>
						<a
							href="https://news.ca/2022/12/16/united-nations-declares-international-decade-of-indigenous-languages/"
							target="_blank"
							rel="noopener noreferrer"
						>
							United Nations declares International Decade of Indigenous
							Languages (CBC News)
						</a>
					</li>
					<li>
						<a
							href="https://ocil-ila.ca/en"
							target="_blank"
							rel="noopener noreferrer"
						>
							Office of the Commissioner of Indigenous Languages
						</a>
					</li>
					<li>
						<a
							href="https://en.ccunesco.ca/about-ccunesco/press/2024/07/ocil-ccunesco-partnership-to-advance-indigenous-languages"
							target="_blank"
							rel="noopener noreferrer"
						>
							Commission for UNESCO Forge Partnership to Advance Indigenous
							Languages
						</a>
					</li>
				</ul>
			</section>

			<section className="acknowledge">
				<h2>
					The United Nations Declaration on the Rights of Indigenous Peoples and
					Indigenous Languages
				</h2>
				<p>
					The United Nations Declaration on the Rights of Indigenous Peoples (UN
					Declaration) is a comprehensive international human rights instrument
					that affirms a range of collective political, economic, social,
					cultural and environmental rights for Indigenous Peoples around the
					world, including their right to revitalize their languages. Article 13
					of the UN Declaration is related to Indigenous languages. Explore the
					<a
						href="https://www.un.org/development/desa/indigenouspeoples/wp-content/uploads/sites/19/2018/11/UNDRIP_E_web.pdf"
						className="underline-purple"
						target="_blank"
						rel="noopener noreferrer"
					>
						&nbsp;full text of the declaration
					</a>
					.
				</p>
				<p>For additional information: </p>
				<ul>
					<li>
						<a
							href="https://www.justice.gc.ca/eng/declaration/index.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Justice Canada: The UN Declaration explained (justice.gc.ca)
						</a>
					</li>
					<li>
						<a
							href="https://www.justice.gc.ca/eng/declaration/about-apropos.html"
							target="_blank"
							rel="noopener noreferrer"
						>
							Justice Canada: About the Act (justice.gc.ca)
						</a>
					</li>
				</ul>
			</section>

			<section className="instructions" aria-labelledby="instr-heading">
				<h3 id="instr-heading">
					The{" "}
					<em>
						<em>
							United Nations Declaration on the Rights of Indigenous Peoples Act
						</em>
					</em>
					(UN Declaration Act) Action Plan
				</h3>
				<p>
					The{" "}
					<em>
						<em>
							United Nations Declaration on the Rights of Indigenous Peoples Act
						</em>
					</em>
					Action Plan 2023–2028 is the result of two years of consultation and
					cooperation with First Nations, Inuit, and Métis from across Canada.
					It provides a roadmap of actions Canada needs to take, in partnership
					with Indigenous Peoples, to implement the principles and rights set
					out in the UN Declaration and advance reconciliation in a tangible
					way.
				</p>
				<p>
					The Action Plan identifies some{" "}
					<a
						href="https://www.justice.gc.ca/eng/declaration/action/chap2.html"
						target="_blank"
						className="underline-purple"
						rel="noopener noreferrer"
					>
						shared priorities
					</a>{" "}
					for Indigenous Peoples with respect to the{" "}
					<em>Indigenous Languages Act</em>, including potential amendments to
					the Act, and advancing access to federal services in Indigenous
					languages.
				</p>
				<p className="select-instruction">Select the item to learn more. </p>
			</section>

			<section className="card-grid">
				{cardData.map((card) => (
					<FlipCard
						key={card.id}
						id={card.id}
						cardId={card.cardId}
						frontContent={card.front}
						backContent={card.back}
						isFlipped={flippedCards.has(card.id)}
						onFlip={handleFlip}
						customHeight={card.height}
					/>
				))}
			</section>

			<section>
				<h2>
					Truth and Reconciliation Commission of Canada (TRC) Calls to Action
				</h2>
				<p>
					The Truth and Reconciliation Commission of Canada (TRC) was
					established to document the history and legacy of residential schools,
					among other matters. Its final report was released in December 2015
					and included 94 Calls to Action covering a variety of areas. Calls to
					Action 13 to 15, which relate specifically to language and culture,
					read as follows:
				</p>
				<p className="select-instruction">Select the item to learn more. </p>
			</section>

			{/* --- TRC Calls to Action --- */}
			<section className="card-grid trc-card-grid">
				{/* top-left: TRC 13 */}
				<FlipCard
					key={trcCardData[0].id}
					id={trcCardData[0].id}
					cardId={trcCardData[0].cardId}
					frontContent={trcCardData[0].front}
					backContent={trcCardData[0].back}
					isFlipped={flippedTrcCards.has(trcCardData[0].id)}
					onFlip={handleTrcFlip}
					customHeight={trcCardData[0].height}
				/>

				{/* top-right: TRC 15 */}
				<FlipCard
					key={trcCardData[2].id}
					id={trcCardData[2].id}
					cardId={trcCardData[2].cardId}
					frontContent={trcCardData[2].front}
					backContent={trcCardData[2].back}
					isFlipped={flippedTrcCards.has(trcCardData[2].id)}
					onFlip={handleTrcFlip}
					customHeight={trcCardData[2].height}
				/>

				{/* bottom full-width: TRC 14 */}
				<div className="grid-span-2">
					<FlipCard
						key={trcCardData[1].id}
						id={trcCardData[1].id}
						cardId={trcCardData[1].cardId}
						frontContent={trcCardData[1].front}
						backContent={trcCardData[1].back}
						isFlipped={flippedTrcCards.has(trcCardData[1].id)}
						onFlip={handleTrcFlip}
						customHeight={trcCardData[1].height}
					/>
				</div>
			</section>

			<p style={{ width: "100%", display: "block" }}>
				With the royal assent of the <em>Indigenous Languages Act</em>, Calls to
				Action 13 and 14 are complete. With the creation of the Office of the
				Commissioner of Indigenous Languages, Call to Action 15 is complete.
			</p>

			<section>
				<h2>
					The Final Report of the National Inquiry into Missing and Murdered
					Indigenous Women and Girls
				</h2>
				<p>
					In 2016, in response to calls for action from Indigenous families,
					communities and organizations, as well as non-governmental and
					international organizations, the Government of Canada launched an
					entirely independent National Inquiry into Missing and Murdered
					Indigenous Women and Girls. The National Inquiry was composed of four
					Commissioners from across the country, and was a legal process
					independent from federal, provincial and territorial governments,
					Crown corporations and Indigenous forms of government.
				</p>
				<p>
					Although the Commissioners were mandated to provide recommendations,
					their recommendations were framed as Calls for Justice. These are
					legal imperatives and not optional. The Calls for Justice arise from
					international and domestic human and Indigenous rights laws, including
					the Canadian Charter of Rights and Freedoms, the Constitution, and the
					Honour of the Crown. As such, Canada has a legal obligation to fully
					implement these Calls for Justice and to ensure Indigenous women,
					girls, and 2SLGBTQIA+ people live in dignity. On June 3, 2019, the
					National Inquiry into Missing and Murdered Indigenous Women and Girls
					formally presented its Final Report to federal government officials at
					a closing ceremony.
				</p>
				<p>The following Call for Justice references Indigenous languages:</p>
			</section>

			<section className="card-grid cfj-card-grid">
				<div className="card-row">
					<FlipCard
						key={cfjCardData[0].id}
						id={cfjCardData[0].id}
						cardId={cfjCardData[0].cardId}
						frontContent={cfjCardData[0].front}
						backContent={cfjCardData[0].back}
						isFlipped={flippedCfjCards.has(cfjCardData[0].id)}
						onFlip={handleCfjFlip}
						customHeight={cfjCardData[0].height}
					/>
					<FlipCard
						key={cfjCardData[1].id}
						id={cfjCardData[1].id}
						cardId={cfjCardData[1].cardId}
						frontContent={cfjCardData[1].front}
						backContent={cfjCardData[1].back}
						isFlipped={flippedCfjCards.has(cfjCardData[1].id)}
						onFlip={handleCfjFlip}
						customHeight={cfjCardData[1].height}
					/>
				</div>
				<FlipCard
					key={cfjCardData[2].id}
					id={cfjCardData[2].id}
					cardId={cfjCardData[2].cardId}
					frontContent={cfjCardData[2].front}
					backContent={cfjCardData[2].back}
					isFlipped={flippedCfjCards.has(cfjCardData[2].id)}
					onFlip={handleCfjFlip}
					customHeight={cfjCardData[2].height}
				/>
			</section>

			<section>
				<h2>Calls for Justice for Inuit</h2>
				<p>
					Testimony shared by Inuit witnesses, experts, and Elders, and
					submissions by Inuit representative organizations, along with existing
					reports and research, demonstrated that Inuit have unique and distinct
					experiences of colonial oppression and violence. Further, witnesses
					emphasized distinct areas of concern and priority areas for Inuit
					women, girls, and 2SLGBTQIA+ people that require distinct
					recommendations.
				</p>
				<p className="select-instruction">Select the item to learn more. </p>
			</section>

			{/* START: Corrected render section for Inuit Calls for Justice */}
			<section className="card-grid cfj-card-grid">
				{cfjICardData.map((card) => (
					<FlipCard
						key={card.id}
						id={card.id}
						cardId={card.cardId}
						frontContent={card.front}
						backContent={card.back}
						isFlipped={flippedCfjICards.has(card.id)}
						onFlip={handleCfjIFlip}
						customHeight={card.height}
					/>
				))}
			</section>
			{/* END: Corrected render section */}

			<BackToTop />
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("introduction")}>
					&laquo;&nbsp;Back
				</button>
				<button onClick={() => onNavigate?.("indigenous-languages-act")}>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default FoundationalDocuments;
