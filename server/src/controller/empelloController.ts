import db from "../config/db";
import { extractTicketDataFromHtml } from "../utils/helper";
import { getParsedObject } from "../utils/helper";

// const getTicketData = async (req: any, res: any) => {
// 	// try {
// 	// 	const categories = await db.query("SELECT * FROM xracademy.quiz_category");
// 	// 	res.status(200).json(categories.rows);
// 	// } catch (err: any) {
// 	// 	console.error(err.message);
// 	// 	res.status(500).send("Server error");
// 	// }
// };

const createTicketData = async (req: any, res: any) => {
	try {
		const { urlList = [] } = req.body;

		const promises = urlList.map(async (ticketUrl: string) => {
			return extractTicketDataFromHtml(ticketUrl);
		});

		const results = await Promise.all(promises);
		const ticketDataList = results.map((result: any) => {
			return result.data;
		});

		const extractedData = ticketDataList.map((html: any) => {
			return getParsedObject(html);
		});

		//*******Unlock below part to save data in DB *************
		// extractedData.forEach(async (log: any) => {
		// 	const {
		// 		brandName,
		// 		bannerUrl,
		// 		adUrl,
		// 		adChannel,
		// 		landingPages,
		// 		finalUrl,
		// 		operator,
		// 		logDate,
		// 		homePage,
		// 		userAgent,
		// 		originUrls,
		// 		utm_cdn,
		// 	} = log;

		// 	await db.query(
		// 		"INSERT INTO empellotickets.ticket_details(brand_name, banner_url, ad_url, ad_channel, landing_pages, final_url, operator, log_date, home_page, user_agent, origin_urls, utm_cdn) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
		// 		[
		// 			brandName,
		// 			bannerUrl,
		// 			adUrl,
		// 			adChannel,
		// 			landingPages,
		// 			finalUrl,
		// 			operator,
		// 			logDate,
		// 			homePage,
		// 			userAgent,
		// 			originUrls,
		// 			utm_cdn,
		// 		]
		// 	);
		// });

		res.status(200).json(extractedData);
	} catch (err: any) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
export { createTicketData };
