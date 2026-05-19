import { Container } from "@/components/layout";

export default function ProductDetailLoading()
{
	return (
		<main>
			<Container>
				<div className="py-12 md:py-16">
					<div className="w-24 h-3 bg-stone-200 rounded animate-pulse" />

					<div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

						<div className="aspect-[3/4] bg-stone-100 animate-pulse" />

						<div className="md:pt-6 flex flex-col">
							<div className="pb-7 border-b border-sand space-y-4">
								<div className="w-16 h-2.5 bg-stone-200 rounded animate-pulse" />
								<div className="w-3/4 h-8 bg-stone-200 rounded animate-pulse" />
								<div className="w-24 h-6 bg-stone-200 rounded animate-pulse" />
							</div>
							<div className="pt-7 pb-7 border-b border-sand space-y-2.5">
								<div className="w-full h-3 bg-stone-200 rounded animate-pulse" />
								<div className="w-full h-3 bg-stone-200 rounded animate-pulse" />
								<div className="w-2/3 h-3 bg-stone-200 rounded animate-pulse" />
							</div>
							<div className="pt-7 pb-8">
								<div className="w-28 h-3 bg-stone-200 rounded animate-pulse" />
							</div>
							<div className="w-full h-12 bg-stone-200 rounded animate-pulse" />
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}
