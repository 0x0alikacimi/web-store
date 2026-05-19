"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	delay?: number;
	className?: string;
}

export function FadeIn({ children, delay = 0, className }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
