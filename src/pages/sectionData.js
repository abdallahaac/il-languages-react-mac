// ============================================================================
// sectionData.js
//
// This file centralizes the configuration for the different sections of the
// course. Each entry defines an identifier, a display title, the hero image
// associated with the page and the content paragraphs that should be
// presented beneath the hero. Keeping this data in one place makes it easy
// to add, remove or update sections without touching the rendering logic.
// ============================================================================

// When adding new sections, be sure to import any new hero images into
// SectionPage.jsx or reference them using the appropriate relative path
// from the src/assets folder.

const sections = [
	{
		id: "introduction",
		title: "Introduction and overview",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		content: [
			"Language is the foundation of a culture. For Indigenous oral societies, words hold knowledge amassed for millennia.",
			"A language holds the stories, songs, dances, protocols, family histories and connections. Languages also often hold the community’s customary laws that were eroded by the policies of the Indian Act.",
		],
	},
	{
		id: "foundational-documents",
		title: "Foundational Documents",
		heroImage: new URL("../assets/hero-documents.png", import.meta.url).href,
		content: [
			"This section explores key historical and contemporary documents which underpin the ongoing work to support Indigenous languages.",
			"These include the Truth and Reconciliation Commission’s Calls to Action, the United Nations Declaration on the Rights of Indigenous Peoples, and the Royal Commission on Aboriginal Peoples. Understanding these texts helps contextualize the journey toward language revitalization.",
		],
	},
	{
		id: "indigenous-languages-act",
		title: "Indigenous Languages Act",
		heroImage: new URL("../assets/hero-languages-act.png", import.meta.url)
			.href,
		content: [
			"The Indigenous Languages Act acknowledges the crucial role of Indigenous languages in Canada’s heritage.",
			"It provides a framework for support and collaboration, setting out measures to protect, preserve and revitalize Indigenous languages across the country. The Act was developed in partnership with Indigenous peoples and guides federal initiatives moving forward.",
		],
	},
	{
		id: "revitalization-efforts",
		title: "Efforts to revitalize Indigenous languages",
		heroImage: new URL("../assets/hero-revitalize.png", import.meta.url).href,
		content: [
			"Across Canada, Indigenous communities, governments and organizations are taking action to revitalize languages.",
			"Initiatives include immersion programs, language nests, community classes, documentation projects, digital tools and partnerships between communities and educational institutions. These efforts breathe life back into languages and strengthen cultural continuity.",
		],
	},
	{
		id: "public-service",
		title: "What this means for the public service",
		heroImage: new URL("../assets/hero-public-service.png", import.meta.url)
			.href,
		content: [
			"Public servants have a role in respecting and promoting Indigenous languages.",
			"This means recognizing the importance of language in policy and program development, supporting initiatives that protect and promote Indigenous languages, and ensuring government services are accessible and culturally appropriate.",
		],
	},
	{
		id: "knowledge-check",
		title: "Knowledge Check",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		content: [
			"Test your understanding of the material covered in this course with a brief knowledge check.",
			"Reflect on what you have learned so far about the importance of Indigenous languages and the responsibilities we all share in their revitalization.",
		],
	},
	{
		id: "resources",
		title: "Resources",
		heroImage: new URL("../assets/home-img.jpeg", import.meta.url).href,
		content: [
			"Here you will find links to additional reading, toolkits and organizations dedicated to the support and revitalization of Indigenous languages.",
			"Use these resources to deepen your understanding and to inform your work and personal commitments.",
		],
	},
];

export default sections;
