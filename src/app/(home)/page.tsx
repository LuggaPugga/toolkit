import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex flex-1 flex-col justify-center text-center px-6">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="space-y-4">
					<h1 className="text-6xl font-bold text-fd-foreground">
						AI Tools Registry
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						A curated collection of production-ready AI tools built for the
						Vercel AI SDK. Copy, paste, and customize tools for your next AI
						application.
					</p>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link
						className="w-full text-center bg-fd-primary-foreground text-primary-foreground px-8 py-3 rounded-md"
						href="/docs"
					>
						Browse Tools
					</Link>
				</div>
			</div>
		</main>
	);
}
