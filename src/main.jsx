// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import ScormEnabledApp from "./App.jsx"; // Make sure to import the default export
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ScormEnabledApp />
	</React.StrictMode>
);
