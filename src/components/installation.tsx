import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import type * as React from "react";

export const Installation: React.FC<{ name: string }> = async ({ name }) => {
	const registryItem = (await import(`../../public/r/${name}.json`)).default;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	if (!registryItem?.files?.[0]?.content) {
		return null;
	}

	return (
		<>
			<Tabs
				items={["npm", "pnpm", "yarn", "bun"]}
				persist
				groupId="package-manager"
			>
				<Tab value="npm">
					<DynamicCodeBlock
						lang="bash"
						code={`npx shadcn@latest add ${baseUrl}/r/${name}.json`}
					/>
				</Tab>
				<Tab value="pnpm">
					<DynamicCodeBlock
						lang="bash"
						code={`pnpm dlx shadcn@latest add ${baseUrl}/r/${name}.json`}
					/>
				</Tab>
				<Tab value="yarn">
					<DynamicCodeBlock
						lang="bash"
						code={`yarn dlx shadcn@latest add ${baseUrl}/r/${name}.json`}
					/>
				</Tab>
				<Tab value="bun">
					<DynamicCodeBlock
						lang="bash"
						code={`bun x shadcn@latest add ${baseUrl}/r/${name}.json`}
					/>
				</Tab>
			</Tabs>

			<Accordions type="single">
				<Accordion title="Manual Installation">
					<DynamicCodeBlock lang="tsx" code={registryItem.files[0].content} />
				</Accordion>
			</Accordions>
		</>
	);
};
