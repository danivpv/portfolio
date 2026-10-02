"use client";

import type React from "react";
import { useState } from "react";
import QuickAccessPills, { type QuickAccessItem } from "@/components/QuickAccessPills";

interface CategoryViewToggleProps {
	category: string;
	count: number;
	pills: QuickAccessItem[];
	children: React.ReactNode;
}

export default function CategoryViewToggle({
	category,
	count,
	pills,
	children,
}: CategoryViewToggleProps) {
	const [isDirect, setIsDirect] = useState(false);

	return (
		<div>
			<div className="flex items-center justify-between mb-3">
				<h3 className="font-mono text-[11px] uppercase tracking-widest font-semibold text-accent">
					{category}
				</h3>
				<button
					type="button"
					onClick={() => setIsDirect((prev) => !prev)}
					aria-label={`Toggle view mode for ${category}`}
					className="font-mono text-[10px] text-text-muted hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
				>
					<span>{count} tech</span>
					<span>•</span>
					<span className="underline decoration-dotted text-text-secondary hover:text-accent">
						{isDirect ? "Show marquee" : "Direct view"}
					</span>
				</button>
			</div>

			{isDirect ? (
				<div className="py-1">
					<QuickAccessPills label="" items={pills} />
				</div>
			) : (
				children
			)}
		</div>
	);
}
