import { tool } from "ai";
import { z } from "zod";
import { readFile as fsReadFile, readdir } from "fs/promises";
import { resolve } from "path";

/*
This is a tool that allows the AI to read files from the filesystem.
This can be dangerous and should only be used when the AI has been given explicit permission to do so.
*/

export const readFileTool = tool({
	name: "read_file",
	description: "Read the contents of a file from the filesystem. Supports both absolute and relative paths.",
	inputSchema: z.object({
		path: z.string().describe("The file path to read (absolute or relative)"),
		encoding: z.enum(["utf8", "base64", "hex"]).default("utf8").describe("The encoding to use when reading the file"),
	}),
	execute: async ({ path, encoding }) => {
			const resolvedPath = resolve(path);
			const content = await fsReadFile(resolvedPath, encoding).catch((error) => {
				return {
					success: false,
					error: error instanceof Error ? error.message : "Unknown error occurred",
					path: resolve(path),
				};
			});
			
			return {
				success: true,
				path: resolvedPath,
				content,
				encoding,
				size: Buffer.byteLength(content.toString(), encoding),
			};
	},
});

export const listDirectoryTool = tool({
	name: "list_directory",
	description: "List the contents of a directory. If no path is provided, lists the current working directory.",
	inputSchema: z.object({
		path: z.string().optional().describe("The directory path to list (absolute or relative). Defaults to current working directory."),
	}),
	execute: async ({ path = "." }) => {
		const resolvedPath = resolve(path);
		const items = await readdir(resolvedPath).catch((error) => {
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error occurred",
				path: resolve(path),
			};
		});
		return items;
	},
});
