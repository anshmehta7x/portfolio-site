import { SITE_URL } from "@/data/site";

export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
