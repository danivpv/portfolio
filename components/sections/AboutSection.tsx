import React from "react";
import { SKILLS_DATA } from "@/lib/data";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function AboutSection() {
  const categories = Array.from(new Set(SKILLS_DATA.map((s) => s.category)));

  return (
    <section id="about" className="scroll-mt-20 py-8 sm:py-10">
      <div className="flex items-baseline justify-between border-b border-border-card pb-4 mb-8 sm:mb-10">
        <h2 className="font-primary text-4xl sm:text-5xl font-normal text-text-primary tracking-wide leading-relaxed">
          Motivation
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          01 // Why
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Editorial Bio Text */}
        <div className="lg:col-span-6 space-y-6 text-text-secondary leading-relaxed font-secondary text-base sm:text-lg font-normal">
          <p>
            Mathematical modeling is only the last mile of enterprise AI. A high-performing model has zero business impact without quality data, if it suffers from training-serving skew, lacks data-to-model lineage, or runs without aligned evaluation gates.
          </p>
          <p>
            True governance and business leverage comes from quality engineering of the full operational stack: scalable feature stores, artifact versioning, runtime and infrastructure observability, rigorous offline and online evaluation, and decoupled architectures.
          </p>
          <p>
            Today, as a GenAI and ML Solutions Architect, my focus is designing the cloud software and systems that operationalize intelligence: autonomous multi-tool agents via AWS Bedrock AgentCore, reproducible training pipelines, and cost-optimized AWS CDK infrastructure built to withstand production scale.
          </p>
          <p className="font-secondary text-xs sm:text-sm text-text-primary pt-2 border-l-2 border-accent/60 pl-4 italic">
            Focus: Architecting end-to-end cloud and AI solutions that bridge mathematical depth to business reality.
          </p>
        </div>

        {/* Categorized Skills & Ecosystem Marquee Galleries */}
        <SkillsMarquee categories={categories} skills={SKILLS_DATA} />
      </div>
    </section>
  );
}
