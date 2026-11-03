import { SITE_URL } from "@/data/site";

export default function sitemap() {
    return [
        { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/text`, changeFrequency: "monthly", priority: 0.8 },
    ];
}
