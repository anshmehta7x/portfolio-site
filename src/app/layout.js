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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${arcade.variable}`}>{children}</body>
    </html>
  );
}
