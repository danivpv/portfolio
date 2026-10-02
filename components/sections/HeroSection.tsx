import Image from "next/image";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import CvDownloadDropdown from "@/components/CvDownloadDropdown";
import { CERTIFICATIONS, HERO_DATA } from "@/lib/data";

export default function HeroSection() {
	return (
		<section
			id="hero"
			className="min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)] flex items-center pt-8 pb-14 sm:pt-12 sm:pb-20 overflow-visible"
		>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-center w-full">
				{/* Editorial Typography & Actions */}
				<div className="lg:col-span-7 flex flex-col justify-center min-w-0">
					<div className="font-mono text-xs uppercase tracking-widest text-accent font-medium mb-4 sm:mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
						<span className="whitespace-normal sm:whitespace-nowrap">{HERO_DATA.badge}</span>
						<span className="hidden sm:inline text-accent/60" aria-hidden="true">
							·
						</span>
						<span className="inline-flex flex-wrap items-center gap-x-1.5">
							<span className="whitespace-nowrap">
								{HERO_DATA.certPrefix} {CERTIFICATIONS.length}x
							</span>
							<span className="inline-flex items-center whitespace-nowrap">
								(
								{CERTIFICATIONS.map((cert, index) => (
									<React.Fragment key={cert.acronym}>
										{index > 0 && <span className="mr-1">,</span>}
										<a
											href={cert.credlyUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-accent underline underline-offset-4 decoration-accent/60 hover:decoration-accent hover:text-accent-subtle transition-colors cursor-pointer"
											title={`Verify ${cert.name} on Credly`}
										>
											{cert.acronym}
										</a>
									</React.Fragment>
								))}
								)
							</span>
						</span>
					</div>

					<h1 className="font-primary text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal tracking-normal text-text-primary mb-5 sm:mb-6 leading-[1.16]">
						{HERO_DATA.headlinePrefix}
						<br className="hidden md:block" />
						<span className="italic font-normal text-text-primary/90 inline-block whitespace-nowrap">
							{HERO_DATA.headlineHighlight}
						</span>
					</h1>

					<p className="font-secondary text-sm sm:text-base md:text-lg text-text-secondary max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal">
						{HERO_DATA.bioPrefix}
						<span className="italic text-text-primary">{HERO_DATA.bioHighlight}</span>
						{HERO_DATA.bioSuffix}
					</p>

					<div className="flex flex-wrap items-center gap-3 sm:gap-4">
						<a
							href={HERO_DATA.ctaLink}
							target={HERO_DATA.ctaLink.startsWith("http") ? "_blank" : undefined}
							rel={HERO_DATA.ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
							className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg border border-accent/80 text-accent font-secondary text-xs sm:text-sm font-medium hover:bg-accent-subtle hover:border-accent hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide cursor-pointer"
						>
							<span>{HERO_DATA.ctaText}</span>
							<LuArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
						<a
							href={HERO_DATA.secondaryCtaLink}
							className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-bg-card hover:bg-accent-subtle text-text-secondary hover:text-text-primary font-secondary text-xs sm:text-sm font-normal border border-border-card hover:border-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide cursor-pointer"
						>
							{HERO_DATA.secondaryCtaText}
						</a>
						<CvDownloadDropdown />
					</div>
				</div>

				{/* Editorial Portrait Frame */}
				<div className="lg:col-span-5 flex items-center justify-center lg:justify-center pt-6 sm:pt-8 lg:pt-0 shrink-0">
					<div className="relative z-0 w-56 sm:w-68 md:w-80 lg:w-[340px] xl:w-[380px] 2xl:w-[420px] aspect-square lg:-translate-x-3 xl:-translate-x-5">
						<div className="relative w-full h-full rounded-full overflow-hidden bg-bg-card border-2 border-accent shadow-[0_0_50px_rgba(5,150,105,0.7),0_0_100px_rgba(16,185,129,0.35)] dark:shadow-[0_0_50px_-10px_rgba(52,211,153,0.35)] select-none">
							<Image
								src="/hero_square_v2.jpg"
								alt="Daniel Parra - Editorial Portrait"
								fill
								priority
								sizes="(max-width: 640px) 224px, (max-width: 768px) 272px, (max-width: 1024px) 340px, (max-width: 1280px) 380px, 420px"
								quality={90}
								className="object-cover object-center drop-shadow-2xl"
							/>
						</div>
						{/* Certification badges overlay - anchored to bottom-right of portrait */}
						{CERTIFICATIONS.length > 0 && (
							<div className="absolute -bottom-4 -right-4 sm:-bottom-2 sm:-right-2 lg:-bottom-1 lg:-right-1 z-10 flex items-end justify-end pointer-events-none">
								<div
									className={`flex items-center pointer-events-auto ${
										CERTIFICATIONS.length >= 3
											? "-space-x-5 sm:-space-x-6 xl:-space-x-7"
											: "-space-x-2 sm:-space-x-2.5"
									}`}
								>
									{CERTIFICATIONS.map((cert, index) => (
										<a
											key={cert.shortName}
											href={cert.credlyUrl}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Verify ${cert.name} on Credly`}
											style={{ zIndex: index + 1 }}
											className="w-[74px] h-[74px] sm:w-[84px] sm:h-[84px] md:w-[92px] md:h-[92px] xl:w-[102px] xl:h-[102px] 2xl:w-[108px] 2xl:h-[108px] hover:scale-110 hover:z-20 active:scale-95 transition-all duration-300 drop-shadow-xl block shrink-0"
										>
											<Image
												src={cert.badgeImage}
												alt={cert.name}
												width={128}
												height={128}
												className="w-full h-full object-contain"
											/>
										</a>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
