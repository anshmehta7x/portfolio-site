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
      <body
        className={`${arcade.variable} ${pixeboy.variable} ${bigpixel.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
