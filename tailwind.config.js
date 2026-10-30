/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Fire red GBA shell
        shell: {
          DEFAULT: "#C8281E",
          light: "#E04A3A",
          dark: "#8E1912",
          ink: "#3D0B07",
          label: "#FFE3DA",
        },
        bezel: {
          DEFAULT: "#26252B",
          light: "#3A3940",
        },
      },
      fontFamily: {
        arcade: ["var(--arcade)"],
        pixeboy: ["var(--pixeboy)"],
        bigpixel: ["var(--bigpixel)"],
      },
    },
  },
  plugins: [],
};
