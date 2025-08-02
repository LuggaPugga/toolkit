import { tool } from "ai";
import Exa, {
	type ContentsOptions,
	type FindSimilarOptions,
	type RegularSearchOptions,
} from "exa-js";
import z from "zod";

const ExaCategoryEnum = z.enum([
	"company",
	"research paper",
	"news",
	"pdf",
	"github",
	"tweet",
	"personal site",
	"linkedin profile",
	"financial report",
]);

export const searchTool = (apiKey: string, options?: RegularSearchOptions) =>
	tool({
		name: "search",
		description:
			"Search the web using Exa's neural or keyword search. Automatically chooses the best search type for the query.",
		inputSchema: z.object({
			query: z.string().describe("The search query"),
			category: ExaCategoryEnum.optional().describe(
				"Focus search on specific content category",
			),
		}),
		execute: async ({ query }) => {
			const exa = new Exa(apiKey);
			const results = await exa.searchAndContents(query, options);
			return results;
		},
	});

export const getContentsTool = (apiKey: string, options?: ContentsOptions) =>
	tool({
		name: "getContents",
		description:
			"Extract clean text content from specific URLs. Useful when you have URLs and need their content.",
		inputSchema: z.object({
			urls: z.array(z.url()).describe("Array of URLs to extract content from"),
		}),
		execute: async ({ urls }) => {
			const exa = new Exa(apiKey);
			const results = await exa.getContents(urls, options);
			return results;
		},
	});

export const findSimilarTool = (apiKey: string, options?: FindSimilarOptions) =>
	tool({
		name: "findSimilar",
		description: "Find web pages similar to a given URL.",
		inputSchema: z.object({
			url: z.url().describe("The URL to find similar pages for"),
		}),
		execute: async ({ url }) => {
			const exa = new Exa(apiKey);
			const results = await exa.findSimilar(url, options);
			return results;
		},
	});

export const findSimilarAndContentsTool = (
	apiKey: string,
	options?: FindSimilarOptions & ContentsOptions,
) =>
	tool({
		name: "findSimilarAndContents",
		description:
			"Find web pages similar to a given URL and return the contents of the pages.",
		inputSchema: z.object({
			url: z.url().describe("The URL to find similar pages for"),
		}),
		execute: async ({ url }) => {
			const exa = new Exa(apiKey);
			const results = await exa.findSimilarAndContents(url, options);
			return results;
		},
	});
