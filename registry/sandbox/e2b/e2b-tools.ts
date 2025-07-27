import { tool } from "ai";
import { Sandbox, type SandboxOpts } from "e2b";
import { z } from "zod";

export const terminalCommandTool = (options?: SandboxOpts) =>
	tool({
		description: "Execute a bash command and return the result",
		inputSchema: z.object({
			command: z.string().describe("bash command to execute"),
		}),
		execute: async ({ command }) => {
			const sandbox = await Sandbox.create(options);
			const { exitCode, stderr, stdout, error } =
				await sandbox.commands.run(command);
			await sandbox.kill();
			return { exitCode, stderr, stdout, error };
		},
	});
