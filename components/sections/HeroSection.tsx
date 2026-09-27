import React from "react";
import Image from "next/image";
import { HERO_DATA, CERTIFICATIONS } from "@/lib/data";
import { LuArrowRight, LuDownload } from "react-icons/lu";

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-[auto] lg:min-h-[68vh] flex items-center pt-8 pb-10 sm:pt-10 sm:pb-12 overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-12 items-center w-full">
        {/* Editorial Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent font-normal mb-4 sm:mb-5 flex flex-wrap items-center gap-1.5">
            <span>
              AI/ML Engineer · AWS Certified{CERTIFICATIONS.length > 1 ? ` ${CERTIFICATIONS.length}x` : ""} (
            </span>
            {CERTIFICATIONS.map((cert, index) => (
              <React.Fragment key={cert.acronym}>
                {index > 0 && <span>,</span>}
                <a
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent hover:text-accent-subtle transition-colors cursor-pointer"
                  title={`Verify ${cert.name} on Credly`}
                >
                  {cert.acronym}
                </a>
              </React.Fragment>
            ))}
            <span>)</span>
          </div>

          <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-normal text-text-primary mb-5 sm:mb-6 leading-[1.16]">
            {HERO_DATA.headlinePrefix}
            <br className="hidden md:block" />
            <span className="italic font-normal text-text-primary/90">{HERO_DATA.headlineHighlight}</span>
          </h1>

          <p className="font-secondary text-sm sm:text-base md:text-lg text-text-secondary max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal">
            {HERO_DATA.bioPrefix}
            <span className="italic text-text-primary">{HERO_DATA.bioHighlight}</span>
            {HERO_DATA.bioSuffix}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={HERO_DATA.ctaLink}
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
            <a
              href="/cv.pdf"
              download="Daniel_Parra_CV.pdf"
              aria-label="Download Curriculum Vitae"
              className="group inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-lg bg-bg-card hover:bg-accent-subtle text-text-secondary hover:text-accent font-secondary text-xs font-semibold uppercase tracking-wider border border-border-card hover:border-accent/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
            >
              <span>CV</span>
              <LuDownload className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Editorial Portrait Frame */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-start xl:justify-center pt-6 sm:pt-8 lg:pt-0">
          <div className="relative z-0 w-60 sm:w-72 md:w-80 lg:w-[320px] xl:w-[380px] aspect-square">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-bg-card border border-accent/40 shadow-[0_0_50px_-10px_rgba(52,211,153,0.35)] select-none">
              <Image
                src="/hero_square_v2.jpg"
                alt="Daniel Parra — Editorial Portrait"
                fill
                priority
                sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 380px"
                quality={90}
                className="object-cover object-center drop-shadow-2xl"
              />
            </div>
            {/* Certification badges overlay — anchored to bottom-right of portrait */}
            {CERTIFICATIONS.length > 0 && (
              <div className="absolute -bottom-4 -right-4 sm:-bottom-2 sm:-right-2 lg:-bottom-1 lg:-right-1 z-10 flex items-end justify-end pointer-events-none">
                <div
                  className={`flex items-center pointer-events-auto ${CERTIFICATIONS.length >= 3
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
                      className="w-[84px] h-[84px] sm:w-[94px] sm:h-[94px] xl:w-[104px] xl:h-[104px] hover:scale-110 hover:z-20 active:scale-95 transition-all duration-300 drop-shadow-xl block shrink-0"
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
