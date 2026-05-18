export function Container({ children }: { children: React.ReactNode }) {
	return <div className="max-w-5xl mx-auto px-8">{children}</div>;
}

export function Section({ children }: { children: React.ReactNode }) {
	return <div className="py-12">{children}</div>;
}

export function Grid({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{children}
		</div>
	);
}
