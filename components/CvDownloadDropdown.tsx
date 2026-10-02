"use client";

import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuDownload } from "react-icons/lu";

interface CvOption {
	label: string;
	filename: string;
	href: string;
}

const CV_OPTIONS: CvOption[] = [
	{
		label: "Production AI",
		filename: "Daniel_Parra_Production_AI_CV.pdf",
		href: "/production_ai_cv.pdf",
	},
	{
		label: "MLOps",
		filename: "Daniel_Parra_MLOps_CV.pdf",
		href: "/mlops_cv.pdf",
	},
];

export default function CvDownloadDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div ref={dropdownRef} className="relative inline-block text-left shrink-0">
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-haspopup="true"
				aria-label="Download Curriculum Vitae Options"
				className="group inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-lg bg-bg-card hover:bg-accent-subtle text-text-secondary hover:text-accent font-secondary text-xs font-semibold uppercase tracking-wider border border-border-card hover:border-accent/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-colors duration-200 cursor-pointer select-none"
			>
				<LuDownload className="w-3.5 h-3.5 text-accent" />
				<span>CV</span>
				<LuChevronDown
					className={`w-3.5 h-3.5 transition-transform duration-200 ${
						isOpen ? "rotate-180 text-accent" : "text-text-muted group-hover:text-accent"
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-52 rounded-xl bg-bg-card border border-border-card shadow-2xl py-1.5 z-50 animate-fade-in backdrop-blur-md">
					<div className="px-3.5 py-1.5 border-b border-border-card text-[10px] font-mono uppercase tracking-widest text-text-muted">
						Select Track
					</div>
					{CV_OPTIONS.map((opt) => (
						<a
							key={opt.href}
							href={opt.href}
							download={opt.filename}
							onClick={() => setIsOpen(false)}
							className="flex items-center justify-between px-3.5 py-2.5 text-xs font-secondary text-text-secondary hover:text-accent hover:bg-accent-subtle transition-colors cursor-pointer group/item"
						>
							<span className="font-medium text-text-primary group-hover/item:text-accent">
								{opt.label}
							</span>
							<span className="font-mono text-[10px] text-text-muted flex items-center gap-1 group-hover/item:text-accent">
								PDF
								<LuDownload className="w-3 h-3" />
							</span>
						</a>
					))}
				</div>
			)}
		</div>
	);
}
