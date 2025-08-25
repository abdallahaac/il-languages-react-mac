// ============================================================================
// sectionData.js
// Centralized configuration for navigation/progress tracking.
// Each section has an id, title, hero image, and a `lang`:
//   - "en": English-only page
//   - "fr": French-only page
//   - "both": Shared page (counted in both languages)
// ============================================================================

const sections = [
	// Shared
	{
		id: "introduction",
		title: "Introduction and Overview",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "both",
		content: [
			"Language is the foundation of a culture. For Indigenous oral societies, words hold knowledge amassed for millennia.",
			"A language holds the stories, songs, dances, protocols, family histories and connections. Languages also often hold the community’s customary laws that were eroded by the policies of the Indian Act.",
		],
	},

	// Language-specific objective pages
	{
		id: "objective-en",
		title: "Objective",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "en",
		content: [
			"Course objective page (English). Tracked for progress; content is rendered by a dedicated component.",
		],
	},
	{
		id: "objective-fr",
		title: "Objectif",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "fr",
		content: [
			"Page d’objectif (français). Suivie pour la progression; le contenu est rendu par un composant dédié.",
		],
	},

	// Shared core sections
	{
		id: "foundational-documents",
		title: "Foundational Documents",
		heroImage: new URL("../assets/hero-documents.png", import.meta.url).href,
		lang: "both",
		content: [
			"This section explores key historical and contemporary documents which underpin the ongoing work to support Indigenous languages.",
			"These include the TRC Calls to Action, UNDRIP, and the Royal Commission on Aboriginal Peoples.",
		],
	},
	{
		id: "indigenous-languages-act",
		title: "Indigenous Languages Act",
		heroImage: new URL("../assets/hero-languages-act.png", import.meta.url)
			.href,
		lang: "both",
		content: [
			"The Indigenous Languages Act acknowledges the crucial role of Indigenous languages in Canada’s heritage.",
			"It provides a framework to protect, preserve and revitalize Indigenous languages.",
		],
	},
	{
		id: "revitalization-efforts",
		title: "Efforts to Revitalize Indigenous Languages",
		heroImage: new URL("../assets/hero-revitalize.png", import.meta.url).href,
		lang: "both",
		content: [
			"Across Canada, communities and partners are taking action to revitalize languages.",
			"Initiatives include immersion, language nests, documentation, and digital tools.",
		],
	},
	{
		id: "public-service",
		title: "What This Means for the Public Service",
		heroImage: new URL("../assets/hero-public-service.png", import.meta.url)
			.href,
		lang: "both",
		content: [
			"Public servants have a role in respecting and promoting Indigenous languages.",
			"Ensure programs/services are culturally appropriate and supportive of language revitalization.",
		],
	},

	// French-only extra pages
	{
		id: "voices-fr",
		title: "Voix",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "fr",
		content: [
			"Page « Voix » (français). Suivie pour la progression; contenu rendu par un composant dédié.",
		],
	},
	{
		id: "languages-fr",
		title: "Langues",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "fr",
		content: [
			"Page « Langues » (français). Suivie pour la progression; contenu rendu par un composant dédié.",
		],
	},
	{
		id: "results-fr",
		title: "Résultats",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "fr",
		content: [
			"Page « Résultats » (français). Suivie pour la progression; contenu rendu par un composant dédié.",
		],
	},

	// English-only extra pages (mirror of FR)
	{
		id: "voices-en",
		title: "Voices",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "en",
		content: [
			"“Voices” page (English). Tracked for progress; content is rendered by a dedicated component.",
		],
	},
	{
		id: "languages-en",
		title: "Languages",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "en",
		content: [
			"“Languages” page (English). Tracked for progress; content is rendered by a dedicated component.",
		],
	},
	{
		id: "results-en",
		title: "Results",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "en",
		content: [
			"“Results” page (English). Tracked for progress; content is rendered by a dedicated component.",
		],
	},

	// Shared endings
	{
		id: "knowledge-check",
		title: "Knowledge Check",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "both",
		content: [
			"Test your understanding of the material covered in this course.",
			"Reflect on the importance of Indigenous languages and our shared responsibilities.",
		],
	},
	{
		id: "resources",
		title: "Resources",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		lang: "both",
		content: [
			"Links to additional reading, toolkits, and organizations dedicated to language revitalization.",
		],
	},
];

export default sections;
