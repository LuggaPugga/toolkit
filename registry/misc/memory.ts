import { tool } from "ai";
import { z } from "zod";

export const memoryTool = (
	safeMemory: (memory: string) => Promise<boolean>,
) => {
	return tool({
		name: "memory",
		description:
			"Store information in memory for later use. Only use this tool when you need to store important information that will be relevant for future conversations. Don't store useless or redundant information.",
		inputSchema: z.object({
			memory: z.string().describe("The information to store in memory"),
		}),
		execute: async ({ memory }) => {
			const success = await safeMemory(memory);
			return { success };
		},
	});
};
