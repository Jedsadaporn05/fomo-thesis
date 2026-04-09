import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.fomo-gracie.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-04-09",
      priority: 1,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: "2026-04-09",
      priority: 0.8,
    },
  ];
}
