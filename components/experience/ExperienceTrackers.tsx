"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import AcademicCard from "@/components/experience/AcademicCard";
import ExperienceCard from "@/components/experience/ExperienceCard";
import MarqueeGallery from "@/components/MarqueeGallery";
import QuickAccessPills from "@/components/QuickAccessPills";
import {
	ACADEMIC_INSTITUTIONS,
	INDUSTRY_EXPERIENCE,
	LOOP_ACADEMIC,
	LOOP_INDUSTRY,
} from "@/lib/data";
import type { AcademicInstitutionItem, IndustryExperienceItem } from "@/lib/types";

const ExperienceModal = dynamic(() => import("./ExperienceModal"), {
	ssr: false,
});
const AcademicModal = dynamic(() => import("./AcademicModal"), {
	ssr: false,
});

export default function ExperienceTrackers() {
	const [selectedExp, setSelectedExp] = useState<IndustryExperienceItem | null>(null);
	const [selectedInst, setSelectedInst] = useState<AcademicInstitutionItem | null>(null);

	const industryPills = INDUSTRY_EXPERIENCE.map((exp) => ({
		id: exp.company,
		label: exp.company,
		onClick: () => setSelectedExp(exp),
	}));

	const academicPills = ACADEMIC_INSTITUTIONS.map((inst) => ({
		id: inst.institutionAcronym,
		label: inst.institutionAcronym,
		onClick: () => setSelectedInst(inst),
	}));

	return (
		<div className="space-y-12 sm:space-y-14">
			{/* Part 1: Industry Track Record Marquee Gallery */}
			<div className="space-y-4">
				<div className="flex items-center gap-3 border-l-2 border-accent/80 pl-3.5">
					<LuBriefcase className="w-5 h-5 text-accent shrink-0" />
					<h3 className="font-primary text-2xl sm:text-3xl font-normal text-text-primary leading-relaxed tracking-wide">
						Industry
					</h3>
				</div>

				{/* Quick View Pills for Direct Modal Access */}
				<QuickAccessPills label="Direct view:" items={industryPills} className="pt-1 pb-1" />

				{/* Animated Marquee Gallery */}
				<MarqueeGallery direction="left" speed="normal">
					{LOOP_INDUSTRY.map((exp: IndustryExperienceItem, idx: number) => (
						<ExperienceCard
							// biome-ignore lint/suspicious/noArrayIndexKey: cloned array for seamless infinite marquee loop
							key={`${exp.company}-${idx}`}
							exp={exp}
							onSelect={setSelectedExp}
						/>
					))}
				</MarqueeGallery>
			</div>

			{/* Part 2: Academic Foundations Marquee Gallery */}
			<div className="space-y-4">
				<div className="flex items-center gap-3 border-l-2 border-accent/80 pl-3.5">
					<LuGraduationCap className="w-6 h-6 text-accent shrink-0" />
					<h3 className="font-primary text-2xl sm:text-3xl font-normal text-text-primary leading-relaxed tracking-wide">
						Education
					</h3>
				</div>

				{/* Quick View Pills for Direct Modal Access */}
				<QuickAccessPills label="Direct view:" items={academicPills} className="pt-1 pb-1" />

				{/* Animated Marquee Gallery */}
				<MarqueeGallery direction="right" speed="slow">
					{LOOP_ACADEMIC.map((inst: AcademicInstitutionItem, idx: number) => (
						<AcademicCard
							// biome-ignore lint/suspicious/noArrayIndexKey: cloned array for seamless infinite marquee loop
							key={`${inst.institutionAcronym}-${idx}`}
							inst={inst}
							onSelect={setSelectedInst}
						/>
					))}
				</MarqueeGallery>
			</div>

			{/* Progressive Disclosure Modals (Lazily loaded via next/dynamic) */}
			<ExperienceModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
			<AcademicModal inst={selectedInst} onClose={() => setSelectedInst(null)} />
		</div>
	);
}
