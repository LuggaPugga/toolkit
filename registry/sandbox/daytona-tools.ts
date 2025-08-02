import { Daytona, type DaytonaConfig } from "@daytonaio/sdk";
import { tool } from "ai";
import { z } from "zod";

export const codeExecutionTool = (options?: DaytonaConfig) => {
	return tool({
		description: "Execute a command in a Daytona sandbox",
		inputSchema: z.object({
			language: z
				.enum(["java", "python", "typescript", "javascript"])
				.describe("The programming language to use"),
			command: z.string().describe("The command to execute"),
		}),
		execute: async ({ language, command }) => {
			const daytona = new Daytona(options);
			const sandbox = await daytona.create({
				language: language,
			});
			const response = await sandbox.process.codeRun(command);
			await sandbox.delete();
			return response.result;
		},
	});
};
