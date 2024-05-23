import "./globals.css";

export const metadata = {
  title: "Ansh Mehta's Portfolio",
  description: "my Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
