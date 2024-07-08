import axios from "axios";
import { parseFromString } from "dom-parser";

export const extractTicketDataFromHtml = (url: string) => {
	return axios.get(url);
};

const extractLandingPages = (nodes: any) => {
	let pages: string[] = [];
	// console.log("NODES=>", nodes);
	nodes.forEach((item: any) => {
		pages.push(item.childNodes[1].getAttribute("href"));
		// console.log("ITEM=>", item.childNodes[1].getAttribute("href"));
	});
	return pages;
};

export const extractLog = (htmlString: string) => {
	// console.log("HTML STRING=>", htmlString);
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
	const splittedSegments = htmlString.split("<br/>");
	// console.log("splittedSegments=>", splittedSegments);
	splittedSegments.forEach((item: string) => {
		if (item.trim().length > 0) {
			segments.push(item.trim().split("::"));
		}
	});
	// console.log("SEGMENTS=>", segments);

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
					// console.log("PART_ORIGIN=>", part.substring("{Origin=".length));
					let updatedOriginUrls = log.originUrls;
					console.log("updatedOriginUrls=>", updatedOriginUrls);
					updatedOriginUrls.add(part.substring("{Origin=".length));
					log = {
						...log,
						originUrls: updatedOriginUrls,
					};
				}
			}
		}
		if (item[0].trim() === "RESPOSE URL") {
			const headerParts = item[2].trim().split("&");
			for (let part of headerParts) {
				if (part.startsWith("utm_cdn=")) {
					log = {
						...log,
						utm_cdn: part.substring("utm_cdn=".length),
					};
				}
			}
		}
	});

	return { ...log, originUrls: Array.from(log.originUrls) };
};

export const getParsedObject = (html: string) => {
	let parsedObject = {};
	// const parser = new jsdom.DOMParser();
	const dom = parseFromString(html);
	const body = dom.getElementsByClassName("body");

	const table =
		body[0]?.childNodes[1]?.childNodes[1]?.childNodes[3]?.childNodes[1];

	console.log("######################################");
	// console.log(
	// 	"table=>",
	// 	table.childNodes[1].childNodes[3].childNodes[3].innerHTML
	// );
	parsedObject = {
		...parsedObject,
		brandName:
			table?.childNodes[1]?.childNodes[3]?.childNodes[3]?.innerHTML || "",
		bannerUrl:
			table?.childNodes[1]?.childNodes[5]?.childNodes[5]?.childNodes[1]?.getAttribute(
				"href"
			) || "",
		adUrl:
			table?.childNodes[1]?.childNodes[7]?.childNodes[5]?.childNodes[1]?.getAttribute(
				"href"
			) || "",
		adChannel:
			table?.childNodes[1]?.childNodes[9]?.childNodes[3]?.innerHTML || "",
		landingPages: extractLandingPages(
			table?.childNodes[1]?.childNodes[13]?.childNodes[5]?.getElementsByTagName(
				"div"
			) || ""
		),
		finalUrl:
			table?.childNodes[1]?.childNodes[15]?.childNodes[3]?.childNodes[1]?.getAttribute(
				"href"
			),
		operator:
			table?.childNodes[1]?.childNodes[17]?.childNodes[3]?.innerHTML || "",
		logDate:
			table?.childNodes[1]?.childNodes[21]?.childNodes[3]?.innerHTML || "",
		...extractLog(
			table?.childNodes[1]?.childNodes[25]?.childNodes[3]?.childNodes[0]
				?.childNodes[1]?.childNodes[0]?.childNodes[0]?.innerHTML || ""
		),
	};

	console.log("PARSED OBJECT=>", parsedObject);
	return parsedObject;
	// console.log("BODY=>", table);
	// console.log(
	// 	"TEST=>",
	// 	extractLog(
	// 		table.children[11].children[1].children[0].children[0].children[0]
	// 			.innerHTML
	// 	)
	// );
	// console.log("Parsed Object=>", parsedObject);
};
