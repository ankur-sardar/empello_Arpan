import { html } from "./data.ts";

const extractLandingPages = (nodes: any) => {
	let pages: string[] = [];
	nodes.forEach((item: any) =>
		pages.push(item.children[3].getAttribute("href"))
	);
	return pages;
};

export const extractLog = (htmlString: string) => {
	let segments: any[] = [];
	let log = {
		homePage: "",
		userAgent: "",
		originUrls: new Set<string>(),
		utm_cdn: "",
	} as {
		homePage: string;
		userAgent: string;
		originUrls: Set<string>;
		utm_cdn: string;
	};
	const splittedSegments = htmlString.split("<br>\n");
	splittedSegments.forEach((item: string) => {
		if (item.trim().length > 0) {
			segments.push(item.trim().split("::"));
		}
	});
	console.log("SEGMENTS=>", segments);

	segments.forEach((item: any, i) => {
		if (i === 0 && item[0].trim() === "GET RESOURCE") {
			log = {
				...log,
				homePage: item[2].trim(),
			};
		}
		if (item[0].trim() === "REQUEST HEADER") {
			const headerParts = item[2].trim().split(", ");
			// console.log("HEADER PARTS=>", headerParts);
			for (let part of headerParts) {
				if (part.startsWith("User-Agent=")) {
					log = {
						...log,
						userAgent: part.substring("User-Agent=".length),
					};
				}
				if (part.startsWith("{Origin=")) {
					log = {
						...log,
						originUrls: log.originUrls.add(part.substring("{Origin=".length)),
					};
				}
			}
		}
		// if (i !== 1 && item[0].trim() === "REQUEST HEADER") {
		// 	const headerParts = item[2].trim().split(", ");
		// 	for (let part of headerParts) {
		// 		if (part.startsWith("{Origin=")) {
		// 			log = {
		// 				...log,
		// 				originUrls: log.originUrls.add(part.substring("{Origin=".length)),
		// 			};
		// 		}
		// 	}
		// }
		if (item[0].trim() === "RESPOSE URL") {
			const headerParts = item[2].trim().split("&");
			for (let part of headerParts) {
				if (part.startsWith("amp;utm_cdn=")) {
					log = {
						...log,
						utm_cdn: part.substring("amp;utm_cdn=".length),
					};
				}
			}
		}
	});

	return log;
};

export const getParsedObject = () => {
	let parsedObject = {};
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const body = doc.body.getElementsByClassName("body");
	const table =
		body[0].children[0].children[0].children[1].children[0].children[0];

	console.log("Table=>", table.children[1].children[1].innerHTML);
	parsedObject = {
		...parsedObject,
		brandName: table.children[1].children[1].innerHTML,
		bannerUrl: table.children[2].children[1].children[0].innerHTML,
		adUrl: table.children[3].children[1].children[0].getAttribute("href"),
		adChannel: table.children[4].children[1].innerHTML,
		landingPages: extractLandingPages(
			table.children[6].children[1].querySelectorAll("div")
		),
		finalUrl: table.children[7].children[1].children[0].getAttribute("href"),
		operator: table.children[8].children[1].innerHTML,
		logDate: table.children[9].children[1].innerHTML,
		...extractLog(
			table.children[11].children[1].children[0].children[0].children[0]
				.innerHTML
		),
	};

	// console.log("BODY=>", table);
	// console.log(
	// 	"TEST=>",
	// 	extractLog(
	// 		table.children[11].children[1].children[0].children[0].children[0]
	// 			.innerHTML
	// 	)
	// );
	console.log("Parsed Object=>", parsedObject);
};
