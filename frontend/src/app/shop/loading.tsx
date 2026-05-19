import { Container } from "@/components/layout";

export default function ShopLoading()
{
	return (
		<main>
			<div className="border-b border-sand">
				<Container>
					<div className="py-16 md:py-20">
						<div className="w-20 h-2 bg-stone-200 rounded-sm animate-pulse" />
						<div className="mt-3 w-40 h-9 bg-stone-200 rounded-sm animate-pulse" />
						<div className="mt-4 w-52 h-3.5 bg-stone-200 rounded-sm animate-pulse" />
					</div>
				</Container>
			</div>

			<Container>
				<div className="py-16 md:py-20">
					{/* Filter bar */}
					<div className="mb-14">
						<div className="flex items-center gap-6 mb-6">
							<div className="w-10 h-2 bg-stone-200 rounded-sm animate-pulse shrink-0" />
							<div className="flex-1 h-px bg-stone-200" />
						</div>
						<div className="flex flex-wrap gap-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="w-14 h-7 bg-stone-200 rounded-sm animate-pulse" />
							))}
						</div>
					</div>

					{/* Product grid */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="animate-pulse">
								<div className="aspect-[3/4] bg-stone-100" />
								<div className="px-5 pt-4 pb-5 space-y-2.5">
									<div className="h-2.5 bg-stone-200 rounded-sm w-3/4" />
									<div className="h-2 bg-stone-200 rounded-sm w-1/4" />
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</main>
	);
}
