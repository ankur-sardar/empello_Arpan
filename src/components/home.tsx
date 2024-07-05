import { useState } from "react";
import { getParsedObject } from "./utils";

const Home = () => {
	const [url, setUrl] = useState("");
	const [htmlResponse, setHtmlResponse] = useState("");

	const extractUrl = async () => {
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "text/html",
				},
			});

			const html = await response.text();
			console.log("HTML=>", html);
			// getParsedObject();
			// setHtmlResponse(doc.body.innerHTML);
		} catch (error) {
			console.error("Error fetching URL:", error);
		}
	};

	return (
		<>
			<input
				type="text"
				style={{ width: 800, marginTop: 50, marginBottom: 50 }}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<button onClick={extractUrl}>Submit</button>
			<hr />
			<div>{htmlResponse}</div>
		</>
	);
};

export default Home;
