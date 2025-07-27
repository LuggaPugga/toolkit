import {
	type TavilyExtractOptions,
	type TavilySearchOptions,
	tavily,
} from "@tavily/core";
import { tool } from "ai";
import z from "zod";

export const searchTool = (apiKey: string, options?: TavilySearchOptions) =>
	tool({
		name: "search",
		description: "Search for the internet by a query",
		args: {
			query: z.string(),
		},
		execute: async ({ query }) => {
			const tvly = tavily({ apiKey: apiKey });
			const results = await tvly.search(query, options);
			return results;
		},
	});

export const extractTool = (apiKey: string, options?: TavilyExtractOptions) =>
	tool({
		name: "extract",
		description: "Extract the content from one or multiple web pages",
		args: {
			urls: z.string().array,
		},
		execute: async ({ urls }) => {
			const tvly = tavily({ apiKey: apiKey });
			const results = await tvly.extract(urls, options);
			return results;
		},
	});
