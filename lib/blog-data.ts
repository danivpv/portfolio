import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

export function getBlogPosts(): BlogPost[] {
  const contentDir = path.join(process.cwd(), "content", "blog");
  let files: string[] = [];

  try {
    if (fs.existsSync(contentDir)) {
      files = fs.readdirSync(contentDir).filter(file => file.endsWith(".md"));
    }
  } catch (error) {
    console.error("Failed to read blog directory:", error);
    return [];
  }

  const isProd = process.env.NODE_ENV === "production";

  const posts: BlogPost[] = files.flatMap((filename) => {
    const filePath = path.join(contentDir, filename);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    // Hide 'published: false' posts only in production
    if (isProd && data.published === false) {
      return [];
    }

    // Dynamic read time calculation (200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Strict slug resolution: The portfolio convention enforces that 
    // the Markdown filename exactly matches the intended URL slug.
    const slug = filename.replace(/\.md$/, "");

    // Format Date correctly if it's a Date object from YAML parsing
    let formattedDate = data.date;
    if (data.date instanceof Date) {
      formattedDate = data.date.toISOString().split("T")[0];
    } else if (typeof data.date === "string") {
      formattedDate = data.date;
    } else {
      formattedDate = "2026-01-01"; // Fallback
    }

    return [{
      slug,
      title: data.title || "Untitled",
      date: formattedDate,
      tags: Array.isArray(data.tags) ? data.tags : [],
      canonical_url: data.canonical_url || "",
      cover_image: data.cover_image,
      summary: data.summary || "",
      readTimeMinutes,
      content,
    }];
  });

  // Sort descending by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug);
}
