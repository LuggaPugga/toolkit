import { Card } from "fumadocs-ui/components/card";
import type * as React from "react";

export const ToolsCards: React.FC<{ name: string }> = async ({ name }) => {
	const registryItem = (await import(`../../public/r/${name}.json`)).default;
	if (!registryItem?.files?.[0]?.content) {
		return null;
	}

	const exportedTools =
		registryItem.files[0].content
			.match(/export\s+const\s+(\w+)/g)
			?.map((match: string) => match.replace(/export\s+const\s+/, "")) || [];

	const getDescription = (constName: string) => {
		const toolPattern = new RegExp(
			`export\\s+const\\s+${constName}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*(?:\\{[^}]*return\\s*)?tool\\(\\{[^}]*description:\\s*["']([^"']+)["']`,
			"s",
		);
		const match = registryItem.files[0].content.match(toolPattern);
		if (!match) {
			return "No description available";
		}
		return match[1];
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{exportedTools.map((toolName: string) => (
				<Card key={toolName} title={toolName}>
					{getDescription(toolName)}
				</Card>
			))}
		</div>
	);
};
