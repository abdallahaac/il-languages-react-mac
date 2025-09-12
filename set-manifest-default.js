// set-manifest-default.js
// Post-build step: adjust imsmanifest default org + index.html lang/title based on BUILD_LANG

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Which language are we packaging?
const argLang = (process.argv[2] || "").toLowerCase();
const envLang = (process.env.BUILD_LANG || "").toLowerCase();
const BUILD_LANG = argLang || envLang || "en";
const isFR = BUILD_LANG === "fr";

// Paths inside the built /dist
const distDir = path.join(__dirname, "dist");
const manifestPath = path.join(distDir, "imsmanifest.xml");
const indexPath = path.join(distDir, "index.html");

// Titles
const TITLE_EN = "Revitalizing Voices: Navigating the Indigenous Languages Act";
const TITLE_FR =
	"Revitalisation des voix autochtones : comprendre la Loi sur les langues autochtones";

// 1) Update imsmanifest.xml default org
if (fs.existsSync(manifestPath)) {
	let xml = fs.readFileSync(manifestPath, "utf8");

	// Replace default="ORG_EN|ORG_FR"
	xml = xml.replace(
		/(<organizations[^>]*\sdefault=")(ORG_EN|ORG_FR)(")/,
		`$1${isFR ? "ORG_FR" : "ORG_EN"}$3`
	);

	fs.writeFileSync(manifestPath, xml, "utf8");
} else {
	console.warn("⚠️ imsmanifest.xml not found in dist/");
}

// 2) Update index.html <html lang> and <title>
if (fs.existsSync(indexPath)) {
	let html = fs.readFileSync(indexPath, "utf8");

	// <html lang="en|fr">
	html = html.replace(
		/<html[^>]*\blang="(en|fr)"/i,
		`<html lang="${isFR ? "fr" : "en"}"`
	);

	// <title>…</title>
	html = html.replace(
		/<title>[\s\S]*?<\/title>/i,
		`<title>${isFR ? TITLE_FR : TITLE_EN}</title>`
	);

	fs.writeFileSync(indexPath, html, "utf8");
} else {
	console.warn("⚠️ index.html not found in dist/");
}

console.log(
	`✅ Updated manifest & index for "${BUILD_LANG}" — title set to: ${
		isFR ? TITLE_FR : TITLE_EN
	}`
);
