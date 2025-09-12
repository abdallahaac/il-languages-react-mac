import fs from "fs";
import archiver from "archiver";

/**
 * Generates a timestamp string in the format YYYY-MM-DD-HH-MM-SS.
 * @returns {string} The formatted timestamp.
 */
const getTimestamp = () => {
	const now = new Date();
	const year = now.getFullYear();
	// Pad month, day, hours, minutes, and seconds with a leading zero if they are single-digit.
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	// Updated to include dashes between all date and time components
	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

// Construct the dynamic filename using the timestamp.
const timestamp = getTimestamp();
const fileName = `en-indigenous-languages-act-${timestamp}.zip`;

// Create a write stream with the new dynamic filename.
const output = fs.createWriteStream(`./${fileName}`);
const archive = archiver("zip", { zlib: { level: 9 } });

// Event listener for when the zip file has been created.
output.on("close", () => {
	console.log(`Zip file created: ${fileName}`);
	console.log(`${archive.pointer()} total bytes`);
});

// Event listener for any errors during archiving.
archive.on("error", (err) => {
	throw err;
});

// Pipe the archive data to the output file.
archive.pipe(output);

// Add the contents of the './dist/' directory to the root of the zip file.
archive.directory("./dist/", false);

// Finalize the archive (this writes the central directory and closes the stream).
archive.finalize();
