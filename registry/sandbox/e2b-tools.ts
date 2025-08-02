import { Sandbox, type SandboxOpts } from "@e2b/code-interpreter";
import { tool } from "ai";
import { z } from "zod";

export const terminalCommandTool = (options?: SandboxOpts) =>
	tool({
		description: "Execute a terminal command and return the result",
		inputSchema: z.object({
			command: z.string().describe("terminal command to execute"),
		}),
		execute: async ({ command }) => {
			const sandbox = await Sandbox.create(options);
			const { exitCode, stderr, stdout, error } =
				await sandbox.commands.run(command);
			await sandbox.kill();
			return { exitCode, stderr, stdout, error };
		},
	});

export const codeExecutionTool = (options?: SandboxOpts) =>
	tool({
		description:
			"Execute python code in a Jupyter notebook cell and return result",
		inputSchema: z.object({
			code: z
				.string()
				.describe("The python code to execute in a Jupyter notebook cell"),
		}),
		execute: async ({ code }) => {
			const sandbox = await Sandbox.create(options);
			const execution = await sandbox.runCode(code);
			await sandbox.kill();
			return execution.text;
		},
	});

export const e2bTools = (options?: SandboxOpts) => {
	return [terminalCommandTool(options), codeExecutionTool(options)];
};
