import Link from "next/link";
import { LuArrowRight, LuExternalLink, LuGithub } from "react-icons/lu";
import { getBlogPosts } from "@/lib/blog-data";
import { FEATURED_PROJECTS } from "@/lib/data";
import type { BlogPost, ProjectItem } from "@/lib/types";

export default function ProjectsSection() {
	const posts = getBlogPosts();

	return (
		<section id="projects" className="scroll-mt-20 py-8 sm:py-10 space-y-12 sm:space-y-14">
			{/* Section Header */}
			<div className="flex items-baseline justify-between border-b border-border-card pb-4">
				<h2 className="font-primary text-4xl sm:text-5xl font-normal text-text-primary tracking-wide leading-relaxed">
					Systems & Architecture
				</h2>
				<span className="font-mono text-xs uppercase tracking-widest text-accent">
					03 {/* How */}
				</span>
			</div>

			{/* Part 1: Featured Production Systems */}
			<div className="space-y-6">
				<div className="flex items-center gap-3 border-l-2 border-accent/80 pl-3.5">
					<h3 className="font-primary text-2xl sm:text-3xl font-normal text-text-primary leading-relaxed tracking-wide">
						Production Systems
					</h3>
				</div>

				<div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
					{FEATURED_PROJECTS.map((proj: ProjectItem) => (
						<div
							key={proj.title}
							className="group flex flex-col justify-between p-6 rounded-xl bg-bg-card border border-border-card hover:border-accent/40 hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300"
						>
							<div>
								<span className="font-mono text-[11px] uppercase tracking-wider text-accent mb-2 block">
									{proj.tagline}
								</span>
								<h4 className="font-primary text-xl font-normal text-text-primary group-hover:text-accent transition-colors leading-snug mb-3">
									{proj.title}
								</h4>
								<p className="font-secondary text-text-secondary text-xs sm:text-sm leading-relaxed mb-5 font-normal">
									{proj.description}
								</p>
							</div>

							<div>
								<div className="flex flex-wrap gap-1.5 mb-5">
									{proj.tags.map((tag: string) => (
										<span
											key={tag}
											className="font-mono text-[10px] uppercase tracking-wider text-text-muted bg-bg-primary/50 px-2 py-0.5 rounded border border-border-card"
										>
											{tag}
										</span>
									))}
								</div>

								<div className="flex items-center justify-between pt-4 border-t border-border-card text-xs font-secondary">
									<div className="flex items-center gap-3">
										{proj.liveUrl && (
											<a
												href={proj.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent/80 transition-colors"
											>
												<span>Live Demo</span>
												<LuExternalLink className="w-3.5 h-3.5" />
											</a>
										)}
										{proj.blogUrl && (
											<Link
												href={proj.blogUrl}
												className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent/80 transition-colors"
											>
												<span>Deep Dive</span>
												<LuArrowRight className="w-3.5 h-3.5" />
											</Link>
										)}
									</div>
									{proj.githubUrl && (
										<a
											href={proj.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
											aria-label={`${proj.title} GitHub repository`}
										>
											<LuGithub className="w-4 h-4" />
											<span>Code</span>
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Part 2: Technical Deep Dives (Blog) */}
			<div className="space-y-6 pt-4">
				<div className="flex items-center gap-3 border-l-2 border-accent/80 pl-3.5">
					<h3 className="font-primary text-2xl sm:text-3xl font-normal text-text-primary leading-relaxed tracking-wide">
						Technical Deep Dives
					</h3>
				</div>

				<div className="max-w-3xl grid grid-cols-1 gap-6">
					{posts.map((post: BlogPost) => (
						<article
							key={post.slug}
							className="group flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-bg-card border border-border-card hover:border-accent/40 hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.12)] hover:-translate-y-1 focus-within:ring-2 focus-within:ring-accent/50 transition-all duration-300"
						>
							<div>
								<div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted uppercase tracking-wider mb-2.5">
									<span>{post.date}</span>
									<span>•</span>
									<span>{post.readTimeMinutes} min read</span>
								</div>

								<Link href={`/blog/${post.slug}`} className="block focus:outline-none">
									<h4 className="font-primary text-xl sm:text-2xl font-normal text-text-primary group-hover:text-accent transition-colors tracking-tight leading-snug mb-2.5">
										{post.title}
									</h4>
								</Link>

								<p className="font-secondary text-text-secondary text-sm leading-relaxed mb-5 font-normal">
									{post.summary}
								</p>
							</div>

							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border-card">
								<div className="flex flex-wrap gap-x-4 gap-y-2">
									{post.tags.map((tag: string) => (
										<span
											key={tag}
											className="font-mono text-xs uppercase tracking-wider text-text-muted group-hover:text-text-secondary transition-colors"
										>
											#{tag}
										</span>
									))}
								</div>

								<Link
									href={`/blog/${post.slug}`}
									className="inline-flex items-center gap-2 font-secondary text-sm font-medium text-accent hover:text-accent/80 group-hover:translate-x-1.5 transition-all duration-300 shrink-0"
								>
									<span>Read Article</span>
									<LuArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
