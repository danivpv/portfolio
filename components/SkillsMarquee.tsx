import React from "react";
import { SkillItem } from "@/lib/types";
import SkillBadge from "@/components/SkillBadge";
import MarqueeGallery from "@/components/MarqueeGallery";
import CategoryViewToggle from "@/components/CategoryViewToggle";

interface SkillsMarqueeProps {
  categories: string[];
  skills: SkillItem[];
}

export default function SkillsMarquee({ categories, skills }: SkillsMarqueeProps) {
  return (
    <div className="lg:col-span-6 space-y-7">
      {categories.map((category, idx) => {
        const items = skills.filter((skill) => skill.category === category);
        if (items.length === 0) return null;

        const loopItems = [...items, ...items, ...items];
        const speed = idx % 2 === 0 ? "normal" : "slow";

        const skillPills = items.map((skill) => ({
          id: skill.name,
          label: skill.name,
          href: skill.url,
          isExternal: true,
        }));

        return (
          <div key={category} className="border-b border-border-card pb-5 last:border-b-0 last:pb-0">
            <CategoryViewToggle
              category={`0${idx + 1} // ${category}`}
              count={items.length}
              pills={skillPills}
            >
              <MarqueeGallery direction="left" speed={speed}>
                <div className="flex gap-3 items-center">
                  {loopItems.map((skill, i) => (
                    <SkillBadge key={`${skill.name}-${category}-${i}`} skill={skill} />
                  ))}
                </div>
              </MarqueeGallery>
            </CategoryViewToggle>
          </div>
        );
      })}
    </div>
  );
}
