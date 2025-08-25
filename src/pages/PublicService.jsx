import React, { useState } from "react";
import "./IntroductionPage.css"; // For shared styles
import "./PublicService.css"; // For page-specific styles
import image from "../assets/what.png";
import BackToTop from "../components/BackToTop";

const PublicService = ({ onNavigate }) => {
	// State for the sign language accordion
	const [openSignLanguage, setOpenSignLanguage] = useState(null);
	// State for the video transcript
	const [showTranscript, setShowTranscript] = useState(false);

	// Handler for the sign language accordion
	const handleSignLanguageToggle = (sectionId) => {
		setOpenSignLanguage((prev) => (prev === sectionId ? null : sectionId));
	};

	return (
		<div className="intro-wrapper public-service-page">
			<header className="hero" role="banner">
				<img src={image} alt="" className="hero-img" aria-hidden="true" />
				<h1 className="hero-title">What this means for the public service</h1>
			</header>

			<section className="acknowledge">
				<h2>Role of All Federal Organizations</h2>
				<h3>Services in Indigenous Languages</h3>
				<p>
					<span className="dropcap">A</span> key component of the Act impacts
					how public service employees provide access to services in Indigenous
					languages. Federal organizations may now provide services in an
					Indigenous language if there is capacity to do so and a demand for
					such services. This discretionary approach to the provision of
					services is different from those applicable to our official languages
					(English and French), which may be required by law. The{" "}
					<em>Indigenous Languages Act</em> does not guarantee services in
					Indigenous languages the way the Official Languages Act guarantees
					services in English and French.
				</p>

				<h3>The Office of the Commissioner of Indigenous Languages</h3>
				<p>
					The Act also establishes a discretionary ability for federal
					organizations to provide interpretation or translation services in
					Indigenous languages for activities and documents under their control.
				</p>

				<h3>Interpretation and Translation</h3>
				<p>
					The Act established the Office of the Commissioner of Indigenous
					Languages, which is made up of a commissioner and up to three
					directors. In June 2021, Ronald E. Ignace was appointed as the first
					Commissioner of Indigenous Languages, along with three directors:
					Robert Watt, Georgina Liberty, and Joan Greyeyes.
				</p>

				<blockquote className="quote indigenous-lang">
					<em>
						"Le7 pyin te sitq̓t te swumécwilcstem re qweqwelténs re xwexwéyt te
						qelmúcw wel me7 yews. Ta7 me7 scú7tsems re snecwentém re
						qweqweltén-kt re sts̓eléwt.s ne swet.s k smenmenúl̓ecws ne7élye ne
						tmicw-kt. Tikwemtús me7 sucwentwécwmentem re qweqweltén-kt”
					</em>
				</blockquote>
				<blockquote className="quote">
					<em>
						“We celebrate this day where we breathe new life into all of our
						Indigenous languages for the future. Our languages will no longer
						stand in the shadow of other languages here in our land. Let us
						always honour our Indigenous languages.”
					</em>
					<cite>
						– Ronald E. Ignace, Commissioner of Indigenous Languages, a fluent
						speaker of Secwepemctsin, the language of the Shuswap/ˈʃuːʃwɑːp/, a
						First Nations people residing in the B.C. interior
					</cite>
				</blockquote>
				<p>
					The OCIL is an arm’s-length organization that is independent from the
					federal government. Its overarching purpose is to help promote
					Indigenous languages and support the efforts of Indigenous Peoples to
					reclaim, revitalize, strengthen and maintain their languages. The
					OCIL, which responds to the Truth and Reconciliation Commission’s Call
					to Action 15, has a mandate to:
				</p>
				<ul>
					<li>Help promote Indigenous languages</li>
					<li>
						Support the efforts of Indigenous Peoples to reclaim, revitalize,
						maintain and strengthen their languages
					</li>
					<li>
						Facilitate the resolution of disputes and review complaints to the
						extent provided by the <em>Indigenous Languages Act</em>
					</li>
					<li>
						Promote public awareness of the richness and diversity of Indigenous
						languages
					</li>
					<li>
						Support innovative projects and the use of new technologies in
						Indigenous language education and revitalization
					</li>
				</ul>
				<p>
					Some other duties and functions of the OCIL include the following:
				</p>
				<ul>
					<li>
						Annually reporting on, among other things, the use and vitality of
						Indigenous languages, the needs of Indigenous groups and
						organizations, the adequacy of funding, and the implementation of
						the Act.{" "}
						<a
							id="link"
							target="_blank"
							rel="noopener noreferrer"
							href="https://commissionforindigenouslanguages.ca"
						>
							Reports of the Office of the Commissioner of Indigenous Languages
							(commissionforindigenouslanguages.ca)
						</a>
					</li>
					<li>
						Supporting innovation and research, and the use of new technologies
						in regards to Indigenous language
					</li>
					<li>
						Providing culturally appropriate services, including mediation, to
						facilitate the resolution of disputes and review complaints
					</li>
					<li>Engagement and outreach activities</li>
				</ul>
				<p>
					The OCIL continues to solicit more federal departments and agencies to
					inquire what actions they have undertaken to implement the Act. The
					OCIL includes this information in their annual report.
				</p>
				<p>
					GC Link:{" "}
					<a
						href="https://www.canada.ca/en/services/culture/canadian-identity-society/languages/indigenous/commissioner.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Office of the Commissioner of Indigenous Languages – Canada.ca
					</a>
				</p>
			</section>

			<section className="acknowledge">
				<h2>Ways Public Service Employees Can Support the Act</h2>
				<p>
					Here are some of the ways by which public service employees can
					support the objectives of the <em>Indigenous Languages Act</em>:
				</p>
				<div className="ways-grid">
					<div className="way-item">
						<h3>1) Promoting Indigenous languages</h3>
						<p>
							Give some thought to how you can encourage the promotion of
							Indigenous languages in your areas of responsibilities.
						</p>
					</div>
					<div className="way-item">
						<h3>2) Providing access to services in Indigenous languages</h3>
						<p>
							Think about ways to offer services in Indigenous languages, where
							and when appropriate. Consider areas of service delivery where
							Indigenous languages could be made available.
						</p>
					</div>
					<div className="way-item">
						<h3>3) Translation of documents into an Indigenous language</h3>
						<p>
							Any document under the control of a federal organization can be
							translated into an Indigenous language. Consider your work and
							whether key documents should be translated into Indigenous
							languages. Several federal organizations have already taken the
							lead in doing so. Your organization’s communications sector may
							also be able to assist in identifying which public-facing
							information could be translated into an Indigenous language.
						</p>
						<p>Here are some examples of best practices in this regard:</p>
						<ul className="best-practices-list">
							<li>
								Justice Canada has translated the United Nations Declaration on
								the Rights of Indigenous Peoples. Visit{" "}
								<a
									href="https://www.justice.gc.ca/eng/declaration/read-lire.html"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Read the full United Nations Declaration"
								>
									Read the Declaration
								</a>
							</li>
							<li>
								Natural Resources Canada has created an{" "}
								<a
									href="https://www.canada.ca/en/natural-resources-canada/news/2019/06/interactive-map-recognizes-indigenous-place-names-in-canada0.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									Interactive Map of Indigenous Place Names
								</a>{" "}
								and provides{" "}
								<a
									href="https://natural-resources.canada.ca/indigenous-geographical-names-data/24317"
									target="_blank"
									rel="noopener noreferrer"
								>
									Indigenous Geographical Names Data
								</a>
							</li>
							<li>
								Parks Canada has translated its Charter into several Indigenous
								languages. Visit the{" "}
								<a
									href="https://parks.canada.ca/agence-agency/mandat-mandate/charte-charter"
									target="_blank"
									rel="noopener noreferrer"
								>
									Parks Canada Charter
								</a>
							</li>
						</ul>
					</div>
					<div className="way-item">
						<h3>4) Interpretation of Indigenous languages</h3>
						<p>
							Federal organizations may provide interpretation services in an
							Indigenous language. Consider if there is an opportunity to
							facilitate the use of an Indigenous language in the course of your
							organization’s activities, programs or service delivery. For
							example, if your organization is hosting a conference and inviting
							Indigenous Elders who wish to speak in their Indigenous language.
						</p>
					</div>
					<div className="way-item">
						<h3>5) Developing cultural competency</h3>
						<p>
							Cultural competency is an important part of learning how to work
							with Indigenous Peoples. Public servants should be mindful of
							being respectful of Indigenous languages. As already mentioned,
							there is a long history of intentional neglect and suppression of
							Indigenous languages. It is important to be mindful that not all
							Indigenous persons or Indigenous federal public service employees
							know how to speak or write their own language and levels of
							fluency vary greatly.
						</p>
					</div>
					<div className="way-item">
						<h3>6) Using Indigenous sign languages</h3>
						<p>
							Give some thought to how to support and promote the use of
							Indigenous languages at work, including Indigenous sign languages.
							Hiring managers should be aware that Indigenous persons and Deaf
							or hearing impaired persons may require special measures and
							accommodation. Understanding that there are several kinds of
							Indigenous sign languages is the first step. It is an important
							act of reconciliation that helps Indigenous persons stay connected
							to their heritage.
						</p>
					</div>
				</div>
			</section>

			<section className="acknowledge sign-language-section">
				<h2>Indigenous Sign Languages</h2>
				<p className="select-instruction">
					Click on each section to learn more.
				</p>
				<div className="sign-language-accordion">
					<div className="sign-language-item">
						<button
							className="sign-language-button"
							aria-expanded={openSignLanguage === "pisl"}
							onClick={() => handleSignLanguageToggle("pisl")}
						>
							Plains Indian Sign Language
						</button>
						<div
							className={`sign-language-panel ${
								openSignLanguage === "pisl" ? "visible" : ""
							}`}
						>
							<p>
								Plains Indian Sign Language (PISL or PSL) is the most studied of
								all of the Indigenous sign languages. An emerging sign language
								is Oneida Sign Language, being developed by Oneida community
								members, located on Iroquois territory in Southwestern Ontario.
								This Indigenous sign language follows the rules of Plains Indian
								Sign Language and the sounds of the Oneida language.
							</p>
						</div>
					</div>
					<div className="sign-language-item">
						<button
							className="sign-language-button"
							aria-expanded={openSignLanguage === "iur"}
							onClick={() => handleSignLanguageToggle("iur")}
						>
							Inuit Sign Language
						</button>
						<div
							className={`sign-language-panel ${
								openSignLanguage === "iur" ? "visible" : ""
							}`}
						>
							<p>
								Inuit Sign Language, also known as Inuit Uukturausingit (IUR),
								has long been used by Inuit, particularly in Nunavut, as a
								communication tool for Deaf Inuit and their families. Inuit
								Uukturausingit is integral to deaf inclusivity and efforts are
								underway to conserve Inuit Sign Language.
							</p>
						</div>
					</div>
					<div className="sign-language-item">
						<button
							className="sign-language-button"
							aria-expanded={openSignLanguage === "msl"}
							onClick={() => handleSignLanguageToggle("msl")}
						>
							Michif Sign Language
						</button>
						<div
							className={`sign-language-panel ${
								openSignLanguage === "msl" ? "visible" : ""
							}`}
						>
							<p>
								Michif is a language uniquely spoken by members of the Métis
								Nation and exists in a number of dialects and in sign language.
								Not a great deal is known about Michif Sign Language, however.
								This may be related to the fact that while Indigenous sign
								languages are some of the most endangered forms of communication
								in Canada, few linguists have given them the same attention as
								spoken Indigenous languages.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="acknowledge video-section">
				<h2>Sign language video with Paula and Colleen</h2>
				<p>
					This video illustrates one example of the diversity of Indigenous
					languages spoken in Canada. Listen to Colleen Charlette, a beginner
					speaker of Cree, share words from the Plains Cree language. Following
					this, Paula MacDonald, a sign language speaker, signs the
					corresponding word in Plains Sign Language, creating a unique and
					educational experience. Both women are proudly Indigenous. We hope you
					enjoy and use some of these phrases in your daily lives.
				</p>
				<div className="video-container">
					<iframe
						title="Indigenous Sign Language video"
						width="560"
						height="315"
						src="https://media.csps-efpc.gc.ca/V/Video?v=1072266&node=5722935&a=154138501&preload=false"
						frameBorder="1"
						allowFullScreen
					></iframe>
					<button
						className="transcript-toggle-btn"
						onClick={() => setShowTranscript(!showTranscript)}
						aria-expanded={showTranscript}
					>
						{showTranscript ? "Hide Transcript" : "Show Transcript"}
					</button>
					{showTranscript && (
						<div className="transcript-content">
							<p>My name is Colleen. I am Cree.</p>
							<p>
								[0:01 – 0:04 A text appears on the screen: Colleen Charlette]
							</p>
							<p>Hello my name is Paula (my sign name).</p>
							<p>[0:07 – 0:10 A text appears on the screen: Paula Macdonald]</p>
							<p>
								[0:14 – 0:24 A text appears on the screen: tânisi. Hello, how
								are you?]
							</p>
							<p>tânisi</p>
							<p>
								[0:24 – 0:36 A text appears on the screen: namôya nânitaw. I am
								fine]
							</p>
							<p>namôya nânitaw</p>
							<p>
								[0:37 – 0:51 A text appears on the screen: âstam. Come here]
							</p>
							<p>âstam</p>
							<p>[0:52 – 1:03 A text appears on the screen: api. Sit]</p>
							<p>api</p>
							<p>[1:03 – 1:15 A text appears on the screen: miywâsin. Great]</p>
							<p>miywâsin</p>
							<p>[1:16 – 1:26 A text appears on the screen: âha. Yes]</p>
							<p>âha</p>
							<p>[1:27 – 1:38 A text appears on the screen: namôya. No]</p>
							<p>namôya</p>
							<p>
								[1:39 – 1:51 A text appears on the screen: kinanâskomitin. Thank
								you]
							</p>
							<p>kinanâskomitin</p>
							<p>
								[1:52 – 2:04 A text appears on the screen: mwêstas. See you
								later]
							</p>
							<p>mwêstas</p>
							<p>
								[2:05 – 2:15 The CSPS logo appears onscreen. A text appears on
								the screen: canada.ca/school. The Government of Canada logo
								appears onscreen.]
							</p>
						</div>
					)}
				</div>
				<p className="art">
					Article:{" "}
					<a
						href="https://www.cbc.ca/news/canada/ottawa/indigenous-deaf-sign-language-culture-1.6473673"
						target="_blank"
						rel="noopener noreferrer"
					>
						How Indigenous sign language is helping this woman connect with her
						culture | CBC News
					</a>
				</p>
			</section>

			<BackToTop />
			<nav className="breadcrumb" aria-label="Page navigation">
				<button onClick={() => onNavigate?.("revitalization-efforts")}>
					&laquo;&nbsp;Back
				</button>
				<button onClick={() => onNavigate?.("knowledge-check")}>
					Next&nbsp;&raquo;
				</button>
			</nav>
		</div>
	);
};

export default PublicService;
