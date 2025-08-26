import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";

export const metadata = {
    title: "Ansh Mehta's Portfolio",
    description: "my Portfolio",
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
            <link rel="icon" href="favicon.ico" sizes="any" />{" "}
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
            </Script>{" "}
            <body
                className={`${arcade.variable} ${pixeboy.variable} ${bigpixel.variable}`}
            >
                {children}
            </body>
        </html>
    );
}
