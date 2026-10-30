import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/data/site";

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: "%s | Ansh Mehta",
    },
    description: SITE_DESCRIPTION,
    authors: [{ name: "Ansh Mehta", url: "https://github.com/anshmehta7x" }],
    keywords: ["Ansh Mehta", "software engineer", "portfolio", "VIT", "React", "Three.js", "Pokemon FireRed"],
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        siteName: "Ansh Mehta",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ansh Mehta's portfolio: a FireRed-style room inside a red handheld" }],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: ["/og.png"],
    },
};

export const viewport = {
    themeColor: "#c8281e",
};

const arcade = localFont({
    src: "fonts/arcade.ttf",
    variable: "--arcade",
});

const pixeboy = localFont({
    src: "fonts/pixeboy.ttf",
    variable: "--pixeboy",
});

const bigpixel = localFont({
    src: "fonts/bigpixel.ttf",
    variable: "--bigpixel",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${arcade.variable} ${pixeboy.variable} ${bigpixel.variable}`}>
                {children}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-YZ67R6ZQY1"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YZ67R6ZQY1');
          `}
                </Script>
            </body>
        </html>
    );
}
