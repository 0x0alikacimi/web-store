"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.07 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface Props {
	products: Product[];
}

export function AnimatedProductGrid({ products }: Props) {
	return (
		<motion.div
			className="grid grid-cols-2 lg:grid-cols-4 gap-5"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-40px" }}
		>
			{products.map((product) => (
				<motion.div key={product.id} variants={cardVariants}>
					<ProductCard product={product} />
				</motion.div>
			))}
		</motion.div>
	);
}
