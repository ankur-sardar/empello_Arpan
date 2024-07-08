import { useState } from "react";
// import { getParsedObject } from "./utils";
import empelloService from "../services";

const Home = () => {
	const [url, setUrl] = useState("");
	const [htmlResponse, setHtmlResponse] = useState("");

	const extractUrl = async () => {
		try {
			const response = await empelloService.extractEmpelloTicketData(
				url.split(",")
			);

			console.log("RESPONSE=>", response);
			// getParsedObject();
			// setHtmlResponse(doc.body.innerHTML);
		} catch (error) {
			console.error("Error fetching URL:", error);
		}
	};

	return (
		<>
			<textarea
				style={{ width: 800, height: 200, marginTop: 20, marginBottom: 20 }}
				onChange={(e) => setUrl(e.target.value)}
			></textarea>
			<button onClick={extractUrl}>Submit</button>
			<hr />
			<div>{htmlResponse}</div>
		</>
	);
};

export default Home;
