import Link from "next/link";
import { Container } from "@/components/layout";

export default function HomePage()
{
	return (
		<main>
			<Container>
				<div className="flex flex-col items-start justify-center min-h-[60vh]">
					<p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-4">
						New arrivals
					</p>
					<h1 className="text-4xl md:text-5xl font-medium text-charcoal tracking-tight leading-tight max-w-md">
						Thoughtfully curated goods.
					</h1>
					<Link
						href="/shop"
						className="mt-10 px-6 py-3 text-xs tracking-[0.2em] uppercase bg-charcoal text-ivory hover:bg-stone-700 transition-colors duration-200"
					>
						Shop the collection
					</Link>
				</div>
			</Container>
		</main>
	);
}
