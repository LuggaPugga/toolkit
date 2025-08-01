import {
	experimental_generateImage as generateImage,
	type ImageModel,
	tool,
} from "ai";
import { z } from "zod";

export const imageGenerationTool = (model: ImageModel) =>
	tool({
		name: "imageGeneration",
		description: "Generate an image using a text prompt",
		inputSchema: z.object({
			prompt: z.string(),
			aspectRatio: z.enum(["1:1", "16:9", "9:16", "4:3", "3:4"]),
		}),
		execute: async ({ prompt, aspectRatio }) => {
			const image = await generateImage({
				model,
				prompt,
				aspectRatio,
			});

			return image;
		},
	});
