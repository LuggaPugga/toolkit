import { tool } from "ai";
import {
	LinkupClient,
	type SearchOutputType,
	type SearchParams,
} from "linkup-sdk";
import z from "zod";

export const searchTool = (
	apiKey: string,
	outputType: SearchOutputType,
	options?: Partial<SearchParams<typeof outputType>>,
) =>
	tool({
		name: "search",
		description: "Search for the internet by a query",
		inputSchema: z.object({
			query: z.string(),
		}),
		execute: async ({ query }) => {
			const linkup = new LinkupClient({ apiKey: apiKey });
			const results = await linkup.search({
				query: query,
				outputType: outputType,
				depth: options?.depth ?? "standard",
				...options,
			});
			return results;
		},
	});
