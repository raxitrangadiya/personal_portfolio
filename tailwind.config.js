/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#64ffda",
                secondary: "#0a192f",
                textLight: "#ccd6f6",
                textDark: "#8892b0",
                galaxy: {
                    blue: "#00f0ff",
                    purple: "#bd34fe",
                    pink: "#ff0099"
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            }
        },
    },
    plugins: [],
}
