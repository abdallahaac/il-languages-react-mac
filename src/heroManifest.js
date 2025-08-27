// heroManifest.js
// Import files so the bundler fingerprints & serves them correctly in Brightspace.
import homeIMG from "./assets/home-img.jpeg";
import introductionIMG from "./assets/image.png";
import objectiveIMG from "./assets/objective.jpeg";
import voicesIMG from "./assets/voices.jpeg";
import languagesIMG from "./assets/language.jpeg";
import resultsIMG from "./assets/results.jpeg";
import docsIMG from "./assets/hero-documents.png";
import ilaIMG from "./assets/hero-languages-act.png";
import revitalizeIMG from "./assets/hero-revitalize.png";
import publicServiceIMG from "./assets/hero-public-service.png";
import checkIMG from "./assets/check.png";
import resourcesIMG from "./assets/resource.png";

export const HERO_IMAGES = {
	en: {
		home: homeIMG,
		introduction: introductionIMG,
		"objective-en": objectiveIMG,
		"voices-en": voicesIMG,
		"languages-en": languagesIMG,
		"results-en": resultsIMG,
		"foundational-documents": docsIMG,
		"indigenous-languages-act": ilaIMG,
		"revitalization-efforts": revitalizeIMG,
		"public-service": publicServiceIMG,
		"knowledge-check": checkIMG,
		resources: resourcesIMG,
	},
	fr: {
		home: homeIMG,
		"objective-fr": objectiveIMG,
		"voices-fr": voicesIMG,
		"languages-fr": languagesIMG,
		"results-fr": resultsIMG,
		"foundational-documents": docsIMG,
		"indigenous-languages-act": ilaIMG,
		"revitalization-efforts": revitalizeIMG,
		"public-service": publicServiceIMG,
		"knowledge-check": checkIMG,
		resources: resourcesIMG,
	},
};
