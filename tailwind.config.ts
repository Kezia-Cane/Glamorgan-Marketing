import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: "#1E3A8A",
                    yellow: "#FBBF24",
                    "gray-light": "#F5F8FF",
                    "gray-dark": "#111827",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
