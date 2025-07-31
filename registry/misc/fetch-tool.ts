import { tool } from "ai";
import { z } from "zod";

export const fetchTool = () =>
	tool({
		description: "Fetch a URL and return the result as a string",
		inputSchema: z.object({
			url: z.url().describe("The URL to fetch"),
		}),
		execute: async ({ url }) => {
			const response = await fetch(url);
			return response.text();
		},
	});
